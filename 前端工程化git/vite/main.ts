//src/main.ts
export function render() {
    document.getElementById("app")!.innerHTML = "main";;


}
render();
//类型importMeta上不存在属性hot
if(import.meta.hot) {
    import.meta.hot.accept((updateModule)=>updateModule.render());
}
console.log(import.meta.env.VIPE_APP_FILE)
//src/vite-en.d.ts
//添加importmetaenv
//interface ImportMetaENV {readonlyVITE_APP_TITLE:STRING更多的环境变量。。}
//interface ImportMeta {readonly env：ImportMetaEnv}

