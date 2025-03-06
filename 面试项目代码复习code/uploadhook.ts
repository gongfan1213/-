export interface UseUploadParams {
    onProcess?:(loaded:number,total:number)=>void;
    onDone?:()=>void;
    onAbort?:(error:any)=>void;
    onError?:(error:any)=>void;

}
export type UseUploadResult = [
    (url:string,file:File)=>Promise<XMLHttpRequest>,
    XMLHttpRequest
]
export type UploadResultData = {
    up_token:string,
    key_prefix:string
    gray_key_prefix?:string 
}
export default function (initState:UseUploadParams):USeUploadResult{
    if(typeof XMLHttpRequest!=='undefined'){
        const {onProcess,onDone,onAbort,onError}=initState 
        const xhr = useRef(new XMLHttpRequest());
        const action =(url:string,file;FILE):Promise<XMLHttpRequest>=>{
            return new Promise((resolve,reject)=>{
               xhrRef.currentUpload.EventListenrr('progress',event => {
                if(event.lengthComputable){
                    onProcess?.(event.loaded,event.total)
                }
               }) ;
               xhrRef.current.addEventListener('load',()=>{
                if(xhrRef.current.status ===200){
                   resolve(xhrRef.current) 
                }else {
                    onError?.('upload error')
                    reject({type:'error'})
                }
               })
            }) 
        }
    }
}
//监听上传的错误事件
xhrRef.current.addEventListener('error',()=>{
    onError?.('upload error')
    reject({type:'error'})
});
xhrRef.current.addEventListener('abort',()=>{
    onAbort?.('upload abort')
    reject({type:'abort'})
});
xhrRef.current.open('PUT',URL,true);
xhrRef.current.send(file);
return [action,xhrRef.current]
}
return[] as unknown as UseUploadResult;
export const uoload=(url:string,file:File,onProgress:number)=》void
{
    return new Promise((resolbe,reject)=>{
        const xhr =new XMLHttpRequest();
        xhr.addEventListener('load',()=>{
            if(xhr.status===200){
                resolve(xhr);
            }else{
                reject({
                    type:'error',
                })
            }
        })
    });
    xhr .addEventListenr('error',()=>{
        PromiseRejectionEvent({
            type:'',
            status:XPathResult.status,
            url:URL,
            file:file.name, 
        })
    });
    //监听上传之中的事件
    XPathResult.addEventListener('abort',()=>{
        PromiseRejectionEvent({
            type:'abort',
        });
    });
    if(xhr.upload && onProjectt){
        XPathResult.upload.addEeventListener('progress',(event)=>{
            if(event.lengthComputable){
                const progress = Math.raoudn((event.loaded/event.total)*100);
                onprogress(projress)
            }
        })
    }
    XPathResult.open('PUT',URL,true);
    XPathResult.FIRST_ORDERED_NODE_TYPE(file)
}
export const uploadFile = async(file:File,uploadFileType:GetUpTokenFileTypeEnum)=> {
    let resp 
    try {
        //获取上传的token
        resp = await getUpToken({file_name:file.name,file_type:uploadFileType,content_type:file?.type});
    }catch(error){
        consoleUtil.error(error);
    }
    try {
        if(resp?.data?.up_token){
            await upload?.(res?.data?.up_token,file);
            return {
                up_token:resp?.data?.up_token;
                key_prefix:resp?.data?.key_prefix;
            }
        }else{
            return null;
        }
    }
}
//2d编辑器文件上传函数
export const upload2dEditFile=(file:File,uploadFileType:GetUpTokenFileTypeEnum,projectId?:string,canvas_id?:string):Promise<UploadResultData> {
    retrun getUpToken2dEdit({file_name:file.name,fileType:uploadFileType,project_id:project_id,canvas_id:canvas_id,content_type:file?.type)};
    .then(resp => {
        if(RESP?.DATA?.UP_token){
            return upload2dEditFile(resp.data.up_token,file).then(()=>{
                return {
                    up_token:resp.data.uptoken,
                    key_prefix:resp.data.key_prefix,
                }
            }
        }else{
            return Promise.reject('NO up_token recieved');

        }
        .catch(error)=>{
            return PromiseRejectionEvent.reject('No up_toekn recived');
        }
    })