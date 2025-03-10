# COMP7630 - 网络智能及其应用
COMP7630 – Web Intelligence and its Applications
## 网络智能简介
Web Intelligence in a Nutshell
瓦伦蒂诺·桑图奇
Valentino Santucci
(valentino.santucci@unistrapg.it)
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
### 网络……连接全球！
WEB … connected world-wide!
### 为什么要分析网络？
Why analyzing the Web?
- 网络是互联网上（通过服务器和客户端的http协议）以超文本格式（HTML）存在的大量超链接信息（href）集合，由不同的个人和组织贡献或共享。
Web = a huge pool of hyperlinked information (href) in hypertext format (HTML) sitting on the Internet (http over servers and clients) contributed/shared by different individuals and organizations.
- 网络作为商业（电子商务）的“场所”
Web as a "place" for commerce (eCommerce)
- 网络作为政治竞选的“媒体”
Web as a "media" for political campaigns
- 网络作为调查和收集意见的“工具”
Web as a survey and opinion collecting "tool"
- ……
### 使网络成为可能的技术/理念
Technologies/ideas making possible the Web
- 互联网
Internet
- TCP/IP协议
TCP/IP
- 客户-服务器架构
Client-Server architecture
- 浏览器
Browser
- 超文本
Hypertext
- 超链接
Hyperlinks
- 超媒体
Hypermedia
- HTTP协议
HTTP
- HTML语言
HTML
- URL（统一资源定位符）
URL
- 搜索引擎（例如谷歌）
Search engines (e.g. Google)
- ……
### 网络的持续不断演进
Continuous and end-less evolution of the Web
#### 网络演进（数十年间）
Web Evolution (oras decades)
|阶段|时间|相关技术/描述|
|----|----|----|
|Web OS|2020 - 2030年| - |
|语义网|2010 - 2020年（Web 3.0相关部分）|语义网相关技术|
|社交网络语义技术|2000 - 2010年（Web 2.0）|社交网络语义相关技术|
|Web 2.5演进|2010 - 20x年|Web 2.0到Web 3.0之间的过渡阶段相关技术|
|万维网|1990 - 2000年（Web 1.0）|多媒体计算等相关技术|
|计算时代（早于Web 1.0）|1980 - 1990年|PC时代桌面网络、虚拟化、云计算等相关技术的发展基础|
### 网络智能
Web Intelligence
网络 + 人工智能
Web + Artificial Intelligence
#### 人工智能？……起起落落，起起落落，又兴起！
AI? … summer, winter, summer, winter, Summer!
人工智能的发展历程伴随着社会的兴奋与担忧，如AlphaGo、Libratus等的成功。
Social excitement and concern, Success of AlphaGo, Libratus, etc...
人工智能发展过程中经历了多个热潮与低谷，如“GOFAI”（有效的老式人工智能）、“专家系统”、“机器学习”、“深度学习”等阶段，也涉及到自动驾驶汽车、自主武器等应用领域的讨论，以及“人工智能造福社会”的思考。同时还列举了不同时期的相关研究项目和人物，如Stanford、FGCS、SCI、MCC、Alvey、ESPRIT等项目，以及AAI、JSAI、PROLG、LIsp、Feigenbaum、Brooks等组织和人物。
Boom1 Boom2 Boom3 "GOFAI" "Expert Systems" "Machine Learning" Deep Learning Autonomous Vehicles Winter1 knowledge Winter2 Autonomous Weapons heuristic search engineering DENDRAL, MYCIN "AI for Social Good"? Stanford S FGCS, SCI, MCC, Alvey,ESPRIT AAI JSAI PROLG LIsp Feigenbaum, Brooks 1960s 1970s 1980s 1990s 2000s 2010s
#### 人工智能意味着……
AI means …
- 知识表示与推理
Knowledge representation and reasoning
- 自动规划与调度
Automated Planning and Scheduling
- 约束编程
Constraint Programming
- 机器学习、数据挖掘、知识发现
Machine Learning, Data Mining, Knowledge Discovery
- 多智能体系统
Multi-agent Systems
- 启发式算法和元启发式算法
Heuristics and Meta-heuristics
- 进化计算和人工生命
Evolutionary Computation and Artificial Life
- 计算机视觉
Computer Vision
- 自然语言处理
Natural Language Processing
- ……
**《人工智能：一种现代方法》**（第三版），斯图尔特·罗素、彼得·诺维格著，培生教育出版集团。（书中对人工智能进行了全面阐述）
GLOBAL EDITION Artificial Intelligence Stuart Russell A Modern Approach Peter Norvig Third Edition ALWAYS LEARNING PEARSON
#### 网络智能
Web Intelligence
网址：http://wi-consortium.org/
Web Intelligence是一项科学研究与开发领域，旨在探索人工智能（AI）（例如知识表示、规划、知识发现和数据挖掘、智能体以及社交网络智能等）和先进信息技术（IT）（例如无线网络、普适设备、社交网络、智慧网络以及数据/知识网格等）对下一代网络赋能的产品、系统、服务和活动所起到的基础性作用以及实际影响。它是网络和智能体智能时代最重要且最具前景的信息技术研究领域之一。
[…] scientific research and development to explore the fundamental roles as well as practical impacts of Artificial Intelligence (AI) (e.g., knowledge representation, planning, knowledge discovery and data mining, intelligent agents, and social network intelligence) and advanced Information Technology (IT) (e.g., wireless networks, ubiquitous devices, social networks, wisdom Web, and data/knowledge grids) on the next generation of Web-empowered products, systems, services, and activities. It is one of the most important as well as promising IT research fields in the era of Web and agent intelligence.
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
### 网络是分布式的
The Web is Distributed
- 网络和互联网支持分布式计算
Web and Internet allow for distributed computing
- 协同分布式问题求解（CDPS）是分布式计算中一个非常重要的算法主题
Cooperative Distributed Problem Solving (CDPS) is a very important algorithmic topic in distributed computing
- 多智能体系统和进化计算系统是协同分布式问题求解的两个突出例子
Multi-agent systems and Evolutionary Computing systems are two prominent examples of CDPS
#### 进化计算（EC）
Evolutionary Computation (EC)
- EC研究基于进化和群体智能的算法
EC studies Evolutionary and Swarm Intelligence-based Algorithms
- EC算法几乎可以应用于任何优化问题
EC algorithms can be applied to virtually any optimisation problem
- EC算法由一群计算实体组成：
EC algorithms are made up by a population of computational entities:
  - 每个实体维护手头问题的一个解决方案
Each entity maintains a solution to the problem at hand
  - 每个实体迭代更新其解决方案
Each entity iteratively update its solution
  - 实体之间可以进行合作和通信
Entities may cooperate and communicate among them
  - 总体而言，这些实体实现了一种分布式问题求解方法
Altogether the entities implement a distributed problem solving approach
#### 有多少种进化算法呢？
How many Evolutionary Algorithms are there!?
群体智能、进化算法包括粒子群优化（PSO）、组合优化、蜜蜂算法、神经网络优化、遗传算法、自适应控制器、蚁群算法、启发式算法、蜜蜂算法、人工智能、多目标优化等多种算法。
swarm intelligence evolutionary algorithms particle swarm optimization [pso] combinatorial ptimiation bee algorithm prohlem solving neural networks pmization aorms yenetic algorithms aealias cotroliers antical e e  lai heuristic algorthms honey bee artificial intelligence multiobjective optimization
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
### 网络数据的特征
Characteristics of Web Data
- 网络上的信息量巨大且还在不断增长
Amount of information on the Web is huge and growing
- 网络上存在异构类型的内容：
Content of heterogeneous types exist on the Web:
  - 结构化表格
structured tables
  - 半结构化页面（例如HTML、XML、JSON）
semi-structured pages (e.g., HTML, XML, JSON)
  - 非结构化文本
unstructured texts
  - 多媒体文件（图像、音频和视频）
multimedia files (images, audios, and videos)
即使对于相同类型的信息，由于作者不同，网络上的信息也具有异构性。
Even for the same type, information on the Web is heterogeneous due to diverse authorships
例如使用不同的措辞和格式、表格的宽和长不同等。
Using different wordings and formats Wide vs long tables …
| 主题 | 时间1 | 时间2 | 时间3 |
| --- | --- | --- | --- |
| A | 5 | 3 | 4 |
| B | 2 | 6 | 8 |
| C | 7 | 5 | 1 |
| 主题 | 时间 | 值 |
| --- | --- | --- |
| A | 1 | 5 |
| A | 2 | 3 |
| A | 3 | 4 |
| B | 1 | 2 |
| B | 2 | 6 |
| B | 3 | 8 |
- 网页之间存在超链接
Hyperlinks exist among Web pages
  - 在一个站点内（用于信息组织）
Within a site (for information organization)
  - 跨不同站点（表示权威性）
Across different sites (indicating authority)
- 网络上的信息有噪声
The information on the Web is NOISY
页面中只有部分内容是有用的！
Only part of a page is useful!
导航链接、广告、版权声明、隐私政策——有用吗？
Navigation links, advertisements, copyright notices, privacy policies – useful?
网络内容质量低、存在错误甚至具有误导性
Web is of low quality, erroneous, or even misleading
任何人都可以随意编写内容！
Anyone can write anything!
- 网络支持电子商务
The Web supports e-commerce
人们通过点击进行浏览、购买、支付等操作
People click through to browse, purchase, pay, …
需要自动化的网络服务（API）（想想Paypal或类似的服务）
Automated Web services (APIs) are needed (let think to Paypal or similars)
- 网络是一个虚拟社会
The Web is a virtual society
人们可以在世界任何地方进行交流
People can communicate anywhere in the world
在互联网论坛、博客、评论网站和社交网站上表达对任何事物的观点和意见
Express views and opinions on anything in Internet forums, blogs, review sites and social network sites
出现了新的挖掘任务，例如意见挖掘和社交网络分析
New new mining tasks, e.g., opinion mining and social network analysis
（表情示例：Like、Love、Haha、Wow、Sad、Angry ）
Like Love Haha Wow Sad Angry
#### Web 2.0示例 - 维基百科
Web 2.0: Example - Wikipedia
**“脱欧”词条**
Aricle Talk Brexit
来自维基百科，免费的百科全书。（对于其他用途，请参见“脱欧（消歧义）” ）
From Wipedia, the free engropedia For other uses, see Brexit( dlsambiguation
“脱欧”（Brexit）是指英国成为唯一一个投票决定退出欧盟的主权国家。脱欧后，欧盟及其相关机构的许多规定和法律对英国不再适用，英国需要重新调整其国内的许多政策和法规以适应脱离欧盟的状态。
Brext/besn gzap t only sovereign conty o ave i h th e o e m t s cc Folowin Eext.,EU iat an the Cort o ostis o t ferpaen on nonven h mamnyop s s e s t os o e r n relevan EU law as omsic an hih an en r pter t e e ere ar re n a nae e to be a de feto eme or th Customs on
**部分“脱欧”词条的用户操作记录**
Part o sers o aricis on Brexit
欧盟及其机构在不同阶段对英国脱欧进程有着不同的反应和举措。自1975年以来，英国与欧盟的关系经历了多次变化，在不同的公投和协议签订过程中，脱欧进程逐步推进。经过四年的谈判，在过渡期结束时，欧盟 - 英国贸易与合作协议于2020年12月30日签署。
The Eu an is nstuons veperd e ehi nn e h t the erod ol Bis meesi, rsepecopdedstepsp ees c in 975. in h 67 2 pr cet th e n h se o Masticht. serdam ve an libo as pat t apapp e e oe to s e r i e ea c d govenmen subseueny e ec in e emersii iin hn c eeee tfe e et n e sr en ln ns c s four years ot negtaton ah h t ou t tem rrn tut ctt rssnemmn i vemcmrrtmini ce s d
（脱欧相关的内容还包括：英国退出欧盟的背景、2016年公投、通知退出、谈判过程、退出协议、议会投票、影响、时间表、反对意见、欧盟 - 英国关系等板块，每个板块都有详细信息可展开查看 ）
Withdrawal of the Unted Kingom rom the Europen Unlor Glossary of terms Background [show] 2016 referendum [show] Notice of withdrawal [show] Thenegotiaion proes ws osbpobtyt heigngdeed ee e et e aadgosip n s e s ee et i n n s of he iarawal s t customs nin) uing an leve onh rasioe petot i r r tssl ss scheduled end of the transtion period and the EU-UK Trade and Cooperation Agreement was signed on 30 December 2020. Negotiations [show] Withdrawal agreement [show] Parliamentary votes [show] The eliects o reart re t e p p e l ee n a Is liey o am he Iks soory an teuve s al eapa a cp e ingm m t e r o the European Economic Area (EEA) to the UK,t2 and creates problems for Brtish higher education and academic research [13] [show]Timeline [shaw] Opposition [show] EU-UK relations [show] Impact
**页面操作选项**：内容（隐藏）、阅读、查看历史、搜索维基百科、欧盟门户·英国门户V·T - E （属于英国加入欧盟（1973 - 2020）系列文章的一部分 ）
Contents [ide] 1 Timeling 2 Terminlogy and etyolgy 3 Backgront the tinid ingdi n E s 3.1 Eurosceplicism in the United Kingdom 3.2 Opinion pols 1977-2015 4 Refrnum of 2016 4.1 Negoliations for membership reform Read Vew history Search Wikipedia EU portal· UK portal V·T-E Part of sres of aiison UK membership of the European Union (1973-2020)
#### Web 2.0示例 - 维基百科（用户操作相关页面）
Web 2.0: Example - Wikipedia
未登录  讨论  贡献  创建账户  登录
Not loged in Taik Contrbutons Create account Log in
**文章**：“脱欧”修订历史
Arlide Brexit: Revision history
**帮助**：查看此页面的修订记录  筛选修订版本  外部工具  查找其他工具和用户贡献  查看修订记录（最新|最旧）  查看（较新50条|较旧50条）（20|50|100|250|500）  比较选定的修订版本（当前版本与2022年12月29日21:30 Zuzc5的版本 ）  （当前版本与2022年12月29日21:30 Chai28c的版本 ）  （当前版本与2022年12月29日21:29 Chai28(is26e的版本 ）  （当前版本与…… ）
Help Vew lgs for his e ev eeg Filter revisions Exteral toos Find adonromova nd ett yser a ascssRaeves-Fi dead ins For ay vsosis lut sss totb rp ses (newest| oldest) View (newer 50|oider 50)(20|50|10
