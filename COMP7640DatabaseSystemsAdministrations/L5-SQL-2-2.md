### 示例6
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |

对于每个至少进行了2次存款的客户，显示其姓名以及其账户中的总金额。
- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name HAVING COUNT(*) >= 2**
让我们逐步理解这个查询。
#### 示例6（续1）
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |

- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name HAVING COUNT(*) >= 2**
进行笛卡尔积运算、元组筛选，然后创建分组。
| 分组 | CUST.cust-id | CUST.name | ACC.acc-id | ACC.balance | DEPOSIT.acc-id | DEPOSIT.cust-id | DEPOSIT.amount |
| --- | --- | --- | --- | --- | --- | --- | --- |
| group1 | 1 | John | A1 | 20k | A1 | 1 | 1k |
|  | 1 | John | A2 | 5k | A.2 | 1 | 1k |
| group2 | 2 | Smith | A2 | 5k | A.2 | 2 | 3k |
#### 示例6（续2）
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |

- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name HAVING COUNT(*) >= 2**
处理HAVING子句。
| 分组 | CUST.cust-id | CUST.name | ACC.acc-id | ACC.balance | DEPOSIT.acc-id | DEPOSIT.cust-id | DEPOSIT.amount |
| --- | --- | --- | --- | --- | --- | --- | --- |
| group1 | 1 | John | A1 | 20k | A1 | - | 1k |
|  | 1 | John | A.2 | 5k | A.2 | 1 | 1k |
#### 示例6（续3）
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |

- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name HAVING COUNT(*) >= 2**
最后，处理SELECT子句。
| CUST. | SUM(balance) |
| --- | --- |
| name |  |
| John | 25k |
#### 示例7
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |

对于每个客户，显示其姓名以及其账户余额大于15k的账户总金额。
- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name HAVING SUM(balance) > 15000** 错误！
#### WHERE和HAVING使用时易犯的错误
#### 示例7（续1）
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |

对于每个客户，显示其姓名以及其账户余额大于15k的账户总金额。
- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id AND ACC.balance > 15000 GROUP BY CUST.cust-id, name**
注意：这里我们将额外条件放在WHERE子句中，而不是HAVING子句中。让我们逐步理解这个查询。
#### 示例7（续2）
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |

- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id AND ACC.balance > 15000 GROUP BY CUST.cust-id, name**
进行笛卡尔积运算、元组筛选，然后创建分组。
| CUST.cust-id | CUST.name | ACC.acc-id | ACC.balance | DEPOSIT.acc-id | DEPOSIT.cust-id | DEPOSIT.amount |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | John | A1 | 20k | A1 | 1 | 1k |
#### 示例7（续3）
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |

- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id AND ACC.balance > 15000 GROUP BY CUST.cust-id, name**
处理SELECT子句。
| name | SUM(balance) |
| --- | --- |
| John | 20k |
#### 嵌套查询
嵌套查询是指一个查询中嵌入了另一个查询。嵌入的查询称为子查询。子查询通常出现在WHERE子句、FROM子句或HAVING子句中。
#### 示例8（WHERE子句中的嵌套查询）
查找余额最大的账户的id。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | 2 | 35k |
- **SELECT acc-id FROM ACC WHERE balance = (SELECT MAX(balance) FROM ACC)** （FROM ACC部分的子查询）
#### 示例8（WHERE子句中的嵌套查询）
查找余额不是最大的账户的id。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | 2 | 15k |
| A4 | 3 | 100k |
- **SELECT acc-id FROM ACC WHERE balance < (SELECT MAX(balance) FROM ACC)** （FROM ACC部分的子查询）
#### 示例9（FROM子句中的嵌套查询）
定义客户的财富为其所有账户中的总金额。显示财富大于20k的客户的平均财富。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 2k |
| A3 | 2 | 100k |
| A4 | 3 | 3k |
| A5 | 3 | 1k |
- **SELECT AVG(wealth) FROM (SELECT SUM(balance) as wealth FROM ACC GROUP BY cust-id) AS TMP WHERE wealth > 20000**
结果：61k
#### 示例9（FROM子句中的嵌套查询）
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | - | 2k |
| A.3 | - | 100k |
| A4 | - | 3k |
| A.5 | - | 1k |

- **SELECT AVG(wealth) FROM (SELECT SUM(balance) as wealth FROM ACC GROUP BY cust-id) AS TMP WHERE wealth > 20000**
首先，执行FROM子句中的嵌套查询，该查询生成一个名为TMP的表，包含一个名为wealth的单列。从概念上讲，上述查询可以简化为：**SELECT AVG(wealth) FROM TMP WHERE wealth > 20000**
因此，结果是TMP中前两行的平均值。
| wealth |
| --- |
| 22k |
| 100k |
#### 示例10（ALL）
查找余额大于客户cust-id = 1拥有的所有账户余额的账户id。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | 2 | 15k |
| A4 | 3 | 100k |
- **SELECT acc-id FROM ACC WHERE balance > ALL (SELECT balance FROM ACC WHERE cust-id = 1)**
这里必须有一个比较运算符（例如，>、<、= ）
#### 示例11（SOME）
查找余额大于客户cust-id = 1拥有的至少一个账户余额的账户id。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A.1 | - | 20k |
| A2 | - | 5k |
| A.3 | 2 | 15k |
| A4 | 3 | 100k |
- **SELECT acc-id FROM ACC WHERE balance > SOME (SELECT balance FROM ACC WHERE cust-id = 1)**
答案：A1、A3、A4
#### 问题3
考虑以下名为Instructors的表。
| dept_name | ins_name | salary |
| --- | --- | --- |
| CS | Bob | 44000 |
| Chem | Smith | 38000 |
| CS | Tom | 45000 |
| Chem | Anne | 50000 |
| Math | Jone | 33000 |
1. 编写SQL查询，显示平均薪资大于42000的系的名称（dept_name）和平均薪资。
2. 编写SQL查询，显示薪资大于至少一个系中教师最高薪资的每个教师的姓名。
3. 编写SQL查询，显示薪资大于所有系中教师平均薪资的每个教师的姓名。
#### 问题3的解答
1. **SELECT dept_name, avg_salary FROM (SELECT dept_name, AVG(salary) AS avg_salary FROM Instructors GROUP BY dept_name) WHERE avg_salary>42000**
2. **SELECT T1.ins_name FROM Instructors T1 WHERE T1.salary>SOME(SELECT MAX(T2.salary) AS max_salary FROM Instructors T2 GROUP BY T2.dept_name)**
3. **SELECT T1.ins_name FROM Instructors T1 WHERE T1.salary > ALL(SELECT AVG(T2.salary) AS avg_salary FROM Instructors T2 GROUP BY T2.dept_name)**
#### 示例12（EXISTS）
查找余额不是最大的账户的id。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | 2 | 15k |
| A4 | 3 | 100k |
- **SELECT acc-id FROM ACC WHERE balance < (SELECT MAX(balance) FROM ACC)**
还有其他方法吗？
#### 示例12（EXISTS）
查找余额不是最大的账户的id。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | 2 | 15k |
| A4 | 3 | 100k |
- **SELECT T1.acc-id FROM ACC T1 WHERE EXISTS (SELECT * FROM ACC T2 WHERE T1.balance < T2.balance)**
注意，这个嵌套查询与我们之前看到的嵌套查询不同：它依赖于外部查询。嵌套查询中的T1引用了外部查询中的表。让我们看看它是如何执行的。
#### 示例12（续1）
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | - | 20k |
| A2 | 1 | 5k |
| A3 | 2 | 15k |
| A4 | 3 | 100k |

- **SELECT T1.acc-id FROM ACC T1 WHERE EXISTS (SELECT * FROM ACC T2 WHERE T1.balance < T2.balance)**
让我们逐个遍历T1中的每个元组。对于每个元组，获取其余额，并将其放在T1.balance的位置以使嵌套查询完整。具体来说，当我们查看T1中的第一个元组时，嵌套查询变为：**SELECT * FROM ACC T2 WHERE 20k < T2.balance**
执行该查询 - 它返回任何元组吗？是的，所以EXISTS评估为true，并且我们正在查看的T1中元组的acc-id会被显示出来。
#### 示例12（续2）
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | - | 20k |
| A2 | 1 | 5k |
| A3 | 2 | 15k |
| A4 | 3 | 100k |

- **SELECT T1.acc-id FROM ACC T1 WHERE EXISTS (SELECT * FROM ACC T2 WHERE T1.balance < T2.balance)**
对T1中的所有元组重复上述过程。显示所有元组的acc-id，直到我们到达最后一个元组，对于该元组，嵌套查询的形式为：**SELECT * FROM ACC T2 WHERE 100k < T2.balance**
执行该查询 - 它返回任何元组吗？不，所以EXISTS评估为false，并且T1中最后一个元组的acc-id不会被显示出来。
#### 示例13（NOT EXISTS）
查找余额最大的账户的id。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | 2 | 15k |
| A4 | 3 | 100k
