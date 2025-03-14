### 分类
- 简单的训练集-测试集划分
  - Simple train-test split
你可以传入任意数量的NumPy矩阵（X、y、z、W等），它们都会被一致地划分。如果你有一个包含与X数据矩阵相对应的文本字符串的NumPy向量，这个功能会很有用。
  - You can pass any number of numpy matrices (X, y, z, W, etc.) and all of them will be splitted consistently to each other. Useful if you have a numpy vector containing textual strings corresponding to X data matrix.
- 评估 = 比较以下两个向量
  - Evaluation = compare the following two vectors
- y_test：预期结果（真实值）
  - y_test: the expected result (ground truth) 
- y_test_pred：你的模型做出的预测
  - y_test_pred: the prediction made by your model
从sklearn.metrics导入accuracy_score、precision_recall_fscore_support
  - from sklearn.metrics import accuracy_score, precision_recall_fscore_support
acc = accuracy_score(y_test, y_test_pred)
  - acc=accuracy_score(y_test,y_test_pred)
p, r, f1, s = precision_recall_fscore_support(y_test, y_test_pred)
  - p,r,f1,s=precision_recall_fscore_support(y_test,y_test_pred)
- 带有预处理步骤的正确交叉验证
  - A correct crossvalidation with preprocessing steps
Sklearn管道是零个或多个预处理步骤加上（可选）最后一个分类器组成的序列
  - A Sklearn pipeline is a sequence of zero or more preprocessors + (optionally) one classifier as very last element
In [56]: 从sklearn.pipeline导入Pipeline
  - In [56]: from sklearn.pipeLine import Pipeline
In [57]: #'X是已经加载的数据矩阵，而'y'是其相应的标签向量。
  - In [57]:#'X is a data matrix aready loaded, while 'y' is its corresponding labels vector.
In [58]: clf_plus_preprocessing = Pipeline(steps=[('standardization', StandardScaler()), ('classification', LogisticRegression())])
  - In [58]: cLf_plus_preprocessing = PipeLine(steps=[('standardization', StandardScalerC) ), ('classification', LogisticRegression())]
In [59]: cv = RepeatedStratifiedKFold(n_repeats=10, n_splits=5)
  - In [59] cv=RepeatedstratifiedKFold(n_repeats=10,n_splits=5)
In [60]: accuracies = cross_val_score(clf_plus_preprocessing, X, y, cv=cv, scoring='accuracy')
  - In [60]:accuracies=cross_val_score(cLf_pLus_preprocessing,X,y,cv=cv,scoring='accuracy')
In [61]: accuracies.mean()
  - In [61]: accuracies.mean(
Out [61]: 0.8725
使用定义的管道运行交叉验证。Pipeline对象的实现确保验证集的数据不会用于预处理！！！
  - Run cross validation using the defined pipeline. The implementation of the Pipeline object ensures that no data of the validation set is used for preprocessing!!!
### 大纲
- Scikit-learn简介
  - Introduction to Scikit-learn
- 数据预处理和降维
  - Data Preprocessing and Dimensionality Reduction
- 分类
  - Classification
- 聚类
  - Clustering
### 聚类
- 导入一个模型
  - Import a model
从sklearn.cluster导入KMeans
  - from sklearn.cluster import KMeans
构建模型对象
  - Build model object
km = KMeans(n_clusters = 5)
  - km=KMeans(n_clusters = 5)
- 超参数n_clusters指定质心的数量（即聚类的数量）
  - The hyperparameter n_clusters specifies the number of centroids (= number of clusters)
- 默认值是8（但不同库版本可能会有所变化）
  - Default is 8 (buy may change across different library versions)
- 将聚类应用于输入数据
  - Apply clustering to input data 
Out[1]: [3,1,2,2,2,0]
  - Out[1]: [3.1.2,22,0]
- 此操作将数据分配到各自的聚类中
  - This operation assigns data to their respective cluster
- X是包含输入特征的二维NumPy数组（特征矩阵）
  - X is the 2D NumPy array with input features (features matrix) 
- y_pred是包含聚类标签的一维数组
  - y_pred is a 1D array with cluster labels 
| 1.0 | 5 | 1.5 |
| --- | --- | --- |
| 1.4 | 10 | 0.3 |
- 评估聚类结果
  - Assessing clustering results
- 内部指标：仅使用特征矩阵的信息
  - Internal metrics: use only the information of the features matrix
- 例如轮廓系数
  - E.g. Silhouette score
从sklearn.metrics导入silhouette_score、silhouette_samples
  - from sklearn.metrics import silhouette_score,silhouette_samples
silh_avg = silhouette_score(X, clusters)
  - silh_avg=silhouette_score(X, clusters)
silh_i = silhouette_samples(X, clusters)
  - silh_i=silhouette_samp1es(X, clusters)
- 轮廓系数是一个介于[-1, 1]之间的数字
  - Silhouette is a number in the range [-1, 1] 
- 值越高意味着聚类质量越高
  - Higher values mean higher cluster quality
- 聚类之间分隔良好且内聚性强
  - Clusters are well separated and cohesive
### 参考文献
- Scikit-learn用户指南
  - User guide of Scikit-learn
https://scikit-learn.org/stable/user_guide.html
  - https://scikit-learn.org/stable/user_guide.html
- Scikit-learn API参考
  - API reference of Scikit-learn
https://scikit-learn.org/stable/api/index.html
  - https://scikit-learn.org/stable/api/index.html 
