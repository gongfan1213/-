# 1
# 2
# 3
react:用于构建用户界面的javascript库，
reactnative移动端应用程序ios,android
声明式，组件化，一次学习跨平台编写
### 声明式编程
只需要维护自己的状态，当状态改变的时候react可以根据最新的状态渲染我们的ui界面，render函数，数据改变自动执行render函数，
### 组件化开发
### 多平台适配
# 4
## react的开发依赖
- react:包含react所必须的核心代码
- react-dom:react渲染在不同平台上的所需要的核心代码
- babel:将jsx转换成为react代码的工具
让每一个库单纯做自己的事情
react的0.14版本之前是没有react-dom这个概念的，所有的功能都在react里面的
- 为什么要进行拆分？原因是因为react-native
- react的包当中包含了react web和react native所共同拥有的核心代码
- react-dom针对web和native所完成的事情是不同的，
- web端react-dom会将jsx最终渲染成为真实的dom显示在浏览器上的
- native端：react-dom会将jsx渲染成为原生的控件，比如android当中的Button,iOs当中的UIButton
## babel和react的关系
Babel又称为Bael.js
- 是目前使用非常广泛的编译器和转移器
- 比如当下很多浏览器并不支持ES6的语法，但是确实es6的语法非常的简介和方便，我们开发的时候需要使用它的
- 那么编写源码的时候就可以使用ES6来编写，之后通过Babel工具，将es6转换成为大多数浏览器支持的ES5的语法
- react和babel的关系
- 默认情况下，开发react其实可以不使用babel.
- 但是前提是我们自己使用React.createElement来编写源代码的，它编写的代码非常繁琐可读性差的
- 那么我们可以直接编写jsx(javascript XML)的语法，并且让babel帮助我们转换成为React.createElement的语法
# 
cdn链接：
- 获取react和reactDOM的umd版本，
- crossorigin方便拿到跨域脚本的错误的信息，验证使用cdn的时候应该设置Acces-control-allow-origin
```js
<script crossorigin src=""></script>
ReactDOM.render(<h2>Hello wolrd</h2>,document.querySelector("#root"))
```
## react依赖的引入
如果添加这三个依赖呢？
#
- 1.直接cdn引入
- 2.下载后添加本地依赖
- 3.通过npm管理，后续脚手架再使用
- 
