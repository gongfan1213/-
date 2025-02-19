你的推荐系统已经有了不错的基础，但从结果来看，推荐的电影在类型上比较集中（大部分是科幻、动作、冒险类），这可能是因为这些类型在数据集中占比较高，或者特征权重设置得不够合理。为了进一步优化推荐结果，并满足老师作业的要求，我们可以从以下几个方面入手：

**1. 优化特征权重和相似度计算:**

*   **更细粒度的类型相似度:**
    *   当前使用 `get_dummies` 进行多标签编码，所有类型都被同等对待。
    *   可以尝试计算类型之间的相似度 (例如，使用 Jaccard 相似度或基于电影描述的语义相似度)，然后根据类型相似度来调整 `genre_sim`。
*   **导演和演员相似度:**
    *   当前使用独热编码，只能表示是否是同一个导演/演员。
    *   可以尝试计算导演/演员之间的相似度 (例如，基于他们合作过的电影、电影类型等)。
*   **年份相似度:**
    *   当前使用分箱后的独热编码。
    *   可以尝试更平滑的相似度计算方式，例如，年份差的倒数或高斯函数。
*   **评分、投票数、票房相似度:**
    *   当前使用差值的绝对值的补数。
    *    可以根据数据的分布情况，使用更合适的相似度度量方式，或者进行更精细的分箱。
*   **动态权重调整:**
    *   可以根据用户的历史行为或偏好，动态调整特征权重。例如，如果用户更喜欢某个导演的电影，可以提高导演特征的权重。

**2. 引入主题模型 (LDA):**

*   你已经在之前的代码中实现了主题模型，但没有将其应用到推荐系统中。
*   可以将电影的主题分布作为特征，计算电影之间的主题相似度，并将其纳入加权相似度计算中。

**3. 多样性 (Diversity):**

*   当前的推荐结果可能过于相似，缺乏多样性。
*   可以尝试以下方法来提高多样性：
    *   **最大边缘相关性 (Maximal Marginal Relevance, MMR):** 在选择推荐电影时，不仅考虑相似度，还考虑与已选电影的差异性。
    *   **基于聚类的多样化:** 将电影聚类，然后从不同的聚类中选择电影。
    *   **惩罚热门电影:** 对热门电影的相似度分数进行惩罚，以鼓励推荐不太热门但可能相关的电影。

**4. 冷启动问题:**

*   对于新电影，由于缺乏足够的信息 (如描述、评分、投票等)，推荐效果可能不佳。
*   可以考虑以下方法来解决冷启动问题：
    *   **使用电影的外部信息:** 例如，从 IMDb 或其他电影数据库中获取更详细的电影信息。
    *   **基于内容的推荐:** 对于新电影，可以更多地依赖其内容特征 (如类型、导演、演员) 进行推荐。
    *   **探索与利用 (Exploration & Exploitation):** 在推荐时，以一定概率随机推荐一些新电影 (探索)，以收集更多关于这些电影的信息。

**5. 评估指标 (更严格的评估):**

*   由于缺乏用户评分数据，难以进行精确的定量评估。
*   可以尝试以下方法进行更严格的评估：
    *   **人工评估:** 邀请多人对推荐结果进行评估，判断推荐电影是否相关、多样、新颖等。
    *   **基于相似电影的评估:** 如果有已知的相似电影集合 (例如，同一系列电影、同一导演的电影等)，可以评估推荐系统能否将这些相似电影排在靠前的位置。
    *   **A/B 测试:** 如果有条件，可以进行 A/B 测试，比较不同推荐算法的效果。

**代码修改 (示例 - 引入主题模型和 MMR):**

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
import os
from sklearn.decomposition import LatentDirichletAllocation

# (数据加载、预处理、特征工程等部分与之前相同, 此处省略)
# ...

# --- 2. 加权混合推荐 (引入主题模型和 MMR) ---
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

# 2.1 TF-IDF
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=5000)
tfidf_matrix = tfidf_vectorizer.fit_transform(data['Processed_Description'])


# 2.2 主题模型 (LDA)
n_topics = 10  # 设置主题数量
lda = LatentDirichletAllocation(n_components=n_topics, random_state=42)
topic_dist = lda.fit_transform(tfidf_matrix)  # 电影的主题分布
topic_feature_names = [f'Topic_{i}' for i in range(n_topics)]
topic_df = pd.DataFrame(topic_dist, columns=topic_feature_names)
data = pd.concat([data.reset_index(drop=True), topic_df.reset_index(drop=True)], axis=1) #避免index不一致

# 2.3 设置特征权重 (包括主题特征)
weights = {
    'tfidf': 0.3,
    'genre': 0.15,
    'director': 0.1,
    'actors': 0.05,
    'year': 0.05,
    'rating': 0.05,
    'votes': 0.025,
    'revenue': 0.025,
    'topic': 0.25,  # 主题特征的权重
}

# 2.4 加权相似度计算函数 (包括主题相似度)
def weighted_similarity(movie_index, tfidf_matrix, genre_dummies, director_dummies, actor_dummies, year_dummies, rating, votes, revenue, topic_df, weights):
    tfidf_sim = cosine_similarity(tfidf_matrix[movie_index], tfidf_matrix).flatten()
    genre_sim = cosine_similarity(genre_dummies.iloc[movie_index].values.reshape(1, -1), genre_dummies).flatten()
    director_sim = cosine_similarity(director_dummies.iloc[movie_index].values.reshape(1, -1), director_dummies).flatten() if not director_dummies.empty else np.zeros(tfidf_matrix.shape[0])
    actor_sim = cosine_similarity(actor_dummies.iloc[movie_index].values.reshape(1, -1), actor_dummies).flatten() if not actor_dummies.empty else np.zeros(tfidf_matrix.shape[0])
    year_sim = cosine_similarity(year_dummies.iloc[movie_index].values.reshape(1, -1), year_dummies).flatten() if not year_dummies.empty else np.zeros(tfidf_matrix.shape[0])
    rating_sim = 1 - abs(rating.iloc[movie_index] - rating)
    votes_sim = 1 - abs(votes.iloc[movie_index] - votes)
    revenue_sim = 1 - abs(revenue.iloc[movie_index] - revenue)

    # 计算主题相似度
    topic_cols = [f'Topic_{i}' for i in range(n_topics)]
    topic_sim = cosine_similarity(topic_df[topic_cols].iloc[movie_index].values.reshape(1, -1), topic_df[topic_cols]).flatten()

    total_similarity = (
        weights['tfidf'] * tfidf_sim +
        weights['genre'] * genre_sim +
        weights['director'] * director_sim +
        weights['actors'] * actor_sim +
        weights['year'] * year_sim +
        weights['rating'] * rating_sim +
        weights['votes'] * votes_sim +
        weights['revenue'] * revenue_sim +
        weights['topic'] * topic_sim  # 加入主题相似度
    )
    return total_similarity

# 2.5 最大边缘相关性 (MMR)
def mmr(query_similarity, item_similarities, lambda_val=0.5, top_n=10):
    """
    最大边缘相关性 (MMR) 实现。

    Args:
        query_similarity: 查询与所有项目的相似度列表 (list or numpy.ndarray)
        item_similarities: 项目之间的相似度矩阵 (numpy.ndarray)
        lambda_val:  MMR 中的 lambda 参数，控制相关性和多样性的平衡 (0 <= lambda_val <= 1)
        top_n:  选择的推荐数量

    Returns:
        MMR 选择的项目的索引列表 (list)
    """

    selected_indices = []
    unselected_indices = list(range(len(query_similarity)))

    while len(selected_indices) < top_n and unselected_indices:
        mmr_scores = {}
        for i in unselected_indices:
            if not selected_indices:
                # 第一个item，直接根据query_similarity选择
                mmr_scores[i] = query_similarity[i]
            else:
                # 计算 item 与已选 items 的最大相似度
                max_sim_to_selected = max(item_similarities[i, selected_indices])
                mmr_scores[i] = lambda_val * query_similarity[i] - (1 - lambda_val) * max_sim_to_selected

        # 选择 MMR 分数最高的 item
        best_index = max(mmr_scores, key=mmr_scores.get)
        selected_indices.append(best_index)
        unselected_indices.remove(best_index)

    return selected_indices

# 2.6 推荐函数 (使用 MMR)
def recommend_movies_mmr(title, data, tfidf_matrix, genre_dummies, director_dummies, actor_dummies, year_dummies, topic_df, weights, lambda_val=0.5, top_n=10):

    idx = data[data['Title'] == title].index[0]

    # 计算加权相似度 (作为 query_similarity)
    query_similarity = weighted_similarity(
        idx,
        tfidf_matrix,
        genre_dummies,
        director_dummies,
        actor_dummies,
        year_dummies,
        data['Rating'],
        data['Votes'],
        data['Revenue (Millions)'],
        topic_df,
        weights
    )

    # 计算电影之间的相似度 (item_similarities) - 使用加权相似度
    item_similarities = np.zeros((len(data), len(data)))
    for i in range(len(data)):
        item_similarities[i, :] = weighted_similarity(
            i,
            tfidf_matrix,
            genre_dummies,
            director_dummies,
            actor_dummies,
            year_dummies,
            data['Rating'],
            data['Votes'],
            data['Revenue (Millions)'],
            topic_df,
            weights
        )

    # 使用 MMR 选择推荐电影
    selected_indices = mmr(query_similarity, item_similarities, lambda_val=lambda_val, top_n=top_n)

    return data['Title'].iloc[selected_indices].tolist()

# --- 3. 推荐示例 ---
recommendations = recommend_movies_mmr('Guardians of the Galaxy', data, tfidf_matrix, genre_dummies, director_dummies, actor_dummies, year_dummies, topic_df, weights, lambda_val=0.7)
print(f"为喜欢 'Guardians of the Galaxy' 的用户推荐的电影：{recommendations}")

# --- 4. 评估 (定性) ---
print("\n推荐电影的详细信息：")
print(data[data['Title'].isin(recommendations)][['Title', 'Genre', 'Director', 'Actors', 'Year', 'Rating']])
```

**代码主要修改：**

1.  **引入主题模型:**
    *   使用 `LatentDirichletAllocation` 进行主题模型分析。
    *   将电影的主题分布添加到 `data` DataFrame 中。
    *   在 `weights` 字典中为主题特征 (`topic`) 设置权重。
    *   在 `weighted_similarity` 函数中计算主题相似度，并将其纳入加权总相似度。

2.  **MMR 实现:**
    *   实现了 `mmr` 函数，根据 MMR 算法选择推荐电影。
    *   `mmr` 函数的参数：
        *   `query_similarity`: 查询电影 (目标电影) 与所有电影的相似度列表。
        *   `item_similarities`: 所有电影之间的相似度矩阵。
        *   `lambda_val`: MMR 中的 lambda 参数，控制相关性 (relevance) 和多样性 (diversity) 的平衡。`lambda_val` 越大，越强调相关性；`lambda_val` 越小，越强调多样性。
        *   `top_n`: 推荐数量。

3.  **推荐函数 (使用 MMR):**
    *   `recommend_movies_mmr` 函数：
        *   首先计算目标电影与其他所有电影的加权相似度 (`query_similarity`)。
        *   然后计算所有电影之间的加权相似度 (`item_similarities`)。
        *   最后调用 `mmr` 函数，根据 `query_similarity` 和 `item_similarities` 选择推荐电影。

**代码运行结果及分析:**

*   由于引入了主题模型和MMR，并调整了特征权重，运行结果很可能与之前不同。
*   你可以观察推荐电影的类型、导演、演员、年份、评分以及主题分布，看看推荐结果是否更相关、更多样。
*   调整`lambda_val`的值可以控制推荐结果的多样性。

**进一步优化方向：**

*   **超参数调整:** 调整 LDA 的主题数量 (`n_topics`)、MMR 的 `lambda_val`、以及特征权重，以找到最佳的推荐效果。
*   **更高级的主题模型:** 可以尝试其他主题模型，如非负矩阵分解 (NMF)、分层狄利克雷过程 (HDP) 等。
*   **更精细的相似度计算:** 可以尝试更复杂的相似度计算方法，如基于图的相似度、基于知识图谱的相似度等。
*   **引入用户反馈:** 如果有用户对电影的评分、点击、收藏等数据，可以将其纳入推荐模型中，实现个性化推荐。
*   **A/B 测试:** 如果有条件，可以进行 A/B 测试，比较不同推荐算法的效果。
* **增加电影年份的权重**： 或许年代相近的电影，人们也会喜欢。
