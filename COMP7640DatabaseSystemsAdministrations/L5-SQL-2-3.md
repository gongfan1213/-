### 示例14（IN）
查找同时被`cust-id`为1和2的客户存入资金的账户的`acc-id`。
| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | 1 | 2k |
| A1 | 1 | 1k |
| A2 | 1 | 1k |
| A2 | 2 | 3k |
| A3 | 3 | 2k |
| A3 | 2 | 5k |
- **SELECT acc-id FROM DEPOSIT WHERE cust-id = 2 AND acc-id IN (SELECT acc-id FROM DEPOSIT WHERE cust-id = 1)**
答案：A2
还有其他方法吗？
#### 示例14（续）
查找同时被`cust-id`为1和2的客户存入资金的账户的`acc-id`。
- **(SELECT acc-id FROM DEPOSIT WHERE cust-id = 2) INTERSECT (SELECT acc-id FROM DEPOSIT WHERE cust-id = 1)**
答案：A2
#### 示例15（NOT IN）
查找被`cust-id`为2的客户存入资金，但未被`cust-id`为1的客户存入资金的账户的`acc-id`。
| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | 1 | 2k |
| A1 | 1 | 1k |
| A2 | 1 | 1k |
| A2 | 2 | 3k |
| A3 | 3 | 2k |
| A3 | 2 | 5k |
- **SELECT acc-id FROM DEPOSIT WHERE cust-id = 2 AND acc-id NOT IN (SELECT acc-id FROM DEPOSIT WHERE cust-id = 1)**
答案：A3
还有其他方法吗？
#### 示例15（续）
查找被`cust-id`为2的客户存入资金，但未被`cust-id`为1的客户存入资金的账户的`acc-id`。
- **(SELECT acc-id FROM DEPOSIT WHERE cust-id = 2) EXCEPT (SELECT acc-id FROM DEPOSIT WHERE cust-id = 1)**
答案：A3
#### 示例16（WITH）
定义客户的财富为其所有账户中的总金额。显示财富大于20k的客户的平均财富。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 2k |
| A3 | 2 | 100k |
| A4 | 3 | 3k |
| A5 | 3 | 1k |
- **WITH TMP AS (SELECT SUM(balance) as wealth FROM ACC GROUP BY cust-id) SELECT AVG(wealth) FROM TMP WHERE wealth > 20000**
结果：61k
#### 问题4
考虑以下`ACC`和`DEPOSIT`表。
| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A.2 | 18k |
| A.3 | 10k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | 1 | 2k |
| A1 | 1 | 1k |
| A2 | 1 | 1k |
| A2 | 2 | 3k |
| A3 | 3 | 2k |
| A.3 | 3 | 5k |

编写SQL查询，查找未出现在`DEPOSIT`表中的账户的`acc-id`。
#### 问题4的解答
- **SELECT ACC.acc-id FROM ACC WHERE NOT EXISTS (SELECT * FROM DEPOSIT WHERE ACC.acc-id=DEPOSIT.acc-id)**
#### 问题5
考虑以下`ACC`和`DEPOSIT`表。
| acc-id | balance |
| --- | --- |
| A1 | 20k |
| A.2 | 18k |
| A.3 | 10k |

| acc-id | cust-id | amount |
| --- | --- | --- |
| A1 | 1 | 2k |
| A1 | 1 | 1k |
| A2 | 1 | 1k |
| A2 | 2 | 3k |
| A3 | 3 | 2k |
| A.3 | 3 | 5k |

编写两个不同的SQL查询，查找被`cust-id`为2的客户存入资金的账户的`acc-id`及其余额。
#### 问题5的解答
- **SELECT acc-id, balance FROM ACC WHERE acc-id IN (SELECT acc-id FROM DEPOSIT WHERE cust-id = 2)**
- **SELECT ACC.acc-id, ACC.balance FROM ACC WHERE EXISTS (SELECT * FROM DEPOSIT WHERE ACC.acc-id=DEPOSIT.acc-id AND cust-id = 2)**
#### 我们学到了什么？
- 聚合函数（`MAX`、`MIN`、`COUNT`、`SUM`和`AVG`）
- `GROUP BY`、`HAVING`
- 嵌套查询
- `ALL`、`SOME`
- `EXISTS`、`NOT EXISTS`
- `IN`、`NOT IN`
- `WITH` 
