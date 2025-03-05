
// react应用被成为组件的独立的ui片段构建而成的，react本质是可以任意添加标签的javascreipt函数
function Profile() {
    return (
        <img 
        src = ""
        alt = "profile"/>
    )
}
export default function Gallery() {
    return (
        <div>
            <Profile />
            <Profile />
            <Profile/>
            </div>
    )
}
//可以在一个文件当中声明很多组件，但是文件的体积过大变得难以浏览，为了解决问题，在一个文件当中只导出一个组件，然后再从另外一个文件当中导入这个组件
//每一个react组件都是一个javascript函数，可能包含一些标签，react将他渲染到浏览器，jsx语法扩展来表示这个标签，
//jsx看起来像html更加严格，可以显示动态的信息
export function TodoList() {
    return (
        <>
        <h1> hedy lamarrs tods</h1>
        <ul>
            <li>learn react</li>
            <li>learn react</li>
            <li>learn react</li>
        </ul>
        </>
    )
}

//再jsx可以让你再javascript文件当中编写类似的html标签的语法，让渲染逻辑和内容展示维护再同一个地方，有的时候在标签当中添加一点javascript逻辑或者引用一个动态属性，
const person = {
    name: "hedy",
    theme : {
        backgroundColor: "black",
        color: "pink"
    }
};
export function TodoList() {
    return (
        <div style = {person.theme}>
        <h1> {person.name} tods</h1>
        <img className ="avatar" src="https://i.imgur.com/7vQD0fps.jpg" alt = ""/>
        <ul>
            <li>learn react</li>
            <li>learn react</li>
            <li>learn react</li>
        </ul>
        </div>
    )
}
//将props传递给一个组件
//每一个父组件都可以通过为子组件提供props方式来传递的信息，props，html属性，任何的javascript的值，包括对象，数组，函数甚至jsx
export function getImageUrl(person,size = 's'){
    return (
        'https://i.imgur.com/'+
        person.imageId+
        size +
        '.jpg'
    )
}
import {getImageUrl} from './utls.js'
export default function Profile () {
    return (
        <Card>
            <Avatar 
            size = {100}
            person ={
                {
                    name: "hedy",
                    imageId: "7vQD0fps"
                }
            }
            />
        </Card>
    )
}
function Avatar({person,size}) {
    return (
        <img className = "avatar"
        src= {getImageUrl(person,size)}
        alt ={person.name}
        width = {size}
        height = {size}
        />  
    )
}
function Card({children}){
    return (
        <div className = "card">
            {children}
        </div>
    )
}
function Item({name,isPacked}) {
    return  (
        <li className= "item">
        {name} {isPacked && '(already packed)'}
        </li>
    )
}

function Item({name,isPacked}){
    return (
        <li className= "item">
        <input type="checkbox" defaultChecked = {isPacked}/>
        {name}
        </li>
    )
}
export default function PackingList() {
    return (
        <section>
            <h1>hedy's packing list</h1>
            <ul>
                <Item name="sleeping bag" isPacked = {true}/>
                <Item name="water bottle" isPacked = {true}/>
                <Item name="face mask" isPacked = {true}/>
            </ul>
        </section>
    )
}
//渲染列表
//需要根据数据集合渲染多个比较类似的组件，filter和map来实现数组的过滤和转换，将数据数组转换成为组件数组
//数组当中的每一个元素项，需要指定一个key,需要使用数据库当中的id作为key
//即使列表发生了变化，react可以通过key来跟踪每个元素在列表当中的位置
export function getImageUrl(options) {
    return (
        'http://i.imgur.com/'
    )
}
export const people =[
    {
        id:0,
        name:'creola katherine johnson',
        profession:'mathematician',
        accomplishment:'spaceflight calculations',
        imageId:'mk3ew3a'
    },{
        id:1,
        name:'katherine johnson',
        profession:'mathematician',
        accomplishment:'spaceflight calculations',
        imageId:'mk3ew3a'
    },{
        id:2,
        name:'creola katherine johnson',
        profession:'mathematician',
        accomplishment:'spaceflight calculations',
        imageId:'mk3ew3a'
    },{
        id:3,
        name:'creola katherine johnson',
        profession:'mathematician',
        accomplishment:'spaceflight calculations',
        imageId:'mk3ew3a 
    }
]
import {getImageUrl} from './utils.js'
import {people} from './data.js'
export default function List() {
    const listItems = people.map(person => {
        <li key={person.id}>
            <img src = {getImageUrl(person)} alt ={person.name}/>
            <h2>{person.name}</h2>
            <p>{person.profession}</p>
            <p>{person.accomplishment}</p>
        </li>
    });
    return (
        <article>
            <h1>people</h1>
            <ul>{listItms}</ul>
        </article>
    )
}
//组件的纯粹
//只负责自己的认为u，不会更改该函数调用钱已经存在的对象或者变量
//输入相同，输出也相同的，在输入相同的情况下，对纯函数来说应该总是返回相同的结果
//纯函数的定义编写组件，让代码库量增长的时候避免一些令人困惑的错误和不可预测的行为，
let guest = 0;
function Cup() {
    guest = guest+1;
    return <h2>Tea cup for guest {guest}</h2>
}
export default function TeaSet() {
    return (
        <>
        <Cup />
        <Cup />
        <Cup />
        </>
    )
}
//可以通过传递一个props来让这个组件变得纯粹，而不是修改已经存在的变量
function Cup({guest}){
    return <h2>Tea cup for guest{guest}</h2>
}
export default function TeaSet() {
    return (
        <>
        <Cup guest ={1}/>
        <Cup guest ={2}/>
        <Cup guest ={3}/>
        </>
    )
}
function Cup({guest}){
    return <h2>tEA cup for guest{guest}</h2>
}
export default function TeaSet() {
    return (
        <>
        <Cup guest ={1}/>
        <Cup guest ={2}/>
        <Cup guest ={3}/>
        </>
    )
}
//reactXx渲染树是组件之间父子关系的表示
//react使用树形关系建模表示组件和模块之间的关系
//对javascript模块之间的关系进行建模时了解应用程序另外一种有用的关系，
//构建工具经常使用依赖书来捆绑客户端下载和渲染所需要的代码，
//构建工具经常使用以来树捆绑客户端下载和渲染所需要的所哟的javascript代码，打包大小会导致用户体验的退化
