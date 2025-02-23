### 香港浸会大学计算机科学系
COMP7980 - 动态网络与移动编程
COMP7270 - 网络与移动编程
第5章 数据可视化
课程讲师：马世超博士、张策博士、蒋金田先生
2025年2月19日

### 公告
- **作业1 - 在线调查系统（非Ajax）**：查看Moodle上的指南。截止日期：3月9日24:00。不允许通过电子邮件提交，逾期提交将不予评分。
- 2025年2月19日

### 准备工作
- 选择Mac OS系统，账户：guest。
- 从Moodle下载lab05 - materials。
- 解压到一个文件夹。
- 将文件夹名称重命名为‘lab05’。
- 进入该文件夹并安装库：
  - `cd lab05`
  - `npm install`
- 设置MongoDB数据库：在`utils/db.js`文件中，将变量`process.env.MONGODB_URI`赋值为你自己的连接字符串。
- 2025年2月19日

### 最先进的图表库
#### AMCHARTS
经典图表融入新元素
XY图表如今功能强大且灵活，可用于绘制任何数据。支持数字、日期、时长或分类轴，且方向任意。坐标轴现在包含交互式断点，鼠标悬停时会展开，效果很棒。
#### 新的地理地图
地图现在使用GeoJSON格式！作为一种开放且被广泛接受的标准，它为现成和自定义地图提供了诸多可能性和来源。此外，地图现在非常灵活，支持多系列数据，可进行细致配置。
#### 更多关于amCharts 4
- 第一个：33.3%（原文“The frat”疑为“The first”的拼写错误）
- 第二个：23.0%
- 第三个：17.4%
- 第四个：11.4%
- 第五个：8.2%
- 第六个：4.2%
- 第七个：2.2%
#### 图片图表
可创建多层、多系列的图片图表。任何SVG路径都可作为图表的形状。
- 网址：https://www.amcharts.com
- 虽然考试不要求掌握amCharts图表绘制的前端语法，但从路由处理程序向EJS模板填充数据的代码是需要掌握的。

### 应用案例：按地区划分的急诊室就诊情况（每10万人）
西贡：17例

### 对象数组
- 由普通对象组成的数组。
- 它可以表示表格型数据，类似Excel工作表。
- 这是本课程中非常重要的数据结构。
```json
| name | value |
| ---- | ----- |
| SM   | 365387 |
| JYP  | 102242 |
| YG   | 349861 |
```
```javascript
a = [
    {
        name: "SM",
        value: 365387
    },
    {
        name: "JYP",
        value: 102242
    },
    {
        name: "YG",
        value: 349861
    }
]
a[0] = {
    name: "SM",
    value: 365387
}
a[2].value = 349861
```

### JSON.stringify
- `JSON.stringify()`是JavaScript中的一个方法，用于将JavaScript对象或值转换为JSON字符串。
- 它接受一个对象或值作为参数，并以JSON格式返回该对象的字符串表示形式。
```javascript
const obj = {
    name: 'John',
    age: 30,
    city: 'New York'
};
const jsonString = JSON.stringify(obj);
console.log(jsonString); 
// 输出: {"name":"John","age":30,"city":"New York"}
```

### 网页模板引擎
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
| 语法 | 作用 |
| ---- | ---- |
| `<%= %>` | 将值转义后输出到模板（HTML） |
| `<%- %>` | 将值不转义输出到模板 |

`series.data.setAll(eval(`<%- JSON.stringify(data) %>`));`

### HTML转义
- HTML转义是一种在HTML文档中使用相应字符实体来表示特殊字符和符号的技术。在HTML中，某些字符具有特殊含义，例如`<`和`>`用于标签，`&`用于实体，`"`、`'`和`&`用于属性值。
| 未转义字符 | 转义后字符 | 含义 |
| ---- | ---- | ---- |
| `<` | `&lt;` | 小于号 |
| `>` | `&gt;` | 大于号 |
| `"` | `&quot;` | 引号 |
| `&` | `&amp;` | 和号 |
| （空格） | `&nbsp;` | 不换行空格 |
- 未转义示例：`{"name":"John","age":30,"city":"New York"}`

### eval()
- `eval()`是JavaScript的内置函数，允许你计算字符串形式的代码，并将其作为原始代码的一部分执行。
- 它接受一个表示JavaScript表达式或语句的字符串参数，并返回计算该代码的结果。
```javascript
const x = 5;
const y = 10;
const code = 'x + y';
const result = eval(code); 
// 计算表达式'x + y'
console.log(result); 
// 输出: 15
``` 
