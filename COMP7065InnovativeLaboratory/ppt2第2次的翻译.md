# 面部地标检测
Kaiyang Zhou
https://kaiyangzhou.github.io/

香港浸會大學 HONG KONG BAPTIST UNIVERSIT
DEPARTMENT OF COMPUTER SCIENCE
計算機科學系
## 卷积神经网络（CNN）
Deep CNN F1
39 36 2 18卷积 16 8卷积 "全连接
输入 39卷积 36 20 2最大池化 18 20 16 40最大池化 40 3 60最大池化 60 80全连接 120 10
Sun等人. 用于面部关键点检测的深度卷积网络级联. CVPR 2013.
### 卷积神经网络（CNN）
- 卷积层
Convolution Layers
- 池化层
Pooling Layers
- 全连接层
Fully-Connected Layers
224x224x64
池化 112x112x64
224 224下采样 112 112
X h S
激活函数
Activation Function
归一化
Normalization
\[\hat{x}_{i, j}=\frac{x_{i, j}-\mu_{j}}{\sqrt{\sigma_{j}^{2}+\varepsilon}}\]
https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/
CLASS torch.nn.Conv2d(in_channels, out_channels, kernel_size, stride=1, padding=, dilation=1, groups=1, bias=True, padding_mode='zeros', device=None, dtype=None)[SOURCE]
CLASS torch.nn.MaxPool2d(kernel_size, stride=None, padding=, dilation=, return_indices=False, ceil_mode=False) [SOURCE]
CLASS torch.nn.Linear(in_features, out_features, bias=True, device=None, dtype=None) [SOURCE]
CLASS torch.nn.BatchNorm2d(num_features, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True, device=None, dtype=None) [SOURCE]
CLASS torch.nn.ReLU(inplace=False) [SOURCE]
https://pytorch.org/
```python
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 6, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc1 = nn.Linear(16*5*5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = torch.flatten(x, 1)  # 展平除批次维度外的所有维度
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

net = Net()
```
https://pytorch.org/
### ResNet
优化问题：更深的神经网络更难训练
(%)OTo gninien
56层
(%)0T1e e9t
20层
56层
20层
iter.(1e4) iter.(1e4)
图1. 在CIFAR-10数据集上，20层和56层“普通”网络的训练误差（左）和测试误差（右）。更深的网络具有更高的训练误差，因此测试误差也更高。在ImageNet上也有类似现象，见图4。
深度残差学习用于图像识别
KHe, XZhang, S Ren, Sun - Proceedings of the IEEE... - pnaces.steot.com
更深的神经网络更难训练，我们提出了残差学习框架，以简化比以前使用的网络深得多的网络的训练。Save99 Cite Cited by 200137 Related articles All 76 versions
权重层
F(x) 权重层 relu 恒等映射 X
F(x)+x relu
34层普通网络 34层残差网络
### Mobilenets：用于移动视觉应用的高效卷积神经网络
AG Howard, MZhu, B Chen, D Kalenichenko... aXi - preprint arXiv... 2012 - arxiv.org
名为MobileNets的模型用于移动和嵌入式视觉应用。我们展示了MobileNets在广泛应用中的有效性。Save99 Cite Cited by 23475 Related articles All 10 versions
#### MobileNet
3x3卷积 3x3深度可分离卷积
BN BN
ReLU ReLU
1x1卷积
BN
ReLU
图3. 左：带有批归一化和ReLU的标准卷积层。右：带有深度卷积和逐点卷积层，后跟批归一化和ReLU的深度可分离卷积。
关键思想是将一个DxDxM的滤波器分解为一个DxDx1的滤波器和一个1x1xM的滤波器。
3x3深度可分离卷积消耗的计算量减少8到9倍，性能仅有小幅下降。
(a) 标准卷积滤波器
(b) 深度卷积滤波器
(c) 1x1卷积滤波器 在深度可分离卷积的背景下的卷积
图2. (a)中的标准卷积滤波器被两层取代：(b)中的深度卷积和(c)中的逐点卷积，以构建深度可分离滤波器。
## 面部地标检测
显著的面部特征：眉毛、眼睛、鼻子、嘴巴、下巴
source: https://github.com/1adrianb/face-alignment
- 面部关键点
Facial key points
- 插值地标（面部轮廓）注释
Interpolated landmarks (face contour)Annotations
(a) Helen (b) Multi-PIE
(c) LFPW (d) IBUG, AFW
Smith和Zhang. 用于跨数据集转移注释的协作式面部地标定位. ECCV 2014.
### 应用
- 人脸对齐
Face alignment
- 面部表情分析
Facial expression analysis
- 驾驶辅助
Driving assistant
- 娱乐
Entertainment
- 人脸重建
Face reconstruction
### 挑战
大姿态、表情、光照、化妆、遮挡、模糊
Wu等人. “看向边界：一种边界感知的人脸对齐算法。” 《IEEE计算机视觉与模式识别会议论文集》. 2018.
### 评估
- 检测位置：\(d_{i}={d_{x, i}, d_{y, i}}\)， 真实位置：\(g_{i}={g_{x, i}, g_{y, i}}\)
Detected locations: \(d_{i}={d_{x, i}, d_{y, i}}\) & ground truth: \(g_{i}={g_{x, i}, g_{y, i}}\)
- 检测误差：\(e=\frac{1}{N} \sum_{i=1}^{N}\left\|d_{i}-g_{i}\right\|_{2}\)（不同人脸大小存在尺度问题）
Detection error: \(e=\frac{1}{N} \sum_{i=1}^{N}\left\|d_{i}-g_{i}\right\|_{2}\) (there is scale issue with different face sizes)
- 两眼间距离。\(g_{le }\)：左瞳孔中心。\(g_{r e}\)：右瞳孔中心。
Inter-ocular distance. \(g_{le }\) : left pupil centre. \(g_{r e}\) : right pupil centre.
归一化检测误差：\(e=\frac{1}{N} \sum_{i=1}^{N} \frac{\left\|d_{i}-g_{i}\right\|_{2}}{\left\|g_{l e}-g_{r e}\right\|_{2}}\)
\[NME=1.82 \%\]
\[NME =3.14 \%\]
\[NME =4.37 \%\]
\[NME =8.93 \%\]
\[NME =4.87 \%\]
\[NME =3.80 \%\]
\[NME =5.74 \%\]
Jin等人. 像素内像素网络：迈向野外高效面部地标检测. IJCV 2021.
### 基于深度学习的方法
学习一个将像素映射到2D坐标的函数——一个回归问题
- 输入：面部区域
Input: face region
- 输出：地标
Output: landmarks
均方误差损失：\(\arg \min_{\theta} \sum_{i=1}^{N} ||d_{i} - g_{i}||^{2}\)
### 案例研究
绿色：预测值 红色：真实值
1. 下载数据集
Download the dataset
- http://mmlab.ie.cuhk.edu.hk/archive/CNN/data/train.zip
- 5,590张LFW图像和7,876张网络图像。训练集：10,000；测试集：3,466；每行：图像名称、边界框（4个值）、地标（5x2个值）
2. 分析数据集（待办事项：打印统计信息，可视化地标）
Analyse the dataset (todo: print statistics, visualise landmarks)
3. 构建训练和测试数据加载器
Build train & test data loaders
4. 构建模型（CNN）、优化器和损失函数
Build model (CNN), optimiser, and loss
5. 构建训练循环
Build train loop
6. 评估模型（待办事项：计算归一化误差，可视化预测和标签）
Evaluate the model (todo: compute normalised error, visualise preds & labels)
## 练习
1. 下载数据集
Download the dataset
- https://wywu.github.io/projects/LAB/WFLW.html
2. 按照前面提到的相同步骤，使用当前数据集开发面部地标检测模型
Follow the same steps mentioned previously to develop a facial landmark detection model using the current dataset
3. 构建一个面部滤镜演示
Build a face filters demo
## 拓展阅读
- Wu和Ji. “面部地标检测：文献综述。”《国际计算机视觉杂志》127.2 (2019): 115-142.
Wu and Ji. "Facial landmark detection: A literature survey." International Journal of Computer Vision 127.2 (2019): 115-142.
- Ioffe和Szegedy. 批归一化：通过减少内部协变量偏移加速深度网络训练. ICML’15.
Ioffe and Szegedy. Batch normalization: accelerating deep network training by reducing internal covariate shift. ICML’15.
- He等人. “深度残差学习用于图像识别。”《IEEE计算机视觉与模式识别会议论文集》. 2016.
He et al. "Deep residual learning for image recognition." Proceedings of the IEEE conference on computer vision and pattern recognition. 2016.
- Howard等人. MobileNets：用于移动视觉应用的高效卷积神经网络。
Howard et al. MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications.

Happy Coding! 
