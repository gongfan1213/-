这个错误提示 `LookupError: Resource vader_lexicon not found` 表明 NLTK 找不到 VADER 情感分析所需的词典文件 `vader_lexicon`。

**解决方法：**

1.  **下载 `vader_lexicon`:**

    在你的代码中，我已经包含了下载 VADER 词典的代码：

    ```python
    # 下载 VADER 词典 (如果还没有下载)
    # nltk.download('vader_lexicon')
    ```

    你需要**取消这行代码的注释** (去掉 `#`)，然后运行它。这会自动下载 `vader_lexicon` 到 NLTK 的数据目录。

    ```python
    # 下载 VADER 词典 (如果还没有下载)
    nltk.download('vader_lexicon')
    ```
运行这行代码下载完，再从新运行之后的代码即可。

**完整的代码（已包含下载vader_lexicon的部分）:**

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
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud, STOPWORDS
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# 下载 VADER 词典 (如果还没有下载)
nltk.download('vader_lexicon')

# 加载 spaCy 模型
nlp = spacy.load('en_core_web_sm')

# 加载数据和停用词列表 (与之前相同)
current_dir = '.'  # 或 IMDB-Movie-Data.csv 所在目录
data = pd.read_csv(os.path.join(current_dir, 'IMDB-Movie-Data.csv'))
stopwords_file = os.path.join(current_dir, 'stopwords.txt')

try:
    with open(stopwords_file, 'r', encoding='utf-8') as f:
        custom_stopwords = [line.strip() for line in f]
except FileNotFoundError:
    print(f"Warning: Stopwords file not found. Using NLTK's default English stopwords.")
    custom_stopwords = []

nltk_stopwords = stopwords.words('english')
custom_stopwords = list(set(custom_stopwords + nltk_stopwords))
# --- 1. 数据预处理 ---

# 1.1 缺失值处理
data.fillna("", inplace=True) #空字符串

# 1.2 文本预处理 (使用 spaCy, 并使用自定义停用词)
def preprocess_text_spacy(text, stopwords):
    doc = nlp(text)
    # 词形还原，去除标点符号和空格, 检查是否在停用词列表中
    tokens = [token.lemma_.lower() for token in doc if token.text.lower() not in stopwords and not token.is_punct and not token.is_space]
    return ' '.join(tokens)

data['Processed_Description'] = data['Description'].apply(lambda x: preprocess_text_spacy(x, custom_stopwords))

# --- 2. 情感分析 ---

# 2.1 情感极性划分 (基于 Rating)
def categorize_rating(rating):
    if rating >= 7.5:
        return 'Positive'
    elif rating >= 6.0:
        return 'Neutral'
    else:
        return 'Negative'

data['Sentiment_Category'] = data['Rating'].apply(categorize_rating)

# 2.1.1 情感极性分布 (饼图)
plt.figure(figsize=(6, 6))
data['Sentiment_Category'].value_counts().plot(kind='pie', autopct='%1.1f%%', colors=['green', 'gray', 'red'])
plt.title('Sentiment Polarity Distribution (Based on Rating)')
plt.ylabel('')
plt.show()

# 2.2 情感强度分析 (使用 VADER)
analyzer = SentimentIntensityAnalyzer()

def get_vader_score(text):
    return analyzer.polarity_scores(text)['compound']  # 使用 compound 得分

data['Vader_Score'] = data['Processed_Description'].apply(get_vader_score)

# 2.2.1 情感强度分布 (直方图)
plt.figure(figsize=(8, 6))
sns.histplot(data['Vader_Score'], bins=30, kde=True)
plt.title('Sentiment Intensity Distribution (VADER)')
plt.xlabel('VADER Compound Score')
plt.ylabel('Frequency')
plt.show()

# 2.3 情感趋势分析 (按年份)
# 2.3.1 情感极性趋势
yearly_sentiment = data.groupby('Year')['Sentiment_Category'].value_counts(normalize=True).unstack()
yearly_sentiment.plot(kind='line', figsize=(10, 6), color=['green', 'gray', 'red'])
plt.title('Sentiment Polarity Trend Over Years')
plt.xlabel('Year')
plt.ylabel('Proportion')
plt.legend(title='Sentiment')
plt.show()

# 2.3.2 情感强度趋势
yearly_vader = data.groupby('Year')['Vader_Score'].mean()
yearly_vader.plot(kind='line', figsize=(10, 6))
plt.title('Sentiment Intensity Trend Over Years (VADER)')
plt.xlabel('Year')
plt.ylabel('Average VADER Score')
plt.show()

# 2.4 不同电影的情感对比
movie_sentiment = data.groupby('Title')['Vader_Score'].mean().sort_values(ascending=False)

# 2.4.1 情感最积极的电影
print("\nTop 10 Most Positive Movies (Based on VADER Score):")
print(movie_sentiment.head(10))

# 2.4.2 情感最消极的电影
print("\nTop 10 Most Negative Movies (Based on VADER Score):")
print(movie_sentiment.tail(10))

# 2.5 情感词云
# 2.5.1 正面情感词云
positive_text = ' '.join(data[data['Sentiment_Category'] == 'Positive']['Processed_Description'])
wordcloud_positive = WordCloud(width=800, height=400, background_color='white', stopwords=STOPWORDS).generate(positive_text)

plt.figure(figsize=(10, 5))
plt.imshow(wordcloud_positive, interpolation='bilinear')
plt.axis('off')
plt.title('Positive Sentiment Word Cloud')
plt.show()

# 2.5.2 负面情感词云
negative_text = ' '.join(data[data['Sentiment_Category'] == 'Negative']['Processed_Description'])
wordcloud_negative = WordCloud(width=800, height=400, background_color='white', stopwords=STOPWORDS).generate(negative_text)

plt.figure(figsize=(10, 5))
plt.imshow(wordcloud_negative, interpolation='bilinear')
plt.axis('off')
plt.title('Negative Sentiment Word Cloud')
plt.show()
```

**总结：**

确保取消 `nltk.download('vader_lexicon')` 的注释并运行它。这应该是解决 `LookupError` 的最直接方法。如果问题仍然存在，请检查你的网络连接是否正常，或者尝试手动下载 `vader_lexicon` 文件并将其放置到 NLTK 搜索路径中的某个位置。
