//react组件时一段可以使用标签进行扩展的javascript函数
//react组件时一段可以使用标签进行扩展的javascript函数
//组件可以渲染其他组件，不要嵌套他们的定义
//react允许你创建组件，应用程序的可复用ui元素
//在react应用程序当中，每一个ui模块都是组件
//react是一个常规的javasceipt函数，他们的名字总是以大写字母开始的，返回jsx标签
//react组件的名字必须是以大写字母开头的，
//不可以在组件当中定义组件的
//https://react.docschina.org/learn/importing-and-exporting-components
//有些根组件可能会声明在其他的文件当中，如果使用的框架是基于文件进行路由的，每一个页面的跟组件都会不一样的
//默认导出和具名导出，默认导出，一个文件有且仅有一个默认导出，但是可以有任意多个具名导出
//默认导入的时候，可以在import语句后面进行任意的命名，比如Import Banan from './Button.js
//获得和默认导出一样的内容，对于具名导入，导入和导出的名字必须是一致的
import {Profile} from './Gallery.js'
import Gallery from './Gallery.js';
import {Profile} from './Gallery.js';
export default function App() {
    return (
        <div>
            <Gallery />
            <Profile />
        </div>
    )
}
//使用jsx书写标签语言
//jsx和react是相互独立的东西，经常一起使用的，可以单独使用他们任意一个，jsx是一种语法的扩展，而react怎是一个javasceipt库

//jsx是javascript语法的扩展，在javascript文件当中书写类似html标签，逻辑越来越决定页面当中的内容，javascript负责html1的内容，渲染逻辑和标签共同存在于同一个地方当中组件
//react fragment允许你将子元素分组，不会再html结构当中添加额外的节点
//jsx看起来很像是html，但是在底层其实被转化为了javascript对象，你不能在一个函数当中返回多个对象，
//在jsx当中通过大括号使用javascript
export default function Avatar() {

}
//把一个字符串属性传递给jsx的时候把他放到单引号或者双引号
//大括号可以让你直接在标签当中使用javascript
const today = new Date();
function formatDate(date) {
    return new Initl.DateTimeFormat('zh-CN',{weekda:'long'}).format(date);

}
export default function TodoList() {
    return (
        <h1>To Do List for{formatDate(today)}</h1>
    )
}
//jsx当中使用大括号的两种场景
//用作jsx标签内的文本
//用作jsx标签内的文本
// 用作紧跟在= 符号后面的属性，用作紧紧跟在=符号后面的属性
//在jsx传递对象，对象也用大括号表示的，为了能在jsx当中传递，你必须用另外一个对额外的大括号包裹对象
//内联样式的时候，给style属性传递一个对象
//在jsx的内联css样式当中已经见过这种写法了，react不要求你使用内联样式，使用css类就能满足大部分的情况
//<ul style ={{backgroundColor:'black'}}
//将多个表达式合并到一个对象当中，
const person = {
    name:' gerorio Y.Zara',
    theme: {
        backgroundColor:'black',
        color:'pink'
    }
};
export default function TodoList() {
    return (
        <div style = {person.theme}>
            <h1>{person.name}</h1>
            <img className="avatar"
            src = {person.avatarUrl}
            alt = {person.name}
            />
            <ul>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}
//jsx是一种模板语言的最小实现，允许你通过javascript来组织数据和逻辑的
//jsx引号内的值可以作为字符串传递给属性的
//大括号可以让你将javascript逻辑和变量带入标签当中，
//在jsx标签当中的内容翦或者紧随属性的=后起作用
