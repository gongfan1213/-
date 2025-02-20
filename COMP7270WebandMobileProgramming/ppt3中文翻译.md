
# 香港浸会大学计算机科学系
COMP7980 - 动态网络与移动编程
COMP7270 - 网络与移动编程
## 第3章 HTTP与Express框架
课程讲师：马世超博士、张策博士、蒋锦田先生
2025年4月2日
### 公告
- **小组项目**：详见Moodle平台上的项目指南。每个小组由2 - 3名学生组成，请使用谷歌在线Excel表格“小组表单”加入小组。
### 议程
- HTTP协议
- HTML表单提交
- Node.js - JavaScript运行环境
- 使用Express进行Web应用开发
- NoSQL数据库
### HTTP协议
超文本传输协议（HTTP）是一种应用层协议，用于Web浏览器和Web服务器之间的通信，是万维网数据通信的基础。

HTTP是一种请求 - 响应协议，客户端（通常是Web浏览器）向服务器发送请求，服务器则返回请求的数据。
#### HTTP协议的关键特性
- **无状态**：HTTP是无状态协议，这意味着客户端的每个请求都是独立的，不会保留之前请求的任何信息，这有利于构建可扩展的分布式系统。
- **统一资源标识符（URI）**：HTTP使用URI来识别和定位网络上的资源，URI包括URL（统一资源定位符），它指定了特定资源（如网页或图片）的地址。
#### HTTP协议的关键特性
- **方法**：HTTP定义了多种方法，用于表明客户端对资源想要执行的操作类型。最常见的方法有GET（检索资源）、POST（发送要处理的数据）、PUT（更新资源）、DELETE（删除资源）和HEAD（检索资源的元数据） 。
- **状态码**：HTTP使用状态码来表示请求的结果，这些代码提供了关于请求是否成功、是否遇到错误或是否需要进一步操作的信息。例如，状态码200表示请求成功，而404表示请求的资源未找到。
#### HTTP协议的关键特性
- **头部**：HTTP头部是随请求或响应一起发送的附加信息，头部可以包含元数据、身份验证凭据、缓存指令以及其他有助于客户端和服务器之间通信的详细信息。
- **Cookie**：HTTP支持使用Cookie，Cookie是服务器存储在客户端的小块数据，它允许服务器在多个请求之间维护会话信息并记住用户偏好。
#### IP地址
互联网上的每台机器都必须有一个唯一的IP地址，以便通信能够被路由到正确的计算机。
- **IPv4**：32位二进制数，例如123.45.67.89，每个数字的范围是0到255。
#### 域名与本地机器
- **域名**：域名会映射到IP地址，更易于记忆，如hkbu.edu.hk映射到158.182.0.81。
- **本地机器**：可以使用127.0.0.1（IP地址）或localhost（域名）来引用本地机器。
#### 端口
不同的互联网服务会使用不同的端口：
- Web服务器通常使用端口80。
- 端口8000和8080是提供HTTP服务（但不是核心HTTP服务器）的软件常用端口。
|端口号|协议|应用|
|---|---|---|
|20|TCP|FTP数据传输|
|21|TCP|FTP控制|
|22|TCP|SSH|
|25|TCP|SMTP|
|53|UDP/TCP|DNS|
|80|TCP|HTTP（万维网）|
|110|TCP|POP3|
|443|TCP|SSL|
### HTML表单提交
```html
<form action="https://www.httpbin.org/post" method="POST">
    <input name="email" type="email">
    <input name="numTickets" type="number" min=1 max=4>
    <button type="submit">Submit</button>
</form>
```
- 表单用于向服务器传递数据。
- 提交按钮会触发提交操作。
- action属性指定表单数据将被提交到的地址。
- method属性指定用于发送表单数据的HTTP请求方法。
#### Name属性
```html
<input name="numTickets" type="number">
```
- name属性指定了<input>元素的名称。
- name属性可用于在客户端JavaScript中引用元素，或在表单提交时引用表单数据。
- 注意：只有具有name属性的表单元素才会包含在表单提交中。
#### 复选框
```html
<input name="box" type="checkbox" value="dummy">Option 1
```
- 当该复选框被点击时，该表单元素的名称及其值会被提交到服务器，如box = "dummy"。
- 如果该复选框未被点击，则该表单元素不会被提交。
```html
<input name="box" type="checkbox" value="dummy" checked>
```
- 要使复选框默认被选中，可在开始标签中添加checked属性。
#### HTTP方法 - GET
```
http://server/path/endpoint?input1=value1&input2=value2&...
```
- 如果未指定方法，GET是HTML表单的默认方法。
- 使用GET方法时，表单数据会作为查询参数附加到URL上，这意味着表单数据在URL中是可见的，这可能会对安全性和隐私性产生影响。GET请求通常用于从服务器检索数据，并且是幂等的，即多个相同的请求与单个请求具有相同的效果 。
- GET请求可以被添加书签、缓存和共享，因为表单数据是URL的一部分。然而，可传输的URL长度有限，因此大量数据不适合使用GET请求。
#### HTTP方法 - POST
- POST将表单数据放在HTTP请求的主体中发送，而不是附加到URL上，这使得POST请求对于敏感数据更安全，因为数据不会直接在URL中可见。
- POST请求不是幂等的，这意味着多个相同的请求可能会对服务器产生不同的影响。这是因为POST请求通常用于修改服务器上数据的操作，如创建新资源或更新现有数据。
- POST请求不能直接从URL添加书签或共享，因为表单数据不是URL本身的一部分。
- POST请求在可发送的数据长度上没有内在限制，因此适合传输大量数据。
### JavaScript补充知识
#### JavaScript
- **弱类型语言**：同一个变量可以重新赋值为不同类型的值。
- **变量命名规则**：名称区分大小写，名称以字母或下划线字符开头。
#### JavaScript数据类型
- 要将字符串解析为数字，可以使用parseInt()函数。
```javascript
numVariable = parseInt(stringValue);
```
- 如果输入字符串不以数字开头，将返回NaN（非数字），可以使用isNaN()函数检查该值。
```javascript
isNaN(numVariable)
```
#### JavaScript对象
JavaScript对象可以看作是属性的集合。每个属性由一个键值标识，并且可以保存任何类型的值，包括其他对象。此外，对象也可以包含函数作为属性。然而，当一个对象不包含任何函数，主要用于存储和操作数据时，它通常被称为“普通对象”或“数据对象”。
```javascript
var person = {
    name: "John Doe",
    age: 30,
    occupation: "Software Engineer",
    isStudent: false,
    hobbies: ["reading", "playing guitar", "hiking"],
    address: {
        street: "123 Main St",
        city: "Anytown",
        country: "USA"
    }
};
```
要访问这个人的城市，可以使用person.address.city。
#### 假值
- 值分为“真值”和“假值”。一个未赋值的变量，其类型为undefined。
```javascript
var undefinedVar;
undefined
typeof undefinedVar
'undefined'
if (undefinedVar)
    foo = "It's truthy";
else
    foo = "It's falsy"
"It's falsy"
```
|假值|类型|
|---|---|
|false|布尔值|
|0|数字|
|NaN|数字|
|'' 或 ""（空字符串）|字符串|
|null|对象|
|undefined|未定义|
#### 相等比较
| |true|false|0|
|---|---|---|---|
|true|true|false|false|
|false|false|true|true|
|0|false|true|true|
| |false|true|true|
| |true|false|0|
|---|---|---|---|
|true|true|false|false|
|false|false|true|false|
|0|false|false|true|
| |false|false|false|true|
### Node.js、Express与MongoDB
#### Node.js
Node.js是一个开源的服务器端JavaScript运行环境，允许开发人员在服务器上运行JavaScript代码。

Node.js拥有庞大的开源模块和包生态系统，可通过Node包管理器（NPM）获取。这些模块提供了各种功能，可以轻松集成到Node.js应用程序中，使开发人员能够利用他人的工作成果，加快开发过程。

Node.js通常用于构建Web服务器、API、实时应用程序（如聊天应用程序和游戏服务器）、流媒体应用程序和微服务。由于其性能、可扩展性以及能够将JavaScript用作全栈语言的特性，它在开发人员中颇受欢迎。
#### Express
Express是一个快速、简约且灵活的Node.js Web应用框架，它为构建Web应用程序和API提供了丰富的功能和实用工具。Express.js基于Node.js核心HTTP模块构建，简化了处理HTTP请求和响应的过程。
```javascript
router.post('/form', function (req, res) {
    var response = {
        header: req.headers,
        body: req.body
    };
    res.json(response);
});
```
- **路由**：Express.js允许开发人员定义处理特定HTTP请求（如GET、POST、PUT、DELETE）的路由及其相应操作。
- **模板引擎**：Express支持多种模板引擎，如Pug（以前称为Jade）、EJS（嵌入式JavaScript）、Handlebars等。模板引擎能够动态生成HTML或其他标记语言，简化了视图渲染和动态内容生成的过程。
```html
<table>
    <% for (var booking of bookings) { %>
        <tr>
            <td><%= booking.email %></td>
            <td><%= booking.numTickets %></td>
        </tr>
    <% } %>
</table>
```
响应客户端：
```html
<table>
    <tr>
        <td>tony@stark.com</td>
        <td>2</td>
    </tr>
    <tr>
        <td>bruce@wayne.com</td>
        <td>1</td>
    </tr>
</table>
```
#### 请求对象
在Node.js/Express环境下，req对象代表HTTP请求，具有以下属性：
|req.params|路由参数（例如 /:id ）|
|---|---|
|req.query|查询参数，通过GET提交的表单数据|
|req.body|请求体，通过POST提交的表单数据|
#### NoSQL数据库
NoSQL（不仅仅是SQL）数据库是一种数据库管理系统，它提供非关系型数据模型来存储和检索数据。
- NoSQL数据库支持动态模式设计，这意味着每个记录或文档可以有自己的结构，无需预定义模式。在处理具有不同属性的数据或模式需要随时间演变的情况时，这种灵活性非常有用。
#### 集合与文档
```json
{
    "id":"ObjectId(527b3c65ceafed9b254a94)",
    "f_name":"Zenny",
    "sex":"Female",
    "class":"",
    "age":1
} // Document1
{
    "id":"ObjectId(527b3cc65ceafed9b2254a95)",
    "f_name":"Pau",
    "sex":"Male",
    "class":"VI",
    "age":13
} // Document2
{
    "id":"ObjectId(527b3cc65ceafed9b2254a97)",
    "f_name":"Lassy",
    "sex":"Female",
    "class":"VII",
    "age":13,
    "grd_point":28.2514
} // Document3
```
|关系型数据库|NoSQL数据库|
|---|---|
|数据库|数据库|
|表|集合|
|行|文档|
|列|字段|
#### MongoDB
- _id字段在MongoDB中保留用作主键。
- MongoDB使用ObjectId作为每个文档_id字段的默认值，在创建任何文档时生成。
- 一个ObjectId长度为12字节。
```json
{
    "_id":"ObjectId(5099803df3f4948bd2f98391)",
    "name":{
        "first":"ALan",
        "last":"Turing"
    },
    "birth":new Date('Jun 23, 1912'),
    "death":new Date('Jun 07, 1954'),
    "contribs":[
        "Turing machine",
        "Turing test",
        "Turingery"
    ],
    "views":NumberLong(1250000)
}
```
#### MongoDB
MongoDB提供了强大且灵活的查询语言，支持广泛的操作，用于检索、修改和聚合数据。该查询语言具备过滤、排序、连接和执行复杂聚合的功能，适用于各种用例。
```javascript
db.users.insertOne({ // 插入操作，collection为users集合
    name:"sue",
    age:26,
    status: "pending"
})
db.users.find({ // 查询操作，collection为users集合
    age:{$gt:18} // 查询条件，年龄大于18
},
{
    name:1,
    address:1 // 投影，只返回name和address字段
}).limit(5) // 游标修饰符，限制返回结果为5条
``` 
