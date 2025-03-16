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
// 添加交互
//组件通常需要根据交互改变屏幕上的内容，在表单输入更新输入栏，这种特定于组件的记忆称为状态，特定于组件的记忆称为状态
//useState hook你声明一个撞他变量，接受初始状态并且返回一对值，当前状态，以及你让你更新状态的设置函数

export const sculptureList = [
    {
        name:'',
        artist:'',
        description:'',
        url:'',
        alt:''
    }
]
export default function Gallery() {
    const [index,setIndex] = useState(0);
    const [showMore,setShowMore] = useState(false);
    const hasNext = index <sculprureLis.length-1;
    function handleNextClick() {
        if(hasNext) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }
    function handleMoreClick() {
        setShowMore(!showMore);
    }
    let sculpture = sculptureList[index];
    return (
       <>
       <button onClick={handleNextClick}>Next</button>
       <h1>{sculpture.name}</h1>
       <img src={sculpture.url} alt={sculpture.alt} />
       <p>{sculpture.description}</p>
       {showMore && <p>{sculpture.artist}</p>}
       </> 
    )
}
//渲染和提交
//在你的组件显示到名目上子奇爱你，必须有react进行渲染
//作为快照的状态
//react的状态的行为更像是一个快照，设置它并不改变你已有的状态变量，而是触发一次重新的渲染，这在一开始可能会让人感到惊讶的
console.log(count);
setCount(count+1);
console.log(count);
export default function Counter() {
   const [ to,setTo] = useState('Alice');
   const[message,setMessage] = useState('');
   function handleSubmit(e) {
    e.preventDefault();
    setTimeout(()=> {
        alert(`you said ${message} to$[to]`);
    })
    return (
        <form onSubmit={handleSubmit}>
            <label>
                <select
                value = {to}
                onChange={e=>setTo(e.target.value)}>
                    <option value='Alice'>

                    </option>
                    <option value="blob"></option>

                </select>
            </label>
            <textarea placeholder="Message"
            value={message}
            onChange={e=>setMessage(e.target.value)}>
                <button type="submit">Send</button>
            </textarea>
        </form>
    )
   }
}
//作为快照的状态解释了微涩么会出现这种情况，设置状态会请求一个新的重新渲染，
//作为快照的状态皆死了为什么会出现这种情况，设置状态会请求一个新的重新渲染，但是不会在已经运行的代码当中更改它的
//更新撞他的对象
//状态可以持有任何类型的javascript值，包括对象，但是你不应该改变你的react当中持有的对象和数组，
//当你想要更新一个独享和数组的时候你需要创建一个新的对象或者复制现有的对象，用这个副本来更新状态
//使用。。。展开语法来复制你想要改变的对象和数组
export default function Form() {
    const[person,setPerson]=useState({
        name:'Niki de Saint Phalle',
        artWorker:{
            title:'Blue Nana',
            city:'Hamurg',
            image:'',
        }
    });
    function handleNameCHnage(e) {
        setPerson({
            ...person,
            name:e.target.value
        })
    }
    function handleTItleChange(e) {
        setPerson({
            ...person,
            artWorker;{
                ...person.artWork,
                title:e.target.value
            }
        })
    }
    function handleCityCHange(e){
        setPerson({
            ...person,
            artWork:{
                ...person.artWork,
                city:e.target.value
            }
        });
    }
    function handleImageChange(e) {
        setPerson({
            ...person,
            artworker:{
                ...personalbar.artwork,
                image:e.target.value
            }
        });
    }
    return (
        <>
        <label>
            <input value={perosn.name}
            onChange={handleNameChange}/>
            <input value = {person.artwork.title}
            onChange={handleTitleCHange}/>
            <input value={person.artwork.city}
            onChange={handleCItyChange}/>

        </label>
        </>
    )
}
export default function Form() {
    const [person,updateForm] = useImmer({
        name:'Niki deSaint Phalle',
        artWork: {
            title:'blue nana',
            city:'Hamburg',
            image:'',

        }
    });
    function handleNameChange(e) {
        updatePerson(draft => {
            draft.name=e.target.vaue;
        });
    }
    function handleTitleChange(e) {
        updatePerson(draft=>{
            draft.artwork.title = e.target.valuel
        })
    }
    function handleCItyCHange(e) {
        updatePerson(draft => {
            draft.artwork.city = e.target.value;
        });
    }
    function handleImageChange(e) {
        updatePersson(draft => {
            draft.artwork.image = e.target.value;
        })
    };
    return (
        <>
        <label>
            <input value={person.name}onChange={handleNameChange}/>>

        </label>
        </>
    )
}
//数组是另外一种可以存在状态当中的可变的jaascript对象，应该视为只读额，就像是对象一样的，
//当你想要更新状态的狮虎，存在状态当中的数组的时候，需要创建一个新的数组，复制向右的数组，用新的数组来更新专改的
const initialList = [
    {id:0,titel:'',seen:false},

];
export default function BucketList() {
    const [ list,setList] =useState(
        initialList
    );
    function hanldeToggle(artWworkId,nextSeen){
        setList(list.map(artwork=> {
            if(artwork.id===artWorkId){
                return {...artwork,seen:nextSeen}
            }else{
                return artwork;
            }
        }))
    }
    return (
        <>
        <h1>Art Bucket List</h1>
        <ItemList artWorks={listontOOGLE={handleLiST}/>
        </>
    )
}
function ItemList({artworks,onToggle}){
    return (
        <ul>
        {artworks.map(artworks=> {
            <li key={artwork.id}>
                <label>
                    <input 
                    type="checkbox"
                    checked={artwork.seen}
                    onChange={e=>{
                        onToggle(artwork.id,e.target.checked);
                    }}/>
                    {arwork.title}
                </label>
            </li>
        })}
        </ul>
    )
}
const initialList =[
    {id:0,tite:'',see:false};
    {id:1,title:'Lunar',seen:false};
];
export default function BucketList() {
    const [list,updateList]=useImmer(initialList);
    function handleTogle(artworkid,nextSeen){
        updateList(draft=> {
            const artwork = draft.find(a=>a.id===artWorkId)
        });
        artwork.seen=nextSeen;
    };
    return (
        <>
     <h1>
        <h1>ArtBucket list</h1>
        <h2>MyLIst of art to see</h2>
        <ItemList artworks={list} onToggle={handleToggle}></ItemList>
        </h1>   
        </>
    )
}
function ItemList ({artworks,onToogle}){
    return (
        <ul>
        {artworks.map(artwork=> {
            <li key={artwork.id}>
                <label>
                    <input
                    type="checkbox"
                    checked={artwork.seen}
                    onChange={e=>{
                        onToogle(artWork.id,e.target.checked)
                    }}
                </label>
            </li>
        })}
        </ul>
    )
}