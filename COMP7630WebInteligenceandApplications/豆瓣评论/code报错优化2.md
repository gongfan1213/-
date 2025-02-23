好的，根据你的要求，我将对之前的代码进行更精细的优化，包括：

1.  **更精细的文本预处理:**
    *   使用 spaCy 进行分词、词形还原 (lemmatization) 和停用词去除。spaCy 是一个功能强大的 NLP 库，提供更准确的分词和词形还原。
    *   使用 NLTK 提供的更全面的停用词列表。

2.  **特征权重:**
    *   为 TF-IDF 向量 (来自 Description)、Genre、Director、Actors、Year、Rating、Votes 和 Revenue 设置不同的权重。

3.  **引入其他特征:**
    *   引入 Rating、Votes 和 Revenue (Millions) 作为数值特征。
    *   对 Year 进行分箱处理 (例如，每 10 年一个箱)。

4.  **使用更高级的推荐算法:**
    *   由于我们仍然没有用户信息，协同过滤和基于图的算法仍然不适用。
    *    知识图谱算法需要外部知识库，实现起来较复杂，本次暂不涉及。我们这里实现一种 **加权混合推荐**。
    *   我们重点改进相似度计算部分，通过加权不同特征的相似度，实现更精细的推荐。

5.  **评估:**
    *   由于没有用户评分数据，我们无法计算 Precision、Recall、F1、NDCG 等指标。
    *   我们采用一种简单的评估方法：给定一部电影，查看推荐列表中的电影是否在类型、导演、演员等方面与该电影相似。这是一种定性评估。

**代码实现 (优化版):**

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
data = pd.concat([data, genre_dummies], axis=1)

# 1.3.2 导演 (Director) 和演员 (Actors) - 独热编码
director_dummies = pd.get_dummies(data['Director'], prefix='Director')
# 演员较多, 取前三个主要演员
actor_dummies = data['Actors'].str.split(',', expand=True).iloc[:, :3].apply(lambda x: x.str.strip()).stack().str.get_dummies().groupby(level=0).sum()
data = pd.concat([data, director_dummies, actor_dummies], axis=1)

# 1.3.3 年份 (Year) - 分箱
data['Year_Bin'] = pd.cut(data['Year'], bins=[1900, 1980, 1990, 2000, 2010, 2020], labels=['<1980', '1980s', '1990s', '2000s', '2010s'])
year_dummies = pd.get_dummies(data['Year_Bin'], prefix='Year')
data = pd.concat([data, year_dummies], axis=1)

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
def weighted_similarity(movie_index, df, tfidf_matrix, weights):

    # 计算 TF-IDF 相似度
    tfidf_sim = cosine_similarity(tfidf_matrix[movie_index], tfidf_matrix).flatten()

    # 计算 Genre 相似度
    genre_cols = list(genre_dummies.columns)
    genre_sim = cosine_similarity(df[genre_cols].iloc[movie_index].values.reshape(1, -1), df[genre_cols]).flatten()

    # 计算 Director 相似度
    director_cols = [col for col in df.columns if col.startswith('Director_')]
    director_sim = cosine_similarity(df[director_cols].iloc[movie_index].values.reshape(1, -1), df[director_cols]).flatten() if director_cols else np.zeros(len(df))

    # 计算 Actors 相似度
    actor_cols = [col for col in df.columns if col.startswith('Actor_')]
    actor_sim = cosine_similarity(df[actor_cols].iloc[movie_index].values.reshape(1, -1), df[actor_cols]).flatten() if actor_cols else np.zeros(len(df))

     # 计算 Year 相似度
    year_cols = [col for col in df.columns if col.startswith('Year_')]
    year_sim = cosine_similarity(df[year_cols].iloc[movie_index].values.reshape(1, -1), df[year_cols]).flatten() if year_cols else np.zeros(len(df))


    # 计算 Rating, Votes, Revenue 相似度 (使用差值)
    rating_sim = 1 - abs(df['Rating'].iloc[movie_index] - df['Rating'])
    votes_sim = 1 - abs(df['Votes'].iloc[movie_index] - df['Votes'])
    revenue_sim = 1 - abs(df['Revenue (Millions)'].iloc[movie_index] - df['Revenue (Millions)'])

    # 计算加权总相似度
    total_similarity = (
        weights['tfidf'] * tfidf_sim +
        weights['genre'] * genre_sim +
        weights['director'] * director_sim +
        weights['actors'] * actor_sim +
        weights['year'] * year_sim+
        weights['rating'] * rating_sim +
        weights['votes'] * votes_sim +
        weights['revenue'] * revenue_sim
    )

    return total_similarity

# 2.4 推荐函数
def recommend_movies_weighted(title, df, tfidf_matrix, weights, top_n=10):

    # 获取电影的索引
    idx = df[df['Title'] == title].index[0]

    # 计算加权相似度
    sim_scores = weighted_similarity(idx, df, tfidf_matrix, weights)

    # 根据相似度分数排序
    sim_scores = list(enumerate(sim_scores))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 获取最相似的 top_n 部电影 (排除自身)
    top_movies_indices = [i[0] for i in sim_scores[1:top_n + 1]]

    # 返回推荐电影的标题
    return df['Title'].iloc[top_movies_indices].tolist()

# --- 3. 推荐示例 ---
recommendations = recommend_movies_weighted('Guardians of the Galaxy', data, tfidf_matrix, weights)
print(f"为喜欢 'Guardians of the Galaxy' 的用户推荐的电影：{recommendations}")

# --- 4. 评估 (定性) ---
# 打印推荐电影的详细信息，以便进行定性评估
print("\n推荐电影的详细信息：")
print(data[data['Title'].isin(recommendations)][['Title', 'Genre', 'Director', 'Actors', 'Year', 'Rating']])
```

**代码解释:**

1.  **更精细的文本预处理:**
    *   使用`spacy.load('en_core_web_sm')`加载spaCy的英文模型。
    *   在`preprocess_text_spacy()`函数中：
        *   使用`nlp(text)`将文本转换为spaCy的`Doc`对象。
        *   使用列表推导式和spaCy提供的属性进行词形还原(`token.lemma_`)、去除停用词(`token.is_stop`)、标点符号(`token.is_punct`)和空格(`token.is_space`)。

2.  **特征权重:**
    *   创建`weights`字典，为每个特征分配权重。
    *   在`weighted_similarity()`函数中，分别计算每个特征的相似度，然后根据权重计算加权总相似度。

3.  **引入其他特征:**
    *   对`Year`进行分箱处理，并进行独热编码。
    *   使用`MinMaxScaler`对`Rating`、`Votes`和`Revenue (Millions)`进行归一化。
    *   在`weighted_similarity()`函数中，计算这些数值特征的相似度（使用差值的补数）。

4.  **加权混合推荐:**
    *   `weighted_similarity()`函数计算给定电影与其他所有电影的加权相似度。
    *   `recommend_movies_weighted()`函数根据加权相似度进行推荐。

5.  **评估 (定性):**
    *   打印推荐电影的详细信息 (标题、类型、导演、演员、年份、评分)，以便人工检查推荐结果是否合理。

**重要改进:**

*   **更准确的文本处理:** 使用 spaCy 进行词形还原和停用词去除，比简单的基于规则的方法更准确。
*   **特征加权:**  通过为不同特征分配权重，可以更好地控制它们对推荐结果的影响。
*   **引入更多特征:** 加入评分、投票数和票房收入等特征，使推荐更全面。
*   **数值特征归一化:**  防止数值范围较大的特征主导相似度计算。
*   **加权混合相似度:** 综合考虑多种特征的相似度，提高推荐的准确性和多样性。

**下一步:**

*   **调整权重:** 你可以根据实际效果，调整`weights`字典中的权重，以找到最佳的推荐效果。
*   **更高级的特征工程:** 可以尝试更复杂的特征组合、特征交叉等方法。
*  **尝试其他的相似度度量标准**: 可以尝试除了`cosine_similarity`之外的相似度度量标准
*   **收集用户反馈:** 如果有条件，可以收集用户的真实反馈（如点击、评分、购买等），并使用这些反馈来评估和改进推荐系统。
