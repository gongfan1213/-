### 中文翻译
#### 课程信息
COMP7640数据库系统与管理
授课教师：杨仁池博士
助教：
- 赵云翔（csyxzhao@comp.hkbu.edu.hk）
- 易兰静（csljyi@comp.hkbu.edu.hk）
#### 关于授课教师
- 香港浸会大学计算机科学系助理教授（2023年1月至今）
- **教育背景**：
    - 新加坡南洋理工大学博士学位
    - 北京邮电大学工学学士学位
- **研究兴趣**：大数据管理、分析与挖掘
- **个人主页**：https://www.comp.hkbu.edu.hk/~renchi/
- **电子邮箱**：renchi@hkbu.edu.hk
- **办公室**：DLB 644
#### 课堂规则
- 关闭手机或将其调至振动/静音模式。
- 认真听讲、思考、做笔记……如果我讲得太快或者你没理解某个概念，随时打断我。
- 尝试完成课堂练习（不要只是等待答案）。
- 请勿交谈！为了尊重你的同学、授课教师以及你自己。课间休息时可以随时来找我交流。尽量说英语，因为其他同学可能听不懂普通话或粤语。
#### 课后答疑
- **电子邮件沟通**：先将问题发送给助教，他们的回复会更及时。如果助教无法解答，问题会转交给我。助教：赵云翔先生（csyxzhao@comp.hkbu.edu.hk）和易兰静先生（csljyi@comp.hkbu.edu.hk）
- **面对面交流/讨论**：
    - 办公时间：周二下午2:00 - 5:30
    - 请先与我预约
    - 建议组团前来
#### 课程进度安排（暂定）
第1周（1月16日）：上午8:00 - 9:20，WLB 103教室
其他周：周四晚上6:30 - 9:20，WLB 103教室
| 课程 | 日期 | 主题 | 作业 | 项目 |
| ---- | ---- | ---- | ---- | ---- |
| 课程1 | 1月16日 | 课程介绍与实体关系模型 | 作业1截止日期：2月20日 <br> 发布日期：2月20日 <br> 小组项目截止日期：4月10日 |
| 课程2 | 1月23日 | 实体关系模型与关系模型 |  |
| 课程3 | 2月6日 | 关系模型 |  |
| 课程4 | 2月13日 | SQL |  |
| 课程5 | 2月20日 | SQL |  |
| 课程6 | 2月27日 | 函数依赖与规范化 |  |
| 课程7 | 3月6日 | 存储管理与访问方法 | 作业2截止日期：3月27日 |
| 课程8 | 3月13日 | 基于树的索引 |  |
| 课程9 | 3月20日 | 哈希索引 | 作业3截止日期：4月24日 |
| 课程10 | 3月27日 | 查询评估 |  |
| 课程11 | 4月3日 | 查询优化 |  |
| 课程12 | 4月10日 | 事务管理与并发控制 |  |
| 课程13 | 4月24日 | 崩溃恢复 |  |
#### 考核方式
- **平时考核**：40%
    - 3次书面作业：24%（每次作业占8%）
    - 小组项目：16%，尽早组建小组
- **期末考试**：60%
#### 小组项目
- **小组规模**：4 - 6人，每个小组应推选一名组长
- **小组报名**：开始时间：2月6日凌晨12:00；截止时间：2月27日晚上11:59
- 同一小组的成员将获得相同分数。
#### 考核指南
- **标准参照考核**：预期学习成果与评分标准
- **通过本课程的要求**：期末考试成绩必须≥30%；总评成绩必须≥35%
- 不接受任何迟交的作业。
#### 注意事项
- 除非另有说明，你提交的所有作业都应是独立完成的。抄袭或共享作业及其他提交的作品均构成作弊行为。
- 如果你对自己的行为是否恰当存在疑问，请联系授课教师进行明确的咨询。
#### 抄袭的代价
- 抄袭属于违规行为，将对相关人员采取相应的纪律处分。
- 处罚将平等地适用于所有涉及抄袭的人员（抄袭者和被抄袭者）。最低处罚是提交的作业成绩记零分。
- 有关大学对抄袭行为的处罚准则，请参考以下网址：https://ar.hkbu.edu.hk/quality-assurance/university-policyand-guidelines/academic-integrity/section-2-plagiarism
#### 生成式人工智能的使用
- **正确使用生成式人工智能的场景**：解释或阐明概念；展示和指导技术实践；项目规划与头脑风暴；对草稿提供反馈；生成供讨论和批判性评审的示例。
- **大学相关指南**：https://bba.hkbu.edu.hk/academics/teaching-and-learningsupports
#### 概述
- **什么是数据库？**：数据库是数据的集合，这些数据经过组织，以便其内容能够轻松地被访问、管理和更新。
- **为什么我们需要数据库？**：在恒生银行缴纳学费；从图书馆借阅教材；从电商网站订购教材。
- **数据库无处不在**：学生/课程记录；银行交易记录；图书馆图书记录（http://www.hkbu.edu.hk/lib）；在线书店（http://www.amazon.com/）
#### 示例数据库
- **课程表**
| cid | cname | credit |
| ---- | ---- | ---- |
| COMP2007 | Program | 3 |
| COMP4017 | Security | 3 |
| COMP2016 | Database | 3 |
- **学生表**
| sid | name | dept | gpa |
| ---- | ---- | ---- | ---- |
| 00001 | Jones | cs | 3.4 |
| 00002 | Joe | cs | 3.2 |
| 00003 | Smith | math | 3.8 |
- **选课表**
| sid | cid | grade |
| ---- | ---- | ---- |
| 00001 | COMP2016 | B |
| 00002 | COMP2016 | A |
| 00002 | COMP2007 | A |
| 00003 | COMP4017 | B |
#### 数据库概念
- 一个数据库由一个或多个表组成。每个表由若干条记录（也称为元组）构成。每条记录包含若干个属性。
#### 从数据库中提取信息
我们可以向数据库提出问题。例如：学号为“1001”的学生是谁？Bob选了哪些课程？有多少学生选修了COMP7640这门课？数据科学与人工智能专业有多少名女生？但数据库并不“说”英语……
#### 数据库语言（SQL）
查询学号为“1001”的学生姓名：
```sql
SELECT name FROM Students WHERE sid = '1001';
```
#### 课程目标
学习如何管理数据库，例如：设计数据库；查询数据库；磁盘和内存管理；访问方法和索引；查询评估和优化；并发控制和崩溃恢复。
#### 参考文献
- A. Silberschatz, H. F. Korth, and S. Sudarshan, Database System Concepts, McGraw-Hill, 2019.
- R. Ramakrishnan and J. Gehrke, Database Management Systems, 3rd Edition (ISBN 0-07-115110-9), McGraw-Hill, 2003.

### 英文原文
COMP7640 Database Systems and Administration
Instructor: Dr. Renchi YANG
Teaching Assistants:
ZHAO Yunxiang (csyxzhao@comp.hkbu.edu.hk)
YI Lanjing (csljyi@comp.hkbu.edu.hk)

#### About the Course Instructor
❖Assistant Professor in the Dept. of CS, HKBU ▪Jan 2023 - Present
❖Educational Background:
▪Ph.D., Nanyang Technological Univ., Singapore
▪B.Eng., Beijing Univ. of Posts & Telecommunications
Research Interests
▪Big Data Management, Analytics & Mining
Homepage: https://www.comp.hkbu.edu.hk/~renchi/
❖Email: renchi@hkbu.edu.hk
Office: DLB 644

#### In-class Rules
❖Turn off your cell phone or keep it on vibrate/silent mode.
❖Keep listening, thinking, taking notes, …
▪Interrupt me anytime if I’m speaking too fast/you don’t understand the concept.
❖Try to work on the in-class exercises (but not simply wait for the answers).
❖But NO TALKING PLEASE!
▪To respect your fellow students, instructor & yourself. Feel free to come to me in class breaks.
▪Better to speak English as other students might not understand Mandarin or Cantonese.

#### Out-of-class Q&A
Email correspondence
▪Send your questions to TAs first as they are more responsive. Your questions will be forwarded to me if they can not resolve them.
• TAs: Mr. ZHAO Yunxiang (csyxzhao@comp.hkbu.edu.hk) and Mr. YI Lanjing (csljyi@comp.hkbu.edu.hk)
❖In-person meetings/discussions
▪Office (DLB 644) Hours: 2:00 – 5:30 PM Tuesday
▪Make an appointment with me first
▪Better to come in group

#### Tentative Schedule:
1st Week (Jan 16): 8:00-9:20 AM @ WLB 103
Other Weeks: Thu 6:30 PM-9:20 PM @ WLB 103

| Lecture | Date | Topic | Assignment | Project |
| --- | --- | --- | --- | --- |
| Lecture 1 | Jan 16 | Introduction & ER Model | Assignment #1 Due: Feb 20 <br> Release: Feb 20 <br> Group Project Due: Apr 10 |
| Lecture 2 | Jan 23 | ER & Relational Model |  |
| Lecture 3 | Feb 6 | Relational Model |  |
| Lecture 4 | Feb 13 | SQL |  |
| Lecture 5 | Feb 20 | SQL |  |
| Lecture 6 | Feb 27 | Functional Dependencies & Normalization |  |
| Lecture 7 | Mar 6 | Storage Management & Access Methods | Assignment #2 Due: Mar 27 |
| Lecture 8 | Mar 13 | Tree-based Index |  |
| Lecture 9 | Mar 20 | Hash Index | Assignment #3 Due: Apr 24 |
| Lecture 10 | Mar 27 | Query Evaluation |  |
| Lecture 11 | Apr 3 | Query Optimization |  |
| Lecture 12 | Apr 10 | Transaction Management & Concurrency Control |  |
| Lecture 13 | Apr 24 | Crash Recovery |  |

#### Assessment
Continuous assessment: 40%
o 3 written assignments: 24% (8% for each assignment)
o Group project: 16%
o Form your group as early as possible
Final exam: 60%

#### Group Project
Group Size:
▪4~6 members
▪Each group should have a group leader
❖Group Enrollment
▪Start: 12:00 AM Feb 6
▪Due: 11:59 PM Feb 27
Each member of the same group will receive the same marks.

#### Assessment Guides
❖Criterion-referenced assessment
▪Intended Learning Outcomes & Rubrics
To pass this subject:
▪Final exam score must be \(be ≥30 \%\) 
▪Overall score must be \(be ≥35 \%\)
❖No LATE submission is accepted.

#### BEWARE!!!
• Unless otherwise stated, all work submitted by you should be your own.
Copying or sharing of assignments or any submitted work constitutes cheating.
• If there is any doubt about the appropriateness of your actions, please contact the instructor for explicit clarification.

#### Cost of Plagiarism
• Plagiarism is an offense and will result in appropriate disciplinary action against those involved.
• Penalty will be applied indiscriminatingly among those who involve (the one who copy and the one being copied). The minimum penalty would be receiving zero mark for the submitted work.
• Please refer to the following URL for the university’s guideline on penalizing plagiarism:
https://ar.hkbu.edu.hk/quality-assurance/university-policyand-guidelines/academic-integrity/section-2-plagiarism

#### Usage of Generative AI
Proper Use of Generative AI
▪explaining or clarifying concepts;
▪demonstrating and guiding practices of techniques;
▪planning and brainstorming on projects;
▪giving feedback on drafts;
▪generating samples for discussion and critical review.
University’s guideline:
https://bba.hkbu.edu.hk/academics/teaching-and-learningsupports

#### Overview
What is a Database?
A database is a collection of data that is organized so that its contents can be easily accessed, managed, and updated.

#### Why do we need a Database?
Pay tuition fees in Hang Seng Bank.
❖Borrow the textbook from the library.
❖Order the textbook from e-commerce websites.

#### Database is everywhere
Student/Course records Banking transactions Library book records (http://www.hkbu.edu.hk/lib) Online bookshop (http://www.amazon.com/)

#### Example database
Courses
| cid | cname | credit |
| --- | --- | --- |
| COMP2007 | Program | 3 |
| COMP4017 | Security | 3 |
| COMP2016 | Database | 3 |

Students
| sid | name | dept | gpa |
| --- | --- | --- | --- |
| 00001 | Jones | cs | 3.4 |
| 00002 | Joe | cs | 3.2 |
| 00003 | Smith | math | 3.8 |

Enrolled
| sid | cid | grade |
| --- | --- | --- |
| 00001 | COMP2016 | B |
| 00002 | COMP2016 | A |
| 00002 | COMP2007 | A |
| 00003 | COMP4017 | B |

#### Database concepts
❖A database consists of one or more tables. Each table is made up of a number of records (a.k.a. tuples). Each record contains several attributes.

#### Extract information from a database
We can ask questions for a database. For example:
▪Who has student id ‘1001’? 
▪Which courses has Bob taken? 
▪How many students have enrolled in COMP7640? 
▪How many female students are in DAAI program?
But a database doesn’t speak English…

#### Database language (SQL)
Who has student id ‘1001’?
```sql
SELECT name FROM Students WHERE sid = ‘1001’;
```

#### Course Objectives
❖To learn how to manage such a database. For example,
Design a database.
Query a database.
Disk and memory management
Access methods and indexing 
Query evaluation and optimization
Concurrency control and crash recovery 

#### References
❖A. Silberschatz, H. F. Korth, and S. Sudarshan, Database System Concepts, McGraw-Hill, 2019.
R. Ramakrishnan and J. Gehrke, Database Management Systems, 3rd Edition (ISBN 0-07-115110-9), McGraw-Hill, 2003. 
