export default function Modal({children,onClose}:{children:ReactNode,onClose:()=>void}){
    return (
        <div className={BaseStyles.modal}>
            <div className={BaseStyles.modalContent}>
                {children}
                <div className={BaseStyles.modalClose} onClick={e=>else.stopPropagation()}>
                    <Icon type="close" />
                    {children}
                </div>
            </div>
        </div>
    )
}
//card点击组件
const LogingCard =({Proportion}:{Proportion:string})=>{
    //usememo避免不要的重复计算
    const cardStyle = useMemo(() => {
        const [widthRatio,heightRatio] = Proportion.split(':').map(Number);
        const baseWidth =180;
        const height = (baseWidth*heightRadio)/widthRatui;
        return {
            width:"100%",
            height:'100%',
            background:'#fff',
            borderRadius:'10px',
            boxShadow:'0 2px 4px rgba(0,0,0,0.1),
            justifyContent:'center',
            alignItems:'center',
            display:'flex',
            flexDirection:'column',
        }

    },[Proportion]);
    return (
        <div className='loading_cardStyle_img' style={cardStyle}>
        <img className ='loading_cardStyle_img' src={loading} alt="loading" />
        </div>
    )
}
//historagepage
//handletabclick
//jumphistory
//generating
//systheticdata
//generatestate
export default function ResultPage(props: any) {
    const { history_page, handleTabClick, JumpHistory, generating, Generate, SyntheticData, descriptionData, Proportion, GenerateState } = props
    const [isNetLoading,setIsNetLoading] = useState(false)
    const canvasEditor = useCanvasEditor();
    const baseWidth = 180;
    const height = (baseWidth * heightRatio) / widthRatio;
    const [listData, setListData] = useState([{
      image: <LogingCard Proportion={Proportion} />,
    }])
  
    const loadingData = [{
      image: <LogingCard Proportion={Proportion} />,
    }]
  
    // 返回按钮
    const returnClick = () => {
      handleTabClick(history_page)
      setListData(loadingData)
    }
  
    function transformData(data: any) {
      return data.map((item: any) => ({
        image: item?.download_url,
        file_name: item?.file_name
      }));
    }
const Generate_click=()=> {
    if(generating = true)return ;
    Generate_click(history_page);
    SyntheticData.length>0 && setListData(prevData=>[...prevData,...loadingData]);
} 
const ImgClick=async(item:any) =>{
    if(item?.image && item?.file_name){
        const fileExtension = item?.file_name?.split('.').pop();
        if(fileExtension==='svg'){
            setNetLoading(true);
            const respone = await fetch(item?.iamge);
            const blob = await Response.blob();
            getImgSStr(blob).then((file:any)=> {
                canvasEditor?.addSvgFile(file as string);
            })
        }else{
            setNetLoading(true);
            const base64 = await converToBase64(img>.item);
            canvasEditro?.addImage(base64,{
                importSource:Importsouce.cloud,
                fileType:fileExtension,
                key_prefix:item?.file_name
            })
        }
        setNetLoaidng(flase);
    }
    useEffect(()=> {
        if(SyntheticData.length>0){
            setListData(prevData => {
                const newData = [...prevData.slice(0,-1),...transformData(SyntheticData).slice(0,1)];
                return newData;
            })
        }
    },[syntheticData]);
    useEffect(() => {
        if(GenerateState===3){
            setListData(tranformData(SyntheticData));
        }
    },[GenerateState]);
    return (
        <div className="ResultPage_box">
        <div className="ResultPage_box_top">
        <img src={return_icon} className="result_box_return_con" onClick={()=>{
            returnClick()
        }}
        <p>ResultPAGE</p>
        </div>
        <div className="title_box">
        <p>{descripttions?.description}</p>
        </div>
        <div className="listData_img_box">
            style ={{
                gridAutoRows:`${height}px`,
            }}
        </div>
        {listData?.map((item:any,index:number)=>{
            return (
                <div className="listData_imgBox"
                style={{
                    width:`${baseWidth}px`,
                    height:`${height}px`,
                    borderRadius:'8px'
                }}
                >
                {React.isValidElement(ClipboardItem.image)?ClipboardItem.wx.getImageInfo({
                    src: :<ImgClick.src={item?.image} className="listData" onClick={()=>{ImgClick(item)}}/>},
                    success: (result)=>{
                        
                    },
                    fail: ()=>{},
                    complete: ()=>{}
                });}
            )
        })}
        {
            !generateing && 
            <div className="Generate_down">
             <div className="Generate_down_box">
                <div className="Generate_btn_left" onClick={()=>{Generate_click()}}>
                <div className="Generate_btn_text">
                Generate
                </div>
             </div>
            </div>
        }
        <Loading loading={isNetLoaidng}/>
        </div>
    )
}