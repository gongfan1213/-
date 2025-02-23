# 香港浸会大学计算机科学系
COMP7980 - 动态网络与移动编程
COMP7270 - 网络与移动编程
## 第2章 Bootstrap、JavaScript和表单
课程讲师：麻时钞博士、张策博士、姜锦田先生
2025年1月22日
### 公告
- 对上节课字体过小表示歉意。
- 将更改屏幕分辨率并使用Zoom进行屏幕共享。
Zoom链接：https://hkbu.zoom.us/j/99775423344?pwd=8Wi6pJIZ29TDkzj0X4Xnn bTTlEMjAj.1
选择Mac OS
- 账户名：guest
- 账户密码：
### 公告
- 讲师变更
### 讲师信息
麻时钞博士
- 邮箱：shichaoma@comp.hkbu.edu.hk
- 办公室：DLB 804
- 电话：3411 - 7599
张策博士
- 邮箱：cezhang@comp.hkbu.edu.hk
- 办公室：RRS 727
- 电话：3411 - 5979
姜锦田先生
- 邮箱：jintian-jiang@comp.hkbu.edu.hk
- 办公室：RRS 637
- 电话：3411 - 6454
### 议程
- 使用Bootstrap进行响应式网页设计
- 客户端JavaScript
- HTML表单元素
### 响应式网页设计
响应式网页设计（RWD）是一种网页设计方法，旨在创建能够在各种设备上提供最佳浏览和交互体验的网站。
### 视口元标签
CSS媒体查询
### 为什么需要响应式网页设计？
- 随着移动流量现在占互联网总流量的一半以上，响应式网页设计变得越来越重要。
- 这一趋势非常普遍，以至于谷歌已经开始提高对移动设备友好的网站在移动搜索中的排名。
- 这实际上对那些对移动设备不友好的网站进行了惩罚。
### Bootstrap
Bootstrap是一个流行的前端框架，它提供了一组预先设计好的HTML、CSS和JavaScript组件。其目的是简化构建响应式且以移动设备优先的网页和应用程序的过程。

Bootstrap提供了网格系统、CSS样式以及广泛的现成组件，如导航栏、按钮、表单、模态框等。这些组件易于定制且具有响应性，意味着它们能自动适应不同的屏幕尺寸和设备。
### 浏览器的响应式模式
Safari：可开启响应式模式查看网站在不同设备下的显示效果。
Chrome：
- 操作步骤：
  - 鼠标右键点击，选择“检查”按钮。
  - 找到“设备工具栏”并点击。
### Bootstrap网格系统
Bootstrap提供了一个响应式网格系统，有助于创建灵活且响应式的布局。该网格系统基于12列布局，使开发者能够轻松地在不同屏幕尺寸下组织和构建内容。

网格类：Bootstrap提供了CSS类，用于定义网格系统中列的布局和行为。你可以将这些类分配给HTML元素，以指定它们在不同屏幕尺寸下的表现。最常用的网格类有col-xs-*、col-sm-*、col-md-*和col-lg-* ，其中*代表元素应跨越的列数。
### 断点
Bootstrap包含六个默认断点，有时也称为网格层级，用于构建响应式布局。如果你使用的是我们的源Sass文件，这些断点是可以自定义的。
|断点|尺寸|
|---|---|
|超小|<576px|
|小|≥576px|
|中|≥768px|
|大|≥992px|
|超大|≥1200px|
|超超大|≥1400px|
### Bootstrap网格系统
响应行为：Bootstrap中的网格系统本质上是响应式的。通过应用适当的网格类，你可以控制元素在屏幕尺寸变化时如何堆叠或重新排列。例如，你可以指定一个元素在大屏幕上占据两列（col-lg-2），但在超小屏幕上占据整个宽度（col-12）。

嵌套和偏移：Bootstrap允许你在其他列中嵌套列，从而实现更复杂的嵌套布局。你还可以使用偏移类在列之间创建间距，或在网格中偏移列的位置。
### Bootstrap网格系统
- 在前面的示例中，container类为网格系统创建了一个响应式容器。row类代表网格中的一行，而col-*-*类定义了列。
- 在Bootstrap 5中，不指定列宽的“col”类是一个简写类，表示等宽列。
### 嵌套
列可以相互嵌套以创建更复杂的布局。

这允许你将一个列划分为多个子列，每个子列都有自己的宽度和内容排列方式。
### Bootstrap
响应式CSS：Bootstrap包含CSS类和实用程序，可实现元素的响应式行为。它允许你根据屏幕尺寸显示或隐藏内容、调整内边距和外边距，并控制元素的可见性。
这些类的命名格式为：对于超小屏幕（xs）是(property){sides}-{size}；对于小（sm）、中（md）、大（lg）、超大（xl）和超超大（xxl）屏幕是(property){sides}-{breakpoint}-{size}。

其中，property可以是：
- m - 用于设置外边距的类
- p - 用于设置内边距的类

sides可以是：
- t - 用于设置上边距或上内边距的类
- b - 用于设置下边距或下内边距的类
- s-(start) - 在从左到右（LTR）排版中用于设置左边距或左内边距，在从右到左（RTL）排版中用于设置右边距或右内边距的类
- e-(end) - 在从左到右（LTR）排版中用于设置右边距或右内边距，在从右到左（RTL）排版中用于设置左边距或左内边距的类
- x - 用于同时设置左右边距或内边距的类
- y - 用于同时设置上下边距或内边距的类
- 空白 - 用于设置元素所有四个边的外边距或内边距的类

size可以是：
- 0 - 用于通过将外边距或内边距设置为0来消除它们的类
- 1 -（默认）用于将外边距或内边距设置为$spacer * 0.25的类
- 2 -（默认）用于将外边距或内边距设置为$spacer * 0.5的类
- 3 -（默认）用于将外边距或内边距设置为$spacer的类
- 4 -（默认）用于将外边距或内边距设置为$spacer * 1.5的类
- 5 -（默认）用于将外边距或内边距设置为$spacer * 3的类
- auto - 用于将外边距设置为auto的类
### 外边距与内边距
```html
<div class="container my-4"> 
  <!-- 内容在此处 --> 
</div>
```
默认情况下，Spacer = 1rem = 字体大小 = 16px
### 更多关于Bootstrap
预设计组件：Bootstrap提供了广泛的预设计UI组件，常用于网页开发，如导航菜单、按钮、表单、卡片、轮播图等。这些组件具有默认样式和响应式行为，使创建一致且视觉吸引人的界面变得更加容易。

JavaScript插件：Bootstrap包含一组JavaScript插件，为组件添加交互性和增强功能。这些插件支持下拉菜单、模态框、工具提示、轮播图等功能，而无需你从头开始编写复杂的JavaScript代码。
### 使用JavaScript进行客户端脚本编写
JavaScript
- JavaScript旨在为HTML页面添加交互性。
- 注意，JavaScript和Java在概念和设计上是两种完全不同的语言！
- 我们使用JavaScript来定义网页的行为。
### JavaScript能做什么？
- 对事件做出反应：在某些事情发生时执行，比如页面加载完成或用户点击HTML元素时。例如，onchange、onclick等。
- 读取和写入HTML元素：读取和更改HTML元素的内容。
### 在DOM树中访问HTML元素
- 通过指定的id获取元素：document.getElementById("superhero")
- 当网页加载时，浏览器会创建页面的文档对象模型（DOM树）。
- 要访问DOM树中任意节点的父元素，使用elem.parentNode。
### 读取和写入HTML元素
- 为特定ID的元素分配新的类名：document.getElementById("myid").classList.add("active");
- 编辑特定ID元素的样式属性：document.getElementById("myid").style.display = "none";
- 修改元素的内部HTML：document.getElementById("myid").innerHTML = "Inner content";
### QuerySelector和QuerySelectorAll
这些方法返回与指定CSS选择器匹配的元素。
|元素选择器|示例|
|---|---|
|元素选择器|document.querySelector('td');|
|ID选择器|document.querySelector('#id2');|
|类选择器|document.querySelectorAll('.sundays');|
|属性选择器|document.querySelectorAll('ol[start="5"]');|
### QuerySelector和QuerySelectorAll
- document方法querySelector()返回文档中与指定选择器或选择器组匹配的第一个元素。如果未找到匹配项，则返回null。
- document方法querySelectorAll()返回文档中与指定选择器或选择器组匹配的元素集合。
### 数组
```javascript
const avengers = ['钢铁侠', '美国队长', '雷神索尔', '绿巨人', '黑寡妇', '鹰眼'];
```
- 数组用于按特定顺序存储和管理元素集合。
- 在JavaScript中，数组允许你将多个值组合在一个名称下，并使用数字索引访问这些值。
- 在person对象的上下文中，avengers是一个数组属性，你可以使用索引表示法avengers[index]访问数组中的特定元素。索引表示元素在数组中的位置，第一个元素的索引为0。
### for…of循环
```javascript
const avengers = ['钢铁侠', '美国队长', '雷神索尔', '绿巨人', '黑寡妇', '鹰眼'];
for (var avenger of avengers) {
  console.log(avenger);
}
```
我们可以使用for...of循环遍历数组中的所有元素。
### 表单元素
输入元素：<input>元素用于创建文本字段、复选框、单选按钮等。它允许用户输入数据。type属性决定了输入元素的具体类型。

类型属性：<input>元素的type属性指定要显示的输入控件类型。一些常见的值包括text（文本字段）、password（密码字段）、number（数字输入）、checkbox（复选框）和radio（单选按钮）。

选择元素：<select>元素创建一个下拉菜单或列表框。它允许用户从预定义的列表中选择选项。<select>元素内部的<option>元素代表可用的选择。
### HTML表单元素
客户端验证：HTML5提供了客户端验证功能，有助于在提交表单之前验证表单输入。

必填属性：required属性用于将输入字段标记为必填项。当应用于输入元素时，它确保用户在提交表单之前必须在该字段中提供值。

为数字字段指定有效范围，使用max和min属性。
### HTML表单元素
禁用属性：disabled属性禁用输入元素，防止用户与之交互。

按钮元素：<button>元素创建一个可点击的按钮。type属性指定按钮的行为。type="submit"用于创建一个提交按钮，触发表单提交。 
