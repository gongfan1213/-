### 香港浸会大学计算机科学系
COMP7980 - 动态网络与移动编程
COMP7270 - 网络与移动编程
#### 第1章 网页开发入门
课程讲师：刘金伟博士、张策博士、蒋金田先生
2025年1月10日
#### 学习目标
- 能够使用标记创建HTML页面。
- 能够使用CSS为HTML页面设置样式。
#### 什么是HTML？
- HTML代表超文本标记语言（Hyper Text Markup Language）。
- 它是一种标记语言，而非编程语言。
- 注意，标记语言是一种以与文本本身可区分的方式对文本进行注释的系统。
#### 标签、元素和属性
标签名位于尖括号之间，如`<tag_name>`。这是起始标签，结束标签的名称前有一个斜杠，即`</tag_name>`。

一对起始标签和结束标签之间的标记内容称为元素。
- 示例：`<tag_name>标记内容</tag_name>`
#### 标签、元素和属性
- 允许嵌套元素。
- 示例：
```html
<parent_tag>
    <child_tag>标记内容</child_tag>
</parent_tag>
```
- 元素可以有属性，属性出现在起始标签内，由一个或多个名值对组成，格式为：
  - `attribute_name="attribute_value"` 或
  - `attribute_name='attribute_value'`
#### 示例
```html
<html>
<head>
    <title>这是一个起始页面</title>
</head>
<body>
    <h1 style="text-align:center">这是一个起始页面</h1>
    点击 <a href="http://www.comp.hkbu.edu.hk">这里</a> 前往香港浸会大学计算机系<br>
</body>
</html>
```
#### HTML链接
- 几乎所有网页中都有链接。
- 链接允许用户通过点击在页面之间跳转。
- 在HTML中使用`<a>`标签来指定链接。
- `href`属性指定目标，可以是：
  - 另一个文档，和/或
  - 另一个元素（由`id`指定）
#### HTML链接
- 示例：
  - 在HTML文档内创建一个命名的`div`：`<div id="cp3">第3章</div>`
  - 在同一文档内创建一个指向“第3章”的链接：`<a href="#cp3">前往第3章</a>`
  - 或者，从另一个页面创建一个指向“第3章”的链接：`<a href="anchor1.html#cp3">前往第3章</a>`
#### HTML表格
- 表格使用`<table>`标签定义。
- 表格通过`<tr>`标签划分为行。
- 每一行通过`<td>`标签划分为数据单元格。
- `<td>`标签可以包含文本、链接、图像、列表、表单、其他表格等。
- `<th>`标签表示表格标题，其中的文本元素会以加粗和居中的形式显示。
#### 5×5乘法表
```html
<!DOCTYPE html>
<html>
<head>
    <title>乘法表</title>
    <style>
        table, th, td {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <h1>5×5乘法表</h1>
    <table style="width:50%">
        <tr>
            <td></td>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
        </tr>
        <tr>
            <th>1</th>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
        </tr>
        <tr>
            <th>2</th>
            <td>2</td>
            <td>4</td>
            <td>6</td>
            <td>8</td>
            <td>10</td>
        </tr>
        <tr>
            <th>3</th>
            <td>3</td>
            <td>6</td>
            <td>9</td>
            <td>12</td>
            <td>15</td>
        </tr>
        <tr>
            <th>4</th>
            <td>4</td>
            <td>8</td>
            <td>12</td>
            <td>16</td>
            <td>20</td>
        </tr>
        <tr>
            <th>5</th>
            <td>5</td>
            <td>10</td>
            <td>15</td>
            <td>20</td>
            <td>25</td>
        </tr>
    </table>
</body>
</html>
```
| | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | 2 | 3 | 4 | 5 |
| 2 | 2 | 4 | 6 | 8 | 10 |
| 3 | 3 | 6 | 9 | 12 | 15 |
| 4 | 4 | 8 | 12 | 16 | 20 |
| 5 | 5 | 10 | 15 | 20 | 25 |
#### HTML列表
- 无序列表
  - 使用`<ul>`标签定义。
  - 每个项目以`<li>`标签开始。
- 有序列表
  - 使用`<ol>`标签定义。
  - 每个项目以`<li>`标签开始。
- 列表可以嵌套。
#### 什么是CSS？
- CSS代表层叠样式表（Cascading Style Sheets）。
- 样式定义了如何显示HTML元素。
#### CSS及其优势
HTML旨在定义文档的内容。

CSS定义样式和格式：
- 为任何元素一次性指定显示细节。
- 样式可以保存在外部的`.css`文件中。
- 在单个文件中更改所有页面的显示效果。
#### 在哪里使用CSS？
- 外部样式表：样式应用于多个页面，每个页面必须在`<head>`部分使用`<link>`标签进行链接。
- 内部样式表：对于具有独特样式的单个文档，使用`<style>`标签指定。
- 内联样式：使用`style`属性。
#### CSS链接方式
```html
<html>
<head>
    <link rel="stylesheet" href="external.css">
    <style>
        p {
            color: #ff0033;
        }
    </style>
</head>
<body>
    <p style="color:#ff0033;">一些文本。</p>
</body>
</html>
```
#### CSS语法
- 两个主要部分：选择器 { 声明 }
- 选择器：指定要设置样式的HTML元素。多个选择器用逗号分隔。
- 声明：每个声明由一个属性和一个值组成。多个声明用分号分隔。注释包含在`/*`和`*/`之间。
#### 选择器的匹配
| 通过元素名选择所有元素 | p { ... } |
| --- | --- |
| 通过类名选择所有元素 | .marked { ... } |
| 通过id选择元素 | #color { ... } |
| 指定所有元素 | \* { ... } |
#### 一些CSS属性
- `background-color`：指定要使用的背景颜色。
- `color`：指定文本的颜色。
- `text-align`：指定元素中文本的水平对齐方式。
- `text-transform`：控制文本的大小写。
- `text-decoration`：指定添加的装饰。
#### CSS属性（续）
- `font-family`：指定元素的字体。
- `font-weight`：设置文本中字符显示的粗细程度。
- `font-style`：指定文本的字体样式。
- `font-size`：设置字体的大小。
```css
body {
    background-color: black;
    color: white;
    font-family: times, arial, serif;
}
h1 {
    text-align: center;
    text-transform: uppercase;
    text-decoration: underline;
}
h2 {
    font-weight: bold;
    font-style: oblique;
}
```
#### CSS盒模型
所有HTML元素都可以被视为盒子。
#### CSS盒模型
- 外边距（Margin）：在边框周围清除一块区域。外边距没有背景颜色，完全透明。
- 边框（Border）：围绕内边距和内容的边框。边框受盒子背景颜色的影响。
- 内边距（Padding）：在内容周围清除一块区域。内边距受盒子背景颜色的影响。
- 内容（Content）：盒子的内容，文本和图像出现在这里。
#### CSS盒模型
| margin, padding | 示例 |
| --- | --- |
| 四个方向 | margin : 0 px ; |
| 上下 左右 | padding : 2 px 10 px ; |
| 上 左右 下 | padding : 2 px 10 px 5 px ; |
| 上 右 下 左 | padding : 2 px 10 px 5 px 15 px ; |
#### CSS盒模型
- 边框（border）：`border-width`（边框宽度）、`border-style`（边框样式）、`border-color`（边框颜色）。
- 一些`border-style`的值：`none`（无）、`dotted`（点状）、`dashed`（虚线）、`solid`（实线）、`double`（双线）。
- 示例：`border: 5px solid gray;`（边框为5像素宽的灰色实线）
```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS盒模型</title>
    <style>
       .ex {
            width: 220px;
            padding: 2px 10px 5px;
            border: 5px solid gray;
            margin: 0px;
        }
    </style>
</head>
<body>
    <img src="http://via.placeholder.com/250x100/dec.png" width="250" height="100" />
    <br>
    <div class="ex">
        250x100
        上面的图片宽250像素。
        这个元素的总宽度也是250像素。
        上面的图片宽250像素。<br>
        这个元素的总宽度也是250像素。
    </div>
</body>
</html>
```
#### CSS object-fit
`object-fit`属性指定替换元素的内容应如何适配其使用高度和宽度所建立的盒子。
#### 浮动元素
浮动元素可以向左或向右浮动，允许其他元素环绕它。

我是一个浮动元素。

我是外部盒子内的文本。如果文本足够多，文本将环绕浮动元素。外部的边框将环绕文本。

- 元素如何浮动：元素水平浮动。
- 浮动元素会尽可能向左或向右移动。
#### HTML的块级元素和内联元素
HTML元素可以是块级元素或内联元素。
- 块级元素：占据可用的全部宽度，在其前后会有换行。示例：`<h1>`、`<p>`、`<div>`。
- 内联元素：仅占据必要的宽度，不会强制换行。示例：`<span>`、`<a>`、`<img>`。
#### 显示属性
使用CSS的`display`属性可以将内联元素更改为块级元素，反之亦然。
- 示例：
  - `li {display:inline;}` （将`li`显示为内联元素）
  - `span {display:block;}` （将`span`显示为块级元素）
- 要隐藏一个元素，可以将其CSS`display`属性设置为`none`。示例：`span {display:none;}` （此元素将不会显示）
```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS显示属性示例</title>
</head>
<body>
    <p>文本中的 <span style="display:block">块级span</span>。</p>
    <p>文本中的 <span>内联span</span>。</p>
    <ul>
        <li>块级项目1</li>
        <li style="display:inline">内联项目2</li>
        <li style="display:inline">内联项目3</li>
        <li style="display:none">隐藏项目4</li>
        <li>块级项目5</li>
    </ul>
</body>
</html>
``` 
