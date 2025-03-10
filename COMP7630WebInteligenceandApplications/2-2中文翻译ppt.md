文档从20页开始内容如下：
### 网络数据挖掘
Web Data Mining
只是将数据挖掘技术应用于网络数据以发现知识吗？
Just applying data mining techniques to Web Data to discover knowledge?
一般来说，数据采集和预处理步骤更具挑战性，而且（很遗憾）耗时。
In general, data acquisition and pre-processing steps are more challenging and (unfortunately) time-consuming.
### 大纲
Outline
- 网络智能的定义
Definition of Web Intelligence
- 分布式问题求解
Distributed Problem Solving
- 网络数据的特征
Characteristics of Web Data
- 网络内容挖掘与检索
Web Content Mining and Retrieval
- 网络结构/社交网络分析
Web Structure / Social Network Analysis
- 网络使用挖掘/推荐系统
Web Usage Mining / Recommender Systems
- 语义网
Semantic Web
### 网络内容挖掘
Web Content Mining
从网页内容中提取或挖掘有用的信息或知识。
To extract or mine useful information or knowledge from Web page contents
大多数情况下，不再是结构化数据。
No longer structured data (most of the cases)
（此处展示了一些数据结构示例表格和网页布局结构相关内容，表格和布局结构原样保留，不做翻译处理，以下是后续文字内容的翻译）
如何提取呢？
How to extract?
- 一些示例：
Some examples:
  - 获取所有`<h1>`元素的文本内容
Get the text content of all <h1> elements
  - 获取所有CSS类为“item”的`<p>`元素的文本内容
Get the text content of all <p> elements with CSS class "item"
  - 获取`<div>`元素（其CSS类为“movie”）内出现的第一个`<p>`元素的文本内容
Get the text content of the first <p> element which appear inside a <div> element whose CSS class is "movie"
  - 执行与上一步相同的操作，但跳过`<br>`标签之前的所有内容
Do the same as before, but skip all the content before the <br> tag 
  - 等等
etc...
- 用于浏览HTML树的库可能会有帮助（Beautiful Soup就是其中之一）
Libraries for navigating HTML tree may help (Beatiful Soup is one of these)
- 用于数据采集的脚本和软件通常使用寿命较短……
Scripts and softwares for data acquisition have usually a short life …
#### 从通过网络API获取的XML和JSON数据中提取
Extract From Data in XML and JSON Obtained via Web APIs
（此处展示了XML和JSON数据示例，原样保留，不做翻译处理，以下是后续文字内容的翻译）
#### 从网络数据到数值特征
From Web Data to Numerical Features
从网络中提取的内容可以表示为一些特征向量，以便可以执行一些内容挖掘任务。
Contents extracted from Web can be represented as some Feature Vectors so that some content mining tasks can be carried out
将网络文本数据转换为数值特征向量，可以使用各种数据挖掘和机器学习工具。
Transforming Web Textual Data into numerical feature vectors allow to use a large variety of data mining and machine learning tools
#### 网络内容挖掘任务
Web Content Mining Tasks
- 网页分类
Web page classification
- 网页聚类
Web page clustering
- 网络信息检索
Web information retrieval
#### 分类
Classification
（此处展示了分类相关的模型训练和测试流程示意图，原样保留，不做翻译处理，以下是文字内容翻译）
给定一组标记记录/实例{(x, y)}。x是一个特征向量，y是类标签。
Given a set of labeled records/instances \({(x, y)}\). x is a feature vector and y is the class label
- [训练]找到一个映射函数m，使得m(x)=y
[Training] Find a mapping function m such that \(m(x)=y\) 
- [测试]给定一个未标记的实例(x',?)，计算m(x')以预测输出标签。
[Testing] Given an unlabeled instance \((x', ?)\) , compute \(m(x')\) to predict the output label.
#### 分类算法
Classification Algorithms
已经提出了许多算法：
Many have been proposed:
- 神经网络
Neural Networks
- K近邻算法
K-nearest Neighbor
- 支持向量机
Support Vector Machine
- 决策树
Decision Tree
- 随机森林
Random Forest
- XGBoost树
XGBoost Tree
- 朴素贝叶斯
Naive Bayes
许多算法可在Scikit Learn库中找到：
Many are available in the Scikit Learn library:
https://scikit-learn.org/stable/supervised_learning.html
#### 分类算法
Classification Algorithms
已经提出了许多算法：（此处重复列举了神经网络、K近邻算法等分类算法，翻译内容与上一次列举相同，不再重复翻译）
许多算法可在Scikit Learn库中找到：（链接与上一次相同，不再重复翻译）
选择哪个分类器呢？
Which Classifier?
（此处展示了Scikit Learn库中神经网络分类器MLPClassifier的详细参数说明，原样保留，不做翻译处理，以下是后续文字内容翻译）
#### 网页分类
Web Page Classification
- 文本内容可以分类
Textual content can be classified
- 布局可以分类
Layouts can be classified
- 超链接结构可以分类
Hyperlink structures can be classified
- 图像的替代文本呢？
Alternative text of images?
（图像的替代文本）用于训练自动图像字幕系统，以及最近的“文本到图像”工具（例如：DALL-E、Stable Diffusion） 
Used to train the automatic image captioning systems and also the very recent "text to image" tools (e.g.: DALL-E, Stable Diffusion) 
#### 聚类
Clustering
聚类算法将相似的项目聚集在一起。
Clustering algorithms group together similar items
没有标签：该算法没有示例展示样本应该如何分组（无监督学习）。
No Label: The algorithm does not have examples showing how the samples should be grouped together (Unsupervised Learning)
特征向量同样很有用！
Again feature vectors are useful!
（此处展示了简单聚类任务和具有挑战性的聚类任务的示意图，原样保留，不做翻译处理，以下是文字内容翻译）
#### 聚类算法
Clustering Algorithms
已经提出了许多算法：
Many have been proposed
- k-means算法
k-means 
- 凝聚层次聚类算法
Agglomerative Hierarchical Clustering 
- 亲和传播算法
Affinity Propagation 
- DBScan算法
DBScan
许多算法可在Scikit Learn库中找到：
Many are available in Scikit Learn library:
https://scikit-learn.org/stable/modules/clustering.html
使用前阅读文档很重要！
Reading documentation before using is important!
（此处展示了Scikit Learn库中k-means聚类算法KMeans的详细参数说明，原样保留，不做翻译处理，以下是后续文字内容翻译）
#### 网页聚类
Web Page Clustering
两个网页相似是因为：
Two pages are similar because
- 内容相似？
Contents are similar? or
- 它们之间有很多超链接？
Many hyperlinks between them? or
- 它们的入链和出链相似？
Their in-links and out-links are similar? or
- 需要定义一个有意义的相似性度量！
A meaningful similarity measure need to be defined!
#### 网络信息检索
Web Information Retrieval
- 问题：
Problem:
搜索与查询相似的网页并对其进行排名。
Search for web pages which are similar to a query and rank them
- 网页和查询可以使用相同的（数值）表示。
Same (numerical) representation can be used for both pages and queries
- 输出排名可以针对不同用户进行定制。
Output rankings may be customized for different users
- 相关反馈可以实现这一点。
Relevance feedback can allow that
### 大纲
Outline
- 网络智能的定义
Definition of Web Intelligence
- 分布式问题求解
Distributed Problem Solving
- 网络数据的特征
Characteristics of Web Data
- 网络内容挖掘与检索
Web Content Mining and Retrieval
- 网络结构/社交网络分析
Web Structure / Social Network Analysis
- 网络使用挖掘/协同过滤
Web Usage Mining / Collaborative Filtering
- 语义网
Semantic Web
### 网络结构数据
Web Structure Data
（此处展示了英文维基百科相关介绍内容，原样保留，不做翻译处理，以下是后续文字内容翻译）
#### 抓取
Crawling
- 爬虫从初始网页开始。
The crawler starts at an initial web page
- 下载并解析（HTML格式的）网页。
The web page (in HTML) is downloaded and parsed
- 提取网页内的链接。
The links within the web page are extracted
- 所有链接都是下一个要请求的网页的候选对象。
All the links are candidates for the next web pages to be requested
- 可以根据不同策略继续抓取：
Crawling may continue following different strategies:
  - 广度优先
Breadth-first
  - 深度优先
Depth-first
  - 聚焦某些主题的页面抓取怎么样？
how about crawling for pages under some focused topics?
#### 网络结构挖掘
Web Structure Mining
- 从链接结构中发现重要网页（搜索引擎使用的关键技术）
Discover important Web pages from link structure (key technology used in search engines)
- 发现相互紧密链接的用户/网页社区。
Discover communities of users/pages who are closely linked with each others
（此处展示了PageRank算法和社交网络中链接预测相关的概念，但未展开详细内容，原样保留，不做翻译处理，以下是后续文字内容翻译）
### 大纲
Outline
- 网络智能的定义
Definition of Web Intelligence
- 分布式问题求解
Distributed Problem Solving
- 网络数据的特征
Characteristics of Web Data
- 网络内容挖掘与检索
Web Content Mining and Retrieval
- 网络结构/社交网络分析
Web Structure / Social Network Analysis
- 网络使用挖掘/协同过滤
Web Usage Mining / Collaborative Filtering
- 语义网
Semantic Web
### 网络使用挖掘和推荐
Web Usage Mining and Recommendation
从网络使用日志中发现用户访问模式，这些日志记录了每个用户的每次点击。
To discover user access patterns from Web usage logs, which record every click made by each user
- 页面/产品推荐（点击这个的人也点击那个）。
Page/product recommendation (people click this also click that).
- 用户意图预测（点击到这个“状态”的人更有可能购买）。
User intention prediction (people clicking through up to this “status” is more likely to buy)
- 网络冲浪规律特征描述（理性用户、随机用户或经常性用户）。
Web surfing regularity characterization (rational users, random users, or recurrent users)
- ……
#### 点击流数据
Clickstream Data
从网络日志中获得的点击流数据需要进行预处理。
Clickstream data obtained from web logs need to be preprocessed
当用户点击网页上的超链接时，会生成多少个http请求？
When a user clicks on a hyperlink on a web page, how many http requests will be generated? 
此外，有多少用户同时在访问一个网络服务器？
Also, how many users are surfing a web server concurrently?
（此处展示了香港浸会大学计算机科学相关的一些网页信息示例，原样保留，不做翻译处理，以下是后续文字内容翻译）
#### 网络挖掘（再次提及）
Web Mining (again)
- 传统数据挖掘——数据通常已经收集并存储在数据仓库中。
Conventional data mining - Data is often already collected and stored in a data warehouse
- 网络挖掘——数据收集可能是一项艰巨的任务，特别是对于网络结构和内容挖掘，这涉及到爬取大量目标网页。
Web mining - Data collection can be a substantial task, especially for Web structure and content mining, which involves crawling a large number of target Web pages.
- 一旦收集到数据，仍然需要进行数据预处理。
Once the data is collected, data pre-processing is still needed.
- 然而，每个步骤所使用的技术可能与传统数据挖掘中使用的技术有很大不同。
However, the techniques used for each step can be quite different from those used in conventional data mining.
### 大纲
Outline
- 网络智能的定义
Definition of Web Intelligence
- 分布式问题求解
Distributed Problem Solving
- 网络数据的特征
Characteristics of Web Data
- 网络内容挖掘与检索
Web Content Mining and Retrieval
- 网络结构/社交网络分析
Web Structure / Social Network Analysis
- 网络使用挖掘/协同过滤
Web Usage Mining / Collaborative Filtering
- 语义网
Semantic Web
### 语义网
Semantic Web
语义网（RDF、OWL、SPARQL）
Semantic Web (RDF, OWL, SPARQL)
（此处展示了一些语义网中知识表示的示例，如“Alice是BOB的朋友”“Leonardo Da Vinci创作了《蒙娜丽莎》”等，原样保留，不做翻译处理，以下是文字内容翻译）
#### 知识表示与推理
Knoledge Representation and Reasoning
- 语义网由一组标准语言构成，这些语言允许：
The semantic web is formed by a set of standard languages which allow:
  - 以计算机系统能够利用的形式表示关于世界的信息，以解决复杂任务，如诊断医疗状况或进行自然语言对话；
representing information about the world in a form that a computer system can utilize to solve complex tasks such as diagnosing a medical condition or having a dialog in a natural language;
  - 结合逻辑领域的研究成果，实现各种推理的自动化，例如规则的应用或集合与子集关系的推理。
incorporates findings from logic to automate various kinds of reasoning, such as the application of rules or the relations of sets and subsets.
- 可以构建知识图谱。
Knowledge graphs may be built
- 对打击假新闻很有用！
Useful to fight fake-news!!!
- 蒂姆·伯纳斯·李爵士是语义网背后的推动者，但我们仍有很长的路要走……
Sir Tim Berners Lee is behind the Semantic Web, but we are still far …
- 目前主要应用的技术是针对非结构化和半结构化数据的人工智能技术！
AI techniques on unstructured and semi-structured data are the main technology applied right now!
### 参考文献
REFERENCES
- Liu Bing. Web Data Mining – Exploring Hyperlinks, Contents and Usage Data, Springer, 2011 [Ch 1]
- Reza Zafarani, Mohammad Ali Abbasi, and Huan Liu. Social Media Mining: An Introduction, Cambridge University Press, 2014 [Ch 5] 
