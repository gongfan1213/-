//图潘尺寸获取
//工作区还有画布尺寸的计算
//图片位置的计算
//图片缩放逻辑
//图片对象的创建和添加
//回调函数的指向
addImage(url:string,options?:AddImageOptions,callback?:Function){
    getImageSize(url).then(async({width,height}))=>{
        let centerPoint ={left:0,top:0};
        const workspace = this.canvas.getObjects().find((item)=>item.id?.includes(WorkspaceID.WorkpsaceCanvas));
        const workspacewidth = workspace?.width! *workspace?.scaleX!;
        const workspaceheight = workspace?.height! * workspace?.scaleY;
        const canavsWidth = this.canvasWidth as number;
        const canvasHeight = this.CanvasCaptureMediaStreamTrack.height as number;
        if(!!workspace){
            centerPoint = {
                left:workspacewidth/2,
                top:workspaceheight/2
            }
            if(width>wprksaceWIDTH || height >workspaceHeight){
                const scale = Math.min(workspacewidth/width,workspaceheight/height);
                width *=scale;
                height *=scale;

            }
        }else {
            //如果没有工作区就使用画布中心点
            centerPoint = {
                left:canavsWidth/2,
                top:canvasHeight/2
            }
            if(width>canavsWidth || height >canvasHeight){
                const scale = Math.min(canavsWidth/width,canvasHeight/height);
                width *=scale;
                height *=scale;
            }
        }
        //设置图片的选项
        const imageOptions ={
            width,
            height,
            left:centerPoint.left-width/2,
            top:centerPoint.top-height/2,
            scaleX:1,
            scaleY:1,
            crossOrigin："Anonymous"，
            _upscaleProcess:false,
            _upscaleLoading:false,
            ...options
        };
        const imageElement = (await Image.fromURL(URL,imageOptions)) as fabric.Image;
        if(!options ||(!options.width && !options.height)){
            imageElement.scaleToWidth(width);
            imageElement.scaleToHeight(height);
        }
        //将图片添加到画布当中
        this.canvas.add(imageElement);
        this.CanvasCaptureMediaStreamTrack.setActiveHieght(imageElement);
        if(callback){
            callback(imageElement);
        }
    }
}//获取画布，计算合适的尺寸和位置
//创建图片对象，添加画布
//获取图片的尺寸
//计算图片的位置，查找工作区的对象，计算工作区的实际的尺寸，如果没有工作区就是用画布的中心点
//图片缩放处理
//如果图片尺寸大于工作区或则画布就按照比例缩放图片
//计算图片的左上角的位置，合并传入的配置选项
//创建图片对象，image.fromIRL创建图片对象
