function Recipe({drinkers}) {
    return (
        <ol>
            <li>Boil {drinkers} cups of water</li>
            <li>Add{drinkers} spoons of tea and {0.5 * drinkers} sponns of spice</li>
        </ol>
    )
}
export default function App() {
    return (
        <div>
            <Recipe drinkers={1} />
            <Recipe drinkers={2} />
            <Recipe drinkers={3} />
            <Recipe drinkers={4} />
        </div>
    )
}
//react渲染过程是纯粹的，组件应该只返回他们的jsx，而不改变在渲染前的，就已经存在的任何的对象或者变量
function Cup({guest}) {
    return <h2>Tea cup for guest {guest}</h2>
}
export default function App() {
    const guests = ['Alice', 'Bob', 'Carol', 'Dan']
    return (
        <div>
            {guests.map(guest => <Cup guest={guest} />)}
            {guests.map(guest =><Cup guest = {guest} />)}
        </div>
    )
}
//纯函数仅仅执行计算，因此调用他们两次不会改变任何的东西
//严格模式在生产环境下不生效，因此不会降低应用程序的速度，
//如需引入要严格模式，<React.StrictMode></React.StrictMode>
//每个组件因该独立思考而不是渲染过程当中视图和其他的组件协调或者依赖其他的组件，渲染过程就像自己的考试，每一个组件都应该计算自己的jsx
//当你向根据用户输入更改某些内容的时候，应该设置状态而不是直接写入变量，当你的组件正在渲染的时候，你永远不应该改变预先存在的变量或者对象
//组件改变了预先存在的变量的值，为了让他听起来更可怕一点，我们将这种现象称为突变，纯函数不会改变函数作用域外的变量或者在函数调用前创建的对象
//你完全可以在渲染的时候更改你刚刚创建的变量和对象，
//副作用通常属于事件处理程序，事件处理程序在react在你执行某些操作的时候运行的函数，即使事件处理程序是在你的组件内部定义的，不会再渲染期间运行的，
//副作用属于事件处理程序，是react在你执行某些操作的时候运行的函数，即使事件处理程序是在你的组件内部dinginess的，他们也不会再渲染期间运行的，因此事件处理程序不需要是纯函数的
//相同的输入，总是返回相同的结果因此一个组件可以满足多个用户请求
//如果再渲染深层组件数的过程当中，某些数据发生了变化，react可以重新开始渲染不会浪费事件完成过时的渲染，纯粹性使得它随时可以安全停止计算的
//再jsx当中表达组件的逻辑，当你需要改变事务的时候通常希望再事件处理程序当中进行作为最后的手段useEffect,
//渲染随时可能发生，因此组件不应该依赖彼此的渲染的顺序
export default function Clock({time}) {
    let hours = time.getHours();
    if (hours >= 0 && hours<6) {
        document.getElementById('time').className = 'night';
    }else {
        document.getElementById('time').className = 'day';
    }
    return (
        <h1 id="time">{time.toLocaleTimeString()}</h1>
    )
}
//渲染是一种计算过程不应该视图做其他的事情
function Header({person}) {
    return (
        <h1>
            {person.name}
        </h1>
    )
}
function Avatar({person}) {
    return (
        <img className = "abatar"
        src={person.avatarUrl}
        alt={person.name}
        />
    )
}
//react无法保证组件函数以任何特定的顺序执行的，无法通过设置变量再他们之间通信
export default function StoryTray({storeis}) {
    return (
        <div>
            {stories.map(story => (
                <Story story={story} />
            ))}
            {stories.map(story => {
                return (
                    <Story story={story} /> 
                )
            })}
        </div>
    )
}
//不应该改变任何用于组件渲染的输入，props,sata,context//
//保证mutation保持再局部你的渲染函数保持纯粹，你想要更改数组的任一项的时候必须啊先对啊进行拷贝的
//push,pop,reverse,sort
export default function InspirationGenerator({children}) {
    const [index,setIndex] = React.useState(0);
    const quote = quotes [index];
    const next = () => {
        setIndex((index + 1) % quotes.length)
    }
    return (
        <div>
            <p>{quote}</p>
            <button onClick={next}>Next</button>
        </div>
    )
}

export default function FancyText({title,text}) {
    return title?<h1 className='fancy title'>{text}</h1>
    :<h3 className='fancy'>{text}</h3>
}
//react渲染树当中，根节点应该是应用程序的跟组件
//渲染树仅有react组件构成的，
//在条件渲染当中，父组件可以根据传递的数据渲染不同的子组件
//父组件可以根据传递的数据渲染不同的子组件
//模块依赖书，在react应用当中可以使用树来建模另外一个关系就是应用程序的模块依赖关系，当拆分组件和逻辑盗版戙的文件当中的时候，
//树的根节点是跟模块，也成为入口摁键，跟组件的模块，
//构成树的节点代码模块，而不是组件，
//渲染树仅封装组件
//随着应用程序的增长，捆绑包的大小通常也会增加，
//依赖数对于确定运行react应用程序鞥多所需要模块非常有用的，在位生产环境构建react应用程序的时候，通常会有一个构建步骤，该步骤将捆绑所有必要的javascript以供客户端使用的，
//依赖书对于确定运行react应用程序所需要的模块非常有用，在位生产环境构建react应用程序的时候，通常会有一个构架步骤，该步骤将捆绑所有必要的，该步骤将捆绑所有的javacript来攻客户端使用，负责这次操作的工具称为bundler捆绑器，并且二bunlder将使用一俩书来确定应该包含哪些模块
//依赖书有助于调试大型捆绑包代码的渲染速度过慢的问题，以及发现把鞋捆绑代码可能被优化
//构建工具使用依赖书来捆绑必要的代码来部署应用程序

//渲染树表示单词渲染当中react组件之间的嵌套的关系
//渲染树表示单词渲染当中react组件之间的欠他的关系
