好的，为了在 `IMDB-Movie-Data.csv` 数据集上进行关联规则挖掘，分析哪些词语经常一起出现，我们可以使用 Apriori 算法。由于这个数据集主要是电影的元数据，关联规则挖掘主要针对以下几个方面：

1.  **电影描述 (Description):** 分析电影描述中哪些词语经常一起出现。
2.  **电影类型 (Genre):** 分析哪些电影类型经常同时出现。
3.  **导演 (Director) 和演员 (Actors):** 分析哪些导演和演员经常合作。

**实现步骤:**

1.  **数据准备:**
    *   对于电影描述，需要进行分词和预处理 (与之前相同)。
    *   对于电影类型，需要将多个类型拆分成单独的项。
    *   对于导演和演员，可以将它们视为一个整体，也可以分别处理。

2.  **使用 Apriori 算法:**
    *   使用 `mlxtend` 库中的 `apriori` 和 `association_rules` 函数。
    *   `apriori` 函数用于找出频繁项集。
    *   `association_rules` 函数用于生成关联规则。

3.  **结果解读:**
    *   关注关联规则的支持度 (support)、置信度 (confidence) 和提升度 (lift)。
    *   支持度表示规则出现的频率。
    *   置信度表示规则的准确性 (如果 A 出现，那么 B 出现的概率)。
    *   提升度表示 A 的出现对 B 出现的概率的提升程度 (大于 1 表示正相关，小于 1 表示负相关)。

**代码实现:**

```python
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
import re
import spacy
from nltk.corpus import stopwords
import os

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

# 1.1 缺失值处理（如果需要）
data.fillna("", inplace=True) # 使用空字符串填充

# 1.2 文本预处理 (针对 Description)
def preprocess_text_spacy(text, stopwords):
    doc = nlp(text)
    tokens = [token.lemma_.lower() for token in doc if token.text.lower() not in stopwords and not token.is_punct and not token.is_space]
    return tokens  # 返回分词后的列表

data['Processed_Description'] = data['Description'].apply(lambda x: preprocess_text_spacy(x, custom_stopwords))

# --- 2. 关联规则挖掘 ---

# 2.1 电影描述中的关联规则
te = TransactionEncoder()
te_ary = te.fit(data['Processed_Description']).transform(data['Processed_Description'])
df_desc = pd.DataFrame(te_ary, columns=te.columns_)

# 使用 Apriori 算法找出频繁项集
frequent_itemsets_desc = apriori(df_desc, min_support=0.02, use_colnames=True)  # 调整 min_support

# 生成关联规则
rules_desc = association_rules(frequent_itemsets_desc, metric="confidence", min_threshold=0.1)  # 调整 min_threshold

print("电影描述中的关联规则:")
print(rules_desc[['antecedents', 'consequents', 'support', 'confidence', 'lift']])

# 2.2 电影类型中的关联规则
# 将 Genre 列拆分成列表
data['Genre_List'] = data['Genre'].apply(lambda x: x.split(','))
te = TransactionEncoder()
te_ary = te.fit(data['Genre_List']).transform(data['Genre_List'])
df_genre = pd.DataFrame(te_ary, columns=te.columns_)

frequent_itemsets_genre = apriori(df_genre, min_support=0.1, use_colnames=True)
rules_genre = association_rules(frequent_itemsets_genre, metric="confidence", min_threshold=0.3)
print("\n电影类型中的关联规则:")
print(rules_genre[['antecedents', 'consequents', 'support', 'confidence', 'lift']])

# 2.3 导演和演员的关联规则
# 将导演和演员合并为一个列表
data['Director_Actors_List'] = data.apply(lambda row: [row['Director']] + row['Actors'].split(','), axis=1)
te = TransactionEncoder()
te_ary = te.fit(data['Director_Actors_List']).transform(data['Director_Actors_List'])
df_da = pd.DataFrame(te_ary, columns=te.columns_)

frequent_itemsets_da = apriori(df_da, min_support=0.01, use_colnames=True) # 可以根据需要调整支持度
rules_da = association_rules(frequent_itemsets_da, metric="confidence", min_threshold=0.1)

print("\n导演和演员的关联规则:")
print(rules_da[['antecedents', 'consequents', 'support', 'confidence', 'lift']])
```

**代码解释:**

1.  **数据预处理:**
    *   对 `Description` 列进行分词和预处理，并将结果存储为列表 (每个电影对应一个词语列表)。
    *    使用`fillna("")`，用空字符串来填充缺失值。
    *   将 `Genre` 列拆分为列表 (每个电影对应一个类型列表)。
    *   将 `Director` 和 `Actors` 合并为一个列表 (每个电影对应一个包含导演和演员的列表)。

2.  **关联规则挖掘:**
    *   对于每个方面 (描述、类型、导演和演员)：
        *   使用 `TransactionEncoder` 将数据转换为 Apriori 算法所需的格式 (one-hot 编码)。
        *   使用 `apriori` 函数找出频繁项集，并设置 `min_support` 参数 (最小支持度)。
        *   使用 `association_rules` 函数生成关联规则，并设置 `metric` (用于筛选规则的指标) 和 `min_threshold` (指标的最小阈值)。
        *   打印关联规则 (前因、后果、支持度、置信度、提升度)。

**如何解读结果:**

*   **支持度 (support):** 规则出现的频率。例如，支持度为 0.05 表示该规则在 5% 的交易中出现。
*   **置信度 (confidence):** 规则的准确性。例如，置信度为 0.8 表示如果前因出现，则后果有 80% 的概率出现。
*   **提升度 (lift):** 前因的出现对后果出现的概率的提升程度。
    *   lift > 1: 正相关 (前因的出现会增加后果出现的概率)。
    *   lift = 1: 无关 (前因的出现对后果出现的概率没有影响)。
    *   lift < 1: 负相关 (前因的出现会减少后果出现的概率)。

**根据结果，你可以发现：**

*   电影描述中经常一起出现的词语 (例如，"action" 和 "adventure")。
*   经常同时出现的电影类型 (例如，"Action" 和 "Adventure")。
*   经常合作的导演和演员。

**你可以根据需要调整 `min_support` 和 `min_threshold` 参数，以获得更合适的关联规则。** 支持度越低，可以发现更多潜在的关联规则，但其中可能包含一些偶然的或不重要的规则。置信度越高，规则的准确性越高，但可能会错过一些支持度较低但可能有意义的规则。
