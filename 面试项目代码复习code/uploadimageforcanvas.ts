export const uploadImageForcanvas = (ops:CanavsUpdateOpts) =>{
    if(ops.fileExtension ==='svg') {
        fileToBase64(ops.fileItem).then((fileRet)=>{
            ops.updateStart();
            upload2dEditFile(ops.fileItem,ops.uploadFileType).then(async(resp)=>{
                const ret = await createUserMaterial({file_name:resp.key_prefix});
                if(!ret?.data){
                    ops.updateEnd(false,-1);
                    return;
                }
                if(resp && resp.key_prefix) {
                    if(!ops?.isApps){
                        ops.event?.emitEvent('',resizeTo.data)
                        ops.canvasEditor?.addSvgFile(fileRet as string);
                        ops.updateEnd(true,0);
                    }
                }else {
                    ops.updateEnd(false,-1);
                }
            }).catch((error)=>{
                ops.updateEnd(false,-1,error);
            })
        })
    }
    //处理psd文件
    else if (ops.fileExtension === 'psd') {
       ops.updateStart();
       const reader =new FileReader();
       reader.onload = async()=>{
        const dataUrl = reader.result as string;
        const psd = await PSD.fromURL(dataUrl);
        psd.parse();
        const img = psd.image.toPng();
        const newFile = base64ToFile(img.src,ops.fileItem.name+".webp");
        getImgCompressAndUpload(newFile,ops);
       } ;
       reader.readAsDataURL(ops.fileItem);
    }else if(ops.fileExtension==='ai' || ops.fileExtension ==='pdf'){
        ops.updateStart();
        const reader = new FileReader();
        reader.onload =async(e)=>{
            const pdfjs = await import('pdfjs-dist');
            pdfjs.GlobalWorkerOptiosn.workerSrc = 'pdf.worker.js';
            const arrayBuffer =reader.result as ArrayBuffer;
            const loadingTask =pdfjs.getDocument(arrayBuffer);
            const pdf =await loadingTask.promise();
            const numPages=1;
            const canvases=[];
            let totalHeight =0;
            let maxWidth=0;
            for(let i =1;i<=numPages;i++){
               const page = await pdf.getPage(i);
               const viewPort =page.getViewPort({scale:1.5});
               const canvas =document.createElement('canvas');
               const context = canvas.getContext('2d');
               canvas.width = viewPort.width;
               canvas.height = viewPort.height; 
               const renderContext = {
                   canvasContext:context,
                   viewport:viewPort
               };
               await page.render(renderContext).promise;
               canvases.push(canvas);
               totalHeight +=viewPort.height;
               maxWidth = Math.max(maxWidth,viewPort.width);
               const combinedCanvas = document.createElement('canvas');
               combinedCanavs.width=maxWidth;
               combinedCanavas.height =totalHeight;
               const combinedContext = combinedCnavs.getConetxt('2d');
               let yOffset =0;
               for(let j=0;j<canvases.length;j++){
                   const canvas =canvases[j];
                   combinedContext.drawImage(canvas,0,yOffset);
                   yOffset +=canvas.height;
               }
            }
        }
    }
}
else if(onpopstate.fileExtension ==='ai' || ops.fileExtension ==='pdf'){
   
    onpopstate.updateStart();
    const reader = new FileReader();
    reader.onload = async(e)=>{
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptiosn.workerSrc = 'pdf.worker.js';
        const arrayBuffer =reader.result as ArrayBuffer;
        const loadingTask =pdfjs.getDocument(arrayBuffer);
        const pdf =await loadingTask.promise();
        const numPages=1;
        const canvases=[];
        let totalHeight =0;
        let maxWidth=0;
        for(let i =1;i<=numPages;i++){
           const page = await pdf.getPage(i);
           const viewPort =page.getViewPort({scale:1.5});
           const canvas =document.createElement('canvas');
           const context = canvas.getContext('2d');
           canvas.width = viewPort.width;
           canvas.height = viewPort.height;
           const renderContext = {
               canvasContext:context,
               viewport:viewPort 
           } 
           await page.render(renderContext).promise;
           canvases.push(canvas);
           totalHeight +=viewPort.height;
           maxWidth = Math.max(maxWidth,viewPort.width);
        }
        //创建一个合并所有页面的canas
        const combinedCanvas = document.createElement('canvas');
        combinedCanvas.width =maxWidth;
        combinedCanvas.height = totalHeight;
        const combinedContext = combinedCanvas.getContext('2d');
        //将各个页面的canvas绘制到合并的canvas上的
        let yOffset =0;
        for(let j=0;j<canvases.length;j++){
            const canvas =canvases[j];
            combinedContext.drawImage(canvas,0,yOffset);
            yOffset +=canvas.height;
        }
        //经合并后的canvas转换成为base6
        const base64DataUrl = combinedCanvas.toDataURL('image/png');
        base64DataUrl.width = 0;
        base64DataUrl.height = 0;
        canvases.forEach((canvas) => {
            canvas.width = 0;
            canvas.height = 0;

        });//pdfjs-dist来转换
        //将dataurl转换成为文件
        const newFile = base64ToFile(base64DataUrl,onpopstate.fileItem.name+".webp");
        getImgCompressAndUpload(newFile,onpopstate);

    }
    reader.readAsDataURL(onpopstate.fileItem);
}
else if(/\/(?;jpeg|png|gif|webp|bmp|svg)$/.test(onpopstate.fileItem.type)){
    onpopstate.updateStart();
    //上传文件
    upload2dEditFile(file,onpopstate.uploadFileType,onpopstate.projectId,onpopstate.canvas_id).then(async (resp)=>{
        if(resp && resp.key_prefix){
            onpopstate.uploadFileType === 1 ? await createUserMaterial({file_name:resp.key_prefix}) : await createUserMaterial({file_name:resp.key_prefix});
            if(!ret?.data){
                onpopstate.uploadEnd(false,-1)
                return;
            }
            onpopstate.event?.emitEvent('',return.data);
        }();
        fileToBase64(file).then((fileRet) => {
            if(!onpopstate?.isApps){
                onpopstate.canvasEditor?.addImage(fileRet as string);
                onpopstate.uploadEnd(true,0);
            }
        })
        onpopstate.updateEnd(true,0);else{
            onpopstate.updateEnd(false,-1);
        }
    })
    getImgCompressAndUpload(onpopstate.fileItem,onpopstate);
}
//svg文件的处理
//将svg文件转换成为base64的格式
//开始上传的流程
//上传文件到服务器
//创建用户的素材记录
//如果上传成功，触发素材更新事件，并且将sbh事件添加到画布当中
//psd文件的处理
//使用filereader读取psd文件
//使用psd。js解析psd文件
//将psd文件按转换成为png格式的
//将png转换成为webp格式额
//普通格式的图片处理
//开始上传路曾
//直接上传图片的文件按，如果上传成功，创建用户素材的记录，触发素材更新的事件，将图片转换成为base64
//的，添加到画布当中