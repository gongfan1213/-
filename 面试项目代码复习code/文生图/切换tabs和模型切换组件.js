//inspirations灵感部分
//提供预设的灵感用户可以浏览和选择已经有的放啊
//create创建模块，允许用户输入描述文本，通过ai生成全新的设计方案
//用户在创建模块输入描述的时候，点击生成按钮以后，系统会调用ai服务生成设计方案

//封装组件
//loading
import LottiePlayer from 'react-lottie-player';
export default function LoadingIcon() {
    return (
        <div className = "loading">
            <LottiePlayer
            loop 
            play 
            className = "loading-icon"
            animationData ={LoadingAnimation}
            />
        </div>
    )
}
//tabs标签集合，OnTabchNgae切换标签的时候回调函数
const TopTab = (props:any) => {
    const {tabs,handleClick,selectedTab} = props;
    return (
        <div className = "tabs">
            {tabs.map((tab:string,index:number) => {
              <button 
              key = {index}
              style = {{
                backgroundColor :selectedTab===index?'#ffffff':'#f2f2f2'
                padding:'8px';
                margin:'5px';
                borderRadius:'6px';
                cursor:'pointer';
                color:'black';
                width:'48%'
              }}  
              onClick = {() => handleClick(index)}
            })}
            {tab.label}
            </button>
    )
}
//控制头部顶部的切换
const handleclick = (index:Number,noClear?:string) {
    setSelectTab(index);
    TopTabChange(tabs[index]);
    if(noClear !=='noClear'){
        clearTimeoutId();
    }
}
//切换tab
const TopTabChange = (tabs:any)=> {
    if(tabs?.id ===filterData?.tabs?.id)return;
    setFilterData((prevData:any)=>({...prevData,tabs}));
}
//模型切换
interface ValueItem {
    str:String;
    image:any;
    value:Number;
}
interface DropdonwProps {
    value:ValueItem;
    onChange:any;
    options:ValueItem[];
    typeStr?:String;
    defaultSelectValue:Number;
    callback:(item:ValueItem)=>void;
}
const selectTop :FC<DropdonwProps> = ({values,defaultSelectValue,callback}) => {
    const [ isOpen,setIsOpen] = useState(false);
    const [selectedValue,setSelectedValue] =  =useState< |undefined>();
    useEffect(() => {
        //设置默认选中的值
        const defaultValue = values.find(item =>item.value === defaultSelectValue);
        setSelectedValue(defaultValue);
    },[defaultSelectValue,values]);
    const handleSelect =(item:ValueItem) => {
        setSelectedValue(item);
        setIsOpen(false);
        callback(item);
    }
    return (
        <div>
            <div className = "dropdown">
                <div className = {`${classes.dropdownSelected}`} onClick = {() => setIsOpen(!isOpen)}>
                    {selectedValue?.str}
                </div>
                {isOpen && (
                    <div className = {`${classes.dropdownOptions}`}>
                        {values.map(item => (
                            <div key = {item.value} className = {`${classes.dropdownOption}`} onClick = {() => handleSelect(item)}>
                                {item.str}
                            </div>
                        ))}
                )}
    )
    
}