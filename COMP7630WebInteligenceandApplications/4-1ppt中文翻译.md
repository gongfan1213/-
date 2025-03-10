# COMP7630 - 网络智能及其应用
COMP7630 – Web Intelligence and its Applications
## 线性代数
Linear Algebra
### 主成分分析
Principal Component Analysis
瓦伦蒂诺·桑图奇
Valentino Santucci
(valentino.santucci@unistrapg.it)
### 大纲
Outline
- 基础线性代数
Basic Linear Algebra
- 主成分分析
Principal Component Analysis
### 为什么我们需要线性代数？
Why we need Linear Algebra?
- 在将文本向量化之后，它们会变成数值向量。此外，我们会处理一系列文本，通过堆叠这些文本的特征向量，就得到了一个数值特征数据表，这就是一个矩阵！
After vectorization of texts, they become numerical vectors. Moreover, we will work with a series of texts and, by stacking up their feature vectors, we have a data-table of numerical features. This is a matrix!
- 在机器学习中，常常需要降低数据集的维度（这是出于可视化、有效性、效率和去除噪声数据等方面的考虑）。降维技术基于线性代数的概念。
In Machine Learning there is often the need to reduce the dimensionality of a dataset (because of visualization and/or effectiveness and/or efficiency and/or noisy data). Dimensionality reduction techniques are based on linear algebra ideas.
- 当我们讨论社交网络分析时，会将网络描述为图，因此我们可以使用图的邻接矩阵或关联矩阵进行处理。
When we will talk about Social Network Analysis, we will describe networks as graphs, so we can work with adjacency or incidence matrices of graphs.
### 标量和向量
Scalars and Vectors
- 标量只是一个单独的数字。
A scalar is just a single number
- 实值标量 \(s \in \mathbb{R}\)
Real-valued scalar \(s \in \mathbb{R}\)
- 自然数标量 \(n \in \mathbb{N}\)
Natural number scalar \(n \in \mathbb{N}\)
- 向量是一个数字数组/序列（不是集合）。
A vector is an array/sequence of numbers (not a set)
- 一个有n个实值元素的（列）向量 \(x \in \mathbb{R}^{n}\) 
A (column) vector with n real-valued elements \(x \in \mathbb{R}^{n}\) 
\[x=\left[\begin{array}{c}x_{1} \\ x_{2} \\ ... \\ x_{n}\end{array}\right]\]
#### 向量既是点也是“箭头”
Vectors are both points and "arrows"
- 向量是：
Vectors are:
  - 空间（一维、二维、三维……n维）中的点，每个元素给出对应维度的坐标。
Points in space (1D, 2D, 3D, …n-D) with each element giving the coordinate of the dimension
  - 从原点指向这些点的箭头，每个元素给出该点相对于原点的位移。
Arrows from the origin to the points with each element giving the displacements of the point from the origin
### 矩阵（和张量）
Matrices (and tensors)
- 矩阵是一个二维数字数组。
A matrix is a 2-D array of numbers.
- 一个有m行n列的矩阵 \(A \in \mathbb{R}^{m ×n}\) （也称为m×n矩阵） 
A matrix with m rows and n columns \(A \in \mathbb{R}^{m ×n}\) (also called m by n matrix) 
\[A=\left[\begin{array}{cccc}A_{1,1} & A_{1,2} & \cdots & A_{1, n} \\ A_{2,1} & A_{2,2} & \cdots & A_{2, n} \\ \vdots & \vdots & \ddots & \vdots \\ A_{m, 1} & A_{m, 2} & \cdots & A_{m, n}\end{array}\right]\]
- 张量是一个具有两个以上轴的数字数组。
A tensor is an array of numbers with more than two axes.
### Python中的向量和矩阵
Vectors and Matrices in Python
- 你需要安装NumPy模块：pip install numpy
You need to install the NumPy module: pip install numpy
```python
In [33]:x=np.array([1.1,2.2,3.3,4.4])
In [34]:x[0]
In [35]:x[-1]
Out[35]:4.4
In [36]:x[1:3]
Out[36]: array([2.2,3.3])
```
```python
In [41]:A[1][2]
Out[41]
In [42]:A[1,2]
Out[42]
In [43]:A[1,:] 
Out[43]: array([4,5,6])
In [44]:A[:,2] 
Out[44]:array([3,6,9])
```
### 矩阵的简单运算
Simple operations on matrices
- 矩阵的转置：将矩阵 \(A \in \mathbb{R}^{m ×n}\) 转换为 \(A^{T} \in \mathbb{R}^{n ×m}\) 
Transpose of a matrix: \(A \in \mathbb{R}^{m ×n}\) to \(A^{T} \in \mathbb{R}^{n ×m}\) 
\[A=\left[\begin{array}{ll}A_{1,1} & A_{1,2} \\ A_{2,1} & A_{2,2} \\ A_{3,1} & A_{3,2}\end{array}\right] A^{T}=\left[\begin{array}{lll}A_{1,1} & A_{2,1} & A_{3,1} \\ A_{1,2} & A_{2,2} & A_{3,2}\end{array}\right]\]
- 为了节省空间，人们可能会将列向量写成这样：
To save space, people may put column vectors like this: 
\[x=\left[\begin{array}{llll}x_{1} & x_{2} & \cdots & x_{n}\end{array}\right]^{T}\]
- 两个矩阵相加： \(C=A+B\) ，\(C_{i, j}=A_{i, j}+B_{i, j}\) 
Add two matrices: \(C=A+B C_{i, j}=A_{i, j}+B_{i, j}\) 
- 给矩阵加上一个标量或乘以一个标量：
Add a scalar to a matrix or multiply by a scalar: 
\[D=a \cdot B+c D_{i, j}=a \cdot B_{i, j}+c\]
### Python中的矩阵简单运算
Matrices simple operations in Python
```python
In[50]:import numpy as np
In[51]:T=np.zeros((3,4))+2
In [52]:T
Out[52]:
array([[2.,2.,2.,2.],
       [2.,2.,2.,2.],
       [2.,2.,2.,2.]])
In[53]:H=np.ones((3,4))+0.4
In[54]:H
Out[54]: 
array([[1.4,1.4,1.4,1.4],
       [1.4,1.4,1.4,1.4],
       [1.4,1.4,1.4,1.4]])
In[55]:S=3*T+H+100
In[56]:S 
Out[56]: 
array([[107.4, 107.4,107.4,107.4],
       [107.4,107.4,107.4,107.4],
       [107.4,107.4,107.4,107.4]])
In [57]:S.transpose()
Out[57]: 
array([[107.4, 107.4, 107.4],
       [107.4,107.4,107.4],
       [107.4,107.4,107.4],
       [107.4, 107.4,107.4]])
```
### 矩阵乘法
Product of Matrices
- 矩阵 \(A \in \mathbb{R}^{m ×k}\) 和 \(B \in \mathbb{R}^{k ×n}\) 的乘积
Product of Matrices \(A \in \mathbb{R}^{m ×k}\) and \(B \in \mathbb{R}^{k ×n}\) 
\[C=A B \in \mathbb{R}^{m × n} C_{i, j}=\sum_{k} A_{i, k} B_{k, j}\]
例如：
\[E.g. A=\left[\begin{array}{lll}1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9\end{array}\right] B=\left[\begin{array}{lll}11 & 14 & 17 \\ 12 & 15 & 18 \\ 13 & 16 & 19\end{array}\right]\]
\[C=\left[\begin{array}{lll}1 × 11+4 × 12+7 × 13 & 1 × 14+4 × 15+7 × 16 & 1 × 17+4 × 18+7 × 19 \\ 2 × 11+5 × 12+8 × 13 & 2 × 14+5 × 15+8 × 16 & 2 × 17+5 × 18+8 × 19 \\ 3 × 11+6 × 12+9 × 13 & 3 × 14+6 × 15+9 × 16 & 3 × 17+6 × 18+9 × 19\end{array}\right]\]
### Python中的矩阵乘法
Matrix multiplication in Python
```python
In[65]:import numpy as np
In [66]:A1=np.array([[1,4,5], [-5,8,9]])
In [67]:B1=np.array([[1,1,1], [2,1,1]])
In [68]:A1.shape
Out[68]:(2,3) 
In [69]:B1.transpose().shape 
Out[69]:(3,2)
In[70]:A1.dot(B1.transpose()) 
Out[70]:
array([[10, 11], 
       [12, 7]])
```
### 矩阵 - 向量乘积的几何解释
Geometric interpretation of matrix-vector product
- 给定一个方阵 \(A \in \mathbb{R}^{n ×n}\) 和一个向量 \(x \in \mathbb{R}^{n}\)
Given a square matrix \(A \in \mathbb{R}^{n ×n}\) and a vector \(x \in \mathbb{R}^{n}\)
- 向量 \(y = Ax\) 是一个和 \(x\) 一样的n维向量，即 \(y \in \mathbb{R}^{n}\)
The vector \(y=A x\) is a n -dimensional vector like x , i.e. \(y \in \mathbb{R}^{n}\)
- 矩阵 \(A\) 是一个线性变换（准确地说是“仿射变换”），它“移动”向量空间中的点，从而“扭曲”向量空间中的图形。
The matrix A is a linear application ("affine application" to be precise) which "moves" the points of a vector space, thus "distorting figures" in the vector space
如果矩阵是长方形的呢？
… and if the matrix is rectangular?
- 给定一个长方形矩阵 \(A \in \mathbb{R}^{m ×n}\) 和一个向量 \(x \in \mathbb{R}^{n}\) ，且 \(m < n\)
Given a rectangular matrix \(A \in \mathbb{R}^{m ×n}\) and a vector \(x \in \mathbb{R}^{n}\) , with \(m<n\)
- 向量 \(y = Ax\) 是一个m维向量。
The vector \(y=A x\) is a m -dimensional vector
- 因此，\(y\) 是 \(x\) 在低维空间中的投影。\(x\) 是n维空间中的一个点，\(y\) 是m维空间中的一个点（\(m < n\)）。
Hence, y is the projection of x in a lower dimensional space. x is a point of the n -dimensional space . y is a point of the m dimensional space ( \((m<n)\)
- 因此，矩阵 \(A\) 对 \(x\) 起到了投影的作用。
Hence, the matrix A acts on X as a projection
### 其他重要的乘积
Other important products
- \(A\) 和 \(B\)（\(A,B \in \mathbb{R}^{n}\)）的按元素乘积 \(C = A \odot B\)
Element-wise Product of A & B(\(A,B \in \mathbb{R}^{n}\)) \(C=A \odot B\) 
- 向量 \(x \in \mathbb{R}^{m}\) 和 \(y \in \mathbb{R}^{n}\) 的点积 \(x^{T} y \in \mathbb{R}\) 
Dot product of vector \(x \in \mathbb{R}^{m}\) & \(y \in \mathbb{R}^{n}\) \(x^{T} y \in \mathbb{R}\) 
例如：
\[E.g. x^{T}=\left[\begin{array}{lll}1 & 2 & 3\end{array}\right] y=\left[\begin{array}{l}5 \\ 6 \\ 7\end{array}\right] x^{T} y=1 × 5+2 × 6+3 × 7\]
- 向量 \(x \in \mathbb{R}^{m}\) 和 \(y \in \mathbb{R}^{n}\) 的外积 \(x y^{T} \in \mathbb{R}^{m×n}\) 
Outer product of vectors \(x \in \mathbb{R}^{m}\) & \(y \in \mathbb{R}^{n}\) \(x y^{T} \in \mathbb{R}^{m×n}\) 
例如：
\[E.g. x=\left[\begin{array}{l}1 \\ 2 \\ 3\end{array}\right] y^{T}=\left[\begin{array}{lll}5 & 6 & 7\end{array}\right] x y^{T}=\left[\begin{array}{lll}1 × 5 & 1 × 6 & 1 × 7 \\ 2 × 5 & 2 × 6 & 2 × 7 \\ 3 × 5 & 3 × 6 & 3 × 7\end{array}\right]\]
### Python中的按元素乘积
Element-wise product in Python
```python
In [1]:import numpy as np
In [2]:A1=np.array([[1,4,5], [-5,8,9]])
In [3]:B1=np.array([[1,1,1], [2,1,1]])
In[4]:Pe=np.multiply(A1,B1)
In[5]:Pe
Out[5]:
array([[1, 4, 5],
       [-10, 8, 9]])
```
### Python中的向量点积和外积
Vector dot and outer products in Python
```python
In [5]:import numpy as np
In [6]:A=np.array([[1,4,5],[-5,8,9]])
In[7]:A 
Out[7]: 
array([[1, 4, 5],
       [-5, 8, 9]])
In [8]:#向量A[0]和A[1]的内积
In[9]:np.dot(A[0],A[1])
Out[9]:72
In[10]:#向量A[0]和A[1]的外积
In[11]:np.outer(A[0],A[1])
Out[11]:
array([[-5, 8, 9],
       [-20, 32, 36],
       [-25, 40, 45]])
```
### （方阵）矩阵的逆和单位矩阵
Inverse of a (Square) Matrix and Identity Matrix
单位矩阵：
\[I=\left[\begin{array}{cccc}1 & 0 & \cdots & 0 \\ 0 & 1 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 1\end{array}\right]\]
矩阵 \(A\) 的逆矩阵 \(A^{-1}\) 满足：
Matik inverse \(A^{-1}\) of \(A\) satisfies: 
\[A^{-1} A=I \quad\left(A A^{-1}=I\right)\]
为什么矩阵求逆很有用？
Why powerful? 
\[A x=b A^{-1} A x=A^{-1} b I x=A^{-1} b x=A^{-1} b\]
### Python中的矩阵求逆
Matrix Inversion in Python
```python
In[22]:import numpy as np
In[23]:A=np.array([[1,4,5],[-5,8,9],[1,2,3]])
In[24]:A
Out[24]:
array([[ 1, 4, 5],
       [-5, 8, 9],
       [ 1, 2, 3]])
In[25]:A_inv=np.linalg.inv(A)
