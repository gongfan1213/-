好的，针对 `IMDB-Movie-Data.csv` 数据集进行情感分析，我将在之前代码的基础上，添加以下功能：

1.  **情感极性分布:**
    *   基于 `Rating` 列，将评分划分为正面、中性、负面三类。
    *   统计各类别的数量，并绘制饼图或柱状图。

2.  **情感强度分析:**
    *   使用 VADER (Valence Aware Dictionary and sEntiment Reasoner) 情感词典。VADER 是一个简单易用且效果不错的情感分析工具，特别适用于社交媒体文本。
    *   计算电影描述 (`Processed_Description` 列) 的情感强度得分。

3.  **情感趋势分析:**
    *   按年份 (Year) 分析情感极性和情感强度的变化趋势。

4.  **不同电影的情感对比:**
    *   计算每部电影的平均情感强度得分。
    *   对比不同电影的情感分布。

5.  **绘制情感词云:**
    *   分别生成正面情感和负面情感的词云。

**代码实现 (基于 VADER):**

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
# nltk.download('vader_lexicon')

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

**代码解释:**

1.  **情感极性划分:**
    *   `categorize_rating` 函数根据 `Rating` 将电影划分为正面、中性、负面。
    *   使用 `value_counts().plot(kind='pie')` 绘制饼图。

2.  **情感强度分析 (VADER):**
    *   创建 `SentimentIntensityAnalyzer` 对象。
    *   `get_vader_score` 函数使用 `analyzer.polarity_scores()` 计算 VADER 的 `compound` 得分 (综合情感得分，范围从 -1 到 1)。
    *   使用 `sns.histplot` 绘制情感强度分布直方图。

3.  **情感趋势分析:**
    *   按年份 (`Year`) 分组，计算情感极性比例的变化趋势。
    *   按年份分组，计算平均 VADER 得分的变化趋势。
    *   使用 `plot(kind='line')` 绘制折线图。

4.  **不同电影的情感对比:**
    *   按电影标题 (`Title`) 分组，计算平均 VADER 得分。
    *   使用 `sort_values()` 对电影进行排序，并打印情感最积极和最消极的电影。

5.  **情感词云:**
    *   分别从正面和负面情感的电影描述中提取文本。
    *   使用 `WordCloud` 生成词云，并使用 `imshow` 显示。

**代码运行结果:**

*   会生成情感极性分布饼图、情感强度分布直方图、情感趋势折线图、情感最积极/消极的电影列表，以及正面/负面情感词云。

**改进和注意事项:**

*   **VADER 词典:** VADER 更适合社交媒体文本，对于电影描述，可以尝试其他情感词典 (如 SentiWordNet、AFINN)，或者使用更专业的电影评论情感词典。
*   **情感极性划分阈值:** 可以根据 `Rating` 的分布情况，调整情感极性划分的阈值。
*   **情感趋势分析:** 可以按月、季度等更细粒度的时间单位分析情感趋势。
*   **情感对比:** 可以绘制更丰富的图表来对比不同电影的情感分布 (如箱线图、小提琴图)。
*   **停用词:** 对于情感词云，你可能需要根据实际情况调整停用词列表，以避免一些常见但无情感意义的词语出现在词云中。
*   **词云形状:** 你可以使用 `mask` 参数来指定词云的形状。

通过以上代码，你已经完成了情感分析的核心部分，可以根据需要进一步调整和优化。
