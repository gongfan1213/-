这个错误是因为 NLTK 缺少一个名为 `punkt_tab` 的资源。虽然你已经下载了 `punkt`，但看起来还需要一个相关的资源。

**解决方法：**

在你的代码中，`nltk.download('punkt')` 之后，添加一行下载 `punkt_tab` 的代码：

```python
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import re
from sklearn.feature_extraction.text import TfidfVectorizer

# 下载必要的NLTK资源（只需运行一次）
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')
nltk.download('punkt_tab')  # 添加这一行

# 加载数据
movies = pd.read_csv("./IMDB-Movie-Data.csv")

# 数据清洗函数
def clean_text(text):
    # 1. 移除标点符号和数字
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    # 2. 转换为小写
    text = text.lower()
    # 3. 分词
    words = nltk.word_tokenize(text)
    # 4. 移除停用词
    stop_words = set(stopwords.words('english'))
    words = [w for w in words if w not in stop_words]
    # 5. 词形还原
    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(w) for w in words]
    # 6. 将单词重新组合成文本
    text = ' '.join(words)
    return text

# 应用数据清洗
movies['Cleaned_Description'] = movies['Description'].apply(clean_text)

# 查看清洗后的数据（前几行）
print(movies[['Description', 'Cleaned_Description']].head())

# 特征提取：使用TF-IDF将文本转换为数值特征
tfidf_vectorizer = TfidfVectorizer(max_features=5000)  # 限制最大特征数为5000
tfidf_matrix = tfidf_vectorizer.fit_transform(movies['Cleaned_Description'])
tfidf_df = pd.DataFrame(tfidf_matrix.toarray(), columns=tfidf_vectorizer.get_feature_names_out())

# 将TF-IDF特征与原始数据合并（可选，如果需要）
movies_with_tfidf = pd.concat([movies, tfidf_df], axis=1)
```

**原因解释:**

`nltk.word_tokenize` 在某些情况下可能依赖于 `punkt_tab` 资源来进行更精细的分词。虽然 `punkt` 是主要的分词资源，但有时也需要 `punkt_tab` 来处理一些特殊情况或语言。

重新运行修改后的代码，应该就能解决这个错误了。 如果还有其他问题, 随时告诉我!
