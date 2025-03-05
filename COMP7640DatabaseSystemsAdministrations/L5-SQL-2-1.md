### SQL 2：高级SQL
#### 大纲
- 聚合函数
- GROUP BY、HAVING
- 嵌套查询
- ALL、SOME
- EXISTS/NOT EXISTS、IN/NOT IN
- WITH
#### 聚合函数
在实际应用中，我们常常需要执行一些汇总任务。一些具有代表性的聚合函数如下：
- **COUNT([DISTINCT] A)**：计算A列中（唯一）值的数量。
- **SUM([DISTINCT] A)**：计算A列中所有（唯一）值的总和。
- **AVG([DISTINCT] A)**：计算A列中所有（唯一）值的平均值。
- **MAX(A)**：返回A列中的最大值。
- **MIN(A)**：返回A列中的最小值。
#### 示例1（聚合函数）
- **SELECT MAX(amount) DEPOSIT FROM DEPOSIT**：答案：100k
| acc-id | cust-id | amount |
| --- | --- | --- |
| A.1 | - | 20k |
| A.2 | 1 | 5k |
| - | - | 35k |
| - | - | 100k |
| - | - | 35k |
- 如果我们将上述查询中的MAX替换为MIN、COUNT、SUM和AVG，答案分别为5k、5、195k和39k。
#### 示例2（聚合函数）
| acc-id | cust-id | amount |
| --- | --- | --- |
| A.1 | - | 20k |
| A2 | - | 5k |
| A3 | - | 35k |
| A.3 | - | 100k |
| A.1 | - | 35k |
- **查找存入账户A1的总金额**：**SELECT SUM(amount) FROM DEPOSIT WHERE acc-id = ‘A1’**
- **查找账户A1的存款总次数**：**SELECT COUNT(*) FROM DEPOSIT WHERE acc-id = ‘A1’**
#### 示例2（续）
| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 20k |
| - | 1 | 5k |
| - | - | 35k |
| - | - | 100k |
| A1 | - | 35k |
- **查找向账户A1存款的不同客户的数量**：**SELECT COUNT(DISTINCT cust-id) FROM DEPOSIT WHERE acc-id = ‘A1’** 答案：1
- **SELECT COUNT(DISTINCT cust-id) FROM DEPOSIT WHERE acc-id = ‘A3’** 答案：2
#### 使用聚合函数的常见错误
**查找存款金额最大的账户**：**SELECT acc-id, MAX(amount) FROM DEPOSIT**
| acc-id | cust-id | amount |
| --- | --- | --- |
| A.1 | - | 20k |
| - | - | 5k |
| - | - | 35k |
| - | - | 100k |
| - | - | 35k |
- 上述查询是错误的！我们不能简单地将带有聚合函数的属性放在SELECT子句中，除非查询中有GROUP BY子句。
#### 可能的解决方案
- **SELECT acc-id, amount FROM DEPOSIT ORDER BY amount DESC LIMIT 1**
- **SELECT acc-id, amount FROM DEPOSIT WHERE amount=MAX(SELECT amount FROM DEPOSIT)**
#### GROUP BY子句
当你想要对关系中的一组元组应用聚合函数时，会使用GROUP BY子句。例如，你想知道具有相同acc-id的元组数量。SELECT子句可以包含：（i）属性名；（ii）聚合函数。这些属性必须是出现在GROUP BY子句中的属性。聚合函数可以以任何属性作为参数，并且每个组必须只有一个值！
#### GROUP BY子句
- **attribute-set-A**：分组依据的属性集
- **aggregate-func(attribute X)**：对属性X应用的聚合函数
- **Table-Name**：表名
- **attribute-set-B**：其他属性集（可选）
#### 示例3（GROUP BY）
| acc-id | cust-id | amount |
| --- | --- | --- |
| A.1 | - | 20k |
| - | - | 5k |
| - | 2 | 35k |
| - | - | 100k |
| - | - | 35k |
- **SELECT acc-id, SUM(amount) FROM DEPOSIT GROUP BY acc-id**
- **SELECT acc-id, cust-id, SUM(amount) FROM DEPOSIT GROUP BY acc-id, cust-id**
| acc-id | SUM(amount) |
| --- | --- |
| A.1 | 55k |
| A2 | 5k |
| A3 | 135k |

| acc-id | cust-id | SUM(amount) |
| --- | --- | --- |
| A1 | - | 55k |
| - | 1 | 5k |
| A3 | - | 35k |
| - | - | 100k |
- 3个分组（第一个查询结果）
- 4个分组（第二个查询结果）
#### 使用GROUP BY子句的常见错误
| acc-id | cust-id | amount |
| --- | --- | --- |
| A.1 | - | 20k |
| - | - | 5k |
| - | - | 35k |
| - | - | 100k |
| - | - | 35k |
- **以下使用GROUP BY子句的查询是错误的**：**SELECT acc-id, cust-id, SUM(amount) FROM DEPOSIT GROUP BY acc-id**
cust-id不应该出现在SELECT子句中。
#### 使用GROUP BY子句的常见错误
**查找每个至少有两次存款的账户的总存款金额**：**SELECT acc-id, SUM(amount) FROM DEPOSIT WHERE COUNT(*) >= 2 GROUP BY acc-id**
| acc-id | cust-id | amount |
| --- | --- | --- |
| A.1 | - | 20k |
| - | 1 | 5k |
| - | 2 | 35k |
| - | - | 100k |
| - | - | 35k |
- （该查询是错误的！）WHERE子句中不能使用聚合函数。请记住：WHERE子句用于过滤元组，而聚合函数应用于组。因此，它们不兼容。
#### 问题1
1. 考虑名为DEPOSIT的表。判断以下SQL查询是否正确。如果正确，写出答案。否则，你需要说明原因。
| acc-id | cust-id | amount |
| --- | --- | --- |
| A.1 | - | 20k |
| - | - | 5k |
| - | - | 35k |
| - | - | 100k |
| - | - | 35k |
- (a) **SELECT acc-id, COUNT(cust-id) FROM DEPOSIT GROUP BY acc-id, cust-id**
- (b) **SELECT cust-id, COUNT(amount) FROM DEPOSIT GROUP BY cust-id**
- (c) **SELECT acc-id, SUM(amount) FROM DEPOSIT GROUP BY cust-id**
#### 问题1的解答
| acc-id | COUNT(cust-id) |
| --- | --- |
| A1 | 2 |
| A2 | 1 |
| A3 | 1 |
| A3 | 1 |

| cust-id | COUNT(amount) |
| --- | --- |
| 1 | 3 |
| 2 | 1 |
| 3 | 1 |
- (c)是不正确的，因为SELECT子句中的acc-id不在GROUP BY子句的属性中。
#### HAVING子句
HAVING子句用于指定对组的限定条件。例如，仅显示元组数量超过2的组。HAVING子句仅适用于组，因此只能与GROUP BY一起使用。HAVING子句通常只包含聚合函数。
#### 示例4（HAVING）
**查找每个至少有两次存款的账户的总存款金额**：**SELECT acc-id, SUM(amount) FROM DEPOSIT GROUP BY acc-id HAVING COUNT(*) >= 2**
| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 20k |
| - | - | 5k |
| - | - | 35k |
| - | - | 100k |
| - | - | 35k |
#### 示例4（续1）
**SELECT acc-id, SUM(amount) FROM DEPOSIT GROUP BY acc-id HAVING COUNT(*) >= 2**
1. 首先，处理GROUP BY。
| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 20k |
| A2 | - | 5k |
| - | - | 35k |
| - | - | 100k |
| - | - | 35k |
#### 示例4（续2）
**SELECT acc-id, SUM(amount) FROM DEPOSIT GROUP BY acc-id HAVING COUNT(*) >= 2**
2. 然后，处理HAVING，消除不符合HAVING条件的组。
| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 20k |
| A2 | - | 5k |
| - | - | 35k |
| - | - | 100k |
| - | - | 35k |
#### 示例4（续3）
**SELECT acc-id, SUM(amount) FROM DEPOSIT GROUP BY acc-id HAVING COUNT(*) >= 2**
3. 最后，处理SELECT。
| acc-id | SUM(amount) |
| --- | --- |
| A1 | 55k |
| A3 | 135k |
#### 问题2
考虑以下三个表，CUST、ACC和DEPOSIT。
| cust-id | name |
| --- | --- |
| - | John |
| 2 | Smith |

| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A.2 | 5k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | - | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |
1. 如果一个客户向某个账户存款，我们认为他/她拥有该账户。编写SQL查询，显示每个至少有两次存款的客户的姓名及其所有账户的总余额。
2. 编写SQL查询，显示每个账户余额小于10k的客户的姓名及其所有账户的总余额。
#### 问题2的解答
1. **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT GROUP BY CUST.cust-id, name HAVING COUNT(*)>=2**
2. **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT GROUP BY CUST.cust-id, name HAVING SUM(balance)<10k**
#### 示例5（结合GROUP BY子句的表连接）
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
| A2 | 1 | 1k |
| A2 | 2 | 3k |
- 对于每个客户，我们需要显示他/她的姓名以及他/她账户中的总金额。如果一个客户向某个账户存款，我们认为他/她拥有该账户。
- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name**
#### 示例5（续1）
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
| A.2 | - | 1k |
| A2 | 2 | 3k |
- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name**
1. 首先，考虑笛卡尔积。
| CUST.cust-id | CUST.name | ACC.acc-id | ACC.balance | DEPOSIT.acc-id | DEPOSIT.cust-id | DEPOSIT.amount |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | John | A1 | 20k | A1 | 1 | 1k |
| 1 | John | A1 | 20k | A2 | 1 | 1k |
| 1 | John | A1 | 20k | A2 | 2 | 3k |
| 1 | John | A2 | 5k | A1 | 1 | 1k |
| 1 | John | A2 | 5k | A2 | 1 | 1k |
| 1 | John | A2 | 5k | A2 | 2 | 3k |
| 2 | Smith | A1 | 20k | A1 | 1 | 1k |
| 2 | Smith | A1 | 20k | A2 | 1 | 1k |
| 2 | Smith | A1 | 20k | A2 | 2 | 3k |
| 2 | Smith | A2 | 5k | A1 | 1 | 1k |
| 2 | Smith | A2 | 5k | A2 | 1 | 1k |
| 2 | Smith | A2 | 5k | A2 | 2 | 3k |
#### 示例5（续2）
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
- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name**
2. 然后，获取满足“CUST.cust-id = DEPOSIT.cust-id”且“ACC.acc-id = DEPOSIT.acc-id”的元组。
| CUST.cust-id | CUST.name | ACC.acc-id | ACC.balance | DEPOSIT.acc-id | DEPOSIT.cust-id | DEPOSIT.amount |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | John | A1 | 20k | A1 | 1 | 1k |
| 1 | John | A2 | 5k | A2 | 1 | 1k |
| 2 | Smith | A2 | 5k | A2 | 2 | 3k |
#### 示例5（续3）
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
| A1 | 1 | 1k |
| A2 | - | 1k |
| A2 | 2 | 3k |
- **SELECT name, SUM(balance) FROM CUST, ACC, DEPOSIT WHERE CUST.cust-id = DEPOSIT.cust-id AND ACC.acc-id = DEPOSIT.acc-id GROUP BY CUST.cust-id, name**
3. 接着，创建分组。
| 分组 | CUST.cust-id | CUST.name | ACC.acc-id | ACC.balance | DEPOSIT.acc-id | DEPOSIT.cust-id | DEPOSIT.amount |
| --- | --- | --- | --- | --- | --- | --- | --- |
| group1 | 1 | John | A1 | 20k | A.1 | 1 | 1k |
|  | 1 | John | A.2 | 5k | A.2 | 1 | 1k |
| group2 | 2 | Smith | A2 | 5k | A.2 | 2 | 3k |
#### 示例5（续4）
| cust-id | name
