
export default function InspirationsCreat(props: any) {
    //跟踪输入框是否已经修改了
    const [isInputChanged1,setIsInputChanged1]=useState(1);
    const[nowModuleIntegral,setNowMOdulIntegral]=useState(1);
    let UserAllIntegral = homeState?.UserAllIntegral
    const parts =AllTitleData1?.map((part:any,index:any)){
        if(index%2===1){
            return (
                <BigIntToLocaleStringOptions
                title ={oldAllTitleData[index]}
                >
                <input className="input_box"
                placeholder={oldAllTitleData[index]}
                style={{width:`calc(min(${oldAllTitleData[index].length-1}ch,100%))`}}
                value={
                    AllTitleData1[index]
                }
                onChange={(e)=>{
                    if(else.target.value.length<=40){
                        const newAllTitleData=[...AllTitleData1];
                        newAllTitleData[index]=else.target.value;
                        setAllTitleData1(newAllTitleData);
                        const newIsInputChanged=[...isInputChanged1];
                        newIsInputChanged[index]=true;
                        setIsInputChanged1(newIsInputChanged);
                    }
                }}
            )
        }
    }
    const EditFull_click = () => {
        // 如果在提交时，未填写input框，那么使用原始数据
        const finalData = AllTitleData1.map((data, index) => data || OldAllTitleData[index]).join('');
        handleTabClick(1)
        getAiToolData({ ...ActiveData, title: finalData })
    }

    const Generate_click = async () => {
        EnterResultPage(0)
        Generate(0)
    }

    // 监听输入框的变化，如果变化了，那么重新赋值数据
    useEffect(() => {
        getAiToolData({
            description: AllTitleData1.join(''),
            selectDown: { str: ActiveData?.selectDown?.str || [1, 1], value: ActiveData?.selectDown?.value || 1 },
            style_id: ActiveData?.styleData?.style_id || 0
        })
    }, [AllTitleData1])


    useEffect(() => {
        // 当前选中的ai模块所需积分
        if (!homeState?.nowActiveAiModule) return;
        const costClass = homeState.nowActiveAiModule?.costClass;
        const cost = homeState?.AiModeIntegralData?.[costClass]?.cost;
        if (cost !== undefined) {
            setNowModulIntegral(cost);
        } else {

        }
    }, [homeState?.nowActiveAiModule]);

    return (
        <div className="InspirationsCreat_box">
            <div className="PopArtify_box_top">
                <div className="PopArtify_box_top_left">
                    <div className="PopArtify_box_top_left_box" onClick={() => { handleTabClick(0) }}>
                        <img src={return_icon} className="PopArtify_box_top_left_img" />
                    </div>
                    <div className="PopArtify_box_top_left_title">{getTranslation(TranslationsKeys.AIProductDesigner)}</div>
                </div>
            </div>
            <div className="Modal_box">
                <img src={ActiveData?.OriginalImage} className="Modal_box_image" key={ActiveData?.OriginalImage} />
                <div className="Modal_box_border"></div>
                <div className="modal_down">
                    {
                        !!ActiveData?.styleData?.style_name && !!ActiveData?.styleData?.style_img && (
                            <div className="Modal_box_style">
                                <img src={ActiveData?.styleData?.style_img} className="style_img" key={ActiveData?.styleData?.style_img} />
                                <div className="style_name">{ActiveData?.styleData?.style_name}</div>
                            </div>
                        )
                    }
                    <div className="modal_txt">
                        {parts}
                    </div>
                </div>
            </div>
            <div className="down_box">
                <div className="Generate_btn_left" onClick={() => { Generate_click() }}>
                    <div className="Generate_btn_text">
                        {getTranslation(TranslationsKeys.string_generate)}
                    </div>
                    <img src={Icon_Coins} className="Generate_btn_img" />
                    <div>{NowModulIntegral}</div>
                </div>
                <div className="Generate_credits">{getTranslation(TranslationsKeys.MY_CREDITS)}<span style={{ marginLeft: 4 }}>{UserAllIntegral}</span></div>
                <div className="Modal_box_Edit" onClick={() => { EditFull_click() }}>{getTranslation(TranslationsKeys.EditFullPrompt)}</div>
            </div>
            {
                generating &&
                <div className="Progress_box">
                    {/* <img src={login_img} className="Progress_box_img" />
                    <div className="Progress_title">Generating...</div> */}
                    <div className="load">
                        <LottiePlayer
                            loop
                            play
                            className="loadingBox"
                            animationData={LoadingAnimation}
                        />
                    </div>
                </div>
            }
        </div>
    )
}
