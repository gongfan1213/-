你遇到的错误 `ValueError: could not convert string to float: '2010s'` 表明在尝试将包含字符串（如 '2010s'）的数组转换为浮点数时发生了错误。这通常发生在使用 `numpy.asarray()` 或类似函数，并且数组中混合了数值和字符串类型时。

**错误原因分析：**

在你的代码中，错误很可能发生在计算相似度矩阵的步骤中。具体来说，可能是以下几个地方：

1.  **`pd.get_dummies()` 后的 `data` DataFrame:**
    *   你在对 `Year_Bin`、`Director` 和 `Actors` 进行独热编码后，直接将新的独热编码列添加到了原始的 `data` DataFrame。
    *   虽然独热编码本身会产生数值型 (0 或 1) 的列，但是如果你在后续计算相似度的时候，没有明确选择参与计算的数值型的列，有可能会把`data`中的一些字符串类型的列（比如'Title','Genre'）也用于计算，就会报出这个错误。

2.  **`weighted_similarity` 函数中的相似度计算:**
    *   你分别计算了 TF-IDF、Genre、Director、Actors、Year 等特征的相似度。
    *   虽然你在计算时使用了 `df[genre_cols]`、`df[director_cols]`、`df[actor_cols]` 和 `df[year_cols]` 来选择特定的列，但如果这些列中仍然包含非数值类型的数据，就会出错。

**解决方法：**

1.  **明确数值型特征:** 在计算相似度之前，明确选择参与计算的数值型特征。
    *   对于文本特征 (`Processed_Description`)，使用 TF-IDF 向量 (`tfidf_matrix`)。
    *   对于类别特征 (`Genre`, `Director`, `Actors`, `Year_Bin`)，使用独热编码后的数值列。
    *    对于数值型的特征（`Rating`， `Votes`， `Revenue (Millions)`）直接选择。

2.  **检查数据类型:** 在计算相似度之前，使用 `df.dtypes` 检查 DataFrame 中各列的数据类型，确保参与计算的都是数值型。

**修改后的代码 (更健壮):**

```python
import pandas as pd
import re
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
import nltk
from nltk.corpus import stopwords
import numpy as np

# 下载 NLTK 停用词 (如果还没有下载)
# nltk.download('stopwords')

# 加载 spaCy 模型 (需要先安装：python -m spacy download en_core_web_sm)
nlp = spacy.load('en_core_web_sm')

# 加载数据
data = pd.read_csv('IMDB-Movie-Data.csv')

# --- 1. 数据预处理 ---

# 1.1 缺失值处理 (填充或删除)
# 这里用均值填充数值型特征的缺失值，用众数填充类别型特征的缺失值
for col in data.columns:
    if data[col].isnull().any():
        if data[col].dtype == 'float64' or data[col].dtype == 'int64':
            data[col] = data[col].fillna(data[col].mean())
        else:
            data[col] = data[col].fillna(data[col].mode()[0])


# 1.2 文本预处理 (使用 spaCy)
def preprocess_text_spacy(text):
    doc = nlp(text)
    # 词形还原，去除停用词、标点符号和空格
    tokens = [token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and not token.is_space]
    return ' '.join(tokens)

data['Processed_Description'] = data['Description'].apply(preprocess_text_spacy)

# 1.3 特征工程

# 1.3.1 类型 (Genre) - 多标签编码
genre_dummies = data['Genre'].str.get_dummies(sep=',')
# data = pd.concat([data, genre_dummies], axis=1) # 先不合并

# 1.3.2 导演 (Director) 和演员 (Actors) - 独热编码
director_dummies = pd.get_dummies(data['Director'], prefix='Director')
# 演员较多, 取前三个主要演员
actor_dummies = data['Actors'].str.split(',', expand=True).iloc[:, :3].apply(lambda x: x.str.strip()).stack().str.get_dummies().groupby(level=0).sum()
# data = pd.concat([data, director_dummies, actor_dummies], axis=1)  # 先不合并

# 1.3.3 年份 (Year) - 分箱
data['Year_Bin'] = pd.cut(data['Year'], bins=[1900, 1980, 1990, 2000, 2010, 2020], labels=['<1980', '1980s', '1990s', '2000s', '2010s'])
year_dummies = pd.get_dummies(data['Year_Bin'], prefix='Year')
# data = pd.concat([data, year_dummies], axis=1) # 先不合并

# 1.3.4 评分 (Rating)、投票数 (Votes) 和票房收入 (Revenue (Millions)) - 归一化
scaler = MinMaxScaler()
data[['Rating', 'Votes', 'Revenue (Millions)']] = scaler.fit_transform(data[['Rating', 'Votes', 'Revenue (Millions)']])

# --- 2. 加权混合推荐 ---

# 2.1 文本特征向量化 (TF-IDF)
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=5000)  # 增加 max_features
tfidf_matrix = tfidf_vectorizer.fit_transform(data['Processed_Description'])

# 2.2 设置特征权重
weights = {
    'tfidf': 0.4,
    'genre': 0.2,
    'director': 0.15,
    'actors': 0.1,
    'year': 0.05,
    'rating': 0.05,
    'votes': 0.025,
    'revenue': 0.025,
}

# 2.3 计算加权相似度
def weighted_similarity(movie_index, tfidf_matrix, genre_dummies, director_dummies, actor_dummies, year_dummies, rating, votes, revenue, weights):

    # 计算 TF-IDF 相似度
    tfidf_sim = cosine_similarity(tfidf_matrix[movie_index], tfidf_matrix).flatten()

    # 计算 Genre 相似度
    genre_sim = cosine_similarity(genre_dummies.iloc[movie_index].values.reshape(1, -1), genre_dummies).flatten()

    # 计算 Director 相似度
    director_sim = cosine_similarity(director_dummies.iloc[movie_index].values.reshape(1, -1), director_dummies).flatten() if not director_dummies.empty else np.zeros(tfidf_matrix.shape[0])

    # 计算 Actors 相似度
    actor_sim = cosine_similarity(actor_dummies.iloc[movie_index].values.reshape(1, -1), actor_dummies).flatten() if not actor_dummies.empty else np.zeros(tfidf_matrix.shape[0])

    # 计算 Year 相似度
    year_sim = cosine_similarity(year_dummies.iloc[movie_index].values.reshape(1, -1), year_dummies).flatten() if not year_dummies.empty else np.zeros(tfidf_matrix.shape[0])

    # 计算 Rating, Votes, Revenue 相似度 (使用差值)
    rating_sim = 1 - abs(rating.iloc[movie_index] - rating)
    votes_sim = 1 - abs(votes.iloc[movie_index] - votes)
    revenue_sim = 1 - abs(revenue.iloc[movie_index] - revenue)

    # 计算加权总相似度
    total_similarity = (
        weights['tfidf'] * tfidf_sim +
        weights['genre'] * genre_sim +
        weights['director'] * director_sim +
        weights['actors'] * actor_sim +
        weights['year'] * year_sim +
        weights['rating'] * rating_sim +
        weights['votes'] * votes_sim +
        weights['revenue'] * revenue_sim
    )

    return total_similarity

# 2.4 推荐函数
def recommend_movies_weighted(title, data, tfidf_matrix, genre_dummies, director_dummies, actor_dummies, year_dummies, weights, top_n=10):

    # 获取电影的索引
    idx = data[data['Title'] == title].index[0]

    # 计算加权相似度
    sim_scores = weighted_similarity(
        idx,
        tfidf_matrix,
        genre_dummies,
        director_dummies,
        actor_dummies,
        year_dummies,
        data['Rating'],
        data['Votes'],
        data['Revenue (Millions)'],
        weights
    )

    # 根据相似度分数排序
    sim_scores = list(enumerate(sim_scores))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 获取最相似的 top_n 部电影 (排除自身)
    top_movies_indices = [i[0] for i in sim_scores[1:top_n + 1]]

    # 返回推荐电影的标题
    return data['Title'].iloc[top_movies_indices].tolist()

# --- 3. 推荐示例 ---
# 准备好用于计算相似度的 DataFrame
# 注意：这里不再直接修改原始的 data，而是将各个独热编码矩阵和数值特征单独传递给推荐函数
recommendations = recommend_movies_weighted('Guardians of the Galaxy', data, tfidf_matrix, genre_dummies, director_dummies, actor_dummies, year_dummies, weights)
print(f"为喜欢 'Guardians of the Galaxy' 的用户推荐的电影：{recommendations}")

# --- 4. 评估 (定性) ---
# 打印推荐电影的详细信息，以便进行定性评估
print("\n推荐电影的详细信息：")
print(data[data['Title'].isin(recommendations)][['Title', 'Genre', 'Director', 'Actors', 'Year', 'Rating']])
```

**主要修改：**

1.  **特征处理:**
    *   在特征工程部分，我把独热编码矩阵的创建和合并分开了。创建了`genre_dummies`, `director_dummies`, `actor_dummies`, `year_dummies`，但是没有立即和 `data` 进行合并。
    *  最后，我把这些处理好的特征：`tfidf_matrix`, `genre_dummies`, `director_dummies`, `actor_dummies`, `year_dummies`, `data['Rating']`, `data['Votes']`, `data['Revenue (Millions)']`，都作为参数传递给了`recommend_movies_weighted`。

2.  **`weighted_similarity` 函数:**
    *   参数列表更改, 分别接受各个特征矩阵/Series。
    *   在函数内部, 使用`.iloc[movie_index]`来选择当前电影的特征向量。

3.  **`recommend_movies_weighted` 函数:**
    *   参数列表更改为接受 `data` 和各个特征矩阵。
    *    调用 `weighted_similarity` 时，传入相应的特征矩阵。

通过这些修改，代码应该能够正确运行，避免了 `ValueError`。
