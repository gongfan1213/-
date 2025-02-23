### 香港浸会大学计算机科学系
- COMP7980 - 动态网络与移动编程
- COMP7270 - 网络与移动编程
- 第4章 CRUD操作
- 课程讲师：马世超博士、张策博士、蒋金田先生
- 2025年2月12日

### 公告
- 请选择Mac OS系统。
- 尽快找到你的小组成员。
- 可以通过发送电子邮件寻找小组成员。
- 2025年2月12日

### 准备工作
- 从Moodle下载lab04 - materials。
- 解压到一个文件夹。
- 进入该文件夹并安装库：
  - `cd lab04`
  - `npm install`
- 设置MongoDB数据库：
  - 在`utils/db.js`文件中，将变量`process.env.MONGODB_URI`赋值为你自己的连接字符串。
- 2025年2月12日

### 路由
- **路由/端点**：路由是指Web应用程序中的一种机制或映射，它将特定的URL模式与处理函数或控制器方法关联起来。它定义了在服务器端应用程序代码中，传入的请求如何被定向和处理。在Web开发中，路由通常与特定的HTTP方法（也称为HTTP动词）相关联。HTTP方法定义了客户端想要对由URL标识的资源执行的操作或动作类型。在Web开发的上下文中，“端点”和“路由”这两个术语通常可以互换使用。
- **路由处理函数**：`post('/bookings', router.async function (req, res) {... })`

### 路由处理程序
```javascript
router.post('/booking', async function (req, res) {
    const db = await connectToDB();
    try {
        // connectToDB()由我们的db.js提供
        req.body.numTickets = parseInt(req.body.numTickets);
        req.body.terms = req.body.terms? true : false; 
        req.body.created_at = new Date(); 
        req.body.modified_at = new Date();
        // 在将数据保存到数据库之前进行一些数据转换
        let result = await db.collection("bookings").insertOne(req.body); 
        // 通常做法是返回新创建文档的ID
        res.status(201).json({ id: result.insertedId }); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```
- **req**：请求对象代表传入的HTTP请求，包含各种属性和方法，用于访问请求的不同部分。例如，`req.body.*`包含在请求体中提交的数据的键值对，比如通过post方法提交的表单数据。
- **res**：响应对象代表服务器对客户端请求的响应。它提供了将响应发送回客户端的方法和属性。`res.json(response)`：此方法用于以JSON格式将数据发送回客户端。它接受一个对象或数据结构作为参数，并在作为响应发送之前自动将其转换为JSON格式。

### JSON
- JSON（JavaScript对象表示法）是一种轻量级的数据交换格式，通常用于在服务器和客户端之间，或应用程序的不同组件之间传输数据。它旨在对人类可读，并且对人和机器来说都易于解析。
```javascript
// JavaScript对象数组
var bookings = [
    { email: "martin@choy.com", numTickets: 4 },
    { email: "kenny@cheng.com", numTickets: 3 }
];
// 字符串化
JSON.stringify(bookings);
// 解析
JSON.parse('[{"email": "martin@choy.com", "numTickets": 4 },{"email": "kenny@cheng.com", "numTickets": 3 }]');
```

### 列表
```javascript
router.get('/booking', async function (req, res) {
    const db = await connectToDB();
    try {
        let results = await db.collection("bookings").find().toArray(); 
        res.render('bookings', { bookings: results }); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```
- 此路由处理程序将检索所有预订信息并渲染bookings.ejs。
- 一个数据对象作为函数的第二个参数提供。
- 在bookings.ejs中，视图引擎可以使用属性名bookings来访问结果数组。

### 渲染方法
- `router.get('/booking')`：此方法用于渲染位于views文件夹中的特定页面或模板。它允许你动态生成HTML或其他类型的内容，并将其作为响应发送给客户端。请注意，这里数组被称为bookings。
```html
<!-- bookings.ejs -->
<table>
    <% for (var booking of bookings) { %>
        <tr>
            <td><%= booking.email %></td> 
            <td><%= booking.numTickets %></td>
        </tr>
    <% } %>
</table>
```

### 路由处理程序和视图
```javascript
router.get('/booking', async function (req, res) {
    try { 
        const db = await connectToDB();
        // 访问http://localhost:3000/booking
        let results = await db.collection("bookings").find().toArray(); 
        res.render('bookings', { bookings: results });
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```
```html
<table>
    <% for (var booking of bookings) { %>
        <tr>
            <td><%= booking.email %></td>
            <td><%= booking.numTickets %></td>
        </tr>
        <!-- 数组中表示一个预订 -->
    <% } %>
</table>
```

### 异步/等待
```javascript
/* 显示所有预订 */
router.get('/booking', async function (req, res) {
    let results = await db.collection("bookings").find().toArray(); 
    res.render('bookings', { bookings: results });
});
```
- 这里使用await操作符来确保在继续执行下一行之前，方法已经执行完毕。
- “await”只能存在于async函数内部，因此它不会阻止其他函数（路由处理程序）并发运行。

### 其他CRUD操作（创建、读取、更新和删除）
- 显示一个预订：`email: 'tony@starks.com', numTickets: 2, team: 'Avengers', _id: ObjectId("6332ee629f7735181a381f2f"), superhero: 'Ironman', payment: 'Paypal'` 注意这里使用了`findOne()`方法，该方法返回第一个匹配的文档。
```javascript
/* 显示单个预订 */
router.get('/booking/read/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("bookings").findOne({ _id: new ObjectId(req.params.id) }); 
        // 按主键查找
        if (result) {
            res.render('booking', { booking: result });
        } else {
            res.status(404).json({ message: "预订未找到" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```

### 路径参数
- 我们可能希望获取URL的路径参数。这可以通过在路由中设置动态参数来实现。在index.js中开发：`router.get('/booking/read/:id', async function (req, res) {... })` 在路由处理程序中，这些参数可以通过`req.params.*`访问，例如`req.params.id`。
- 示例URL：`http://localhost:3000/booking/read/`

### 删除
```javascript
// 删除单个预订
router.post('/booking/delete/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("bookings").deleteOne({ _id: new ObjectId(req.params.id) }); 
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "预订已删除" });
        } else {
            res.status(404).json({ message: "预订未找到" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```
- 示例表单提交地址：`action="http://localhost:3000/booking/delete/6332ee629f7735181a381f2f"`
- `deleteOne()`方法用于删除指定的文档。

### 更新
- 获取请求：返回一个预填充值的HTML表单
```javascript
// 显示更新表单
router.get('/booking/update/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        let result = await db.collection("bookings").findOne({ _id: new ObjectId(req.params.id) }); 
        if (result) {
            res.render('update', { booking: result });
        } else {
            res.status(404).json({ message: "预订未找到" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```
- 更新单个预订
```javascript
// 更新单个预订
router.post('/booking/update/:id', async function (req, res) {
    const db = await connectToDB();
    try {
        req.body.numTickets = parseInt(req.body.numTickets);
        req.body.terms = req.body.terms? true : false; 
        req.body.superhero = req.body.superhero || ""; 
        // 超级英雄未提交时的默认值
        req.body.modified_at = new Date(); 
        let result = await db.collection("bookings").updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body }); 
        // 更新数据库中的数据
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "预订已更新" });
        } else {
            res.status(404).json({ message: "预订未找到" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```

### 搜索
```javascript
// 搜索预订
router.get('/booking/search', async function (req, res) {
    const db = await connectToDB(); 
    try {
        // 这里使用$regex提供部分匹配
        let query = {};
        if (req.query.email) {
            query.email = { $regex: req.query.email };
        }
        if (req.query.numTickets) {
            query.numTickets = parseInt(req.query.numTickets);
        }
        let result = await db.collection("bookings").find(query).toArray(); 
        res.render('bookings', { bookings: result });
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```
- 示例URL：`http://localhost:3000/booking/search?email=tony&numTickets=2`
- 两个条件（如果都提供）都必须满足

### 分页
```javascript
// 基于查询参数page和limit进行分页，并返回文档总数
router.get('/booking/paginate', async function (req, res) {
    const db = await connectToDB(); 
    try {
        // 每页的项目数
        let page = parseInt(req.query.page) || 1;
        let perPage = parseInt(req.query.perPage) || 10;
        let skip = (page - 1) * perPage; 
        // 要跳过的项目数
        let result = await db.collection("bookings").find().skip(skip).limit(perPage).toArray(); 
        let total = await db.collection("bookings").countDocuments(); 
        res.render('bookings', { bookings: result, total: total, page: page, perPage: perPage });
    } catch (err) {
        // page和perPage可能在路由处理程序中被修改
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});
```
- 示例URL：`http://localhost:3000/booking/paginate?perPage=2&page=2`

### 分页链接
- 利用模板引擎计算总页数。
```html
<% for (let i = 1; i <= Math.ceil(total / perPage); i++) { %>
    <% if(i === page) { %>
        <span><%= i %></span>
    <% } else { %>
        <a href="/booking/paginate?page=<%= i %>&perPage=<%= perPage %>"><%= i %></a>
    <% } %>
<% } %>
```

### 状态码
- 状态码，也称为HTTP状态码或响应码，是服务器在响应中包含的一个三位数字代码，用于指示客户端发出的HTTP请求的状态或结果。状态码提供了有关请求 - 响应周期的成功、失败或其他相关条件的信息。它们使客户端和服务器能够进行通信，并理解请求的结果，而无需仅依赖于响应体。
| 状态码 | 含义 |
| ---- | ---- |
| 200 | 成功（OK） |
| 201 | 已创建（Created） |
| 204 | 无内容（No Content） |
| 400 | 错误请求（Bad Request） |
| 401 | 未授权（Unauthorized） |
| 403 | 禁止访问（Forbidden） |
| 404 | 未找到（Not Found） |
| 405 | 方法不允许（Method Not Allowed） |
| 500 | 内部服务器错误（Internal Server Error） |
| 503 | 服务不可用（Service Unavailable） | 
