这个错误 `KeyError: 'Sentiment'` 表明在你的 `movies` DataFrame 中找不到名为 'Sentiment' 的列。

**问题原因：**

你在进行情感分析时，计算了 `Sentiment_Score` 和 `Sentiment` 列，但可能：

1.  **没有运行情感分析的代码块：** 你可能跳过了计算 'Sentiment' 列的代码，或者在运行可视化代码之前，重新启动了内核，导致 'Sentiment' 列没有被创建。
2.  **'Sentiment' 列名拼写错误：** 检查一下你在情感分析代码中创建 'Sentiment' 列时，列名是否正确。注意大小写。
3. **运行了基于机器学习的方法但是没有'Manual_Sentiment'列的数据：** 如果你选择运行机器学习方法，并且注释掉了创建示例`Manual_Sentiment`的代码，而且没有手动创建，那么`labeled_data`将会是空的，后续基于`labeled_data`的代码都不会执行，也就不会有'Sentiment'相关的内容。

**解决方法：**

1.  **确保运行情感分析代码：** 在运行可视化代码之前，确保你已经运行了创建 'Sentiment' 列的所有代码。
    *   如果你使用基于 TextBlob 的方法，确保运行了以下代码：

        ```python
        from textblob import TextBlob

        # 方法1：基于TextBlob的情感分析
        movies['Sentiment_Score'] = movies['Cleaned_Description'].apply(lambda text: TextBlob(text).sentiment.polarity)
        movies['Sentiment'] = movies['Sentiment_Score'].apply(lambda score: 'Positive' if score > 0.1 else ('Negative' if score < -0.1 else 'Neutral'))

        print(movies[['Cleaned_Description', 'Sentiment_Score', 'Sentiment']].head())
        ```

    *   如果你使用基于机器学习的方法，确保：
        1.  你已经手动标注了 `Manual_Sentiment` 列（或者取消了那部分代码的注释，让它创建示例数据）。
        2.  你已经运行了机器学习模型训练和预测的代码。
        3.  如果你想用机器学习模型预测 *所有* 电影的情感（而不仅仅是测试集），确保取消了这部分代码的注释：

            ```python
            # 使用训练好的模型预测所有电影的情感（可选）
            all_tfidf = tfidf_vectorizer.transform(movies['Cleaned_Description'])
            movies['Predicted_Sentiment'] = nb_classifier.predict(all_tfidf)

            # 然后，你需要将 'Predicted_Sentiment' 重命名为 'Sentiment'，以便可视化代码可以找到它：
            movies.rename(columns={'Predicted_Sentiment': 'Sentiment'}, inplace=True)
            ```

2.  **检查列名拼写：** 确保在可视化代码中引用的 'Sentiment' 列名与你在情感分析代码中创建的列名完全一致（包括大小写）。

3. **（如果使用了机器学习方法）打印 `movies.columns`：** 在可视化代码之前，添加一行 `print(movies.columns)` 来查看 DataFrame 中所有可用的列名，确保 'Sentiment' 或 'Predicted_Sentiment' 存在。

**修改后的可视化代码（示例，假设你使用了TextBlob方法）:**

```python
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud
from textblob import TextBlob

# 确保运行情感分析代码
movies['Sentiment_Score'] = movies['Cleaned_Description'].apply(lambda text: TextBlob(text).sentiment.polarity)
movies['Sentiment'] = movies['Sentiment_Score'].apply(lambda score: 'Positive' if score > 0.1 else ('Negative' if score < -0.1 else 'Neutral'))

# 情感分析可视化
sentiment_counts = movies['Sentiment'].value_counts()  # 确保这里的列名正确
plt.figure(figsize=(8, 6))
sns.barplot(x=sentiment_counts.index, y=sentiment_counts.values)
plt.title('Sentiment Distribution')
plt.xlabel('Sentiment')
plt.ylabel('Number of Movies')
plt.show()

# 主题挖掘可视化（词云） - 这部分代码应该没有问题，但为了完整性，也放在这里
for topic_idx in range(n_topics):
    topic_words = " ".join([tfidf_vectorizer.get_feature_names_out()[i] for i in lda.components_[topic_idx].argsort()[:-no_top_words - 1:-1]])
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(topic_words)
    plt.figure(figsize=(8, 6))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.title(f'Topic {topic_idx}')
    plt.show()
```

按照上述步骤检查并修改你的代码后，可视化部分应该就能正常工作了。如果仍然有问题，请提供你完整的情感分析和可视化代码，我可以帮你更具体地定位问题。
