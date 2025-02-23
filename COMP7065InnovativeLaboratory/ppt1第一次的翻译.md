### 引言
Kaiyang Zhou
https://kaiyangzhou.github.io/

### 香港浸会大学计算机科学系课程安排
- **讲师**：Kaiyang ZHOU
Lecturer: Kaiyang ZHOU
- **指导教师**：Kenny CHENG
Instructor: Kenny CHENG
- **助教**：Jiaer XIA
TA: Jiaer XIA
- **时间**：周六13:30 - 16:20
Time: 13:30-16:20, Saturday
- **地点**：FSC801 C&D
Venue: FSC801 C&D

### 讲师联系方式
- Kaiyang ZHOU：kyzhou@hkbu.edu.hk
Kaiyang ZHOU：kyzhou@hkbu.edu.hk
- Kenny CHENG：kkennycheng@comp.hkbu.edu.hk
Kenny CHENG：kkennycheng@comp.hkbu.edu.hk
- Jiaer XIA：csjexia@comp.hkbu.edu.hk
Jiaer XIA：csjexia@comp.hkbu.edu.hk

### 先修课程
- **COMP7035数据分析与人工智能的Python编程**：数据类型、数据结构、文件输入/输出、函数、程序控制与逻辑；numpy、matplotlib、pytorch、scikit-learn
COMP7035 Python for Data Analytics and Artificial Intelligence：data type, data structure, file I/O, function, program control and logic；numpy, matplotlib, pytorch, scikit-learn
- **COMP7015人工智能**：机器学习、回归、分类、过拟合、正则化、评估；深度学习、神经网络、卷积神经网络（CNN）、序列模型、预训练；生成式人工智能（GenAI）、扩散模型、大语言模型、Transformer
COMP7015 Artificial Intelligence：machine learning, regression, classification, overfitting, regularization, evaluation；deep learning, neural networks, CNN, sequence models, pre-training；GenAI, diffusion models, large language models, Transformer
- **COMP7990数据分析原理与实践**：统计学（均值、方差、协方差、相关性）；数据挖掘、知识发现、K近邻算法（K-NN）、K均值算法
COMP7990 Principles and Practices of Data Analytics：statistics (mean, variance, covariance, correlation)；data mining, knowledge discovery, K-NN, K-means

### 课程内容
- 运用编程和软件工具解决数据分析和人工智能问题
Apply programming and software tools to solve data analytics and AI problems
- 实验包括练习和实际问题解决
Labs include exercises and real-world problem-solving
- 教授工具、插件或库的基础知识和语法
Teach basics and syntax of tools, plug-ins, or libraries
- 结合人工智能知识和编码技能
Combine AI knowledge and coding skills
- 每次实验前进行简要讲解
Briefing lecture for each lab
- 重点关注数据管理、预处理、分析、挖掘、建模、训练和可视化
Focus on data management, preprocessing, analysis, mining, modeling, training, and visualization
- 以小型项目作为结业评估
Mini-projects as capstone assessments

### 致谢
非常感谢Kenny和Jiaer开发实验材料
Credit: big thanks to Kenny and Jiaer for developing the lab materials

### 考核方式
- **实验报告（40%）**：共8份报告（第2 - 11周，每份占5%）；Jupyter Notebook（带注释的代码 + 结果）
Laboratory reports (40%): 8 reports in total (week 2-11, each 5%); Jupyter Notebook (annotated code + results)
- **小型项目（60%）**：期中分组（2 - 3名学生）；从给定主题列表中选择或提出新的可行主题；在最后一次授课日进行简短展示；提交细节将在期中讨论
Mini-projects (60%): Form groups (2-3 students) in midterm; Choose from a list of ideas or propose new, feasible ideas; Give a short presentation on the last lecture day; Details of submission to be discussed in midterm

### 考核安排
- **第2 - 9周**：Jupyter notebook，内容包括数据预处理和分析、模型设计、训练和评估、结果可视化和分析，提交前所有单元格必须运行
Week 2-9: Jupyter notebook, data pre-processing and analysis, model design, training, and evaluation, visualisation and analysis of results, all cells must be run before submission
- **第10 - 11周**：ComfyUI（生成式人工智能），PDF报告，内容包括数据集描述、流程构建、结果与讨论
Week 10-11: ComfyUI (GenAI), pdf report, dataset description, pipeline construction, results and discussion

### 课程大纲
| 周数 | 主题 |
| ---- | ---- |
| 1 | 引言Introduction |
| 2 | 面部地标检测Facial Landmark Detection |
| 3 | 股票价格预测Stock Price Prediction |
| 4 | 开放世界视觉识别Open-World Visual Recognition |
| 5 - 6 | 自动驾驶Autonomous Driving |
| 7 - 8 | 大语言模型Large Language Model |
| 9 | 数据挖掘：关联规则挖掘Data Mining: Association Rule Mining |
| 10 | 生成式人工智能：个性化稳定扩散模型GenAI: Personalising Stable Diffusion |
| 11 | 生成式人工智能：基于上下文引导的像素创作GenAI: Crafting Pixels with Contextual Guidance |
| 12 | 生成式人工智能：探索人工智能艺术的新兴话题GenAI: Navigating Emerging Topics in AI Art |
| 13 | 项目演示Project Demo |

### 今日实验：面部表情识别
- 识别面部图像中的情绪，六种典型面部表情（不分文化背景）：愤怒、厌恶、恐惧、快乐、悲伤和惊讶（Ekman和Friesen，1971年）
Today’s lab: Facial expression recognition
Recognise emotions in face images. Six prototypical facial expressions (regardless of culture): anger, disgust, fear, happiness, sadness, and surprise (Ekman and Friesen, 1971)
- 在许多应用中很有用，如社交机器人、医疗治疗、驾驶辅助、人机交互
Useful in many applications, e.g., sociable robots, medical treatment, driving assistance, human-computer interaction

### 面部表情识别算法发展历程及相关数据集
- **发展历程**：从手工特征（Handcrafted）到浅层学习（Shallow learning）再到深度学习（Deep learning）；从实验室控制的小尺寸数据集到真实场景的大规模数据集
Algorithm 2007 Dataset. Zhao et al.[15](LBP-TOP,SVM). Handcrafted---> Shallow learning--->-Deep learning. Lab-controlled, Small size--->-In-the-wild,Larger scale
- **相关数据集**
    - **Cohn-Kanade数据集（CK+）**：实验室控制，123名受试者，不同情绪对应不同数量样本，如愤怒45个、快乐69个等，包含8种情绪和30个动作单元
Cohn-Kanade Dataset (CK+). Lab-controlled. 123 subjects. 
| Emotion | N |
| --- | --- |
| Angry (An) | 45 |
| Contempt (Co) | 18 |
| Disgust (Di) | 59 |
| Fear (Fe) | 25 |
| Happy (Ha) | 69 |
| Sadness (Sa) | 28 |
| Surprise (Su) | 83 |
    - **JAFFE（日本女性面部表情数据集）**：实验室控制，213个样本，10名日本女性，每个受试者/表情样本较少
JAFFE (Japanese Female Facial Expression). Lab-controlled - 213 samples - 10 Japanese females - few samples per subject/expression
    - **SFEW（野外静态面部表情数据集）**：来源于电影，有训练集（958个样本）、验证集（436个样本）和测试集（372个样本）
SFEW (Static Facial Expression in the Wild). Source: movie. Train (958 samples), Val (436 samples), Test (372 samples)
    - **EmotioNet**：来源于网络，100万张图像，23种表情，可以通过情绪、动作单元、关键词查询图像数量
EmotioNet. Source: web - 1M images - 23 expressions.
| Query by emotion | Number of images | Retrieved images |
| --- | --- | --- |
| Happiness | 35,498 |  |
| Fear | 2,462 |  |
| Query by Action Units | Number of images | Retrieved images |
| AU4 | 281,732 |  |
| AU6 | 267,660 |  |
| Query by keyword | Number of images | Retrieved images |
| Anxiety | 708 |  |
| Disapproval | 2,096 |  |

### 面部表情识别面临的挑战
- 光照变化Illumination variations
- 遮挡Occlusions
- 非正面头部姿势Non-frontal head poses
- 身份偏差Identity bias
- 低强度表情Low-intensity expression
- 数据不足Insufficient data
- 年龄、性别、文化、种族差异Differences in age, gender, culture, ethnicity
- 大规模数据集标注Annotation of large-scale datasets
- 数据集偏差和不平衡Dataset bias and imbalance
- 多模态Multi-modality

### 拓展阅读
- Li和Deng. "Deep facial expression recognition: A survey." IEEE transactions on affective computing 13.3 (2020): 1195 - 1215.
Li and Deng. "Deep facial expression recognition: A survey." IEEE transactions on affective computing 13.3 (2020): 1195 - 1215.
- Pytorch教程：https://pytorch.org/tutorials/beginner/basics/intro.html
Pytorch tutorial: https://pytorch.org/tutorials/beginner/basics/intro.html
- 在Pytorch中编写数据加载器：https://pytorch.org/tutorials/beginner/basics/data_tutorial.html
Write data loader in Pytorch: https://pytorch.org/tutorials/beginner/basics/data_tutorial.html

### 快乐编码！
Happy Coding! 
