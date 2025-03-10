下面给出一个完整的 Google Colab Notebook 示例代码，涵盖了作业 A 的所有要求。请确保你已将数据集解压后上传到你的云端硬盘中，并且路径为  
```
/content/drive/MyDrive/dataset/dataset
```  
（即点击云端硬盘中的“dataset”，再点击“dataset”，进入包含五个子文件夹：cakes, chocolate_bars, cookies, soft_drinks, teas）。同时，本代码使用了 nltk、sentence-transformers、scikit-learn、wikipedia 等库，如有需要可先运行 pip install 命令安装相关依赖。

请将下面代码复制到 Colab Notebook 中运行，代码中已详细注释了各部分对应题号，并且学号已更新为 24439169。

---

```python
# ================================
# Notebook for COMP7630 Assignment A:
# Text Vectorization, Classification & Clustering
# 学号：24439169
# ================================

# ---- 预先安装所需库（如果已安装可注释掉） ----
!pip install -q sentence-transformers wikipedia nltk

# ---- 挂载 Google Drive（数据集存储在云端硬盘）----
from google.colab import drive
drive.mount('/content/drive')

# ---- 导入常用库 ----
import os
import glob
import numpy as np
import matplotlib.pyplot as plt
import zipfile

# 设置随机种子，按照题目要求
student_id = 24439169  # 替换为你的学号
np.random.seed(student_id)

# ---- 下载 nltk 数据（句子分割用）----
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

# ---- 加载 SentenceTransformer 模型 ----
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')

# ================================
# Q1: Load Data and Compute Text Embeddings
# ================================

# 数据集路径：假设解压后在云盘中路径为 /content/drive/MyDrive/dataset/dataset
# 数据集目录结构为：cakes, chocolate_bars, cookies, soft_drinks, teas 各文件夹中包含若干 txt 文件
data_dir = "/content/drive/MyDrive/dataset/dataset"

# 定义函数：计算文本的加权句子嵌入
def compute_text_embedding(text, max_sentences=10):
    """
    对输入文本进行句子分割，取前10句（或不足10句则全部）。
    对前5句赋予权重3，其余句子赋予权重1，
    计算加权平均后的句子嵌入。
    """
    sentences = sent_tokenize(text)
    selected = sentences[:max_sentences]
    # 权重设置：前5句权重为3，其余权重为1
    weights = [3 if i < 5 else 1 for i in range(len(selected))]
    # 计算各句子的嵌入
    embeddings = model.encode(selected)
    weights = np.array(weights).reshape(-1, 1)
    weighted_avg = np.sum(embeddings * weights, axis=0) / np.sum(weights)
    return weighted_avg

# 初始化存储列表
X_vectors = []   # 存储文本向量
y_labels = []    # 存储类别标签
titles = []      # 存储文本标题（文件第一行）
file_paths = []  # 存储文件路径（可用于后续调试）

# 数据集目录中各类别名称（文件夹名需与实际保持一致）
categories = ['cakes', 'chocolate_bars', 'cookies', 'soft_drinks', 'teas']

# 遍历每个类别目录，读取所有文本文件
for label in categories:
    folder = os.path.join(data_dir, label)
    for filepath in glob.glob(os.path.join(folder, '*.txt')):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                if not lines:
                    continue
                # 第一行作为标题
                title = lines[0].strip()
                # 剩余内容作为文本正文
                content = ' '.join([line.strip() for line in lines])
                vec = compute_text_embedding(content)
                X_vectors.append(vec)
                y_labels.append(label)
                titles.append(title)
                file_paths.append(filepath)
        except Exception as e:
            print(f"Error processing {filepath}: {e}")

# 转换为 numpy 数组
X_vectors = np.array(X_vectors)
y_labels = np.array(y_labels)
titles = np.array(titles)

print("Total samples loaded:", len(X_vectors))

# 进行分层划分：75% 为训练集 (X1, y1)，25% 为测试集 (X2, y2)
from sklearn.model_selection import train_test_split
X1, X2, y1, y2, titles_train, titles_test = train_test_split(
    X_vectors, y_labels, titles, test_size=0.25, stratify=y_labels, random_state=student_id
)

print("Training set shapes: X1 =", X1.shape, ", y1 =", y1.shape)
print("Test set shapes: X2 =", X2.shape, ", y2 =", y2.shape)

# ================================
# Q2: 2D Scatter Plot using PCA
# ================================
from sklearn.decomposition import PCA

# 对整个数据集 X_vectors 使用 PCA 降维至 2D
pca_2d = PCA(n_components=2)
X_pca = pca_2d.fit_transform(X_vectors)
explained_variance = np.sum(pca_2d.explained_variance_ratio_) * 100

# 绘制散点图，根据类别上色
plt.figure(figsize=(8,6))
for label in np.unique(y_labels):
    idx = (y_labels == label)
    plt.scatter(X_pca[idx, 0], X_pca[idx, 1], label=label, alpha=0.7)
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.title(f'2D PCA Scatter Plot (Explained Variance: {explained_variance:.2f}%)')
plt.legend()
plt.show()

print("Total explained variance (2D PCA): {:.2f}%".format(explained_variance))

# ================================
# Q3: Classification with Cross-Validation
# ================================
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import RepeatedStratifiedKFold, cross_val_score

# 定义 PCA 预处理，保留 95% 方差
pca_95 = PCA(n_components=0.95)

# 定义三种分类器及其参数
classifiers = {
    'Logistic Regression': LogisticRegression(max_iter=1000, random_state=student_id),
    'Random Forest': RandomForestClassifier(n_estimators=25, max_depth=5, random_state=student_id),
    'KNN': KNeighborsClassifier(n_neighbors=9)
}

# 定义交叉验证策略：重复分层 5 折交叉验证，重复 5 次
cv_strategy = RepeatedStratifiedKFold(n_splits=5, n_repeats=5, random_state=student_id)

# 针对每个分类器建立流水线：标准化 -> PCA(95%) -> 分类器
cv_results = {}
for name, clf in classifiers.items():
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('pca', PCA(n_components=0.95)),
        ('classifier', clf)
    ])
    scores = cross_val_score(pipeline, X1, y1, cv=cv_strategy, scoring='accuracy')
    cv_results[name] = scores
    print(f"{name}: Mean Accuracy = {np.mean(scores):.4f}, Std = {np.std(scores):.4f}")

# ================================
# Q4: Select Best Classifier and Evaluate on Test Set
# ================================
# 选择交叉验证中平均准确率最高的分类器
best_clf_name = max(cv_results, key=lambda k: np.mean(cv_results[k]))
print(f"\nBest classifier based on CV: {best_clf_name}")

# 根据最佳分类器构建流水线
if best_clf_name == 'Logistic Regression':
    best_clf = LogisticRegression(max_iter=1000, random_state=student_id)
elif best_clf_name == 'Random Forest':
    best_clf = RandomForestClassifier(n_estimators=25, max_depth=5, random_state=student_id)
elif best_clf_name == 'KNN':
    best_clf = KNeighborsClassifier(n_neighbors=9)

pipeline_best = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA(n_components=0.95)),
    ('classifier', best_clf)
])
pipeline_best.fit(X1, y1)
y_pred = pipeline_best.predict(X2)

# 总体测试准确率
from sklearn.metrics import accuracy_score, classification_report
overall_acc = accuracy_score(y2, y_pred)
print("Overall accuracy on test set: {:.4f}".format(overall_acc))

# 按类别计算准确率和列出误分类文本（输出标题和真实标签）
import pandas as pd
results_df = pd.DataFrame({'Title': titles_test, 'True Label': y2, 'Predicted': y_pred})
print("\nPer-class performance and misclassified samples:")
for label in np.unique(y2):
    idx = (results_df['True Label'] == label)
    acc = accuracy_score(results_df.loc[idx, 'True Label'], results_df.loc[idx, 'Predicted'])
    print(f"\nClass '{label}': Accuracy = {acc:.4f}")
    misclassified = results_df[(results_df['True Label'] == label) & (results_df['Predicted'] != label)]
    if not misclassified.empty:
        print("Misclassified samples:")
        for _, row in misclassified.iterrows():
            print(f"  Title: {row['Title']}   True Label: {row['True Label']}")
    else:
        print("No misclassified samples.")

# ================================
# Q5: K-Means Clustering on the Entire Dataset
# ================================
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

# 对整个数据集 X_vectors 进行标准化，并使用 PCA 保留95%方差
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_vectors)
pca_95_full = PCA(n_components=0.95)
X_pca_full = pca_95_full.fit_transform(X_scaled)

cluster_results = {}
for k in [4, 5, 6]:
    kmeans = KMeans(n_clusters=k, random_state=student_id)
    cluster_labels = kmeans.fit_predict(X_pca_full)
    inertia = kmeans.inertia_
    sil_score = silhouette_score(X_pca_full, cluster_labels)
    cluster_results[k] = {'inertia': inertia, 'silhouette': sil_score, 'labels': cluster_labels, 'model': kmeans}
    print(f"\nk = {k}: Inertia = {inertia:.2f}, Silhouette Score = {sil_score:.4f}")

# ================================
# Q6: Select Best Clustering and Generate LLM Prompt for Naming Clusters
# ================================
# 选择 silhouette 分数最高的聚类结果作为最佳聚类
best_k = max(cluster_results, key=lambda k: cluster_results[k]['silhouette'])
print(f"\nBest clustering selected: k = {best_k} (Silhouette Score = {cluster_results[best_k]['silhouette']:.4f})")

# 根据每个簇中部分样本标题生成一个 LLM 提示，要求 LLM 给每个簇命名并说明理由
best_labels = cluster_results[best_k]['labels']
prompt_lines = []
prompt_lines.append(f"Please provide descriptive names for the following {best_k} clusters. The clusters are formed based on blog article titles. Below are sample titles from each cluster:")

for cluster_id in range(best_k):
    sample_titles = titles[best_labels == cluster_id][:5]  # 每个簇最多取5个样本标题
    prompt_lines.append(f"\nCluster {cluster_id}:")
    for t in sample_titles:
        prompt_lines.append(f"- {t}")
prompt_lines.append("\nPlease suggest a descriptive name for each cluster and briefly explain your reasoning.")
llm_prompt = "\n".join(prompt_lines)
print("\nGenerated LLM prompt for cluster naming:\n")
print(llm_prompt)

# （注意：请将上述提示复制到公开的 LLM（例如 ChatGPT）中，并将生成的命名截图粘贴到 Notebook 中。）

# ================================
# Q7: Scrape "Egg tart" Wikipedia Page and Recommend Related Articles
# ================================
import wikipedia
from sklearn.metrics.pairwise import cosine_similarity

# 爬取 Wikipedia 中 "Egg tart" 页面内容
try:
    egg_tart_page = wikipedia.page("Egg tart")
    egg_tart_content = egg_tart_page.content
    egg_tart_title = egg_tart_page.title
    print(f"\nSuccessfully scraped Wikipedia page: {egg_tart_title}")
except Exception as e:
    print("Failed to scrape 'Egg tart' page:", e)
    egg_tart_content = ""

# 计算 "Egg tart" 页面文本的嵌入
egg_tart_embedding = model.encode(egg_tart_content)

# 计算 "Egg tart" 与整个数据集中各篇文章之间的余弦相似度
similarities = cosine_similarity([egg_tart_embedding], X_vectors)[0]

# 选取相似度最高的 5 篇文章（按相似度降序排序）
top5_idx = np.argsort(similarities)[-5:][::-1]
print("\nRecommended 5 articles for 'Egg tart' (sorted by relevance):")
for idx in top5_idx:
    print(f"Title: {titles[idx]}, Category: {y_labels[idx]}, Similarity: {similarities[idx]:.4f}")

# 方法说明：
# 1. 爬取 "Egg tart" 页面并计算其文本嵌入。
# 2. 对比数据集中每篇文章的嵌入（使用相同的 SentenceTransformer 模型）。
# 3. 按余弦相似度排序，选取前 5 篇文章作为推荐，认为相似度越高文章内容相关性越强。
```

---

### 代码说明

1. **数据加载与向量化 (Q1)：**  
   - 挂载 Google Drive 后，从指定目录中遍历每个类别文件夹中的 txt 文件。  
   - 使用 nltk 的句子分割，对前 10 句进行加权（前 5 句权重 3，其余权重 1）计算加权平均的句子嵌入。  
   - 同时保存文本的标题（文件第一行），便于后续输出误分类结果时显示。

2. **数据集划分：**  
   - 使用 stratified split 将数据集划分为 75% 的训练集和 25% 的测试集，并打印数据形状。

3. **PCA 可视化 (Q2)：**  
   - 对整个数据集降至二维，并绘制散点图，各类别用不同颜色表示，同时打印 PCA 的解释方差比例。

4. **分类器训练与交叉验证 (Q3)：**  
   - 建立三个分类器的流水线：标准化 -> PCA (保留95%方差) -> 分类器。  
   - 使用重复分层 k 折交叉验证（5 折，重复 5 次）评估各模型，输出平均准确率和标准差。

5. **最佳分类器的选择与测试集评估 (Q4)：**  
   - 根据交叉验证结果选择表现最好的分类器，在训练集上训练后在测试集上评估，并输出总体准确率、各类别准确率以及误分类文本的标题和真实标签。

6. **K-Means 聚类 (Q5)：**  
   - 对整个数据集先进行标准化和 PCA（保留95%方差），然后分别对 k = 4, 5, 6 进行 K-Means 聚类，输出每个聚类结果的 inertia 和 silhouette 分数。

7. **生成 LLM 聚类命名提示 (Q6)：**  
   - 根据 silhouette 分数选择最佳聚类结果，针对每个簇抽取部分样本标题生成一个 LLM 提示，要求为各聚类命名并说明理由。

8. **爬取 Wikipedia “Egg tart” 页面与文章推荐 (Q7)：**  
   - 使用 wikipedia 模块爬取 “Egg tart” 页面，计算其嵌入并与数据集中所有文章的嵌入计算余弦相似度，选取相似度最高的 5 篇文章推荐，并按相似度降序输出。

将此 Notebook 上传至 Google Colab 后运行，即可完成作业 A 的所有内容。若有任何问题或需要进一步调整，可继续沟通。
你的问题仍然是 **NLTK punkt 资源丢失** 和 **数据集没有正确加载** 导致 `train_test_split()` 失败。让我们逐步解决问题。

---

## **第一步：修复 NLTK punkt 资源丢失**
Colab 可能有缓存问题，因此你需要强制删除 `nltk_data` 目录并重新下载 `punkt` 资源：

```python
!rm -rf /root/nltk_data  # 删除 NLTK 可能损坏的缓存
import nltk
nltk.download('punkt')  # 重新下载 punkt 资源
```
然后**重启 Colab 运行时**（点击 `Runtime` -> `Restart runtime`）。

---

## **第二步：检查数据集是否正确加载**
你的错误信息 `Total samples loaded: 0` 表明 **没有成功加载任何 txt 文件**。请运行以下代码检查数据集路径是否正确：

```python
import os

# 你的数据集路径
data_dir = "/content/drive/MyDrive/dataset/dataset"

# 确保数据集目录存在
if os.path.exists(data_dir):
    print("✅ 数据集目录存在")
else:
    print("❌ 数据集目录不存在，请检查路径")

# 列出 dataset 目录中的文件夹
print("📂 dataset 目录内容：", os.listdir(data_dir))

# 检查子文件夹是否存在
categories = ['cakes', 'chocolate_bars', 'cookies', 'soft_drinks', 'teas']
for category in categories:
    category_path = os.path.join(data_dir, category)
    if os.path.exists(category_path):
        print(f"✅ 发现类别文件夹：{category}")
        print("📜 文件列表（前5个）：", os.listdir(category_path)[:5])
    else:
        print(f"❌ 未找到类别文件夹：{category}")
```
#### **可能的情况**
1. **如果 `❌ 数据集目录不存在`，说明 `data_dir` 路径错误**  
   - **解决方案：** 手动检查 Google Drive 的实际路径，并更新 `data_dir`。  
   - 你可以在 Colab 运行 `!ls /content/drive/MyDrive/` 找到正确的路径。

2. **如果 `❌ 未找到类别文件夹`，说明 `dataset` 目录结构错误**  
   - 可能你 **解压后少了一层目录**，应该进入 `dataset/dataset/` 而不是 `dataset/`。

3. **如果 `✅ 数据集目录存在` 并列出了 `txt` 文件，但 `Total samples loaded: 0`**  
   - 可能是 `glob.glob(os.path.join(folder, '*.txt'))` 失败，尝试手动列出 `txt` 文件：
   ```python
   for category in categories:
       folder = os.path.join(data_dir, category)
       txt_files = glob.glob(os.path.join(folder, '*.txt'))
       if txt_files:
           print(f"✅ {category} 目录中找到 {len(txt_files)} 个 txt 文件")
       else:
           print(f"❌ {category} 目录中没有 txt 文件")
   ```

---

## **第三步：调试数据加载**
如果 **数据目录正确但 `Total samples loaded: 0`**，你需要 **单独测试 `txt` 文件是否能正确读取**：

```python
import glob

# 选取某个类别的文件夹
test_category = "teas"  # 你可以换成 "cakes", "cookies" 等
test_folder = os.path.join(data_dir, test_category)

# 获取文件列表
txt_files = glob.glob(os.path.join(test_folder, '*.txt'))

# 读取前2个文件的内容
for txt_file in txt_files[:2]:
    try:
        with open(txt_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            print(f"\n📜 读取文件: {txt_file}")
            print("🔹 第一行（标题）：", lines[0].strip() if lines else "空文件")
            print("🔹 总行数：", len(lines))
    except Exception as e:
        print(f"❌ 读取 {txt_file} 失败：{e}")
```
#### **可能的情况**
1. **如果 `txt_files=[]`，说明 `glob.glob()` 找不到 `txt` 文件**  
   - 可能 `*.txt` 匹配模式有误，尝试 `print(os.listdir(test_folder))` 检查实际文件名。

2. **如果 `读取文件失败`，说明某些 `txt` 文件编码有问题**  
   - 可能 `utf-8` 解析失败，可以尝试 `encoding="ISO-8859-1"` 或 `encoding="utf-16"`。

---

## **第四步：确认数据集正确后，重新运行代码**
如果上述检查 **所有都正常**，但仍然 `Total samples loaded: 0`，你可以运行完整的数据加载代码：

```python
import nltk
nltk.download('punkt')  # 确保 punkt 资源可用
from nltk.tokenize import sent_tokenize
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

# 计算文本嵌入
def compute_text_embedding(text, max_sentences=10):
    sentences = sent_tokenize(text)
    selected = sentences[:max_sentences]
    weights = [3 if i < 5 else 1 for i in range(len(selected))]
    embeddings = model.encode(selected)
    weights = np.array(weights).reshape(-1, 1)
    return np.sum(embeddings * weights, axis=0) / np.sum(weights)

X_vectors = []
y_labels = []
titles = []

for label in categories:
    folder = os.path.join(data_dir, label)
    for filepath in glob.glob(os.path.join(folder, '*.txt')):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                if not lines:
                    continue
                title = lines[0].strip()
                content = ' '.join([line.strip() for line in lines])
                vec = compute_text_embedding(content)
                X_vectors.append(vec)
                y_labels.append(label)
                titles.append(title)
        except Exception as e:
            print(f"❌ 读取 {filepath} 失败：{e}")

# 转换为 NumPy 数组
X_vectors = np.array(X_vectors)
y_labels = np.array(y_labels)
titles = np.array(titles)

print("✅ 成功加载样本数量：", len(X_vectors))
```
如果这一步 **成功加载样本**，那么你的 `train_test_split()` 就不会再报错了。

---

## **总结**
1. **先确保 NLTK punkt 资源可用**
   ```python
   !rm -rf /root/nltk_data
   import nltk
   nltk.download('punkt')
   ```
   **然后重启 Colab 运行时**。

2. **检查 `data_dir` 是否正确**
   ```python
   print(os.listdir("/content/drive/MyDrive/dataset"))
   ```

3. **测试 `txt` 文件是否可读**
   ```python
   for category in categories:
       folder = os.path.join(data_dir, category)
       print(f"📂 {category}: {os.listdir(folder)[:5]}")
   ```

4. **测试 `sent_tokenize()` 是否可用**
   ```python
   text = "This is a test sentence. Here is another one."
   print(sent_tokenize(text))
   ```

5. **如果 `Total samples loaded: 0`，运行完整的数据加载调试代码**

请逐步执行这些步骤，并告诉我哪一步仍然有问题，我会继续帮助你解决！🚀

如果 `sent_tokenize()` 无法运行，说明 `nltk` 的 `punkt` 资源仍然有问题。请按照下面步骤来修复：

---

## **第一步：强制删除并重新下载 NLTK punkt 资源**
请在 Colab 运行以下命令：
```python
!rm -rf /root/nltk_data  # 删除可能损坏的 NLTK 资源
import nltk
nltk.download('punkt')  # 重新下载 punkt
```
然后 **重启 Colab 运行时**（点击 `Runtime` -> `Restart runtime`），再运行：

```python
from nltk.tokenize import sent_tokenize

# 测试 sent_tokenize 是否可用
text = "This is a test sentence. Here is another one."
print(sent_tokenize(text))
```
如果 `sent_tokenize(text)` 仍然报错，请继续下一步。

---

## **第二步：手动下载 NLTK punkt 资源**
如果 `nltk.download('punkt')` 无法正常工作，你可以 **手动下载 punkt 资源**：

```python
import nltk
nltk.download('punkt', download_dir='/usr/local/nltk_data')  # 指定下载目录
```
然后运行：
```python
import os
os.environ['NLTK_DATA'] = "/usr/local/nltk_data"

from nltk.tokenize import sent_tokenize
text = "This is a test sentence. Here is another one."
print(sent_tokenize(text))  # 期待输出两个句子
```

---

## **第三步：如果仍然不行，手动安装 NLTK**
如果 `nltk.download()` 仍然失败，可以尝试 **手动安装 NLTK**：
```python
!pip uninstall -y nltk
!pip install -U nltk
```
然后 **重启 Colab 运行时**，重新运行：
```python
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

text = "This is a test sentence. Here is another one."
print(sent_tokenize(text))
```

---

### **总结**
1. **先删除旧的 NLTK 资源并重新下载 `punkt`**
   ```python
   !rm -rf /root/nltk_data
   import nltk
   nltk.download('punkt')
   ```
   **然后重启 Colab 运行时**。

2. **手动设置 NLTK 数据路径**
   ```python
   import os
   os.environ['NLTK_DATA'] = "/usr/local/nltk_data"
   ```

3. **测试 `sent_tokenize()` 是否可用**
   ```python
   from nltk.tokenize import sent_tokenize
   print(sent_tokenize("This is a test sentence. Here is another one."))
   ```

4. **如果仍然不行，尝试卸载并重新安装 NLTK**
   ```python
   !pip uninstall -y nltk
   !pip install -U nltk
   ```

请逐步尝试这些方法，并告诉我哪一步仍然有问题，我会继续帮助你解决！🚀
根据代码和输出结果的详细分析，作业A部分的实现基本正确，各题目要求均得到满足。以下是具体检查结果及建议：

---

### **检查结果总结**

1. **Q1: 数据加载与文本向量化**  
   - **正确性**：成功加载300个样本，分层划分训练集（225）和测试集（75），权重分配符合题目要求。  
   - **潜在改进**：若文本句子不足5句，前所有句子权重为3，符合题意，无需修改。

2. **Q2: PCA降维与可视化**  
   - **正确性**：正确计算2D PCA并绘制散点图，累计解释方差23.36%（合理）。  
   - **注意**：解释方差较低是文本高维数据的常见现象，无需调整。

3. **Q3: 分类模型交叉验证**  
   - **正确性**：流水线设计合理（标准化→PCA→分类器），交叉验证策略正确。  
   - **结果分析**：KNN表现最佳（92.62%），可能因数据局部结构明显，符合预期。

4. **Q4: 测试集评估与误分类分析**  
   - **正确性**：KNN测试集准确率92%，各类别准确率与误分类标题输出完整。  
   - **注意**：'cookies'类别准确率较低（80%），可能需检查特征区分度。

5. **Q5: K-Means聚类**  
   - **正确性**：标准化+PCA后聚类，计算惯性及轮廓系数，k=5时最优（轮廓0.1011）。  
   - **备注**：轮廓系数普遍偏低，但代码无误，可能数据本身聚类难度高。

6. **Q6: LLM提示生成**  
   - **正确性**：从每个簇抽取5个标题生成提示，逻辑清晰，可直接用于LLM。

7. **Q7: 相关文章推荐**  
   - **正确性**：基于余弦相似度的推荐方法合理，输出前5篇相关文章。  
   - **注意**：推荐结果含跨类别文章（如“Fortune cookie”），但题目未限制同类，故无误。

---

### **改进建议**

1. **Q3分类模型优化**  
   - 可尝试调整PCA保留的方差比例（如90%或更高），观察是否影响KNN表现。

2. **Q5聚类结果分析**  
   - 添加可视化（如聚类后的PCA散点图）以直观评估簇分布。

3. **Q7推荐系统扩展**  
   - 若需推荐同类文章，可在相似度计算后按类别过滤，但题目未要求此步骤。

---

### **结论**

代码实现符合题目要求，逻辑严谨，输出结果合理。无重大错误，可通过进一步优化提升模型表现，但非必需。建议用户按需补充可视化或注释以增强代码可读性。

**最终检查结果：正确 ✅**
