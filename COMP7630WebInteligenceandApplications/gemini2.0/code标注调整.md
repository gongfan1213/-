好的，明白了。如果你没有手动标注数据，也没有使用之前提供的示例标注数据（即没有创建 `Manual_Sentiment` 列），那么你需要对代码进行一些调整：

1.  **移除/注释示例标注数据创建:** 删除或注释掉以下代码块：

    ```python
    # 创建示例数据（假设已经手动标注了前200条，或者你自己标注）
    movies['Manual_Sentiment'] = ''
    movies.loc[0:66, 'Manual_Sentiment'] = 'Positive'
    movies.loc[67:132, 'Manual_Sentiment'] = 'Negative'
    movies.loc[133:200, 'Manual_Sentiment'] = 'Neutral'
    ```

2.  **使用无监督学习（TextBlob）：** 由于没有标注数据，你只能使用基于词典的无监督学习方法，如 TextBlob。你需要确保 *不* 运行任何需要 `Manual_Sentiment` 列的代码（例如，`train_test_split`、模型训练等）。

3. **修改预测所有电影情感的部分**: 确保使用TextBlob进行预测

修改后的代码如下：

```python
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import re
from sklearn.feature_extraction.text import TfidfVectorizer  # 仍然需要用于主题挖掘
# from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV # 不需要
# from sklearn.naive_bayes import MultinomialNB # 不需要
# from sklearn.linear_model import LogisticRegression # 不需要
# from sklearn.svm import SVC # 不需要
# from sklearn.pipeline import Pipeline # 不需要
# from sklearn.metrics import accuracy_score, classification_report, confusion_matrix # 不需要
from textblob import TextBlob

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

# # 创建示例数据（假设已经手动标注了前200条，或者你自己标注）  <-- 注释掉或删除这部分
# movies['Manual_Sentiment'] = ''
# movies.loc[0:66, 'Manual_Sentiment'] = 'Positive'
# movies.loc[67:132, 'Manual_Sentiment'] = 'Negative'
# movies.loc[133:200, 'Manual_Sentiment'] = 'Neutral'

# # 划分训练集和测试集（只使用已标注的数据） <-- 注释掉或删除这部分
# labeled_data = movies[movies['Manual_Sentiment'] != '']
# X_train, X_test, y_train, y_test = train_test_split(
#     labeled_data['Cleaned_Description'],
#     labeled_data['Manual_Sentiment'],
#     test_size=0.2,
#     random_state=42
# )

# # 定义一个函数来创建Pipeline和进行模型训练、评估 (与之前相同) <-- 注释掉或删除这部分
# def train_and_evaluate_model(classifier, X_train, y_train, X_test, y_test, use_grid_search=False):

#     # 创建Pipeline
#     pipeline = Pipeline([
#         ('tfidf', TfidfVectorizer(min_df=2)),  # 添加 min_df
#         ('clf', classifier),
#     ])

#     # 参数网格 (用于GridSearchCV)
#     param_grid = {}
#     if isinstance(classifier, MultinomialNB):
#         param_grid = {
#             'tfidf__max_features': [1000, 2000, 5000],
#             'tfidf__ngram_range': [(1, 1), (1, 2)],  # 尝试不同的 n-gram 范围
#             'clf__alpha': [0.1, 1.0, 10.0],
#         }
#     elif isinstance(classifier, LogisticRegression):
#         param_grid = {
#             'tfidf__max_features': [1000, 2000, 5000],
#             'tfidf__ngram_range': [(1, 1), (1, 2)],
#             'clf__C': [0.1, 1.0, 10.0],
#             'clf__solver': ['liblinear', 'lbfgs'], #添加不同的求解器
#         }
#     elif isinstance(classifier, SVC):
#         param_grid = {
#             'tfidf__max_features': [1000, 2000, 5000],
#             'tfidf__ngram_range': [(1, 1), (1, 2)],
#             'clf__C': [0.1, 1.0, 10.0],
#             'clf__kernel': ['linear', 'rbf'],
#         }

#     # 使用GridSearchCV进行参数调优（如果启用）
#     if use_grid_search:
#         grid_search = GridSearchCV(pipeline, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
#         grid_search.fit(X_train, y_train)
#         best_model = grid_search.best_estimator_
#         print("Best Parameters:", grid_search.best_params_)
#     else:
#         best_model = pipeline.fit(X_train, y_train)

#     # 交叉验证评估
#     cv_scores = cross_val_score(best_model, X_train, y_train, cv=5, scoring='accuracy')
#     print("Cross-Validation Accuracy Scores:", cv_scores)
#     print("Mean CV Accuracy:", cv_scores.mean())

#     # 在测试集上评估
#     y_pred = best_model.predict(X_test)
#     print("Test Set Accuracy:", accuracy_score(y_test, y_pred))
#     print(classification_report(y_test, y_pred))
#     print(confusion_matrix(y_test, y_pred))

#     return best_model

# # 选择并训练模型 (以朴素贝叶斯为例，你可以更换为其他模型) <-- 注释掉或删除这部分
# #model = train_and_evaluate_model(MultinomialNB(), X_train, y_train, X_test, y_test, use_grid_search=True)
# #model = train_and_evaluate_model(LogisticRegression(), X_train, y_train, X_test, y_test, use_grid_search=True)
# #model = train_and_evaluate_model(SVC(), X_train, y_train, X_test, y_test, use_grid_search=True)


# 预测新文本的情感 (与之前相同) <--  注释掉, 因为我们现在要直接用 TextBlob
# def predict_sentiment(text, model):
#     cleaned_text = clean_text(text)
#     sentiment = model.predict([cleaned_text])[0]
#     return sentiment

# # 示例文本 (可选，如果你想测试单个文本) <-- 注释掉
# new_text = "This movie was absolutely amazing! The acting was superb, and the plot was captivating."
# predicted_sentiment = predict_sentiment(new_text, model)
# print(f"The sentiment of the new text is: {predicted_sentiment}")

# new_text2 = "I hated this film.  It was boring and pointless"
# predicted_sentiment2 = predict_sentiment(new_text2, model)
# print(f"The sentiment of the new text is: {predicted_sentiment2}")

# # 训练模型 *注意：因为你已经提供了之前的运行结果，我假设你已经训练好了一个模型。 <-- 注释掉
# # 如果你没有训练模型，取消下面这一行的注释，并选择一个模型进行训练*
# model = train_and_evaluate_model(MultinomialNB(), X_train, y_train, X_test, y_test, use_grid_search=True)

# 使用 TextBlob 预测所有电影的情感, 并创建Sentiment列
movies['Sentiment_Score'] = movies['Cleaned_Description'].apply(lambda text: TextBlob(text).sentiment.polarity)
movies['Sentiment'] = movies['Sentiment_Score'].apply(lambda score: 'Positive' if score > 0.1 else ('Negative' if score < -0.1 else 'Neutral'))


# # 将 'Predicted_Sentiment' 列重命名为 'Sentiment' <-- 不需要了，因为我们直接创建了 'Sentiment' 列
# movies.rename(columns={'Predicted_Sentiment': 'Sentiment'}, inplace=True)

# 查看结果（可选）
print(movies[['Cleaned_Description', 'Sentiment']].head())

# 接下来你可以继续进行可视化等后续步骤，现在 'Sentiment' 列包含了所有电影的预测情感。

```

**关键更改：**

*   **注释/删除了与监督学习相关的代码：** 由于你没有标注数据，因此无法进行监督学习。我注释掉了或删除了创建示例标注、划分训练集/测试集、定义和训练模型等相关代码。
*   **使用 TextBlob 进行情感分析：**  我使用了 TextBlob 来计算情感分数和分类情感：
    ```python
    movies['Sentiment_Score'] = movies['Cleaned_Description'].apply(lambda text: TextBlob(text).sentiment.polarity)
    movies['Sentiment'] = movies['Sentiment_Score'].apply(lambda score: 'Positive' if score > 0.1 else ('Negative' if score < -0.1 else 'Neutral'))
    ```
    这部分代码直接创建了 `'Sentiment'` 列，无需重命名。

现在，你可以使用这个修改后的代码，它会使用 TextBlob 对所有电影描述进行情感分析，并将结果存储在 `'Sentiment'` 列中。你可以继续进行后续的可视化和主题挖掘。
