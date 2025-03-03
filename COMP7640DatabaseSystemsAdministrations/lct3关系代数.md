# 关系代数
## 概述
- 关系代数为表达查询提供了一种简洁的方式。它是 “真正” 查询语言（如SQL）的基础，并且比SQL更加简洁。
- 它在数据库专业人员中应用广泛。

## 关系代数的作用
- 关系型数据库管理系统（DBMS）是如何工作的呢？
    - 用户使用诸如SQL之类的语言表达查询。
    - DBMS将SQL查询转换为关系代数，同时寻找其他能产生相同结果但计算成本更低的代数表达式。
    - 基于关系代数，DBMS计算出查询结果。

## 基本操作
- 选择
- 投影
- 并集
- 差集
- 重命名
- 笛卡尔积
- 自然连接

## 示例表
我们的示例将使用 “Sailors”（水手）和 “Reserves”（预订）关系。
| sid | bid | day |
| --- | --- | --- |
| 22 | 101 | 1996/10/10 |
| 58 | 103 | 1996/11/12 |

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 |
| 31 | lubber | 8 | 55.5 |
| 58 | rusty | 10 | 35.0 |

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 31 | lubber | 8 | 55.5 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

## 选择
- 符号表示：\(\sigma_{p}(r)\)，其中 \(p\) 称为选择谓词，\(r\) 是一个关系。
- 定义为：\(\sigma_{p}(r)=\{t | t \in r \text{ 且 } p(t)\}\)。这里 \(p\) 是一个命题演算公式，由通过 \(\land\)（与）、\(\lor\)（或）、\(\neg\)（非）连接的项组成。每个项是以下形式之一：\(<属性> op <属性>\) 或 \(<常量>\)，其中 \(op\) 是 \(=\)、\(\neq\)、\(>\)、\(\geq\)、\(<\)、\(\leq\) 中的一个。

### 选择（1/3）
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 31 | lubber | 8 | 55.5 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

\(\sigma_{rating > 8}(S2)\) 的结果为：
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 58 | rusty | 10 | 35.0 |

### 选择（2/3）
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 31 | lubber | 8 | 55.5 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

\(\sigma_{rating > 8 \land sid > 40}(S2)\) 的结果为：
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 58 | rusty | 10 | 35.0 |

这里 \(\land\) 表示逻辑与。

### 选择（3/3）
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 31 | lubber | 8 | 55.5 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

\(\sigma_{rating > 8 \lor sid > 40}(S2)\) 的结果为：
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

这里 \(\lor\) 表示逻辑或。

## 问题1
| sid | sname | gpa | age |
| --- | --- | --- | --- |
| 42 | David | 4.0 | 21 |
| 15 | Louis | 2.8 | 19 |
| 98 | Amy | 1.7 | 20 |

以下查询的结果是什么？
- \(\sigma_{gpa > 2.6 \land gpa \leq 4.0}(\sigma_{age \geq 19 \land age \leq 20}(S))\)
- \(\sigma_{age \geq 19 \land age \leq 20}(\sigma_{gpa > 2.6 \land gpa \leq 4.0}(S))\)
- \(\sigma_{age \leq 19}(\sigma_{gpa > 2.8}(S))\)

## 投影
- 符号表示：\(\pi_{A_1, A_2, ..., A_k}(r)\)，其中 \(A_1\)，\(A_2\) 等是属性，\(r\) 是一个关系。
- 结果定义为通过删除未列出的列而获得的 \(k\) 列关系。由于关系是集合，所以结果中会去除重复行。

### 投影示例
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 31 | lubber | 8 | 55.5 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

\(\pi_{age}(S2)\) 的结果为：
| age |
| --- |
| 35.0 |
| 55.5 |

### 操作符组合
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 31 | lubber | 8 | 55.5 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

\(\pi_{sname, rating}(\sigma_{rating > 8}(S2))\) 的结果为：
| sname | rating |
| --- | --- |
| yuppy | 9 |
| rusty | 10 |

这是选择和投影的组合操作。

## 问题2
| sid | sname | gpa | age |
| --- | --- | --- | --- |
| 42 | David | 4.0 | 21 |
| 15 | Louis | 2.8 | 19 |
| 98 | Amy | 1.7 | 20 |

以下查询的结果是什么？
\(\pi_{age}(\sigma_{gpa > 2.6 \land gpa \leq 4.0}(S))\)

## 并集
- 两个输入关系必须是并兼容的：具有相同数量的属性，且 “对应” 的属性具有相同的数据类型。

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 |
| 31 | lubber | 8 | 55.5 |
| 58 | rusty | 10 | 35.0 |
| 44 | guppy | 5 | 35.0 |
| 28 | yuppy | 9 | 35.0 |

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 |
| 31 | lubber | 8 | 55.5 |
| 58 | rusty | 10 | 35.0 |

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 31 | lubber | 8 | 55.5 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

## 交集和差集
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 |
| 31 | lubber | 8 | 55.5 |
| 58 | rusty | 10 | 35.0 |

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 31 | lubber | 8 | 55.5 |
| 58 | rusty | 10 | 35.0 |

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 |

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 28 | yuppy | 9 | 35.0 |
| 31 | lubber | 8 | 55.5 |
| 44 | guppy | 5 | 35.0 |
| 58 | rusty | 10 | 35.0 |

## 重命名
| sid | sname | rating | age |
| --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 |
| 31 | lubber | 8 | 55.5 |
| 58 | rusty | 10 | 35.0 |

\(\rho_{My - table(id, name, level, age)}(S1)\) 的结果为：
| id | name | level | age |
| --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 |
| 31 | lubber | 8 | 55.5 |
| 58 | rusty | 10 | 35.0 |

## 笛卡尔积
| sid | bid | day |
| --- | --- | --- |
| 22 | 101 | 1996/10/10 |
| 58 | 103 | 1996/11/12 |

| sid | sname | rating | age |
| --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 |
| 31 | lubber | 8 | 55.5 |
| 58 | rusty | 10 | 35.0 |

\(S1 \times R1\) 的结果为：
| S1.sid | sname | rating | age | R1.sid | bid | day |
| --- | --- | --- | --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 | 22 | 101 | 1996/10/10 |
| 22 | dustin | 7 | 45.0 | 58 | 103 | 1996/11/12 |
| 31 | lubber | 8 | 55.5 | 22 | 101 | 1996/10/10 |
| 31 | lubber | 8 | 55.5 | 58 | 103 | 1996/11/12 |
| 58 | rusty | 10 | 35.0 | 22 | 101 | 1996/10/10 |
| 58 | rusty | 10 | 35.0 | 58 | 103 | 1996/11/12 |

## 自然连接操作
假设 \(R = (A, B, C, D)\)，\(S = (E, B, D)\)，自然连接在所有公共属性上进行相等匹配。
- 定义为：\(r \bowtie s=\prod_{r.A, r.B, r.C, r.D, s.E}(\sigma_{r.B = s.B \land r.D = s.D}(r \times s))\)，结果模式为 \((A, B, C, D, E)\)。

| S1.sid | sname | rating | age | R1.sid | bid | day |
| --- | --- | --- | --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 | 22 | 101 | 1996/10/10 |
| 22 | dustin | 7 | 45.0 | 58 | 103 | 1996/11/12 |
| 31 | lubber | 8 | 55.5 | 22 | 101 | 1996/10/10 |
| 31 | lubber | 8 | 55.5 | 58 | 103 | 1996/11/12 |
| 58 | rusty | 10 | 35.0 | 22 | 101 | 1996/10/10 |
| 58 | rusty | 10 | 35.0 | 58 | 103 | 1996/11/12 |

\(\sigma_{S1.sid = R1.sid}(S1 \times R1)\) 的结果为：
| S1.sid | sname | rating | age | R1.sid | bid | day |
| --- | --- | --- | --- | --- | --- | --- |
| 22 | dustin | 7 | 45.0 | 22 | 101 | 1996/10/10 |
| 58 | rusty | 10 | 35.0 | 58 | 103 | 1996/11/12 |

## 问题3
| sid | sname | gpa | age |
| --- | --- | --- | --- |
| 42 | David | 4.0 | 21 |
| 15 | Louis | 2.8 | 19 |
| 98 | Amy | 1.7 | 20 |

| sid | cid | day |
| --- | --- | --- |
| 15 | 2016 | 2018/01/09 |
| 15 | 2006 | 2018/12/01 |
| 42 | 4035 | 2020/11/01 |

以下查询的结果是什么？
- \(S \bowtie_{S.sid = E.sid} E\)
- \(S \bowtie_{S.sid = E.sid}(\sigma_{cid = 4035}(E))\)

## 问题1的答案
| sid | sname | gpa | age |
| --- | --- | --- | --- |
| 15 | Louis | 2.8 | 19 |

| sid | sname | gpa | age |
| --- | --- | --- | --- |
| 15 | Louis | 2.8 | 19 |

空集

## 问题2的答案
| age |
| --- |
| 21 |
| 19 |

## 问题3的答案
| sid | sname | gpa | age | cid | day |
| --- | --- | --- | --- | --- | --- |
| 42 | David | 4.0 | 21 | 4035 | 2020/11/01 |
| 15 | Louis | 2.8 | 19 | 
