好的，我将在之前的无监督学习 (TextBlob) 代码基础上，添加情感分析和主题挖掘的可视化部分。

```python
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from textblob import TextBlob
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud
from sklearn.decomposition import LatentDirichletAllocation

# 下载必要的NLTK资源 (如果你已经下载过了，可以注释掉)
# nltk.download('stopwords')
# nltk.download('wordnet')
# nltk.download('omw-1.4')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('punkt')
# nltk.download('punkt_tab')

# 加载数据
movies = pd.read_csv("./IMDB-Movie-Data.csv")

# 数据清洗函数
def clean_text(text):
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    text = text.lower()
    words = nltk.word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    words = [w for w in words if w not in stop_words]
    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(w) for w in words]
    text = ' '.join(words)
    return text

# 应用数据清洗
movies['Cleaned_Description'] = movies['Description'].apply(clean_text)

# 使用 TextBlob 进行情感分析
movies['Sentiment_Score'] = movies['Cleaned_Description'].apply(lambda text: TextBlob(text).sentiment.polarity)
movies['Sentiment'] = movies['Sentiment_Score'].apply(lambda score: 'Positive' if score > 0.1 else ('Negative' if score < -0.1 else 'Neutral'))

# --- 可视化 (情感分析) ---
plt.figure(figsize=(8, 6))
sns.countplot(data=movies, x='Sentiment', order=['Positive', 'Neutral', 'Negative'])
plt.title('Distribution of Sentiments')
plt.xlabel('Sentiment Category')
plt.ylabel('Number of Movies')
plt.show()

# 可以根据需要添加其他情感分析可视化，例如：
# - 箱线图 (boxplot) 显示不同年份电影的情感得分分布
# - 密度图 (kdeplot) 显示情感得分的分布情况


# --- 主题挖掘 ---
tfidf_vectorizer = TfidfVectorizer(max_features=5000, min_df=2)  # 限制最大特征数为5000, 并且至少在2个文档出现
tfidf_matrix = tfidf_vectorizer.fit_transform(movies['Cleaned_Description'])

n_topics = 5  # 设置主题数量
lda = LatentDirichletAllocation(n_components=n_topics, random_state=42)
lda.fit(tfidf_matrix)

# 显示每个主题的关键词 (带边界检查)
def display_topics(model, feature_names, no_top_words):
    for topic_idx, topic in enumerate(model.components_):
        print("Topic %d:" % (topic_idx))
        top_word_indices = topic.argsort()[:-no_top_words - 1:-1]
        valid_indices = [i for i in top_word_indices if i < len(feature_names)]
        print(" ".join([feature_names[i] for i in valid_indices]))

no_top_words = 10
display_topics(lda, tfidf_vectorizer.get_feature_names_out(), no_top_words)

# 将主题分配给每个文档
topic_assignments = lda.transform(tfidf_matrix)
movies['Dominant_Topic'] = topic_assignments.argmax(axis=1)

# --- 可视化 (主题挖掘) ---

# 1. 词云
for topic_idx in range(n_topics):
    topic_words = " ".join([tfidf_vectorizer.get_feature_names_out()[i] for i in lda.components_[topic_idx].argsort()[:-no_top_words - 1:-1]])
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(topic_words)
    plt.figure(figsize=(8, 6))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.title(f'Topic {topic_idx}')
    plt.show()

# 2. 主题分布条形图
topic_counts = movies['Dominant_Topic'].value_counts().sort_index()
plt.figure(figsize=(10, 6))
sns.barplot(x=topic_counts.index, y=topic_counts.values)
plt.title('Distribution of Topics')
plt.xlabel('Topic Number')
plt.ylabel('Number of Movies')
plt.show()

# 3. (可选) pyLDAvis 交互式可视化
# import pyLDAvis.sklearn
# pyLDAvis.enable_notebook()
# vis = pyLDAvis.sklearn.prepare(lda, tfidf_matrix, tfidf_vectorizer)
# pyLDAvis.display(vis)  # 或者 pyLDAvis.save_html(vis, 'lda.html')
```

**代码解释:**

1.  **情感分析可视化:**
    *   `sns.countplot`:  创建一个计数图，显示不同情感类别（Positive, Neutral, Negative）的电影数量。`order` 参数确保了类别的顺序。

2.  **主题挖掘可视化:**
    *   **词云 (WordCloud):**  为每个主题生成一个词云，显示该主题中最重要的关键词。
    *   **主题分布条形图:**  显示每个主题在整个数据集中出现的次数。
    *   **pyLDAvis (可选):**  如果你安装了 `pyLDAvis` 库，可以使用它来创建交互式的主题模型可视化。这可以帮助你更好地理解主题之间的关系和主题内部的关键词分布。

**运行结果:**

这段代码将生成以下可视化结果：

*   一个情感分布计数图。
*   每个主题的词云。
*   一个主题分布条形图。
*   (可选) 一个 pyLDAvis 交互式可视化 (如果你取消了注释并安装了 `pyLDAvis`)。

这些可视化结果将帮助你理解电影评论的情感倾向和主要讨论的主题。
