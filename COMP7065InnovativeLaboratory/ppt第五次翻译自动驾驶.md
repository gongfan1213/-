### 自动驾驶
- Kaiyang Zhou：https://kaiyangzhou.github.io/
- 香港浸会大学计算机科学系

### 自动驾驶汽车成为现实！
- **来源**：Bloomberg
- **新闻**：百度获得中国首批完全无人驾驶出租车运营许可，科技巨头将在武汉和重庆运营机器人出租车，此前车内必须有人在紧急情况下接管车辆。
- **百度的完全无人驾驶机器人出租车**：来源：百度公司
- **作者**：Zheping Huang
- **时间**：2022年8月8日上午9:45（GMT+8）
- **相关网址**：https://www.bloomberg.com/news/articles/2022-08-08/baidu-wins-approval-for-china-s-first-full-driverless-taxis；https://www.robotgo.com/

### SAE国际 J3016“驾驶自动化等级”
- **学习网址**：sae.org/standards/content/j3016_202104
- **版权声明**：版权归2021 SAE国际所有。此汇总表可原样自由复制和分发，但需注明SAE国际为内容来源。
- **SAE 0级**：您必须始终监督这些辅助功能；即使您的脚离开踏板且没有转向，在这些驾驶员辅助功能启用时，您仍在驾驶。
- **SAE 1级**：这些是驾驶员辅助功能，仅限于在有限条件下为驾驶员提供转向或制动/加速支持，并且在所有必要条件满足之前不会运行。
- **SAE 2级**：这些功能在有限条件下为驾驶员提供转向和制动/加速支持（例如车道居中），您必须根据需要进行转向、制动或加速以确保安全。
- **SAE 3级**：这些是自动驾驶功能，在功能开启时您无需驾驶，即使您坐在驾驶座上；但当系统发出请求时，您必须随时接管驾驶。
- **SAE 4级**：这些功能可以在特定条件下自动驾驶车辆，但可能并非在所有地方都能使用。
- **SAE 5级**：此功能可以在所有条件下自动驾驶车辆。

### 自动驾驶汽车的工作原理
- **GPS信号**：全球定位系统（GPS）的信号与转速计、高度计和陀螺仪的读数相结合，提供比单独使用GPS更精确的定位。
- **激光雷达（LiDAR）传感器**：发射光脉冲并分析反射光，以识别车道标记和道路边缘。
- **摄像头**：检测交通信号灯、读取道路标志、跟踪其他车辆的位置，并留意道路上的行人和障碍物。
- **雷达传感器**：监测附近其他车辆的位置，已用于自适应巡航控制系统。
- **超声波传感器**：测量靠近车辆的物体的位置，所有传感器的信息由中央计算机分析，该计算机控制转向、加速和制动，其软件必须理解正式和非正式的交通规则。

### 特斯拉视觉系统更新：用特斯拉视觉取代超声波传感器
- **安全核心**：安全是我们设计和工程决策的核心。2021年，我们开始向特斯拉视觉系统过渡，从Model 3和Model Y车型上移除雷达，2022年扩展到Model S和Model X。如今，在全球大多数地区，这些车辆依赖基于摄像头的Autopilot系统——特斯拉视觉。
- **性能提升**：自推出以来，我们在功能对等性和安全性方面不断改进。与配备雷达的车辆相比，搭载特斯拉视觉的Model 3和Model Y在美国和欧洲的主动安全评级保持不变或有所提高，在行人自动紧急制动（AEB）干预方面表现更好。
- **进一步升级**：2022年，我们在大多数全球市场的Model 3和Model Y上移除了超声波传感器（USS），2023年扩展到所有Model S和Model X。同时，推出基于视觉的占用网络（目前用于完全自动驾驶（FSD）（有监督）功能），以取代USS产生的输入。通过当前软件，这种方法为Autopilot提供高清空间定位、更远的可视范围以及识别和区分物体的能力。与特斯拉的许多功能一样，我们的占用网络将随着时间快速改进。
- **未来信心**：鉴于特斯拉视觉系统已取得的逐步改进，以及我们未来Autopilot功能改进和能力提升的路线图，我们相信这是Autopilot未来发展和保障客户安全的最佳策略。

### 感知：目标检测
- **图像分类**：目标是为图像分配单个类别标签（图像类别）。例如：天空、树木、草地、柱子、汽车等。
- **语义分割**：目标是为图像中的每个像素分配语义标签（物体和场景元素）。
- **目标检测**：目标是定位（边界框）并分类图像中的所有物体。
- **实例分割**：目标是为物体的每个像素分配语义和实例标签。

### 分类与检测的区别
- **分类**：问题：这张图像中有什么？ 模型回答：“狗”
- **检测**：问题：这张图像中有什么，它在哪里？ 模型回答：“狗” & (x, y, width, height)，其中(x, y)是边界框的左上角坐标，width和height是边界框的宽度和高度。也可能有多个物体，如“狗” & (x1, y1, w1, h1)，“猫” & (x2, y2, w2, h2)。
- **边界框比较**：使用交并比（Intersection over Union）来比较两个边界框，即交集面积与并集面积的比值。

### 目标检测发展历程
- **传统检测方法**：Viola Jones检测器（2001年），HOG检测器（2005年），可变形部件模型（DPM，2008 - 2010年）。
- **基于深度学习的检测方法**：R-CNN（2014年），Fast R-CNN（2015年），Faster R-CNN（2015年），YOLO（2016 - 2017年），SSD（2016年），Retina-Net（2017年），CornerNet（2018年），CenterNet（2019年），DETR（2020年）。
- **发展趋势**：从传统方法到基于深度学习的方法，包括端到端检测、边界框回归、多分辨率检测、难负样本挖掘、无参考检测、多参考检测（锚框）、特征融合等技术的应用。

### Viola Jones检测器
- **论文标题**：Rapid Object Detection using a Boosted Cascade of Simple Features
- **作者**：Paul Viola，Michael Jones
- **机构**：Compaq CRL（Paul Viola）；Mitsubishi Electric Research Labs（Michael Jones）
- **成果**：在CPU上实现实时人脸检测。
- **方法**：使用滑动窗口扫描所有位置和尺度；快速特征提取：积分图像（便于计算矩形特征）；检测级联：丢弃容易的区域（如背景），将大部分计算资源用于可能包含物体的区域。
- **参考资料**：Wikipedia: Viola–Jones object detection framework；https://cvexplained.wordpress.com/tag/sliding-windows/；Viola and Jones. Rapid Object Detection using a Boosted Cascade of Simple Features. CVPR 2001.

### HOG检测器
- **论文标题**：Histograms of Oriented Gradients for Human Detection
- **作者**：Navneet Dalal，Bill Triggs
- **机构**：INRIA Rhone-Alps
- **步骤**：量化局部图像单元内的梯度方向；形成直方图；在块内归一化直方图；连接块级描述符。
- **优势**：主要用于人体检测，但对目标检测也有效；对光照条件和对比度变化具有鲁棒性，梯度主要捕获强度变化和边缘方向，因此对绝对像素值的依赖较小；局部归一化有助于保留梯度方向。
- **参考资料**：Dallas and Triggs. Histograms of Oriented Gradients for Human Detection. CVPR 2005.

### 可变形部件模型（DPM）
- **原理**：基于不同物体部件的检测集成，使用潜在变量建模。
- **示例**：检测人可以分解为检测头部、躯干和四肢。
- **训练**：在难负样本上进行训练。
- **参考资料**：Felzenszwalb et al. Object detection with discriminatively trained part-based models. TPAMI 2009.

### 基于区域的卷积神经网络（R-CNN）
- **步骤**：使用选择性搜索生成高质量的候选区域（约2000个）；对每个调整大小后的候选区域运行CNN；运行线性SVM分类器预测类别标签；还预测每个候选区域的边界框偏移量。
- **问题**：速度非常慢！每张图像需要通过CNN进行2000次前向传播。
- **参考资料**：Uijlings et al. Selective search for object recognition. IJCV 2013.；Girshick et al., Rich feature hierarchies for accurate object detection and semantic segmentation. CVPR 2014.

### Fast R-CNN
- **关键思想**：共享计算。
- **步骤**：使用提案方法生成感兴趣区域（ROIs）；对整个图像运行CNN；将ROIs投影到特征图上（即ROI池化）。
- **问题**：区域提案生成在CPU上独立运行，显著降低了推理速度。（总时间2.3秒 - CNN时间0.32秒 = 提案时间1.98秒）
- **参考资料**：Girshick. Fast RCNN. ICCV 2015.

### Faster R-CNN
- **关键思想**：在特征图上滑动区域提案网络（RPN）。
- **锚框（Anchors）**：具有不同尺度和纵横比的边界框。
- **训练损失**：RPN分类和边界框回归、物体分类和边界框回归。
- **测试时间速度对比**：R-CNN：49秒；SPP-Net：4.3秒；Fast R-CNN：2.3秒；Faster R-CNN：0.2秒。
- **参考资料**：Ren et al. Faster r-cnn: Towards real-time object detection with region proposal networks. NeurIPS 2015.；https://web.eecs.umich.edu/~justincj/teaching/eecs498/WI2022/

### YOLO
- **论文标题**：You only look once: Unified, real-time object detection
- **作者**：JRedmon，S Dival，Glrshick等
- **方法**：将目标检测表述为回归问题；使用单个神经网络预测边界框和类别（维度=Bx5+C）。
- **速度**：最高可达155帧/秒。
- **精度**：优于DPM和R-CNN，但不如Faster R-CNN等两阶段方法准确。（后续还有v2、v3、…、v7等版本）
- **参考资料**：Redmon et al. You only look once: Unified, real-time object detection. CVPR 2016.

### 案例研究
- **PASCAL VOC 2012数据集**：20个类别；11,530张图像；27,450个标注的感兴趣区域物体。类别包括车辆（飞机、自行车、船、公共汽车、汽车、摩托车、火车）、家居用品（瓶子、椅子、餐桌、盆栽植物、沙发、电视/显示器）、动物（鸟、猫、牛、狗、马、羊）、其他（人）。
- **练习数据集**：Udacity自动驾驶汽车数据集（Robotflow版本）；11个类别；15,000张图像；97,942个标签。类别平衡情况：如“can”有64,399个，属于过代表；“pedestrian”有10,806个，“trafficLight-Red”有6,870个，“trafficLight-Green”有5,465个，“truck”有3,623个，“trafficLight”有2,568个，“biker”有1,864个，“trafficLight-RedLeft”有1,751个，“trafficLight-GreenLeft”有310个，“trafficLight-Yellow”有272个，“trafficLight-YellowLeft”有14个，这些属于欠代表。

### 进一步阅读资料
- Zou et al. Object Detection in 20 Years: A Survey. IEEE 2023.
- Girshick et al., Rich feature hierarchies for accurate object detection and semantic segmentation. CVPR 2014.
- Girshick. Fast RCNN. ICCV 2015.
- Ren et al. Faster r-cnn: Towards real-time object detection with region proposal networks. NeurIPS 2015.
- Redmon et al. You only look once: Unified, real-time object detection. CVPR 2016. 
