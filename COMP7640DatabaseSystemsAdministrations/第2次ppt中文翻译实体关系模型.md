# 实体关系（ER）模型（第1部分）
## 目录
- ER模型介绍
- 实体集
## 引言
数据库设计旨在确定存储底层应用程序中所有数据所需的表集合，同时捕捉数据之间的关系，并识别和理解管理数据的规则。例如，一个实验课最多容纳45名学生，‘A’等级的学生比例必须在10% - 20%之间。
## 数据建模
我们需要一种工具，以简洁而准确的方式表示这些规则，使信息系统开发人员和用户能够清晰理解。实体关系（ER）模型，也称为ER图，就是这样一种工具。它通过实体及其关系来表示规则，主要用于概念设计。
## 实体
实体是现实世界中可与其他对象区分开来的事物，比如一个人、一只宠物、一张CD等。实体具有属性，例如人有姓名和地址，宠物有昵称，CD有作者等。
## 实体集
实体集是具有相同属性的一组实体。例如：
| 姓名 | 香港身份证号码 | 地址 |
| ---- | ------------- | ---- |
| 爱丽丝 | R133428(6) | 九龙 |
| 鲍勃 | P625228(4) | 香港 |
| 坎迪 | A252242(7) | 新界 |
| ID | 姓名 |
| ---- | ---- |
| 1 | 山姆 |
| 2 | 莱迪 |
| 3 | 贝尔 |
上面分别展示了 “人” 和 “宠物” 两个实体集。
## 实体集的表示
| 姓名 | 香港身份证号码 | 地址 |
| ---- | ------------- | ---- |
| 爱丽丝 | R133428(6) | 九龙 |
| 鲍勃 | P625228(4) | 香港 |
| 坎迪 | A252242(7) | 新界 |
可以表示为：
Person
HKID
name
address
Person

| ID | 姓名 |
| ---- | ---- |
| 1 | 山姆 |
| 2 | 莱迪 |
| 3 | 贝尔 |
可以表示为：
Pet
ID name
Pet
## 键
每个实体集都有一个键，即能唯一标识一个实体的最小属性集。例如对于 “人” 这个实体集，（香港身份证号码，姓名）也是一个键吗？实际上，一个实体集可能有多个键，这些键被称为候选键，其中一个被指定为主键 。
## 属性类型
- **简单属性与复合属性**：复合属性由多个组件属性组成，如地址可以由街道、城市、州、邮政编码等组件属性构成，而姓名可能包含名字、中间名缩写、姓氏。
- **单值属性与多值属性**：例如姓名通常是单值属性，而电话号码可能是多值属性。
- **派生属性与非派生属性**：出生日期属于非派生属性，而年龄可以通过出生日期计算得出，属于派生属性。
## 示例
Person
HKID
name
address
street
street-number
street-name
apartment-number
city
state
zip-code
phone-number
date-of-birth
age
上面展示了 “人” 这个实体集的属性，其中 “phone-number” 是多值属性，“age” 是派生属性。
## 课堂练习
绘制 “学生” 实体集，并找出候选键。
## 解答
绘制 “学生” 实体集：
Student
Student-ID
Name
HKID
Age
Email
候选键有：学号（Student-ID）、香港身份证号码（HKID）和邮箱（Email）。
## 课堂练习
要求为系里开发一个小型数据库，需要记录特定学期提供的COMP课程信息、教授这些课程的教师信息，以及注册这些课程的学生信息。这个数据库中有哪些实体集？
## 解答
有3个实体集：课程（Course）、教师（Instructor）和学生（Student）。
Course
Course-Code
Name
Semester
Student
Student-ID
Name
Instructor
Staff-ID
Name
Course-Code
这里 “Course”“Student”“Instructor” 实体集中可能存在多值属性（图中已标注） 。 
