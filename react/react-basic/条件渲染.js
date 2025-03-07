function Item({name,isPacked}){
    return (
        <li className="item">
            <input type="checkbox" defaultChecked={isPacked}></input>
            <p>{name}</p>
        </li> 
    )
}
export default function PackingList() {
    return (
        <section>
            <h1>Sally Ride's Packing List</h1>
            <ul>
                <Item name="Space suit" isPacked={true}/>
                <Item name="Helmet with a golden sun" isPacked={true}/>
                <Item name="Camera" isPacked={false}/>
            </ul> 
            </section>
    ) 
}
if(isPacked){
    return (
        <li className="item">
            <input type="checkbox" defaultChecked={isPacked}></input>
            <p>{name}</p>
        </li>
        <li className ="item">
            {name}
        </li>
    )
}
function Item({name,isPacked}){
    return (
        <li className="item">
            <input type="checkbox" defaultChecked={isPacked}></input>
            <p>{name}</p>
        </li>
    )
}
function Item({name,isPacked}){
   if(isPacked){
    return (
        <li className="item">
            {name}
        </li>
    )
   }
}
export default function PackingList() {
    return (
      <section>
        <h1>Sally Ride</h1>
        <ul>
            <Item name="宇宙服" isPacked={true}/>
            <Item name="头盔" isPacked={true}/>
            <Item name="照相机" isPacked={false}/>
            <Item name="钱包" isPacked={false}/>
        </ul>
      </section> 
    ) 
}

//jsx元素不是实例，因为他们没有内部状态，页不是真实的dom节点，只是一些简单的描述，就像是图纸一样，
export default function PackingList() {
    return (
        <section>
            <h1>Sally Ride</h1>
            <ul>
                <Item name="宇宙服" isPacked={true}/>
                <Item name="头盔" isPacked={true}/>
                <Item name="照相机" isPacked={false}/> 
            </ul>
        </section>
    );
}
function Item({name,isPacked}){
    return (
        <li className="item">
            {isPacked ? name : <span className="packed">{name}</span>:(name)}
        </li>
    )
}
//jsx元素不是实例，美欧内部的状态也不是真实的dom节点，只是一些简单的描述
//你的组件里有很多的嵌套式的条件表达式，则考虑通过提取为子组件来简化这些嵌套的表达式，
function Item({name,isPacked}){
    return (
        <li className="item">
            <input type="checkbox" defaultChecked={isPacked}></input>
            <p>{name}</p>
            <p>{name}{isPacked && 'a'}</p>
        </li>
    )
}
function Item({name,isPacked}){
    return (
        <li className="item">
            <input type="checkbox" defaultChecked={isPacked}></input>
            <p>{name}</p>
            <p>{name}{isPacked ? 'a' : ''}</p>
        </li>
    )
}
export default function PackingList() {
    return (
        <section>
            <h1>Sally Ride</h1>
            <ul>
                <Item name="宇宙服" isPacked={true}/>
                <Item name="头盔" isPacked={true}/>
                <Item name="照相机" isPacked={false}/>
            </ul>
        </section>
    )
}
//不可以将数字放在&&的左侧，会自动将左侧的值转换称为布尔类型来判断条件成立与否的，然后如果左侧的是0，整个表达式将是左侧的值0，react此时会渲染，而不是不进行渲染
//messageCount >0 &&<p>New Messages</p>
//在jsx当中通过大括号使用javascript将变量用大括号嵌入在返回的jsx树当中，
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride</h1>
      <ul>
        <Item name="宇宙服" isPacked={true}/>
        <Item name="头盔" isPacked={true}/>
        <Item name="照相机" isPacked={false}/>
      </ul>
    </section>
  ) 
}
function Item({name,isPacked}){
 let itemContent = name;
 if(isPacked){
    itemContent = <span className="packed">{name}</span> 
 } 
 return (
    <li className="item">
        <input type="checkbox" defaultChecked={isPacked}></input>
        <p>{itemContent}</p>
    </li>
 )
}
function Item({name,isPacked}){
    let itemContent = name;
    if(isPacked){
       itemContent = (<del>{name+'v'}</del>)
    }
    return (
        <li className="item">
            <input type="checkbox" defaultChecked={isPacked}></input>
            <p>{itemContent}</p>
            </li>
    )
}
//使用javascript里控制分支逻辑
//if语句来选择性的1返回jsx表达式
export default function PackingList() {
    return (
        <section>
            <h1>Sally Ride</h1>
            <ul>
                <Item name="宇宙服" isPacked={true}/>
                <Item name="头盔" isPacked={true}/>
                <Item name="照相机" isPacked={false}/>
            </ul>
        </section>
    )
}
function Item({name,isPacked}){
    return (
        <li className = "item">
            {name}
            {importance > 0 && ''}
            {importance > 0 && <li>重要性:{importance}</li>}
        </li>
    )
}
export default function PackingList() {
    return (
        <div>
            <Drink name="tea">

            </Drink>
            <Drink name="coffee"/>
        </div>
    ) 
}
function Drink({name}){
    const info = drinks[name];
    return (
        <section>
            <h1>{name}</h1>
            <p>{info.description}</p>
            <p>
                {info.ingredients.map(ingredient => <span>{ingredient}</span>)
                
                }
                </p>
                {info.part}
                {info.caffeine}
                {info.age}
        </section>
    )
}
//渲染列表
//react当中使用filter筛选需要渲染的组件和使用map将数组转换成为组件数组
const people = [
    '',
    '',
    '',
    '',
    '',
]
const listItems = people.map(person => <li>{person}</li>)
//return <ul>{listItems}</ul>
export default function List() {
    const listItems = people.map(person => <li>{person}</li>);
    return (
        <ul>
            {listItems}
        </ul>
    )
}
//(person) => person.profession ==='化学家';
const chemits = people.filter(person => person.profession === '化学家')
const listItems = chemists.map(person => 
    <li>
        <img 
            src ={getImageUrl(person)
                alt={person.name}
                />
             <p>
                <b>{person.name}</b>
                {person.accomplishment}而闻名世界
             </p>
    </li>
)
export function getImageUrl(person) {
    return (
        'https://i.img.com/' + person.imageId + 's.jpg'
    )
}
export default function List() {
    const chemists = people.filter(person => 
        person.profession ==='化学家'
    );

}
const listItems = chemists.map(person => 
    <li>
        <img
            src ={getImageUrl(person)}
            alt ={person.name}
            />
            <p>
                <b>{person.name}</b>
                {' '+person.profession+''}
                {person.accomplishment}
            </p>
    </li>);
    return <ul>{listItems}</ul>
)
//箭头函数会隐式返回位于=>之后的表达式，所以你可以省略return的语句
const listItems =chemists.map(person =>
    <li></li>
)
//=>后面加了一个对花括号，{},必须使用return来指定返回值
const listItems = chemists.map(person => {
    return <li></li>;
})
//块函数体支持多行代码的写法，return语句才能指定返回值，
//数组当中的每一项都指定一个key，他可以是字符串或者数字的形式，只要能唯一表示出各个数组项就可以了
//<li key ={person.id}></li>
//map方法里面的jsx元素一般都是需要指定key值的
//合适的key可以帮助我们react推断出发生什么，、
export const people = [
    {
        id:0,
        name:'',
        profess:'',
        accomplishment:'',
        imageId:'',
    },
    {
        id: 1,
        name:'',
        profession:'',
        accomplishment:'',
        imageId:'',
    }
]
export default function List() {
    const listItems = people.map(person =>
        <li key ={person.id}>
            <img 
            src ={getImageUrl(person)}
            alt ={person.name}
            />
            <p>
                <b>{person.name}</b>
                {'' +person.profession+''}
                {person.accomplishment}
                </p>

        </li>
    );
    return <ul>{listItems}</ul>
}
//fragments简写形式无法接受key值，只能要么把生成的节点用一个div标签包裹起来，要么使用长一点的但是更明确的frament写法
const listItems = people.map(person => 
    <Fragment key={person.id}>
        {person.name}
        <p>{person.bio}</p>
    </Fragment>
)
//不同的来源的数据往往对应不同的key值获取方式
//来自数据库当中的数据，数据表当中的主键，因为他们天然具有唯一性
//本地产生数据，如果你数据产生和保存都在本地，可以使用一个自增计算器，或者一个类似的uuid库的来生成key
//key值不能改变，，千万不要在渲染的时候动态生成key
//react里需要key和文件夹当中的文件里需要有文件名的道理是类似的，他们都让我们可以从众多的兄弟元素唯一表示出某一项，jsx节点或者文件
export function getImageUrl(person) {
    return (
        'https://i.imgur.com' +
        person.imageId +
        's.jpg'
    )
}
export function getImageUrl(person) {
    return (
        'http'
    )
}
export const people = [
    {
        id:0,
        name:'',
        profession:'',
        accomplishment:'',
        imageId:''
    }
]
people.forEach(person => {
    if(person.profession==='化学家'){
        chemists.push(person);
    }else{
        everyoneElse.push(person);
    }
});
function ListSection({title,people}) {
    return (
        < >
        <h2>{title}</h2>
        <ul>
            {people.map(person => 
                <li key={person.id}>
                    <img src={getImageUrl(person)}
                    alt={person.name}/>
                    <p>
                        <b>{person.name}</b>
                        {person.profession}
                        {person.accomplishment}
                    </p>
                </li>
            )}
        </ul>
        </>
    )
}
let chemists =[];
let everyoneElse = [];
people.forEach(person => {
    if(person.profession ==='化学家'){
        chemists.push(person);
    }else{
        everyoneElse.push(person);
    }
});
function ListSection({title,people}){
    return (
        <>
        <h2>{title}</h2>
        <ul>
            {people.map(person => 
                <li key ={person.id}>
                    <img src= {getImageUrl(person)}
                    alt ={person.name}
                    />

                </li>
            )}
        </ul>
        </>
    )
}
//组件不会把key作为props的一部分
//key的存在支队react本身起提示作用，
//如果你的组件需要一个id，作为一个单独的props传给组件
<Profile key ={id} userId={id}/>
//key是写在Recpie组件本身上，不要写在Recipe内部返回的div上，因为keyy只有在就近的数组上下文才有意义的，生成了一个dib的数组所以，其中的每一项需要一个key，但是现在的写法生成的实际上是数组，
export default function RecipeList() {
    return (
        <div>
            <h1>菜谱</h1>
            {RecipeList.map(recipe => 
                <div key ={recipe.id}>
                    <h2>{recipe.name}</h2>
                    <ul>
                        {recipe.ingredients.map(ingredent => 
                            <li key ={ingredient}>
                                {ingredient}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
//生成的一个div数组所以七张的每一项需要一个key，但是现在的写法里面生成的实际上就是recipe数组，
function Recipe ({id,name,ingredients}) {
    return (
        <div>
            <h2>{name}</h2>
            <ul>
                {ingredients.map(ingredient => 
                    <li key={ingredient}>
                        {ingredient}
                    </li>
                )}
            </ul>
        </div>
    )
}
export default function RecipeList() {
    return (
        <div>
            <h2>菜谱</h2>
            {RecipeList.map(recipe => <Recipe {...recpie} key={recipe.id}/>)}
        </div>
    )
}
//fragemnt语法包裹jsx节点，可以避免引入额外的div元素
//div生成了一个div的数组所以其中的每一项需要一个key，但是现在的写法生成的实际上是recipe的数组，
//key只有在就近的数组上下文才有意义，生成乐意个div数组所以其中的每一项需要一个key，但是现在的写法生成的实际上是一个repise
//使用fragment语法来包裹jsx节点可以避免引入额外的div元素
//使用fragment语法来包裹jsx节点可以避免引入额外的div元素
const poem = {
    lines :[
        'I write,earse,rewrite',
        'Erase again,and then',
        'A poppy blooms'
    ]
};
export default function Poem() {
    return (
        <article>
            {poem.lines.map((line,i)=> {
                <Fragment key ={i}>
                    {i >0 && <hr/>}
                    <p>{line}</p>
                </Fragment>
            })}
        </article>
    )
}
const poem = {
    lines:[
        'I write,earse,rewrite',
        'Erase again,and then',
        'A poppy blooms'
    ]
};
export default function Poem() {
    let output =[];
    poem.lines.forEach((line,i))
}
const numbers = [1,2,3];
numbers.forEach((num) => console.log(num));
const doubled = numbers.map((num) => num*2);
for(const num of numbers){
    //forEach用于遍历数组，对每个元素执行回调函数，不反悔新的函数
    //forEach打印每一个㢝
    numbers.forEach((num)=>console.log(num));
}
const doubled = numbers.map((num)=>num*2);
for(const num of numbers){
    if(num===2)break;
    console.log(num);
}
const poem = {
    lines:[
        'i write ,erase,rewrite',
        'Erase again,and then',
        'A poppy blooms'
    ]
};
export default function Poem() {
    return (
        <article>
            {poem.lines.map((line,i)=>
            <Fragment key={i}>
                {i>0 && <hr/>}
                <p></p>
            </Fragment>)}
        </article>
        <article>
            {poem.lines.map((line,i)=> {
                <Fragment key ={i}>
                    {i>0 && <hr/>}
                    <p>{line}</p>
                </Fragment>
            })}
        </article>
    )
}