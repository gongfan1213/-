### 向量范数和点积性质
- **$L^p$范数**：一种衡量向量大小的函数。
\[ \| x\| _{p}=\left(\sum_{i}\left|x_{i}\right|^{p}\right)^{\frac{1}{p}} \]
- **最常见的$L^2$范数**：
\[ \| x\| _{2}=\left(\sum_{i}\left|x_{i}\right|^{2}\right)^{\frac{1}{2}} = x^{T}x \]
- **$x$和$y$的点积**：$\theta$是它们之间的夹角。
\[ x^{T}y = \| x\| _{2}\| y\| _{2}\cos\theta \]

### 点积与投影
点积使得我们可以将向量视为空间中一个点的坐标。
- 给定一组正交归一向量（称为向量空间的基）。例如，当$n = 3$时，我们有以下基：
\[ e_{1} = (1, 0, 0); e_{2} = (0, 1, 0); e_{3} = (0, 0, 1) \]
- 假设$n = 3$，像$x = (x_{1}, x_{2}, x_{3})$这样的一般向量可以理解为：
\[ x = \sum_{i = 1}^{3}x_{i}e_{i} \]

### 余弦相似度
- 点积衡量两个向量之间的“相关性”。
- 当向量方向相似时，点积较高（为正），表明存在正相关。
- 当向量方向不同时，点积较低（接近零或为负），表明相关性较低或为负相关。
- 当两个向量正交时，点积为0。
- 两个向量之间的余弦相似度是它们的点积除以它们的欧几里得范数：
\[ \text{CosineSimilarity}(x, y) = \frac{x \cdot y}{\| x\| _{2}\| y\| _{2}} \]
- 余弦相似度的值在$[-1, +1]$范围内。
- 但是，如果$x$和$y$的所有元素均为非负，则它们的余弦相似度在$[0, 1]$范围内。
- 一些库（如Scipy）有一个名为CosineDistance的函数，它返回$1 - \text{CosineSimilirity}(x, y)$。
- 很容易看出其值域在$[0, 2]$范围内。

### 矩阵范数和迹
- **弗罗贝尼乌斯范数**：一种衡量矩阵大小的函数。
\[ \| A\| _{F}=\sqrt{\sum_{i, j}A_{i, j}^{2}} \]
- 弗罗贝尼乌斯范数也可以用迹算子表示：
\[ \| A\| _{F}=\sqrt{\text{Tr}(A^{\top}A)} \]
其中，$A$的迹是其对角元素之和：
\[ \text{Tr}(A)=\sum_{i = 1}^{n}a_{ii} \]

### Python中的范数
```python
In [31]: import numpy as np
In [32]: a = np.arange(9) - 4
In [33]: a
Out[33]: array([-4, -3, -2, -1, 0, 1, 2, 3, 4])
In [34]: B = a.reshape((3, 3))
In [35]: B
Out[35]:
array([[-4, -3, -2],
       [-1, 0, 1],
       [ 2, 3, 4]])
In [36]: # 向量a的L2范数
In [37]: np.linalg.norm(a)
Out[37]: 7.745966692414834
In [38]: # 矩阵B的L2范数
In [39]: np.linalg.norm(B)
Out[39]: 7.745966692414834
In [40]: # 向量a的L-无穷范数
In [41]: np.linalg.norm(a, np.inf)
Out[41]: 4.0
```

### 一些特殊矩阵
- **对角矩阵**：只有主对角线上有非零元素，对于所有$i \neq j$，$D_{i, j} = 0$。
\[ \text{diag}(v)=\left[\begin{array}{ccc}v_{1} & 0 & 0 \\ 0 & \ddots & 0 \\ 0 & 0 & v_{n}\end{array}\right] \quad \text{diag}(v)^{-1}=\left[\begin{array}{ccc}1/v_{1} & 0 & 0 \\ 0 & \ddots & 0 \\ 0 & 0 & 1/v_{n}\end{array}\right] \]
- **对称矩阵**：$A = A^{T}$，即$A_{i, j} = A_{j, i}$。
- **单位向量**：$\|x\|_{2} = 1$。
- **正交（归一）向量**：$x^{T}y = 0$（且$\|x\|_{2} = \|y\|_{2} = 1$）。
- **正交矩阵**：$A^{T}A = I$，即$A^{-1} = A^{T}$ 。

### 矩阵的秩
- 矩阵的秩是其列向量所张成的向量空间的维数。
- 或者，等价地，是矩阵中线性无关列的最大数量。
- 或者，等价地，是矩阵中线性无关行的最大数量。
- 或者，等价地，是矩阵的非零特征值或奇异值的数量。
- 一个$n×n$矩阵可逆当且仅当其秩为满秩，即等于$n$。
- 非满秩矩阵类似于一种“投影算子”，因为它将向量投影到（通常是更低维的）空间中。
- 所以，“它丢失了信息”，这从直观上解释了为什么这样的矩阵不可逆。
- 两个向量的外积会创建一个秩为1的矩阵 。

### 特征分解
- 将一个方阵分解为一组特征向量和特征值。
- **定义**：方阵$A$的特征向量。
一个非零向量$v$，使得$A$与$v$相乘仅改变$v$的尺度：
\[ Av = \lambda v \quad (v^{T}A = \lambda v^{T}) \]
- 标量$\lambda$称为对应于该特征向量的特征值。
- 我们通常只寻找单位特征向量。（为什么呢？）

### 特征分解
- 假设矩阵$A$有$n$个特征向量$\{v^{(1)}, \cdots, v^{(n)}\}$，对应的特征值为$\{\lambda_{1}, \cdots, \lambda_{n}\}$。
\[ V = \left[v^{(1)}, \cdots, v^{(n)}\right] \quad \lambda = \left[\lambda_{1}, \cdots, \lambda_{n}\right]^{T} \]
- $A$的特征分解：
\[ Av^{(1)} = \lambda_{1}v^{(1)} \cdots Av^{(n)} = \lambda_{n}v^{(n)} \]
\[ AV = V\text{diag}(\lambda) \]
\[ A = V\text{diag}(\lambda)V^{-1} \]

### 对称矩阵的特征分解
对于实对称矩阵$A$，其特征向量和特征值都是实值，并且特征向量是正交的：
\[ A = Q\text{diag}(\lambda)Q^{T} \]
这对主成分分析很重要！

### 对称矩阵的特征分解
\[ A = Q\text{diag}(\lambda)Q^{T} \]

### 矩阵与它的一个特征向量相乘
（此处原文疑似有误，推测应为展示计算过程和结果的部分，根据前文格式补充如下）
假设$A$是上述对称矩阵，$q_{i}$是其特征向量，计算$Aq_{i}$并与$\lambda_{i}q_{i}$对比验证特征向量和特征值的关系。

### Python中的特征分解
```python
In [27]: import numpy as np
In [28]: A = np.array([[1, 4, 5], [-5, 8, 9], [1, 2, 3]])
In [29]: A
Out[29]:
array([[ 1, 4, 5],
       [-5, 8, 9],
       [ 1, 2, 3]])
In [30]: val, vec = np.linalg.eig(A)
In [31]: print(f'特征值 #0: {val[0]}')
特征值 #0: 0.4472008925693789
In [32]: print(f'特征向量 #0: {vec[:, 0]}')
特征向量 #0: [ 0.04575924  0.77757688 -0.62712064]
In [33]: print(f'特征值 #1: {val[1]}')
特征值 #1: 3.2203843196683564
In [34]: print(f'特征向量 #1: {vec[:, 1]}')
特征向量 #1: [ 0.75089651 -0.31126489  0.58246768]
In [35]: print(f'特征值 #2: {val[2]}')
特征值 #2: 8.332414787762268
In [36]: print(f'特征向量 #2: {vec[:, 2]}')
特征向量 #2: [ 0.6275103   0.68298774  0.37384297]
```

### 矩阵与它的特征向量相乘
```python
In [38]: A.dot(vec[:, 0])
Out[38]: array([ 0.02046358,  0.34773307, -0.28044891])
In [39]: val[0] * vec[:, 0]
Out[39]: array([ 0.02046358,  0.34773307, -0.28044891])
In [40]: A.dot(vec[:, 1])
Out[40]: array([ 2.41817536, -1.00239256,  1.87576978])
In [41]: val[1] * vec[:, 1]
Out[41]: array([ 2.41817536, -1.00239256,  1.87576978])
In [42]: val[2] * vec[:, 2]
Out[42]: array([ 5.22867612,  5.69093715,  3.1150147 ])
In [43]: val[2] * vec[:, 2]
Out[43]: array([ 5.22867612,  5.69093715,  3.1150147 ])
```

### 大纲
- 基础线性代数
- 主成分分析

### 主成分分析（PCA）
- 减少数据集中特征的数量并对其进行转换。
- 识别能够减少特征数量的（线性）变换。
- 将大量变量转换为一个较小的变量集，该变量集仍包含较大变量集中的大部分信息。
- 减少数据集的变量数量自然会以牺牲准确性为代价，但降维的技巧是用少量准确性换取简单性。
- **为什么要这样做？**
  - 使进一步的计算更高效。
  - 在二维或三维空间中可视化数据。
  - 去除数据中的噪声。

### 主成分分析
（此处为展示主成分分析效果的示意图，未翻译）

### 方差和协方差
- **方差**：对于一组$m$个观测值$\{x^{(1)}, \cdots, x^{(m)}\}$，其中$x^{(j)} \in \mathbb{R}$，且$\bar{x} = \frac{1}{m}\sum_{j = 1}^{m}x^{(j)}$ 。
\[ \text{var}(x)=\frac{\sum_{j = 1}^{m}(x^{(j)}-\overline{x})^{2}}{m} \]
- **协方差**：对于两组对应的观测值$x^{(j)} \in \mathbb{R}$和$y^{(j)} \in \mathbb{R}$ 。
\[ \text{cov}(x, y)=\frac{\sum_{j = 1}^{m}(x^{(j)}-\overline{x})(y^{(j)}-\overline{y})}{m} \]
- 如果$\text{cov}(x, y) = 0$，则变量$x$和$y$是独立的。

### 方差和协方差
（此处为展示协方差计算相关元素的示意图，未翻译）

### 协方差矩阵
对于$m$个$n$维观测值$\{x^{(1)}, \cdots, x^{(m)}\}$，其中$x^{(j)} \in \mathbb{R}^{n}$，且$\overline{x} = \frac{1}{m}\sum_{j = 1}^{m}x^{(j)} \in \mathbb{R}^{n}$。
- 令$X = \left[x^{(1)}, \cdots, x^{(m)}\right]^{T} \in \mathbb{R}^{m × n}$，$\overline{X} = [\overline{x}, \cdots, \overline{x}]^{T} \in \mathbb{R}^{m × n}$。
\[ \text{Cov}(X)=\frac{1}{m}(X - \overline{X})^{T}(X - \overline{X}) \]
- 如果我们假设$\overline{x} = 0$，那么：
\[ \text{Cov}(X)=\frac{1}{m}X^{T}X \]
- 如果$n$个维度不相关，$\text{Cov}(X)$将是一个对角矩阵。

### 协方差矩阵
（此处为协方差矩阵的矩阵形式，未翻译）

### Python中的协方差矩阵
```python
In [43]: import numpy as np
In [44]: x = np.array([[1, 2, 1, 2],
                      [0, 1, 0, 1],
                      [1, 0, 1, 0],
                      [1, 2, 3, 4]])
In [45]: np.mean(x, axis = 0)
Out[45]: array([0.75, 1.25, 1.25, 1.75])
In [46]: np.mean(x, axis = 1)
Out[46]: array([1.5, 0.5, 0.5, 2.5])
In [47]: np.cov(x)
Out[47]:
array([[ 0.33,  0.33, -0.33,  0.33],
       [ 0.33,  0.33, -0.33,  0.33],
       [-0.33, -0.33,  0.33, -0.33],
       [ 0.33,  0.33, -0.33,  1.67]])
```

### 相关性 = “归一化协方差”（在后续很有用）
- 两个随机变量之间的相关性是它们的协方差除以它们的标准差。
\[ \text{corr}(x, y)=\frac{\text{cov}(x, y)}{\text{std}(x)\text{std}(y)} \]
- 相关性的值在$[-1, +1]$范围内。
- 它也被称为“皮尔逊相关性”。
- 协方差和相关性之间的关系类似于点积和余弦相似度之间的关系。

### 主成分分析（PCA）
- **目标**：将原始坐标系（或空间）转换（也称为投影）到另一个坐标系（$X \to Y$），使得新坐标系中的不同维度线性不相关，即$\text{Cov}(Y)$是一个对角矩阵。
- 对于新的坐标系，新的维度集应该这样组织：方差最大的维度应该是第一个（第一主成分），其次是方差第二大的维度（第二主成分），依此类推。
- 这可以通过特征分解来实现！

### 主成分分析（PCA）
- 对$\text{Cov}(X)$进行特征分解（将$\frac{1}{m}$并入$X^{T}X$ ，且$\text{Cov}(X)$是对称矩阵）。
\[ X^{T}X = Q\text{diag}(\lambda)Q^{T} \]
\[ Q^{T}X^{T}XQ = Q^{T}Q\text{diag}(\lambda)Q^{T}
