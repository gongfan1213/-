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
# 5

因为React本身是一个JavaScript库，所以只要在HTML文件中通过script 标签引入相关的一些js文件，就可以直接用React来编写UI了。

```react
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    //1.将本文本定义成变量，定义好数据和函数渲染的时候绑定
    //vue当中改变数据自动重新渲染了
    let message = "Hello World"
    //2.监听按钮的点击
    function btnChick() {
      //修改shuju
      message = "hello React"
      //rootRemder()
      //重新修改界面的
      ReactDOM.render(
        <h1>Hello, React!</h1>,
        <button onClick = {btnClick}></button>
        document.getElementById('root')
      );

    }
    
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, React!</h1>,
        <button onClick = {btnClick}></button>
        document.getElementById('root')
      );
      //重复代码单独写一个root函数
      function rootRender() {
        root.render({
          <div>
          <h2>{{message}}</h2>
          <button onClick= {btnClick}>修改数据</button>
          </div>
        })
      }
    </script>
    
  </body>
</html>

```

在浏览器控制台中打印出React的值，可以看到React是一个对象，有很多的属性。



![img](https://user-gold-cdn.xitu.io/2019/9/26/16d6ca1eb736e114?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

大多的属性的属性值是方法。React.createElement就是我们常用的用来创建React元素。
# 6
- root.render函数-参数要渲染的根组件，一个组件或者一个html元素

- ReactDOM.createRoot函数用于创建一个react的根，之后渲染的内容会包含再这个根当中的
参数：将渲染的内容挂载到哪一个html元素上，这里我们已经定义了一个id为app的第v
- 必须添加type = text/babel作用是可以让babel解析jsx的语法的
```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <h2 class="title"></h2>
  <button class="btn">改变文本</button>
  <div id="root"></div>
  <script src="../lib/react.js"></script>
  <script src="../lib/react-dom.js"></script>
  <script src="../lib/babel.js"></script>
  <script>
    let message = "helloworld"
    function btnClick() {
      message = "hello world"
      rootRender()
    }
    const root = ReactDOM.createRoot(document.querySelector("#root"))
    function rootRender() {
      root.render({
        <div>
          <h2>{message}</h2>
          <button onClick={btnClick}>修改文本</button>
        </div>

      })
    }

    // 命令式编程: 每做一个操作,都是给计算机(浏览器)一步步命令
    // 声明式编程:
    // 1.定义数据
    let message = "Hello World";

    // 2.将数据显示在h2元素中
    const titleEl = document.getElementsByClassName("title")[0];
    titleEl.innerHTML = message;

    // 3.点击按钮,界面的数据发生改变
    const btnEl = document.getElementsByClassName("btn")[0];
    btnEl.addEventListener("click", e => {
      message = "Hello React";
      titleEl.innerHTML = message;
    })

  </script>

</body>
</html>

```

# 7
- root.render参数是一个html元素或者一个组件，我们可以先将之前的业务瑞吉封装到一个组件当中，然后传入到ReactDOM.render函数的第一个参数当中，
- 逻辑太分散了，data,函数/方法,render函数的
- 封装组件都是封装到类当中的通过class，class App extends React.Compoennt {}就变成一个组件了，组件数据和方法，渲染内容

### 如何封装一个组件
- 暂时使用类的方式封装组件
- 定义一个类，类名是大写的，组件名称必须是大写的，小写的会被认为是htmll元素，继承自ReactCompoent 
- 实现当前组件的render函数
- render当中返回jsx内容，就是之后的react会帮助我们渲染的内容

```js
//使用组件来进行重构代码
//类组件和函数式组件
class App extends React.Compoent {
    //组件数据
    construtcor(){
        super()
        this.state = {
            message : "hello wolrd"
        }
        //eg:另外一种方法
        this.btnClick=  this.btnClick.bind(this)
    }
    //组件方法,实例方法
    btnClick() {
        console.log("btnc Click");
        //这里的this一定代表组件实例吗？不一定
        this.setState({
            message : "hello react"
        })
        //拿到组件实例，修改某个值

    }
    //发生点击的时候找到对应的函数，本质上就是找到对应的内存地址，内部发生点击的时候会自动回调这个函数的

    //渲染内容render方法
    render() {
        return (<h2>{this.state.messgae}</h2>
        <button onClick = {this.btnClick}>修改数据</button>
        )
    }
    //第三种情况
     btnClick() {
        console.log("btnc Click"，this);//点击自动调用这个函数，默认情况下是undefined的
        undefined.setState({})
        this.setState({
            message : "hello react"
        })
    }
      render() {
        return (<h2>{this.state.messgae}</h2>
        <button onClick = {this.btnClick}>修改数据</button>
        )
    }
    //函数传递到这里面的时候类似于const click = this.btnClick没有隐式或者显示绑定的，就是undefined的
     btnClick() {
        console.log("btnc Click"，this);//render当中的this
        undefined.setState({})
        this.setState({
            message : "hello react"
            //内部的完成两件事情1.state当中数据修改2.自动执行render函数了

        })
    }
      render() {
        //render函数当中本身是有this,this就是组件的实例
        return (<h2>{this.state.messgae}</h2>
        <button onClick = {this.btnClick.bind(this)}>修改数据</button>
        )
    }
}
const app = new App()
const foo = app.btnClick;
foo();//这么做的话是没有this的
//将组件渲染到界面上的，可能是window,打印foo是有对应的函数的，可以调用的
const root= ReactDOM.creatRoot(documnt.querySelector("#root"))
root.render(<App/>)
//第二种可能的情况
//btnClick () {
// console.log(this)}
// foo();默认绑定的，指向的是window,严格模式是undefined,默认情况下，就是严格模式的，默认情况下es6class当中都是严格模式的
function bar() {
  console.log(this);//undefined用到了babel,默认会转换成为严格模式的
}
bar();//指向window
//上面的是普通的方法没有经过严格模式的
//类当中的方法默认是在严格模式下的
```
## 组件化-数据依赖
- 数据再哪里定义？
- 分为两类？
- 参与界面更新的数据：当数据变量的时候需要更新组件渲染的内容
- 不参与界面更新的数据，当数据变量的时候，不需要更新将组件渲染的内容
- 当我们的数据发生变化的时候，可以调用this.setState来更新数据，并且通知react进行update操作
- 在进行update的操作的时候，就会重新调用render函数，并且使用最新的数据，来渲染界面
## 组件化-事件绑定
- 在类当中直接定义一个函数，并且将这个函数绑定到元素的onClick元素事件上的，当前这个函数的this指向的是谁呢？
- 默认情况下是undeifned,
- 我们在绑定函数的时候，可能想要使用当前的对象，比如执行this.setState的函数，就必须拿到当前的对象的this
- 我们需要在传入的函数的时候，给这个函数直接绑定this

- react 并不是直接渲染成为真实的dom元素，我们所编写的button只是一个语法糖，。它的本质react的element对象，那么在这里发生监听的时候，react在执行的函数的时候并没有绑定this,默认情况下就是一个undefined,
# 8
```js
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <div id="app">
  </div>

  <!-- 添加React的依赖 -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <!-- 开始开发 -->
  <script type="text/babel">
    // 封装App组件
    class App extends React.Component {
      constructor() {
        super() // 初始化
        this.state = {
          message: "Hello World"
        }
      }
      render() {
        return (
          <div>
            <h2>{ this.state.message }</h2>
            <button onClick={this.btnClick.bind(this)}>改变文本</button>
          </div>
        )
      }

      btnClick() {
        // this.state.message = "Hello React"
        this.setState({
          message: 'Hello React'
        })

      }
    }

    ReactDOM.render(<App />, document.getElementById("app"));
  </script>

</body>

</html>
```
# 9电影列表的展示
```js
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>01_案例练习-电影列表</title>
</head>

<body>
  <div id="app"></div>

  <!-- 1.引入依赖 -->
  <!-- 添加React的依赖 -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <!-- 2.编写React代码 -->
  <script type="text/babel">

    // 创建组件
    class App extends React.Component {
      constructor() {
        super()

        this.state = {
          message: 'Hello World',
          movies: ["大话西游", "盗梦空间", "星际穿越", "流浪地球"]
        }
      }
      render() {
        const liEls = []; 
        for (let i = 0;i <this.state.movies.length;i++ ) {
          const movie = this.state.movies[i];
          const liEl = <li>{movie}</li>
          liEls.push(liEl)


        }
        //第二种方式的movies数组转换成为了liEls数组
        // const liEls = this.state.movies.map (item => {
        //   return <li>{movie}</li>

        // })
        return (
          <div>
            <h2>电影列表</h2>
            <ul>
              {
                this.state.movies.map((item) => {
                  return <li>{item}</li>
                })
              }
            </ul>
          </div>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById("app"))
  </script>
</body>

</html>


```
# 10-计数器案例
```js
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>02_案例练习-计数器案例</title>
</head>

<body>
  <div id="app"></div>

  <!-- 添加React的依赖 -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <script type="text/babel">
    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          counter: 0
        }

      }

      render() {
        return (
          <div>
            <h2>当前计数: {this.state.counter}</h2>
            <button onClick={this.increment.bind(this)}>+1</button>
            <button onClick={this.decrement.bind(this)}>-1</button>
          </div>
        )
      }

      increment() {
        this.setState({
          counter: this.state.counter + 1
        })
      }

      decrement() {
        this.setState({
          counter: this.state.counter - 1
        })
      }


    }

    ReactDOM.render(<App />, document.getElementById("app"));
  </script>
</body>

</html>


```
# 11-如何生成对应的代码片段

- snippet generator
- 文件-首选项-配置用户代码片段
- html.json,creatapp
# 12-jsx语法
