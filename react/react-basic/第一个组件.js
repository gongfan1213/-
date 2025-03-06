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