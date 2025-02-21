# 股票价格预测
Kaiyang Zhou
https://kaiyangzhou.github.io/

香港浸會大學 HONG KONG BAPTIST UNIVERSIT
DEPARTMENT OF COMPUTER SCIENCE
計算機科學系
## 让我们从线性回归开始
- **任务**：预测标量值目标
Task: Predict scalar-valued targets
- **流程**
Pipeline:
    - 选择一个描述感兴趣变量之间关系的模型
choose a model describing the relationships between variables of interest
    - 定义一个损失函数，用于量化模型与数据的拟合程度
define a loss function quantifying how bad the fit to the data is
    - 选择一个正则化项，表明我们对不同候选模型（或数据解释）的偏好程度
choose a regulariser saying how much we prefer different candidate models (or explanations of data)
    - 通常使用优化算法，拟合一个能最小化损失函数且满足正则化项所施加约束/惩罚的模型
fit a model that minimises the loss function and satisfies the constraint/penalty imposed by the regulariser, often using an optimisation algorithm
来源：维基百科
Credit: https://www.cs.toronto.edu/~rahulgk/courses/csc311_f22/index.html
## 监督学习设置
- 输入$x \in \mathscr{X}$，通常是一个特征向量（或协变量）
Input $x \in \mathscr{X}$, typically a vector of features (or covariates)
- 目标$t \in \mathscr{T}$（也称为响应、结果、输出、类别）
Target $t \in \mathscr{T}$ (a.k.a. response, outcome, output, class)
- 目标是基于一些数据$\mathscr{D}=\left\{\left(x^{(i)}, t^{(i)}\right), i = 1,2, ..., N\right\}$学习一个函数$f: \mathscr{X} \to \mathscr{T}$，使得$t ≈ y = f(x)$
The objective is to learn a function $f: \mathscr{X} \to \mathscr{T}$ such that $t ≈ y = f(x)$ based on some data $\mathscr{D}=\left\{\left(x^{(i)}, t^{(i)}\right), i = 1,2, ..., N\right\}$
Credit: https://www.cs.toronto.edu/~rahulgk/courses/csc311_f22/index.html
## 模型
- 在线性回归中，我们使用特征$x = (x_{1}, ..., x_{D}) \in \mathbb{R}^{D}$的线性函数来预测目标值$t \in \mathbb{R}$
In linear regression, we use a linear function of the features$x=(x_{1}, ..., x_{D}) \in \mathbb{R}^{D}$ to make predictions y of the target value $t \in \mathbb{R}$ 
$y = f(x)=\sum_{j} w_{j} x_{j}+b$
    - $y$：预测值
y : prediction
    - $w$：权重
w : weights
    - $b$：偏差（或截距）
b : bias (or intercept)
    - $w$和$b$共同构成待学习的参数
w and b together are the parameters (to be learned)
- 我们希望预测值接近目标值：$y ≈ t$
We hope that our prediction is close to the target: $y ≈ t$
Credit: https://www.cs.toronto.edu/~rahulgk/courses/csc311_f22/index.html
## 单特征与多特征
- 如果只有1个特征：$y = wx + b$，其中$w, x, b \in \mathbb{R}$
If we only have 1 feature: $y = wx + b$ where $w, x, b \in \mathbb{R}$
- 如果有$D$个特征：$y = w^{T}x + b$，其中$w, x \in \mathbb{R}^{D}$且$b \in \mathbb{R}$
If we have D features: $y = w^{T}x + b$ where $w, x \in \mathbb{R}^{D}$ and $b \in \mathbb{R}$
- 在这两种情况下，预测值与输入之间的关系都是线性的
The relation between the prediction and the input is linear in both cases
Credit: https://www.cs.toronto.edu/~rahulgk/courses/csc311_f22/index.html
## 损失函数
- 损失函数$\mathscr{L}(y, t)$定义了预测值$y$与目标值$t$之间的差异程度
A loss function $\mathscr{L}(y, t)$ defines how dissimilar is between the prediction y and the target t
- 均方误差损失函数：$\mathscr{L}(y, t)=\frac{1}{2}(y - t)^{2}$
Squared error loss function: $\mathscr{L}(y, t)=\frac{1}{2}(y - t)^{2}$
    - 目标是使残差$(y - t)$的幅度较小
Aim to make the residual $(y - t)$ small in magnitude
    - $\frac{1}{2}$这个因子只是为了使计算更方便
The $\frac{1}{2}$ factor is just to make the calculations more convenient
- 代价函数：损失函数在所有训练样本上的平均值
Cost function: loss function averaged over all training examples
$\begin{aligned} \mathscr{J}(w, b) & =\frac{1}{2N} \sum_{i=1}^{N}\left(y^{(i)}-t^{(i)}\right)^{2} \\ & =\frac{1}{2N} \sum_{i=1}^{N}\left(w^{T} x^{(i)}+b-t^{(i)}\right)^{2} \end{aligned}$
Credit: https://www.cs.toronto.edu/~rahulgk/courses/csc311_f22/index.html
## 优化
### 直接求解
- 目标：$\min _{w} \mathscr{J}(w)=\frac{1}{2}\| X w - t\| ^{2}$
objective: $\min _{w} \mathscr{J}(w)=\frac{1}{2}\| X w - t\| ^{2}$
- 梯度：$\nabla_{w} \mathscr{J}(w)=X^{T} X w - X^{T} t = 0$
gradient: $\nabla_{w} \mathscr{J}(w)=X^{T} X w - X^{T} t = 0$
- 解：$w^{*}=(X^{T} X)^{-1} X^{T} t$
solution: $w^{*}=(X^{T} X)^{-1} X^{T} t$
### 迭代求解
- 反复应用一个更新规则，使我们逐渐接近最优解
repeatedly apply an update rule that gradually takes us closer to the solution
- 梯度下降：$w_{j}=w_{j}-\alpha \frac{\partial \mathscr{J}}{\partial w_{j}}$，其中$\alpha > 0$是学习率（或步长；通常较小，如0.01或0.001 ）
gradient descent: $w_{j}=w_{j}-\alpha \frac{\partial \mathscr{J}}{\partial w_{j}}$ where $\alpha > 0$ is learning rate (or step size; typically small, e.g., 0.01 or 0.001)
Credit: https://www.cs.toronto.edu/~rahulgk/courses/csc311_f22/index.html
## 正则化
### 为什么要正则化？
- 得到更简单的模型
simpler model
- 减少过拟合
reduce overfitting
### 岭回归（L2惩罚）
$\mathscr{J}(w)+\lambda\| w\| _{2}^{2}$
Ridge regression (L2 penalty): $\mathscr{J}(w)+\lambda\| w\| _{2}^{2}$
### Lasso回归（L1惩罚）
$\mathscr{J}(w)+\lambda\| w\| _{1}$
Lasso regression (L1 penalty): $\mathscr{J}(w)+\lambda\| w\| _{1}$
### 弹性网络回归（L1 + L2）
$\mathscr{J}(w)+\lambda_{1}\| w\| _{1}+\lambda_{2}\| w\| _{2}^{2}$
Elastic net regression (L1 + L2): $\mathscr{J}(w)+\lambda_{1}\| w\| _{1}+\lambda_{2}\| w\| _{2}^{2}$
## 应用
### 经济学
- 基于投资、消费和政府支出等因素预测GDP增长等经济指标
predict economic indicators such as GDP growth based on factors like investment, consumption, and government spending
- 分析失业率与通货膨胀之间的关系
analyse the relationship between unemployment rates and inflation
### 金融
- 根据历史数据和相关财务指标预测股票价格
predict stock prices based on historical data and relevant financial indicators
- 评估利率对债券价格和收益率的影响
assess the impact of interest rates on bond prices and yields
### 市场营销
- 基于广告支出、定价和市场人口统计数据估计产品的销售额
estimate the sales of a product based on advertising expenditure, pricing, and market demographics
- 分析客户行为以优化营销策略
analyse customer behaviour to optimise marketing strategies
### 医疗保健
- 根据各种医疗参数（心率、血压、体温、年龄等）预测患者的治疗结果
predict patient outcomes based on various medical parameters (heart rate, blood pressure, temperature, age, etc.)
- 分析生活方式因素（饮食、活动、睡眠、压力等）与健康状况（心血管疾病、糖尿病、癌症、抑郁症等）之间的关系
analyse the relationship between lifestyle factors (diet, activity, sleep, stress, etc.) and health conditions (cardiovascular diseases, diabetes, cancer, depression, etc.)
### 教育
- 根据学习时间、出勤率和社会经济背景等因素预测学生的成绩
predict student performance based on factors such as study time, attendance, and socio-economic background
- 评估教学方法和干预措施的有效性
evaluate the effectiveness of teaching methods and interventions
### 环境科学
- 模拟环境因素（如污染水平、温度）对公众健康的影响
model the impact of environmental factors (e.g., pollution levels, temperature) on public health
- 根据气候变量预测生态系统的变化
predict changes in ecosystems based on climate variables
## 序列数据呢？
### 金融数据
股票价格（交易和投资分析）
(Unable to model temporal dependencies)
### 销售数据
零售销售数据（未来销售预测）
$y=f_{W}(x)$
### 天气数据
每小时温度读数（趋势分析和预测）
客户数量随时间的变化
……以及更多
## 循环神经网络（RNN）
- RNN具有一个内部状态，该状态在处理序列时会不断更新
RNN has an internal state that is updated as a sequence is processed
$h_{t}=f_{W}\left(h_{t-1}, x_{t}\right)$ 某个带有参数$W$的函数
在时间步$t$的输入向量
注意：在每个时间步都使用相同的函数和参数
NOTE: The same function and parameters are used at every time step
### RNN计算图
初始状态（设置为0或通过学习得到）
相同的参数被重复使用
### RNN计算图（多对多）
### RNN计算图（多对一）
情感分析
目前为止我的体验太棒了！产品还行。你们的客服团队没用。
正面 负面
### RNN计算图（一对多）
来源：使用带位置约束的预测RNN进行交互式音乐生成
## 随时间反向传播
- 计算速度慢（序列较长时）
Slow computation (long sequence)
- 梯度消失或梯度爆炸
Exploding or vanishing gradient
$h_{t}=\tanh \left(W_{h h} h_{t-1}+W_{x h} x_{t}+b_{h}\right)$
从$h_{t}$到$h_{t - 1}$的反向传播要乘以$W_{h h}^{T}$（较早的步骤会涉及很多个$W_{h h}^{T}$，并且有重复的tanh运算）
Backpropagation from $h_{t}$ to $h_{t-1}$ multiplies by $W_{h h}^{T}$ (earlier steps would involve many factors of $W_{h h}^{T}$ and repeated tanh)
- 计算速度慢（序列较长时）
Slow computation (long sequence)
- 梯度消失或梯度爆炸（$W$的最大奇异值大于1。想象一下10连乘10次的情况）
Exploding or vanishing gradient (Largest singular value of $W>1$. Think about multiplying 10 by 10 times.)
$h_{t}=\tanh \left(W_{h h} h_{t-1}+W_{x h} x_{t}+b_{h}\right)$
从$h_{t}$到$h_{t - 1}$的反向传播要乘以$W_{h h}^{T}$（较早的步骤会涉及很多个$W_{h h}^{T}$，并且有重复的tanh运算）
Backpropagation from $h_{t}$ to $h_{t-1}$ multiplies by $W_{h h}^{T}$ (earlier steps would involve many factors of $W_{h h}^{T}$ and repeated tanh)
- 计算速度慢（序列较长时）
Slow computation (long sequence)
- 梯度消失或梯度爆炸（$W$的最大奇异值小于1。想象一下0.1连乘10次的情况）
Exploding or vanishing gradient(Largest singular value of $W<1$. Think about multiplying 0.1 by 10 times.) 
$h_{t}=\tanh \left(W_{h h} h_{t-1}+W_{x h} x_{t}+b_{h}\right)$
从$h_{t}$到$h_{t - 1}$的反向传播要乘以$W_{h h}^{T}$（较早的步骤会涉及很多个$W_{h h}^{T}$，并且有重复的tanh运算）
Backpropagation from $h_{t}$ to $h_{t-1}$ multiplies by $W_{h h}^{T}$ (earlier steps would involve many factors of $W_{h h}^{T}$ and repeated tanh)
## 长短期记忆网络（LSTM）
- 遗忘门：$f_{t}=\sigma\left(W_{f} x_{t}+U_{f} h_{t-1}+b_{f}\right)$
Forget gate: $f_{t}=\sigma\left(W_{f} x_{t}+U_{f} h_{t-1}+b_{f}\right)$
- 输入门：$i_{t}=\sigma\left(W_{i} x_{t}+U_{i} h_{t-1}+b_{i}\right)$
Input gate: $i_{t}=\sigma\left(W_{i} x_{t}+U_{i} h_{t-1}+b_{i}\right)$
- 输出门：$o_{t}=\sigma\left(W_{o} x_{t}+U_{o} h_{t-1}+b_{o}\right)$
Output gate: $o_{t}=\sigma\left(W_{o} x_{t}+U_{o} h_{t-1}+b_{o}\right)$
- 细胞输入：$\tilde{c}_{t}=\tanh \left(W_{c} x_{t}+U_{c} h_{t-1}+b_{c}\right)$
Cell input: $\tilde{c}_{t}=\tanh \left(W_{c} x_{t}+U_{c} h_{t-1}+b_{c}\right)$
- 细胞状态：$c_{t}=f_{t} \odot c_{t-1}+i_{t} \odot \tilde{c}_{t}$
Cell state: $c_{t}=f_{t} \odot c_{t-1}+i_{t} \odot \tilde{c}_{t}$
- 隐藏状态：$h_{t}=o_{t} \odot \tanh \left(c_{t}\right)$
Hidden state: $h_{t}=o_{t} \odot \tanh \left(c_{t}\right)$
来源：https://colah.github.io/posts/2015-08-Understanding-LSTMs/
### LSTM的作用机制
- 遗忘门$f_{t}=\sigma\left(W_{f} x_{t}+U_{f} h_{t-1}+b_{f}\right)$决定要保留多少过去的信息
Forget gate$f_{t}=\sigma\left(W_{f} x_{t}+U_{f} h_{t-1}+b_{f}\right)$ Decides how much to keep from the past
- 输入门$i_{t}=\sigma\left(W_{i} x_{t}+U_{i} h_{t-1}+b_{i}\right)$决定要添加哪些新信息到新的细胞状态中
Input gate $i_{t}=\sigma\left(W_{i} x_{t}+U_{i} h_{t-1}+b_{i}\right)$ Determines what new information to be added to the new cell state
- 输出门$o_{t}=\sigma\left(W_{o} x_{t}+U_{o} h_{t-1}+b_{o}\right)$决定细胞状态的哪一部分作为隐藏状态输出
Output gate $o_{t}=\sigma\left(W_{o} x_{t}+U_{o} h_{t-1}+b_{o}\right)$ Decides what part of the cell state to output as the hidden state
- 细胞状态$c_{t}=f_{t} \odot c_{t-1}+i_{t} \odot \tilde{c}_{t}$ ，$f$表示遗忘过去的某些信息，$i$表示向细胞状态添加新信息
Cell state $c_{t}=f_{t} \odot c_{t-1}+i_{t} \odot \tilde{c}_{t}$ ，f: forgets something in the past，i: adds something new to the cell state
- 隐藏状态$h_{t}=o_{t} \odot \tanh \left
从“从$c_t$到$c_{t - 1}$的反向传播……”开始继续翻译：
- 从$c_t$到$c_{t - 1}$的反向传播仅涉及通过$f$（$f < 1$，所以不会出现梯度爆炸；如果$f$接近1，也不会出现梯度消失）进行的逐元素乘法，而没有矩阵乘法。这样可以实现不间断的梯度流动。
Backpropagation from $c_{t}$ to $c_{t-1}$ involves only element-wise multiplication by $f$ ($< 1$ so no explosion; if close to 1, no vanishing), no matrix multiplication. Uninterrupted gradient flow.
## 长短期记忆网络（LSTM）的应用
- **雷达目标分类**：在MATLAB中使用长短期记忆（LSTM）循环神经网络对雷达回波进行分类。
Radar Target Classification: Classify radar returns using a Long Short-Term Memory (LSTM) recurrent neural network in MATLAB. > 查看示例
See example
- **心电图信号分类**：对记录人体心脏随时间电活动的心电图信号进行分类，判断是正常还是房颤。
Classifying ECG Signals: Categorize ECG signals, which record the electrical activity of a person's heart over time, as Normal or AFib. > 查看示例
See example
- **关键词检测**：当用户说出预定义关键词时唤醒系统。
Keyword Spotting: Wake up a system when a user speaks a predefined keyword. > 查看示例
See example
- **视频分类**：结合预训练的图像分类模型和LSTM网络对视频进行分类。
Video Classification: Classify video by combining a pretrained image classification model and an LSTM network. > 查看示例
See example
- **文本生成**：训练一个深度学习LSTM网络逐字生成文本。
Text Generation: Train a deep learning LSTM network to generate text word-by-word. > 查看示例
See example
- **水分配系统调度**：使用强化学习（RL）为水分配系统生成最优的水泵调度策略。
Water Distribution System Scheduling: Generate an optimal pump scheduling policy for a water distribution system using reinforcement learning (RL).
来源：www.mathworks.com
## 门控循环单元（GRU）
- 更新门：$z_t = \sigma(W_zx_t + U_zh_{t - 1} + b_z)$
Update gate: $z_{t}=\sigma\left(W_{z} x_{t}+U_{z} h_{t-1}+b_{z}\right)$
- 重置门：$r_t = \sigma(W_rx_t + U_rh_{t - 1} + b_r)$
Reset gate: $r_{t}=\sigma\left(W_{r} x_{t}+U_{r} h_{t-1}+b_{r}\right)$
- 新输入：$\hat{h}_t = \tanh(W_hx_t + U_h(r_t \odot h_{t - 1}) + b_h)$
New input: $\hat{h}_{t}=\tanh \left(W_{h} x_{t}+U_{h}\left(r_{t} \odot h_{t-1}\right)+b_{h}\right)$
- 输出：$h_t = (1 - z_t) \odot h_{t - 1} + z_t \odot \hat{h}_t$
Output: $h_{t}=\left(1-z_{t}\right) \odot h_{t-1}+z_{t} \odot \hat{h}_{t}$ 
Cho等人，《使用RNN编码器 - 解码器学习短语表示用于统计机器翻译》，EMLNP’14。
Cho et al. Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation. EMLNP’14.
## 今日实验
（此处展示了一些股票数据，如股票价格、市盈率、股息等，因无实际翻译需求，保留原文）
Mt Caoy 3.16T PE 38.46 Thvesa 1 +2.44%
Arnuai Divident.2.86 C 20.12
Volane: 34,157,296
Opent As Mit Capx 2.20T
Annuil Dhident 0.16
966.400 Last Yielt 0.02%
M176.21%
VMirosoft Corp.(Dally)425.22 HA(50 4154
NVADI Cop (Daliy89.44 950 25%
179.44 
750
631
650
600
550
6094
450
400
175M 150M 350
125M 100M 300
75M 
250
stockcharts.com
## 拓展阅读
- Hochreiter, S.《长短期记忆》，《神经计算》，麻省理工学院出版社（1997年）。
Hochreiter, S. "Long Short-term Memory." Neural Computation MITPress (1997).
- Cho等人，《使用RNN编码器 - 解码器学习短语表示用于统计机器翻译》，arXiv预印本arXiv:1406.1078（2014年）。
Cho et al. "Learning phrase representations using RNN encoder-decoder for statistical machine translation." arXiv preprint arXiv:1406.1078 (2014).
- Sutskever, I., Vinyals, O., & Le, Q.V. （2014年）。《神经网络的序列到序列学习》，《神经信息处理系统进展》（NeurIPS）。
Sutskever, I., Vinyals, O., & Le, Q.V. (2014). "Sequence to Sequence Learning with Neural Networks." Advances in Neural Information Processing Systems (NeurIPS).
- Bahdanau, D., Cho, K., & Bengio, Y. （2014年）。《通过联合学习对齐和翻译进行神经机器翻译》，arXiv。
Bahdanau, D., Cho, K., & Bengio, Y. (2014). "Neural Machine Translation by Jointly Learning to Align and Translate." arXiv.

快乐编码！
Happy Coding
