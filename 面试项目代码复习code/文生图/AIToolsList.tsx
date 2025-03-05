const parts = AllTitleData.map((part: any, index: any) => {
    // 如果index是奇数，那么这个部分是在<...>标签中的
    if (index % 2 === 1) {
      return (
        <Tooltip
          title={OldAllTitleData[index]}
        >
          <input
            className="input_box"
            placeholder={OldAllTitleData[index]}
            style={{ width: `calc(min(${OldAllTitleData[index].length - 1}ch, 100%))` }}
            value={
              // 如果未修改则使用空值，否则使用用户输入的值
              isInputChanged[index] ? AllTitleData[index] : ""
            }
            onChange={(e) => {
              if (e.target.value.length <= 40) {
                const newAllTitleData = [...AllTitleData];
                newAllTitleData[index] = e.target.value;
                setAllTitleData(newAllTitleData);

                const newIsInputChanged = [...isInputChanged];
                newIsInputChanged[index] = true;
                setIsInputChanged(newIsInputChanged);
              }
            }}
          />
        </Tooltip>
      );
    } else {
      return <span className="Modal_box_title">{part}</span>;
    }
  });
  const CardClick =(item:any)=>{

  }
 const requestParams = {
      // cms接口地址
      content_type: 'make-2d-ai-designer-products',
      populate: ['image', 'description', 'style.name', 'style.image', 'scale'],
      filters: {
        designer_select: {
          name: {
            $eq: filterData?.NowOptions?.str
          }
        }
      },
      pagination: {
        page: pageIndex.current,
        pageSize: PAGE_SIZE
      }
    } as any;
    return (
        <div className="alToolsList_box">
            <div style={{height:'10px'}}></div>
            <div className="AIToolsList_down">
                {
                    TableData.length===0 && !hasLoading && nowTab && dataLoginState &&
                    <div classNaME="no_data_box">
                        <img src ={emprty_data_icon} className="nodata_icon"/>
                        <div>{getTransilatipn(TransitionKeys.NO_DATA_AVALABLE)}</div>
                    </div>
                }
            </div>
        </div>
    )
    //卡片
    <ScrollMoreView2d
    onLoadMore={() => { getTableData() }}
    hasMore={hasMore}
    isLoading={hasLoading}
  >
    <div className="AIToolsList_down_box">
      {
        TableData?.map((item: any, index: number) => {
          return (
            <div className="AIToolsList_down_card"
              onMouseEnter={() => setHoveredId(index)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ position: 'relative' }}
              onClick={() => { Cardclick(item) }}
            >
              <img src={item.image} className="AIToolsList_down_img" />
              <div className={`AIToolsList_down_mask ${hoveredId === index ? 'show' : 'hide'}`}>
                <p>{removeBrackets(item.title)}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  </ScrollMoreView2d>
useEffect(()=>{
    const handleClickOutMode =(event:any)=>{
        if(modalRef.current && !modalRef.current.contains(event.target))
{
    setSuspension('');
}    }
}document.addEventListener('mousedonw',handleClickOutside);
return ()=>{
    document.removeEventListener('mousedonw',handleClickOUtSide)
}
)
function removeBrackets(str:string){
    const newStr =str.replace(/{([~]+)/g},'$1';
        return newStr;
    )
}
const Generae_click=async()=>{
    EnterResultPage(0);
    Generate(0);
}
const EditFull_click=()=>{
    const finalData =AllTitleData.map((data,index)=>daa|\oldAllTitleData[index]).join('');
    handleTabClick(1);

}
useEffect(()=> {
    const AiToolData  = getCacheItem('AiToolsList')?.[filterData?.NowOptions?.str]?.[nowTab?.tabName]||{}
    if(nowTab?.tabName!==undefined){
        setHasNore(false)
        if(AiToolData?.tableData?.length){
            if(AiToolData?.tableData?.length<AiToolData?.total){
                pageIndex.current = AiToolData?.tableDaa?.length/PAGE_SIZE+1;
                getTableData('more');

            }
            setTableData([...AiToolData?.tableData])
            getRenderingState(true);
            settotals(AiToolData?.total)
        }else{
            pageIndex.current=1;
            setTableData([]);
            getTableData()
        }
    }
})
//缓存
useEffect(()=> {
    setTableData([])
    setDataLoginState(false);
    pageIndex.current=1;
    const integrateData ={
        [oldfilterStr]: {
            ...getCacheItem('AiToolsList')?.[oldfilter],
            [nowTab?.tabName]:{
                total:totals,
                tableData:tableData
            }
        }
    }
    setCacheItem('AIToolsList',{...getCacheItem('AiToolsList')||{},...integratedData})
    setOldFilterStr(filterData?.NowOptions?.str);

},[filterData?.NewOptions])