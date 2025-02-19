好的，我将修改代码，以使用你提供的位于 `IMDB-Movie-Data.csv` 同一目录下的 `stopwords.txt` 文件作为停用词列表。

**代码修改说明：**

1.  **加载停用词列表:**
    *   从 `stopwords.txt` 文件中读取停用词。
    *   将读取到的停用词列表与 spaCy 自带的停用词列表合并（可选，如果你希望同时使用两种停用词）。

2.  **修改 `preprocess_text_spacy` 函数:**
    *   在 `preprocess_text_spacy` 函数中，不再直接使用 `token.is_stop`，而是检查分词后的词是否在自定义的停用词列表中。

**修改后的代码：**

```python
import pandas as pd
import re
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
import nltk
from nltk.corpus import stopwords  # 导入nltk的stopwords，下面会用到
import numpy as np
import os  # 导入 os 模块

# 加载 spaCy 模型 (需要先安装：python -m spacy download en_core_web_sm)
nlp = spacy.load('en_core_web_sm')

# 获取当前脚本所在目录 (或 IMDB-Movie-Data.csv 所在目录)
# 如果你的 Jupyter Notebook/脚本 和 IMDB-Movie-Data.csv 在同一目录，可以直接用 '.'
# 如果不在同一目录，需要提供 IMDB-Movie-Data.csv 的完整路径
current_dir = '.'  # 或者 os.path.dirname(os.path.abspath(__file__)) 如果是 .py 文件

# 加载数据
data = pd.read_csv(os.path.join(current_dir, 'IMDB-Movie-Data.csv'))

# --- 1. 数据预处理 ---

# 1.1 缺失值处理
for col in data.columns:
    if data[col].isnull().any():
        if data[col].dtype == 'float64' or data[col].dtype == 'int64':
            data[col] = data[col].fillna(data[col].mean())
        else:
            data[col] = data[col].fillna(data[col].mode()[0])

# 1.2 加载停用词列表
stopwords_file = os.path.join(current_dir, 'stopwords.txt')
try:
    with open(stopwords_file, 'r', encoding='utf-8') as f:
        custom_stopwords = [line.strip() for line in f]
except FileNotFoundError:
    print(f"Warning: Stopwords file not found at {stopwords_file}. Using NLTK's default English stopwords.")
    custom_stopwords = []

# # 可选：与 spaCy 自带的停用词合并
# custom_stopwords = list(set(custom_stopwords + list(nlp.Defaults.stop_words)))

# 也可选择与NLTK提供的英文停用词合并
nltk_stopwords = stopwords.words('english')
custom_stopwords = list(set(custom_stopwords + nltk_stopwords))


# 1.3 文本预处理 (使用 spaCy, 并使用自定义停用词)
def preprocess_text_spacy(text, stopwords):
    doc = nlp(text)
    # 词形还原，去除标点符号和空格, 检查是否在停用词列表中
    tokens = [token.lemma_.lower() for token in doc if token.text.lower() not in stopwords and not token.is_punct and not token.is_space]
    return ' '.join(tokens)

data['Processed_Description'] = data['Description'].apply(lambda x: preprocess_text_spacy(x, custom_stopwords))

# 1.4 特征工程 (与之前相同, 只是为了完整性)
genre_dummies = data['Genre'].str.get_dummies(sep=',')
director_dummies = pd.get_dummies(data['Director'], prefix='Director')
actor_dummies = data['Actors'].str.split(',', expand=True).iloc[:, :3].apply(lambda x: x.str.strip()).stack().str.get_dummies().groupby(level=0).sum()
data['Year_Bin'] = pd.cut(data['Year'], bins=[1900, 1980, 1990, 2000, 2010, 2020], labels=['<1980', '1980s', '1990s', '2000s', '2010s'])
year_dummies = pd.get_dummies(data['Year_Bin'], prefix='Year')
scaler = MinMaxScaler()
data[['Rating', 'Votes', 'Revenue (Millions)']] = scaler.fit_transform(data[['Rating', 'Votes', 'Revenue (Millions)']])

# --- 2. 加权混合推荐 --- (与之前相同, 只是为了完整性)

# 2.1 TF-IDF
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=5000)
tfidf_matrix = tfidf_vectorizer.fit_transform(data['Processed_Description'])

# 2.2 权重
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

# 2.3 加权相似度计算函数
def weighted_similarity(movie_index, tfidf_matrix, genre_dummies, director_dummies, actor_dummies, year_dummies, rating, votes, revenue, weights):
    tfidf_sim = cosine_similarity(tfidf_matrix[movie_index], tfidf_matrix).flatten()
    genre_sim = cosine_similarity(genre_dummies.iloc[movie_index].values.reshape(1, -1), genre_dummies).flatten()
    director_sim = cosine_similarity(director_dummies.iloc[movie_index].values.reshape(1, -1), director_dummies).flatten() if not director_dummies.empty else np.zeros(tfidf_matrix.shape[0])
    actor_sim = cosine_similarity(actor_dummies.iloc[movie_index].values.reshape(1, -1), actor_dummies).flatten() if not actor_dummies.empty else np.zeros(tfidf_matrix.shape[0])
    year_sim = cosine_similarity(year_dummies.iloc[movie_index].values.reshape(1, -1), year_dummies).flatten() if not year_dummies.empty else np.zeros(tfidf_matrix.shape[0])
    rating_sim = 1 - abs(rating.iloc[movie_index] - rating)
    votes_sim = 1 - abs(votes.iloc[movie_index] - votes)
    revenue_sim = 1 - abs(revenue.iloc[movie_index] - revenue)

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
    idx = data[data['Title'] == title].index[0]
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
    sim_scores = list(enumerate(sim_scores))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    top_movies_indices = [i[0] for i in sim_scores[1:top_n + 1]]
    return data['Title'].iloc[top_movies_indices].tolist()

# --- 3. 推荐示例 ---
recommendations = recommend_movies_weighted('Guardians of the Galaxy', data, tfidf_matrix, genre_dummies, director_dummies, actor_dummies, year_dummies, weights)
print(f"为喜欢 'Guardians of the Galaxy' 的用户推荐的电影：{recommendations}")

# --- 4. 评估 (定性) ---
print("\n推荐电影的详细信息：")
print(data[data['Title'].isin(recommendations)][['Title', 'Genre', 'Director', 'Actors', 'Year', 'Rating']])
```

**关键修改点：**

*   **停用词加载:**
    *   使用 `os.path.join(current_dir, 'stopwords.txt')` 构建停用词文件的完整路径。
    *   使用 `try...except FileNotFoundError` 来处理停用词文件不存在的情况。
    *   从文件中逐行读取停用词，并去除每行末尾的空白字符 (`line.strip()`)。
    *  选择和NLTK中的英文停用词合并。
*   **`preprocess_text_spacy` 函数:**
    *   添加了一个 `stopwords` 参数，用于接收停用词列表。
    *   在列表推导式中，使用 `token.text.lower() not in stopwords` 来检查当前词是否在停用词列表中。
    *    在对`Description`进行预处理时，传入`custom_stopwords`。

现在，代码将使用你提供的 `stopwords.txt` 文件中的停用词来进行文本预处理。如果文件不存在，会打印一条警告信息，并回退NLTK的英文停用词。
