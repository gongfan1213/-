### SQL 1
#### 引言
- **SQL**：结构化查询语言（Structured Query Language），发音为“S-Q-L”或“sequel”。它是所有商业数据库系统（包括Oracle、MS Access、MySQL等）的查询语言。在上一讲中，你已经见过一些SQL示例。
#### 基本SQL查询
| SELECT [DISTINCT] target-list |
| --- |
| FROM relation-list |
| WHERE qualification |

- **relation-list**：关系名列表。
- **target-list**：relation-list中关系的属性列表。
- **qualification**：使用AND和OR组合的查询条件。
- **DISTINCT**是一个可选关键字，用于表明查询结果不应包含重复项。默认情况下不会消除重复项！
#### SQL示例1（SELECT和FROM）
- **SELECT * FROM CUST**：简单返回整个CUSTOMER表。“*”表示所有属性。
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
| 182-73-6091 | Turner | Putnam | Stamford |
| 192-83-7465 | Johnson | Alma | Palo Alto |
| 244-66-8800 | Curry | North | Rye |
| 321-12-3123 | Jones | Main | Harrison |
| 335-57-7991 | Adams | Spring | Pittsfield |
| 336-66-9999 | Lindsay | Park | Pittsfield |
| 677-89-9011 | Hayes | Main | Harrison |
| 963-96-3963 | Williams | Nassau | Princeton |
#### SQL示例2（SELECT和FROM）
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
| 182-73-6091 | Turner | Putnam | Stamford |
| 192-83-7465 | Johnson | Alma | Palo Alto |
| 244-66-8800 | Curry | North | Rye |
| 321-12-3123 | Jones | Main | Harrison |
| 335-57-7991 | Adams | Spring | Pittsfield |
| 336-66-9999 | Lindsay | Park | Pittsfield |
| 677-89-9011 | Hayes | Main | Harrison |
| 963-96-3963 | Williams | Nassau | Princeton |

- **SELECT customer-id FROM CUSTOMER**：仅保留此关系中所有记录的customer-id属性。
| customer-id |
| --- |
| 019-28-3746 |
| 182-73-6091 |
| 192-83-7465 |
| 244-66-8800 |
| 321-12-3123 |
| 335-57-7991 |
| 336-66-9999 |
| 677-89-9011 |
| 963-96-3963 |
#### SQL示例2（AS）
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
| 182-73-6091 | Turner | Putnam | Stamford |
| 192-83-7465 | Johnson | Alma | Palo Alto |
| 244-66-8800 | Curry | North | Rye |
| 321-12-3123 | Jones | Main | Harrison |
| 335-57-7991 | Adams | Spring | Pittsfield |
| 336-66-9999 | Lindsay | Park | Pittsfield |
| 677-89-9011 | Hayes | Main | Harrison |
| 963-96-3963 | Williams | Nassau | Princeton |

- **SELECT customer-id AS cid FROM CUSTOMER**：在SELECT子句中使用AS重命名输出列。
| cid |
| --- |
| 019-28-3746 |
| 182-73-6091 |
| 192-83-7465 |
| 244-66-8800 |
| 321-12-3123 |
| 335-57-7991 |
| 336-66-9999 |
| 677-89-9011 |
| 963-96-3963 |
#### SQL示例3（DISTINCT）
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
| 182-73-6091 | Turner | Putnam | Stamford |
| 192-83-7465 | Johnson | Alma | Palo Alto |
| 244-66-8800 | Curry | North | Rye |
| 321-12-3123 | Jones | Main | Harrison |
| 335-57-7991 | Adams | Spring | Pittsfield |
| 336-66-9999 | Lindsay | Park | Pittsfield |
| 677-89-9011 | Hayes | Main | Harrison |
| 963-96-3963 | Williams | Nassau | Princeton |

- **SELECT customer-city FROM CUSTOMER**
- **SELECT DISTINCT customer-city FROM CUSTOMER**：使用此SQL查询去除重复项。
#### SQL示例4（WHERE）
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
| 182-73-6091 | Turner | Putnam | Stamford |
| 192-83-7465 | Johnson | Alma | Palo Alto |
| 244-66-8800 | Curry | North | Rye |
| 321-12-3123 | Jones | Main | Harrison |
| 335-57-7991 | Adams | Spring | Pittsfield |
| 336-66-9999 | Lindsay | Park | Pittsfield |
| 677-89-9011 | Hayes | Main | Harrison |
| 963-96-3963 | Williams | Nassau | Princeton |

- **SELECT * FROM CUSTOMER WHERE customer-name = ‘Smith’**：WHERE用于给出过滤条件。
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
#### SQL示例5（WHERE）
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
| 182-73-6091 | Turner | Putnam | Stamford |
| 192-83-7465 | Johnson | Alma | Palo Alto |
| 244-66-8800 | Curry | North | Rye |
| 321-12-3123 | Jones | Main | Harrison |
| 335-57-7991 | Adams | Spring | Pittsfield |
| 336-66-9999 | Lindsay | Park | Pittsfield |
| 677-89-9011 | Hayes | Main | Harrison |
| 963-96-3963 | Williams | Nassau | Princeton |

- 如果我们想“查找居住在Pittsfield的客户的元组”，SQL查询应该是什么？
- **SELECT * FROM CUSTOMER WHERE customer-city = ‘Pittsfield’**
#### SQL示例6（AND）
- **表模式**：CUSTOMER(customer-id, customer-name, customer-street, customer-city)
- **查找居住在‘Pittsfield’市‘Park’街的客户姓名**。
- **SELECT customer-name FROM CUSTOMER WHERE customer-street = ‘Park’ AND customer-city = ‘Pittsfield’**
#### SQL示例7（OR）
- **表模式**：CUSTOMER(customer-id, customer-name, customer-street, customer-city)
- **查找居住在‘Pittsfield’市或‘Rye’市的客户的customer-id和姓名**。
- **SELECT customer-id, customer-name FROM CUSTOMER WHERE customer-city = ‘Pittsfield’ OR customer-city = ‘Rye’**
#### SQL示例8（LIKE）
- **表模式**：CUSTOMER(customer-id, customer-name, customer-street, customer-city)
- **查找姓名以字母J开头且至少包含两个字母的客户的id**。
- **SELECT customer-id FROM CUSTOMER WHERE customer-name LIKE ‘J_%’**
- **LIKE用于字符串匹配**。“_”代表任意一个字符，“%”代表0个或多个任意字符。
#### 问题1
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
| 182-73-6091 | Turner | Putnam | Stamford |
| 192-83-7465 | Johnson | Alma | Palo Alto |
| 244-66-8800 | Curry | North | Rye |
| 321-12-3123 | Jones | Main | Harrison |
| 335-57-7991 | Adams | Spring | Pittsfield |
| 336-66-9999 | Lindsay | Park | Pittsfield |
| 677-89-9011 | Hayes | Main | Harrison |
| 963-96-3963 | Williams | Nassau | Princeton |
1. 假设我们想“查找居住在Palo Alto的客户的元组”，SQL查询应该是什么？
2. 编写SQL查询，仅显示居住在Palo Alto的客户的姓名。
#### 问题1
| customer-id | customer-name | customer-street | customer-city |
| --- | --- | --- | --- |
| 019-28-3746 | Smith | North | Rye |
| 182-73-6091 | Turner | Putnam | Stamford |
| 192-83-7465 | Johnson | Alma | Palo Alto |
| 244-66-8800 | Curry | North | Rye |
| 321-12-3123 | Jones | Main | Harrison |
| 335-57-7991 | Adams | Spring | Pittsfield |
| 336-66-9999 | Lindsay | Park | Pittsfield |
| 677-89-9011 | Hayes | Main | Harrison |
| 963-96-3963 | Williams | Nassau | Princeton |
3. 编写SQL查询，查找居住在‘Palo Alto’市‘Alma’街的客户的姓名。
4. 以下SQL查询的结果是什么？
**SELECT customer-id FROM CUSTOMER WHERE customer-street LIKE ‘N%’ OR customer-city LIKE ‘H_%’**
#### SQL示例9（ORDER BY）
之前的查询没有任何排序要求。我们可以使用“ORDER BY”请求有序结果。
- **SELECT * FROM ACC WHERE balance > 10000 ORDER BY balance**
- **SELECT * FROM ACC WHERE balance > 10000 ORDER BY balance DESC**
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | N/m | 35k |
| A4 |  | 100k |

| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A3 | N/m | 35k |
| A4 |  | 100k |

| acc-id | cust-id | balance |
| --- | --- | --- |
| A4 | 3 | 100k |
| A3 | 2 | 35k |
| A1 | 1 | 20k |
#### SQL示例10（算术表达式）
在SELECT和WHERE子句中允许使用算术表达式。
| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | N/m | 35k |
| A4 |  | 100k |

- **SELECT balance*0.05 AS interest FROM ACC WHERE balance*1.05 < 20000**
这个查询的答案是什么？
#### SQL示例11（笛卡尔积）
在前面的幻灯片中，我们所有的查询都是从单个表中检索信息。现在考虑两个表：CUST和ACC。
| cust-id | name |
| --- | --- |
| 1 | John |
| 2 | Smith |
| 3 | Joan |

| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | N/m | 35k |
| A4 |  | 100k |

- **SELECT * FROM CUST, ACC**这个查询会显示什么？
#### SQL示例11（笛卡尔积）
| cust-id | name |
| --- | --- |
| 1 | John |
| 2 | Smith |
| 3 | Joan |

| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | N/m | 35k |
| A4 |  | 100k |

| CUST.cust-id | CUST.name | ACC.acc-id | ACC.cust-id | ACC.balance |
| --- | --- | --- | --- | --- |
| 1 | John | A1 | 1 | 20k |
| 1 | John | A2 | 1 | 5k |
| 1 | John | A3 | 2 | 35k |
| 1 | John | A4 | 3 | 100k |
| 2 | Smith | A1 | 1 | 20k |
| 2 | Smith | A2 | 1 | 5k |
| 2 | Smith | A3 | 2 | 35k |
| 2 | Smith | A4 | 3 | 100k |
| 3 | Joan | A1 | 1 | 20k |
| 3 | Joan | A2 | 1 | 5k |
| 3 | Joan | A3 | 2 | 35k |
| 3 | Joan | A4 | 3 | 100k |

- **SELECT * FROM CUST, ACC**这个查询的结果
#### SQL示例12（连接）
| cust-id | name |
| --- | --- |
| 1 | John |
| 2 | Smith |
| 3 | Joan |

| acc-id | cust-id | balance |
| --- | --- | --- |
| A1 | 1 | 20k |
| A2 | 1 | 5k |
| A3 | N/m | 35k |
| A4 |  | 100k |

- 编写一个SQL查询，为每个账户显示其acc-id和所有者的姓名。我们不能仅使用一个表来回答这个查询。我们需要对笛卡尔积进行过滤和投影。
- **SELECT ACC.acc-id, CUST.name FROM CUST, ACC WHERE CUST.cust-id = ACC.cust-id**
| ACC.acc-id | CUST.name |
| --- | --- |
| A1 | John |
| A2 | John |
| A3 | Smith |
| A4 | Joan |
#### SQL示例12（连接）
| cust-id | name |
| --- | --- |
| 1 | John |
| 2 | Smith |
| 3 | Joan |

| acc-id |
