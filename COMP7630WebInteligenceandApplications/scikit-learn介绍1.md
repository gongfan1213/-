COMP7630 - 网络智能及其应用
COMP7630 – Web Intelligence and its Applications

Scikit-learn入门
Introduction to SciKit-Learn

大纲
Outline
- Scikit-learn简介
  - Introduction to Scikit-learn
- 数据预处理和降维
  - Data Preprocessing and Dimensionality Reduction
- 分类
  - Classification
- 聚类
  - Clustering

Scikit-learn简介
Introduction to Scikit-learn
- Scikit-learn
  - Scikit-learn
- 基于Numpy和Matplotlib构建的机器学习库
  - Machine learning library built on Numpy and Matplotlib
- Scikit-learn能做什么
  - What Scikit-learn can do
- 无监督学习
  - Unsupervised learning
- 聚类
  - Clustering
- 有监督学习
  - Supervised learning
- 回归、分类
  - Regression, classification
- 数据预处理
  - Data preprocessing
- 特征提取、特征选择、降维
  - Feature extraction, feature selection, dimensionality reduction

Scikit-learn简介
Introduction to Scikit-learn
- Scikit-learn不能做什么
  - What Scikit-learn cannot do
- 多台计算机上的分布式计算
  - Distributed computation on multiple computers
- 仅支持多核优化
  - Only multi-core optimization
- 深度学习
  - Deep learning
- 请使用Keras和Tensorflow替代
  - Use Keras and Tensorflow instead

Scikit-learn简介
Introduction to Scikit-learn
- Scikit-learn模型适用于结构化数据
  - Scikit learn models work with structured data
- 数据必须采用二维Numpy数组的形式
  - Data must be in the form of 2D Numpy arrays
- 行代表样本或实例（在我们的场景中，它们通常是向量化的文本）
  - Rows represent the samples or instances (in our scenarios they usually are vectorized texts)
- 列代表属性或特征
  - Columns represent the attributes or features
此表称为特征矩阵或数据矩阵，形状为(3, 3)
This table is called features matrix or data matrix shape =(3,3)

| 价格 | 数量 | 升数 |
| --- | --- | --- |
| 1.0 | 5 | 1.5 |
| 1.4 | 10 | 0.3 |
| 5.0 | 8 | 1 |

Scikit-learn简介
- 特征可以是
  - Features can be
- 实数值
  - Real values
- 表示分类数据的整数值
  - Integer values to represent categorical data
- 如果数据中包含文本或字符串：
  - If you have texts or strings in your data:
- 如果是长文本，使用词嵌入或句子嵌入将其向量化（如已学过的方法）
  - if long texts, vectorize them using word or sentence embeddings (as seen) 
- 如果只是分类字符串，则将它们转换为整数（预处理）
  - if they are just categorical strings, convert them to integers (preprocessing)

输入数据

| 1.0 | 一月 | 1.5 |
| --- | --- | --- |
| 1.4 | 二月 | 0.3 |
| 5.0 | 三月 | 1 |

特征矩阵

| 1.0 | 0 | 1.5 |
| --- | --- | --- |
| 1.4 | 1 | 0.3 |
| 5.0 | 2 | 1 |

Scikit-learn简介
- 在应用任何模型之前，还必须处理缺失值
  - Also missing values must be solved before applying any model
- 可以使用插补法或删除行的方式
  - With imputation or by removing rows

输入数据

| 1.0 | 0.5 | 1.5 |
| --- | --- | --- |
| 1.4 | NaN | 0.3 |
| 5.0 | 0.5 | 1 |

特征矩阵

| 1.0 | 0.5 | 1.5 |
| --- | --- | --- |
| 1.4 | 0.5 | 0.3 |
| 5.0 | 0.5 | 1 |

输入数据

| 1.0 | 0.5 | 1.5 |
| --- | --- | --- |
| 1.4 | NaN | 0.3 |
| 5.0 | 0.5 | 1 |

特征矩阵

| 1.0 | 0.5 | 1.5 |
| --- | --- | --- |
| 5.0 | 0.5 | 1 |

- 但这种情况在向量化文本中很少发生，因为我们是“人为地”构建特征
  - … but this rarely happens with vectorized texts, because we "artificially" build the features

Scikit-learn简介
- 对于无监督学习，你只需要特征矩阵
  - For unsupervised learning you only need the features matrix 
- 对于有监督学习，你还需要一个目标数组来训练模型
  - For supervised learning you also need a target array to train the model
- 它通常是一维的，长度为n_samples
  - It is typically one-dimensional, with length n_samples

特征矩阵形状 =(n_samples, n_features)

| 1.0 | 5 | 1.5 |
| --- | --- | --- |
| 1.4 | 10 | 0.3 |
| 5.0 | 8 | 1 |

目标数组
形状 =(n_samples, )

| A |
| --- |
| A |

Scikit-learn简介
- 目标数组可以包含
  - The target array can contain
- 整数值，每个值对应一个类别标签
  - Integer values, each corresponding to a class label

目标标签 狗 狗
目标数组 猫

- 用于回归的实数值
  - Real values for regression

目标数组

Scikit-learn简介
- Scikit-learn估计器API
  - Scikit-learn estimator API
- 所有模型都用Python类表示
  - All models are represented with Python classes
- 它们的类包括
  - Their classes include
- 用于配置模型的超参数值
  - The values of the hyperparameters used to configure the model
- 训练后学习到的参数值
  - The values of the parameters learned after training
- 按照惯例，这些属性以下划线结尾
  - By convention these attributes end with an underscore
- 训练模型和进行推断的方法
  - The methods to train the model and make inference
- Scikit-learn模型为超参数提供了合理的默认值
  - Scikit-learn models are provided with sensible defaults for the hyperparameters

Scikit-learn简介
- Scikit-learn模型遵循一种简单、通用的模式
  - Scikit learn models follow a simple, shared pattern
1. 导入你需要使用的模型
  - Import the model that you need to use
2. 构建模型，设置其超参数
  - Build the model, setting its hyperparameters
3. 在数据上训练模型参数
  - Train model parameters on your data
  - 使用fit方法
  - Using the fit method
4. 使用模型进行预测
  - Use the model to make predictions
  - 使用predict/transform方法
  - Using the predict/transform methods
  - 有时fit和predict/transform在同一个类方法中实现
  - Sometimes fit and predict/transform are implemented within the same class method

预测器与转换器
Predictors vs transformers
- 在scikit-learn中，我们将估计器分为：
  - In scikit-learn, we separate estimators into:
- 预测器
  - Predictors
- 支持predict()和/或fit_predict()的估计器
  - An estimator supporting predict() and/or fit_predict()
- 通常在训练（拟合）步骤之后用于预测值
  - Used to predict values, generally after a training (fitting) step
- 包括分类器、回归器、异常值检测器、聚类器
  - Includes classifiers, regressors, outlier detectors, clusterers
- 转换器
  - Transformers
- 支持transform()和/或fit_transform()的估计器
  - An estimator that supports transform() and/or fit_transform()
- 用于计算相同数据的新表示形式
  - Used to compute a new representation of the same data
- 例如，最小-最大缩放、主成分分析、特征离散化、词频-逆文档频率（Tf-idf）
  - E.g., Min-Max scaling, PCA, Feature discretizers, Tf-idf

预测器的方法
Methods for predictors
- fit()：从输入数据中学习模型参数
  - fit(): learn model parameters from input data
  - 例如在训练集上训练分类器
  - E.g. train a classifier on a training set
- predict()：应用模型参数对数据进行预测
  - predict(): apply model parameters to make predictions on data
  - 例如预测新样本的类别标签
  - E.g. predict class labels for new samples
- fit_predict()：拟合模型并进行预测
  - fit_predict(): fit model and make predictions
  - 例如对数据应用聚类算法
  - E.g. apply clustering to data

转换器的方法
Methods for transformers
- fit()：从输入数据中学习模型参数
  - fit(): learn model parameters from input data
  - 例如在最小-最大缩放器中学习每个特征的最小值和最大值
  - E.g. learn minimum value and maximum value for each feature, in Min-Max scaler
- transform()：将数据转换为不同的表示形式
  - transform(): transform data into a different representation
  - 例如将输入数据重新缩放到[0, 1]范围
  - E.g. rescale input data to the [0, 1] range
- fit_transform()：拟合模型并转换数据
  - fit_transform(): fit model and transform data
  - 例如应用主成分分析来转换数据
  - E.g. apply PCA to transform data

大纲
Outline
- Scikit-learn简介
  - Introduction to Scikit-learn
- 数据预处理和降维
  - Data Preprocessing and Dimensionality Reduction
- 分类
  - Classification
- 聚类
  - Clustering

数据预处理
Data Pre-processing
- 示例：
  - Examples:
- 最小-最大缩放：MinMaxScaler
  - min-max scaling: MinMaxScaler
- 标准化为z分数：StandardScaler
  - standardization to z-score: StandardScaler
从sklearn.preprocessing导入MinMaxScaler
from sklearn.preprocessing import MinMaxScaler
从sklearn.preprocessing导入StandardScaler
from sklearn.preprocessing import StandardScaler
minmax_s = MinMaxScaler()
zscore_s = StandardScaler()

数据预处理
Data Pre-Processing
- 正确地对训练集和测试集应用预处理
  - Applying pre-processing correctly to train and test sets
In [1]:
X_train=[[0,10],[0,20],[2,10],[2,20]]
X_test=[[1,15]]
minmax_s.fit(X_train)#注意：仅在训练数据上“学习”！
minmax_s.fit(X_train)#NOTE:"learning" on training data only!
x_train_norm = minmax_s.transform(X_train)
X_test_norm = minmax_s.transform(X_test)#正确
X_test_wrong = minmax_s.fit_transform(X_test)#不要在测试集上拟合
print(X_test_norm)
print(x_test_wrong)
Out[1]: [[0.5 0.5]]
[[0,0]]

降维
Dimensionality Reduction
- 当你想减少高维数据的特征数量时很有用
  - Useful when you want to reduce the number of features for high-dimensional data
- 用于图形表示
  - For graphical representations
- 在应用分类和聚类之前，使特征矩阵具有更紧凑的表示形式
  - Before applying classification and clustering to give the features matrix a more compact representation

降维
Dimensionality Reduction
- 使用Scikit-learn进行主成分分析（PCA）
  - PCA with Scikit-learn
从sklearn.decomposition导入PCA
from sklearn.decomposition import PCA
pca = PCA(n_components=5)
x_projection = pca.fit_transform(X)
- n_components指定应用PCA后你想要保留的成分数量
  - n_components specify the number of components that you want to keep after applying PCA
- 应小于等于初始特征的数量
  - Should be <= the number of initial features
- 但如果它是一个介于(0, 1)之间的实数，则被解释为要解释的方差百分比
  - … but if it is a real number in (0,1) it is interpreted as the percentage of variance to be explained
- 结果是一个具有指定数量特征的特征矩阵
  - The result is a features matrix with the specified number of features

降维
Dimensionality Reduction
- 应用PCA，然后应用分类器
  - Applying PCA and then a classifier
pca = PCA(n_components=6)
X_projection = pca.fit_transform(X_train)
my_classifier.train(X_projection,y_train)
#PCA已经在训练数据上拟合：不要在测试集上拟合它！
#PCA is already fit on training data: do not fit it on test set!
X_test_proj = pca.transform(X_test)
y_test_pred = my_classifier.predict(X_test_proj)
- 假设我们已经将数据集划分为训练集和测试集
  - … supposing we already split our dataset in training and test sets

大纲
Outline
- Scikit-learn简介
  - Introduction to Scikit-learn
- 数据预处理和降维
  - Data Preprocessing and Dimensionality Reduction
- 分类
  - Classification
- 聚类
  - Clustering

分类
Classification
- 分类：
  - Classification:
- 给定一个二维特征矩阵X
  - Given a 2D features matrix X
  - X.shape = (n_samples, n_features)
- 任务是为每个数据样本分配一个类别标签y_pred
  - The task consists of assigning a class label y_pred to each data sample
  - y_pred.shape = (n_samples)

| 1.0 | 5 | 1.5 |
| --- | --- | --- |
| 1.4 | 10 | 0.3 |

X
y_pred

分类
Classification
- 遵循估计器API模式：
  - By following the estimator API pattern:
- 导入一个模型
  - Import a model
从sklearn.tree导入DecisionTreeClassifier
from sklearn.tree import DecisionTreeClassifier
- 构建模型对象
  - Build model object
clf = DecisionTreeClassifier()

分类
Classification
- 重要的决策树超参数：
  - Important decision tree hyperparameters:
从sklearn.tree导入DecisionTreeClassifier
from sklearn.tree import DecisionTreeClassifier
clf = DecisionTreeClassifier(max_depth=10, min_impurity_decrease=0.01)
- 超参数：
  - Hyperparameters:
- max_depth：树的最大深度
  - max_depth: maximum tree height
  - 默认值 = None
  - Default = None
- min_impurity_decrease：仅当杂质减少量高于阈值时才分裂节点
  - min_impurity_decrease: split nodes only if impurity decrease above threshold
  - 默认值 = 0.0
  - Default = 0.0

分类
Classification
- 使用真实标签训练模型
  - Train model with ground-truth labels
clf.fit(X_train,y_train)
- 此操作构建决策树结构
  - This operation builds the decision tree structure
- X_train是包含输入特征的二维Numpy数组（特征矩阵）
  - X_train is the 2D Numpy array with input features (features matrix) 
- y_train是包含真实标签的一维数组
  - y_train is a 1D array with ground-truth labels

| 3.1 | 2 |
| --- | --- |
| 12 | 0.15 |

X_train y_train

分类
Classification
- 预测新数据的类别标签
  - Predict class labels for new data
In [1]: y_pred = clf.predict(X_test)
Out[1]: [3,1,1,1,2,2,8]
- 此操作展示了分类器对未见过的数据进行预测的能力
  - This operation shows the capability of classifiers to make predictions for unseen data 

| 5 | 1.5 |
| --- | --- |
| 10 | 0.3 |

X_test y_pred

分类
Classification
- 为你的数据选择最合适的机器学习模型时，你必须评估其性能
  - To choose the most appropriate machine learning model for your data you have to evaluate its performance
- 评估可以根据一个指标（评分函数）进行
  - Evaluation can be performed according to a metric (scoring function)
- 例如准确率、精确率、召回率
  - E.g. accuracy, precision, recall
- 为避免过拟合，评估必须在未用于训练模型的数据上进行
  - To avoid overfitting evaluation must be performed on data that is not used for training the model
- 将你的数据集划分为训练集和测试集，以模拟数据分布中的两个不同样本
  - Divide your dataset into training and test set to simulate two different samples in the data distribution
“stratify”和“shuffle”参数也非常有用。分层（Stratification）在分割时保持类别分布的比例。洗牌（Shuffling）允许在分割前随机打乱数据集
Also "stratify" and "shuffle" parameters are very useful. Stratification maintains the proportion of classes distribution in the splitting. Shuffling allows to randomly shuffle the dataset before the splitting
