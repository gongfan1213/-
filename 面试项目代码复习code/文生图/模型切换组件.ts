interface ValueItem {
    str: string;
    image?: any,
    value: number;
  }
  //选中下拉数据
  const handleQuality =(item:any) => {
    setFilterData((prevData:any) =>({...prevData,NowOptions:{str:item.str,value:item?.value}}))
    getRenderingState();
  }
  const getRenderingState = (item:boolean) => {
    setRenderingData(item)
    }
  }
  interface DropdownProps {
    values: ValueItem[];
    typeStr?: string;
    defaultSelectValue: number;
    callback: (item: ValueItem) => void;
  }
  const selectDown:FC<DropdownProps> = ({ values, typeStr, defaultSelectValue, callback }) => {
    const [isOpen,setIsOpen] = useState(false)
    const [selectedValue,setSelectedValue] = useState(defaultSelectValue)
    useEffect(()=>{
      const defaultValue = values.find(item =>item.value === defaultSelectValue)
      setSelectedValue(defaultValue)
    },[defaultSelectValue])
    const handleSelect=(item:ValueItem) => {
        setSelectedValue(item);
        setIsOpen(false);
        callback(item);
    };
    return (
        <div className={classes.dropdownContainer} onBlur=(() => setIsOpen(false)) tabIndex={0}>
            <div className={classes.dropdown} onClick={() => setIsOpen(!isOpen)}>
                <div className={classes.dropdownValue}
                style ={{
                    paddingLeft:selectedValue?.image?'0':'10px';
                }}>
                <img src= {selectedValue?.imgae} className={classes.iamge} style={{
                    display:selectedValue?.image?'block':'none';
                }}/>

                    {selectedValue?.str}
                </div>
                <div className={classes.dropdownIcon}
                style ={{display :isOpen?'':'none'}}>
                {values.map((item,index)=> {
                    <div className={'${classes.dropdownOption}${classes.values_box'} onClick={()=>handleSelect(item)}>
                    <img src={item?.image} className={classes.iamge} style={{
                        display:item?.image?'block':'none'; 
                    }}/>
                    <div key ={index} className={`${BaseStyles.txt14}`}
                    style={{
                        paddingLeft:item?.image?'0':'10px';
                    }}>

                        {item.str}
                })}
                    <Icon type="down" />
                </div>
            </div>
    )
  }
//   onBlur 事件会在以下情况下被触发：

// 当用户点击组件外部区域时
// 当用户按下 Tab 键将焦点移出该组件时
// 当用户通过其他方式（如鼠标点击）将焦点转移到其他元素时
// 在你的代码中，onBlur={() => setIsOpen(false)} 的作用是当用户点击下拉菜单外部区域或通过其他方式失去焦点时，自动关闭下拉菜单（将 isOpen 设置为 false）。

// 需要注意的是，为了使 onBlur 正常工作，元素必须具有 tabIndex 属性（你已经设置了 tabIndex={0}），这样才能使 div 元素获得焦点并触发 blur 事件。

// 这种处理方式是一种常见的下拉菜单交互模式，可以提升用户体验，让菜单在失去焦点时自动关闭。
// tabIndex 是 HTML 中的一个属性，用于控制元素是否可以通过键盘的 Tab 键获得焦点，以及它在 Tab 键导航顺序中的位置。具体来说：

// tabIndex="0"：表示该元素可以通过 Tab 键获得焦点，并且其顺序由 DOM 中的位置决定
// tabIndex="-1"：表示该元素可以通过 JavaScript 获得焦点（如调用 focus() 方法），但不会出现在 Tab 键的导航顺序中
// tabIndex="大于0的值"：表示该元素可以通过 Tab 键获得焦点，并且会优先于 tabIndex="0" 的元素获得焦点（不推荐使用，因为会破坏正常的 Tab 键导航顺序）
// 在你的代码中，tabIndex={0} 的作用是让这个 div 元素可以通过 Tab 键获得焦点，这对于实现 onBlur 事件是必要的，因为只有能够获得焦点的元素才能触发 blur 事件。

// 这种用法在下拉菜单等交互组件中很常见，因为它允许用户通过键盘操作来与组件交互，提升了可访问性。