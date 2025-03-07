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
