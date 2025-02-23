好的，出现了 `NameError: name 'cln_data' is not defined` 错误，这意味着在运行到这一行代码时，`cln_data` 这个变量还没有被定义。这通常是因为：

1.  **你没有运行定义 `cln_data` 的代码块。** 确保你已经运行了所有之前的代码块，包括数据加载、预处理等，这些代码块应该定义了 `cln_data`。
2.  **`cln_data` 的定义不在当前作用域。** 如果你在一个函数内部定义了 `cln_data`，而在函数外部尝试使用它，也会出现这个错误。
3.  **你可能在之前的代码中修改了 `cln_data` 的名字。** 仔细检查之前的代码，确保变量名拼写一致。
4. **你重启了kernel，但是没有重新运行之前的代码**。

**解决方法：**

在你的 Jupyter Notebook (或 Colab) 中，按照以下步骤操作：

1.  **重新运行所有代码块:**  从头开始，按顺序运行所有定义 `cln_data` 的代码块。确保在运行 `tfidf = tfidf_vectorizer.fit_transform(cln_data['Words'])` 之前，`cln_data` 已经被正确加载和预处理。

2.  **如果你是在一个函数中定义的 `cln_data`:**
    *   **方法一 (推荐):** 将 `cln_data` 作为函数的返回值，然后在函数外部接收这个返回值。
    *   **方法二 (不推荐):** 将 `cln_data` 声明为全局变量 (使用 `global cln_data`)，但这通常不是好的做法，因为它可能导致代码难以理解和维护。

3.  **检查变量名:** 仔细检查之前的代码，确保所有使用 `cln_data` 的地方拼写都完全一致。

**示例 (假设你的数据加载和预处理代码如下):**

```python
import pandas as pd
import re
import jieba.posseg as pseg
import os

# 假设你的数据文件路径是 'data/DMSC.csv'，停用词文件路径是 'stop_words'
dataset_path = 'data'  # 根据你的实际路径修改
datafile = os.path.join(dataset_path, 'DMSC.csv')
stop_words_path = 'stop_words'

# 加载停用词
stopwords1 = [line.rstrip() for line in open(os.path.join(stop_words_path, '中文停用词库.txt'), 'r', encoding='utf-8')]
stopwords2 = [line.rstrip() for line in open(os.path.join(stop_words_path, '哈工大停用词表.txt'), 'r', encoding='utf-8')]
stopwords3 = [line.rstrip() for line in open(os.path.join(stop_words_path, '四川大学机器智能实验室停用词库.txt'), 'r', encoding='utf-8')]
stopwords = stopwords1 + stopwords2 + stopwords3

def proc_text(raw_line):
    # 1. 使用正则表达式去除非中文字符
    filter_pattern = re.compile('[^\u4E00-\u9FD5]+')
    chinese_only = filter_pattern.sub('', raw_line)

    # 2. 结巴分词+词性标注
    word_list = pseg.cut(chinese_only)

    # 3. 去除停用词，保留有意义的词性
    used_flags = ['v', 'a', 'ad', 'n', 'vn', 'an']
    meaninful_words = []
    for word, flag in word_list:
        if (word not in stopwords) and (flag in used_flags):
            meaninful_words.append(word)
    return ' '.join(meaninful_words)

# 加载数据
raw_data = pd.read_csv(datafile)

# 数据预处理
cln_data = raw_data.dropna().copy()
cln_data['Positively Rated'] = np.where(cln_data['Star'] >= 3, 1, 0)
cln_data['Words'] = cln_data['Comment'].apply(proc_text) # 确保这一步也运行了

# --- 之后的代码 (包括推荐系统的代码) ---
# ... (你的推荐系统代码) ...
```

**修改后的推荐系统代码（包含主题模型部分）：**

```python
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# --- 主题模型 (LDA) ---
# 确保 cln_data 已经被定义 (运行上面的数据加载和预处理代码)

n_topics = 10  # 设置主题数量 (可以根据实际情况调整)
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=10000, stop_words='english')
tfidf = tfidf_vectorizer.fit_transform(cln_data['Words'])  # 现在应该可以正常运行了

# LDA 模型
lda = LatentDirichletAllocation(n_components=n_topics, random_state=0)
lda.fit(tfidf)

# 获取文档-主题分布
doc_topic_dist = lda.transform(tfidf)

# 获取主题-词语分布
topic_word_dist = lda.components_

# 将文档-主题分布添加到 cln_data
for i in range(n_topics):
    cln_data[f'Topic_{i}'] = doc_topic_dist[:, i]


# --- 用户画像构建 ---

# 1. 基于情感的用户画像
# 如果使用 'Sentiment_Score' (连续值)
# user_sentiment_profile = cln_data.groupby('Username')['Sentiment_Score'].mean().reset_index()
# 如果使用 'Positively Rated' (二元值)
user_sentiment_profile = cln_data.groupby('Username')['Positively Rated'].mean().reset_index()
user_sentiment_profile.columns = ['Username', 'Avg_Sentiment']

# 2. 基于主题的用户画像
user_topic_profile = cln_data.groupby('Username')[['Topic_{}'.format(i) for i in range(n_topics)]].mean().reset_index()

# 3. 结合情感和主题 (用户画像)
user_profile = pd.merge(user_sentiment_profile, user_topic_profile, on='Username', how='left')

# --- 电影画像构建 ---

# 1. 基于情感的电影画像
# 如果使用 'Sentiment_Score'
# movie_sentiment_profile = cln_data.groupby('Movie_Name_CN')['Sentiment_Score'].mean().reset_index()
# 如果使用 'Positively Rated'
movie_sentiment_profile = cln_data.groupby('Movie_Name_CN')['Positively Rated'].mean().reset_index()
movie_sentiment_profile.columns = ['Movie_Name_CN', 'Avg_Sentiment']

# 2. 基于主题的电影画像
movie_topic_profile = cln_data.groupby('Movie_Name_CN')[['Topic_{}'.format(i) for i in range(n_topics)]].mean().reset_index()

# 3. 结合情感和主题 (电影画像)
movie_profile = pd.merge(movie_sentiment_profile, movie_topic_profile, on='Movie_Name_CN', how='left')

# --- 相似度计算 ---

# 1. 用户-用户相似度 (基于用户画像)
user_features = user_profile.drop('Username', axis=1).fillna(0)  # 处理缺失值
user_similarity_matrix = cosine_similarity(user_features)
user_similarity_df = pd.DataFrame(user_similarity_matrix, index=user_profile['Username'], columns=user_profile['Username'])

# 2. 电影-电影相似度 (基于电影画像)
movie_features = movie_profile.drop('Movie_Name_CN', axis=1).fillna(0)
movie_similarity_matrix = cosine_similarity(movie_features)
movie_similarity_df = pd.DataFrame(movie_similarity_matrix, index=movie_profile['Movie_Name_CN'], columns=movie_profile['Movie_Name_CN'])

# --- 推荐生成 ---

def recommend_movies(username, user_similarity_df, movie_similarity_df, cln_data, top_n=5):
    """
    为用户推荐电影 (结合 User-based CF 和 Item-based CF)。

    Args:
        username: 目标用户名 (str)
        user_similarity_df: 用户相似度矩阵 (DataFrame)
        movie_similarity_df: 电影相似度矩阵 (DataFrame)
        cln_data: 原始数据 (DataFrame)
        top_n: 推荐数量 (int)

    Returns:
        推荐电影列表 (list)
    """

    # 1. User-based CF
    if username in user_similarity_df.index:
        similar_users = user_similarity_df.loc[username].sort_values(ascending=False)[1:top_n + 1].index
        user_based_recommendations = cln_data[cln_data['Username'].isin(similar_users)]['Movie_Name_CN'].value_counts().index[:top_n]
    else:
        user_based_recommendations = []

    # 2. Item-based CF
    if username in cln_data['Username'].values:
        user_rated_movies = cln_data[cln_data['Username'] == username]['Movie_Name_CN'].unique()
        item_based_recommendations = []
        for movie in user_rated_movies:
            if movie in movie_similarity_df.index:
                similar_movies = movie_similarity_df.loc[movie].sort_values(ascending=False)[1:top_n + 1].index
                item_based_recommendations.extend(similar_movies)
        item_based_recommendations = list(set(item_based_recommendations))[:top_n]  # 去重
    else:
        item_based_recommendations = []

    # 3. 混合推荐 (简单合并)
    recommendations = list(user_based_recommendations) + item_based_recommendations
    recommendations = list(set(recommendations))[:top_n]  # 去重并限制数量

     # 如果推荐数量不足，可以用热门电影补足
    if len(recommendations) < top_n:
        popular_movies = cln_data['Movie_Name_CN'].value_counts().index[:top_n]
        for movie in popular_movies:
            if movie not in recommendations:
                recommendations.append(movie)
            if len(recommendations) == top_n:
                break

    return recommendations

# 示例 (你需要提供一个实际存在的用户名)
recommendations = recommend_movies('一个存在的用户名', user_similarity_df, movie_similarity_df, cln_data, top_n=5)
print(f"为用户 '一个存在的用户名' 推荐的电影：{recommendations}")
```

**关键点：**

*   **确保先运行数据加载和预处理的代码块，** 这将定义 `cln_data`。
*   修改示例代码中的 `'一个存在的用户名'` 为你数据集中实际存在的用户名。

请按照这个修改后的代码重新运行，应该可以解决 `NameError` 的问题。如果还有其他问题，请随时告诉我！
