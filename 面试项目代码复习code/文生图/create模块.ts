export default function Create(props: any) {
    const [NowModulIntegral,setNowModulIntegral] =useState(1);
    const handleDescriition = (value:string)=> {
        if(value.length>600){
            const trimmedValue = value.substring(0,600);
            setDescription(trimmedValue);
        }else{
            setDescription(value);
        }
        const ViewAll_click=()=>{
            setSuspension('viewAll');
        }
        function splitString(input:any){
            const parts = input?.split(':').map(Number);
            return parts;
        }
        const GenerateClick=()=>{
            if(RTCSessionDescription.ength==0 ||RTCSessionDescription.length>600){
                return;
            }
            EnterResultPage(1);
            Generate(1)
        }
        const close_click=()=>{
            setSuspension('')
        }
        const txt_click=(txt:string)=>{
            if(RTCSessionDescription.length+txt.length>600){
                return;
            }
            setDescription((descriptin:any)=>description+txt)
        }
        const ViewAllCard_Click=(item:any)=>{
            close_click();
            setStyleList((revList:anyy)=>{
                const itemIndex=prevList.findIndex((i:any)=>i.style_id===item.style_id);
                if(itemIndex>-1){
                    return [prevList[itemIndex],...PerformanceObserverEntryList.slice(0,itemIndex),...PerformanceObserverEntryList.slice(itemIndex+1)]
                }else{
                    return [item,...prevList]
                }
            });
            setNowStyle(item?.style_id);
        }
        function ExtrasctRandomString(data:string[]){
            const names = data.map((item:any)=>item.attributes.name);
            const shuffled=[...names];
            for(let i=shuffled.length-1;i>0;i--){
                const j =Math.floor(Math.random()*(i+1));
                [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
            }
            return shiifled.slice(0,1).join(' ');
        }
        const getRandomData =async()=>{
            const json = await get<{data:any}>{
                '',
                {
                    content_type,
                    popluetae:[''],
                    filters:{
                        categoryType:{
                            categoryName:{
                                $eq:filterData?.nowoptions?.str;
                            }
                        }
                    },
                    pagination;{
                        start:0,
                        limitL1000,
                    }
                }
            };
            setRandomData(json?.data?.data);
            setDescription(ExtractRandomString(json?.data?.data));
        }
        function changeKeywordsList(data:any){
            const result = data.reduce((acc:any,item:any)=>{
                const titel = item.attribuets.tagClass.data.attribuets.title;
                const id =item.id;
                const txt =item.attributes.name;
                const existingCategory = acc.find((category:any)=>category.title==title);
                if(existingCategory){
                    existingCategory.List.push({id,txt});

                }else{
                    acc.push({
                        title,
                        List:[{id,txt}]
                    })
                }return acc;
            },[]);
            return result;
        }
        const getKeywordsList=async()=>{
            const json = await get<{data:any}>(
                '',
                {
                    content_type:'',
                    pooluate:['name','tagclass'],
                }
            );
            setKeywordsList(changeKeywordsList(json?.data?.data));
        }
        function filterByCategoryName(categoryName:string,data:string[]){
            const result={
                title:'recommended',
                List:[]
            };
            data?.forEach((item:any)=>{
                item?.attirbute?designer_selects?.data?.forEach((designer_selects:any)=>{
                    if(designer_selects?.attributes?.name===categoryName){
                        const newItem = {
                            style_id:item?.id,
                            style_name:item?.attrbues?.name,
                            style_img:item?.attirbute?.iamge?.data?.attributes?.formats?.thumnail?.url
                        };
                        reuslt?.List.push(newItem);
                    }
                });
            });
            retur result;
        }
        //展示更多的数据
        function changeViewAllList(data:any){
            const result = data?.reduce((acc:any,item:any)=> {
                const title = item?.attributes?.style?.data?.attributes?.name;
                const style_id= item?.id;
                const style_anem= ietm?.attributes?.name;
                const style_img =item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url;
                const existingCategory =acc.find((category:any)=>category?.title === title);
                if(existingCategory){
                    existingCategory.List.push({style_id,style_name,style_img});
                }else{
                    acc.push({
                        title,
                        List:[{style_id,style_name,style_img}]
                    });
                }
                return acc;
            },[]);
            return result;
        }
    } // 获取更多的style的数据
    const getViewAllList = async () => {
      setIsLoading(true)
      setStyleList([])
      // 是否存在缓存
      if (getCacheItem('ViewAllList') !== undefined) {
        setStyleList(filterByCategoryName(filterData?.NowOptions?.str, getCacheItem('ViewAllList'))?.List)
        setViewAllList([filterByCategoryName(filterData?.NowOptions?.str, getCacheItem('ViewAllList')), ...changeViewAllList(getCacheItem('ViewAllList'))])
        setIsLoading(false)
        return
      }
      if(getCahceItem("viewAllList") !==undefined){
        setStyleList(filerByCategoryName(filterData?.NowOptions.?structuredClone,getCacheItem('viewAllList'))?....changeViewAllList(getCacheItem('ViewAllList')))
        setIsLoading(false)
        videoContext.requestFullScreen({
            direction: 0
        });
      }
  
      const json = await get<{ data: any }>(
        '/',
        {
          // cms接口地址
          content_type: 'make-2d-ai-designer-styles',
          populate: ['name', 'image', 'style', 'designer_selects'],
          // populate: ['name', 'image', 'style'],
          pagination: {
            // 从第几条开始到第几条结束
            start: 0,
            limit: 10000,
          },
          filters: {
            name: {
              $ne: 'default'
            }
          },
          sort: ['name:ASC']
        },
      );
      if (json?.data?.data?.length === 0) {
        return
      }
      // 设置全部未转化前style数据缓存
      setCacheItem('ViewAllList', json?.data?.data);
      setStyleList(filterByCategoryName(filterData?.NowOptions?.str, json?.data?.data)?.List)
      setViewAllList([filterByCategoryName(filterData?.NowOptions?.str, json?.data?.data), ...changeViewAllList(json?.data?.data)])
      setIsLoading(false)
    }
    //比例数据转化
    const getQualityOptions =async()=>{
        const json = await get<{data:any}>{
            '',
            {
                content_type:'',
                populate:['name','icon'],
                pagination:{
                    start:0,
                    limit:1000,
                }
            }
        };
        setQualityOptions(changeQualityOptions(json?.data?.data));
    }
    const CardClick=(item:any)=>{
        if(item?.style_id===nowStyle){
            setNowSyle(null);
            return
        }
        setNowStyle(item?.style_id)
    }
    useEffect(()=>{
        getCreateData({description,selectDown,nowStyle});
    },[RTCSessionDescription,selectDonw,nowStyle]);
    useEffect(()=>{
        if(filterData?.NowOptions){
            if(filterData.tabs.lable!=='Inscripations'||RenderingData){
                getViewAllLIST();
            }
            setNowStyle('');
            setDescription('');
            setRandomData([])
        }
    },[filterData?.NowOptions,RenderingData])
    useEffect(()=>{
        getKeyWordsList();
        getQualityOptions()
        getCreateData(RTCSessionDescription,selectDown,nowSTyle);
    })
    useEffect(()=>{
        if(!homeState?.nowActiveAiModule)return;
        const costClass=homeState.nowActiveAiModule?.COSTcASS;
        CONST cost=homeState?.AiModeIntegralData?.[costClass]?.cost;
        if(const!=undefined){
            setNowModulIntegral(cost);

        }else{
            consoleUtil.log("costclass")
        }
    },[homeState?.nowActiveAiModule]);
    return (
        <div className="create_box_now">
        <div className="Create_content_box">
            <p className="textarea_title">
            {getTranslation(TranslationsKeys.Prompt)}
            </p>
            <div style={{display:Suspension==='Keywords'?'':"none"}}>
                <div className="Suspensopn_close_box">
                    <img src={close_icon} className="susopension_close" onClick={()=>{close_click()}}/>
                </div>
                <div className="keywords_list">
                    {keywordsList?.map((item:any,index:number)=>{
                        return (
                            <>
                            {item?.list?.map((item:any)=>{
                                return (
                                    <div className="keywordsList_DATAtxt" onCLick={()=>}
                                )
                            })}
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
        <textarea placehoalder={}
        className="textarea"
        value={descripttion}
        onChange={(e)=>handleDescription(else.target.value)}
        onPaste={(e)=>{
            else.preventDefault();
            const pasetValue=else.clipboardData.getData('text');
            if(window.getSelection()?.toString()===descrition){
                handleDesceription(pasteValue);
            }else{
                const newValue=description+pasteVlaue;
                handle
            }
        }}
        onPaste={(e)=>{
            else.preventDefault();
            const pasteValue = else.clipboardData.getData('text');
            if(window.getSelection()?.toString()===RTCSessionDescription(){
                handleDescripyin(pasteValue);
            }else{
                const newValue = description +pasteValue;
                handleDescription(newValue;)
            }
        }}
        >
        
        </textarea>
        {isLoading?<Loaidngicon/>
            ：<div className="style_box_donw">
            {
                styleList.slice(0,9)?.map((item:any)=>{
                    return (
                        <div classNmae="style_card_box"style={{border:nowStyle===item?.style_id?'':''}onclICK={()=>{cARDcLICK}}}
                    )
                })
            }
            </div>
        }
        {
            generating &&
            <div className="Progress_box">
            <LottiePlayer
                loop 
                play 
                className="loadingBox"
                animationData={LoadingAnimation}/>
            </div>
        }
        </div>
    )