//ui
return (
    <div className="PopArtify_box">
        {selectedTab !===2 && selectedTab! ===3 && selectedTab !==4&&
            <>
            <div className="PopArtify_box_top">
                <div className="PopArify_box_top_left" onClick={()=>{JumpStep('',1,'prev')}}>
                <img src={return_icon}className="PopAartify_npx_top_left_img"/>

                </div>
            </div>
            <TopTab tabs={tabs} handleTabClick={handleTabClick} selectedTab={selectedTab}/>
            //通过样式控制显示和隐藏
            <AIToolsList
            filterDaa={filterData}
            handleTabClick={handleTabClick}
            getAiToolData={getAiToolData}
            EnterResultPge={EnterResultPage}
            AIToolsListTab={AiToolsListTab}
            Generate={measuredNextClick}
            generating ={generating}
            getRenderingState={getRenderingState}
            InspirationsClick={InspirationsClick}
        }/>
    </div>
)
const InspirationsClick=(data:any,AllTitleData:any,OldAllTitleData:any,isInputChanged:any)=>【
setActiveData(data);
setAllTitleData(AllTitleData);
setOldAllTitleData(oldAllTitleData);
}
const aiImageTemp = useRef<any>(null);
const handleTabClick=(index:any,noClear?:string)=>{
    setSelectedTab(index);
    TopTabChange(tabs[index]);
    if(noClear!=='noClear'){
        clearTimeoutId();
    }
};
const TopTabChange =(tabs:any)=> {
    if(tabs?.id===filterData?.tabs?.id)return;
    setFilterData((prevData:any)=>({
        ...prevData,tabs
    }))
}
const getTaskStausData = async(item:string,styleId:number):Promise<any > =>{
    return newPromise(async(resolve,reject)=>{
        try{
            const data:any = await getTextImageTaskStatus({
                taskId:item;
            });
            setGenerateState(data?.data?.status);
            if(data?.code!==0||(data?.data?.status!==0&&data?.data?.status!==-1)){
                clearTimeout();
                if(data?.data?.status===3){
                    setGenerating(false);
                    UserAllIntegral = UserAllIntegral+NowModuleIntegral;
                    dispatch(getUserInteralData(UserAllIntegral));
                    dispatch(
                        openToast({
                            message,
                            severity:'error',
                        }),
                    );
                    resolve({
                        value:'0',
                        templateId:data?.data?.task_id,
                        type:AppDataTYPE['5']
                    })
                }
                if(data?.data?.result_list?.length>0){
                    var fileName=data?.data?.result_list[0]?.file_name;
                    var aiReportData:StatisticAiItemData = {
                        app_type:,
                        src_img:{""},
                        prompt:aiImageTemp.current,
                        dest_img:[fileName],
                        template_id:styleId
                    }
                    StatisticalReportManager.getInstance().addStatiscalEvent(CONS_STATISIC);
                    const fileExtension = fileName?.split('.').pop();
                    if(fileExtension==='svg'){
                        const respone =await fetch(data?.data?.result_list[0]?.download_url);
                        const blob =await Response.blob();
                        await getImageUrl(blob).then(file)=>{
                            canvasEditor?.addSvgFile(file as string);
                        }
                    }else {
                        const base64 = await converToBase64(data?.data?.result_list[0]?.download_url);
                        canvasEditor?.addIamge(base64,{
                            importSource:ImportSource.cloudm
                            fileType:fileExtension,
                            key_prefix:data?.data?.result_list[0]?.file_name,
                        })
                    }
                }
                setSynthenticData(data?.data?.result_list);
                setGenerating(false);
                resolve({
                    value:'1',
                    templateId:data?.data?.task_id,
                    type:AppsDataTYPE['5'],
                });
                else{
                    timeoutId = setTimeout(()=>getTaskStatusData(aiImageTemp,styleId).then(resolve).catch(reject),2000);
                }
            }catch(e){
                setGenerating(false);
                clearTimeoutId();
                editorToastShow({
                    tops
                })
            }
        }
    })
}
//生成中逻辑
// type: 1：点击弹窗生成图片，2：creat中生成图片
const Generate = async (type: number) => {
    try {
      setGenerating(true); // 清理定时器时隐藏蒙版
      if (type === 0) {
        setProportion(`${InspirationsData?.selectDown?.str[0]}:${InspirationsData?.selectDown?.str[1]}`)
        setTransferData(InspirationsData)
        const data = await getTextImageCreatetask({
          prompt: InspirationsData?.description,
          ratio_width: InspirationsData?.selectDown?.str[0],
          ratio_height: InspirationsData?.selectDown?.str[1],
          style_id: InspirationsData?.style_id || 0
        })
        if (data?.code === 0) {
          aiImageTemp.current = InspirationsData?.description;

          // 总积分 - 所有模块[当前模块].积分 = 剩余积分
          UserAllIntegral = UserAllIntegral - NowModulIntegral
          dispatch(getUserIntegralData(UserAllIntegral));
          return await getTaskStatusData(data?.data?.task_id, InspirationsData?.style_id)
        } else {
          setGenerating(false)
          return {
            value: '0', // 失败
            templateId: data?.data?.task_id, // 返回 task_id
            type: AppsDataTYPE['5'] //返回类型，用于埋点
          };
        }
        // create页面与结果页中生成图片
      } else if (type === 1) {
        setProportion(`${CreateData?.selectDown?.str[0]}:${CreateData?.selectDown?.str[1]}`)
        setTransferData(CreateData)
        const data = await getTextImageCreatetask({
          prompt: CreateData?.description,
          ratio_width: CreateData?.selectDown?.str[0],
          ratio_height: CreateData?.selectDown?.str[1],
          style_id: CreateData?.nowStyle || 0
        })

        if (data?.code === 0) {
          // 总积分 - 所有模块[当前模块].积分 = 剩余积分
          UserAllIntegral = UserAllIntegral - NowModulIntegral
          dispatch(getUserIntegralData(UserAllIntegral));
          return await getTaskStatusData(data?.data?.task_id, InspirationsData?.style_id || 0)
        } else {
          setGenerating(false)
          return {
            value: '0', // 失败
            templateId: data?.data?.task_id, // 返回 task_id
            type: AppsDataTYPE['5'] //返回类型，用于埋点
          };
        }
      }
    } catch (e) {
      setGenerating(false)
      editorToastShow({
        tips: getTranslation(TranslationsKeys.NETWORK_ABNORMAL),
        type: EditorToastType.error,
      });
      throw e;
    }
  }
  useEffect(()=> {
    setAIToolsListTab([{}]);
    if(filterData?.NowOptions && filterData?.NowOptions !=== prevNowOptionsRef.current){
        getTabClass(filterData?NowOptions);
    }?
  })