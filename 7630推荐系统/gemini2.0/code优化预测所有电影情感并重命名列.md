好的，我已经帮你完善了代码，并添加了预测所有电影情感并重命名列的部分。由于你已经提供了运行结果，我将直接在之前的代码基础上进行修改，并解释每一步的作用：

```python
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 下载必要的NLTK资源（只需运行一次）
# nltk.download('stopwords') # 注释掉，因为你已经下载过了
# nltk.download('wordnet')
# nltk.download('omw-1.4')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('punkt')
# nltk.download('punkt_tab')

# 加载数据
movies = pd.read_csv("./IMDB-Movie-Data.csv")

# 数据清洗函数 (与之前相同)
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

# 创建示例数据（假设已经手动标注了前200条，或者你自己标注）
movies['Manual_Sentiment'] = ''
movies.loc[0:66, 'Manual_Sentiment'] = 'Positive'
movies.loc[67:132, 'Manual_Sentiment'] = 'Negative'
movies.loc[133:200, 'Manual_Sentiment'] = 'Neutral'

# 划分训练集和测试集（只使用已标注的数据）
labeled_data = movies[movies['Manual_Sentiment'] != '']
X_train, X_test, y_train, y_test = train_test_split(
    labeled_data['Cleaned_Description'],
    labeled_data['Manual_Sentiment'],
    test_size=0.2,
    random_state=42
)

# 定义一个函数来创建Pipeline和进行模型训练、评估 (与之前相同)
def train_and_evaluate_model(classifier, X_train, y_train, X_test, y_test, use_grid_search=False):

    # 创建Pipeline
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(min_df=2)),  # 添加 min_df
        ('clf', classifier),
    ])

    # 参数网格 (用于GridSearchCV)
    param_grid = {}
    if isinstance(classifier, MultinomialNB):
        param_grid = {
            'tfidf__max_features': [1000, 2000, 5000],
            'tfidf__ngram_range': [(1, 1), (1, 2)],  # 尝试不同的 n-gram 范围
            'clf__alpha': [0.1, 1.0, 10.0],
        }
    elif isinstance(classifier, LogisticRegression):
        param_grid = {
            'tfidf__max_features': [1000, 2000, 5000],
            'tfidf__ngram_range': [(1, 1), (1, 2)],
            'clf__C': [0.1, 1.0, 10.0],
            'clf__solver': ['liblinear', 'lbfgs'], #添加不同的求解器
        }
    elif isinstance(classifier, SVC):
        param_grid = {
            'tfidf__max_features': [1000, 2000, 5000],
            'tfidf__ngram_range': [(1, 1), (1, 2)],
            'clf__C': [0.1, 1.0, 10.0],
            'clf__kernel': ['linear', 'rbf'],
        }

    # 使用GridSearchCV进行参数调优（如果启用）
    if use_grid_search:
        grid_search = GridSearchCV(pipeline, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
        grid_search.fit(X_train, y_train)
        best_model = grid_search.best_estimator_
        print("Best Parameters:", grid_search.best_params_)
    else:
        best_model = pipeline.fit(X_train, y_train)

    # 交叉验证评估
    cv_scores = cross_val_score(best_model, X_train, y_train, cv=5, scoring='accuracy')
    print("Cross-Validation Accuracy Scores:", cv_scores)
    print("Mean CV Accuracy:", cv_scores.mean())

    # 在测试集上评估
    y_pred = best_model.predict(X_test)
    print("Test Set Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))
    print(confusion_matrix(y_test, y_pred))

    return best_model

# 选择并训练模型 (以朴素贝叶斯为例，你可以更换为其他模型)
#model = train_and_evaluate_model(MultinomialNB(), X_train, y_train, X_test, y_test, use_grid_search=True)
#model = train_and_evaluate_model(LogisticRegression(), X_train, y_train, X_test, y_test, use_grid_search=True)
#model = train_and_evaluate_model(SVC(), X_train, y_train, X_test, y_test, use_grid_search=True)


# 预测新文本的情感 (与之前相同)
def predict_sentiment(text, model):
    cleaned_text = clean_text(text)
    sentiment = model.predict([cleaned_text])[0]
    return sentiment

# # 示例文本 (可选，如果你想测试单个文本)
# new_text = "This movie was absolutely amazing! The acting was superb, and the plot was captivating."
# predicted_sentiment = predict_sentiment(new_text, model)
# print(f"The sentiment of the new text is: {predicted_sentiment}")

# new_text2 = "I hated this film.  It was boring and pointless"
# predicted_sentiment2 = predict_sentiment(new_text2, model)
# print(f"The sentiment of the new text is: {predicted_sentiment2}")

# 训练模型 *注意：因为你已经提供了之前的运行结果，我假设你已经训练好了一个模型。
# 如果你没有训练模型，取消下面这一行的注释，并选择一个模型进行训练*
model = train_and_evaluate_model(MultinomialNB(), X_train, y_train, X_test, y_test, use_grid_search=True)

# 使用训练好的模型预测所有电影的情感
movies['Predicted_Sentiment'] = movies['Cleaned_Description'].apply(lambda x: predict_sentiment(x, model))

# 将 'Predicted_Sentiment' 列重命名为 'Sentiment'
movies.rename(columns={'Predicted_Sentiment': 'Sentiment'}, inplace=True)

# 查看结果（可选）
print(movies[['Cleaned_Description', 'Sentiment']].head())

# 接下来你可以继续进行可视化等后续步骤，现在 'Sentiment' 列包含了所有电影的预测情感。
```

**代码修改说明：**

1.  **注释了 NLTK 资源下载:**  因为你已经下载过了，所以注释掉了这部分代码，避免重复下载。
2.  **注释/取消注释了部分代码:**
    *   注释掉了示例文本的预测，因为你主要关注的是预测所有电影的情感。
    *   取消注释了 `model = train_and_evaluate_model(...)` 这一行。**重要：** 确保你至少训练了一个模型（或者使用你之前训练好的模型）。如果你想尝试其他模型，取消注释对应的模型训练代码。
3.  **添加了预测所有电影情感的代码:**
    ```python
    movies['Predicted_Sentiment'] = movies['Cleaned_Description'].apply(lambda x: predict_sentiment(x, model))
    ```
    这行代码使用 `apply` 函数和 `predict_sentiment` 函数，对 `Cleaned_Description` 列中的每个电影描述进行情感预测，并将结果存储在新的 `Predicted_Sentiment` 列中。

4.  **重命名了列:**
    ```python
    movies.rename(columns={'Predicted_Sentiment': 'Sentiment'}, inplace=True)
    ```
    这行代码将 `Predicted_Sentiment` 列重命名为 `Sentiment`，以便与你之前的可视化代码兼容。

5.  **添加了查看结果的代码（可选）:**
    ```python
    print(movies[['Cleaned_Description', 'Sentiment']].head())
    ```
    这行代码会打印 DataFrame 的前几行，显示清洗后的描述和预测的情感。

现在，`movies` DataFrame 中的 `Sentiment` 列包含了所有电影的预测情感。你可以继续进行后续的可视化、主题挖掘等分析。
