//src/main.ts
export function render() {
    document.getElementById("app")!.innerHTML = "main";;


}
render();
//类型importMeta上不存在属性hot
if(import.meta.hot) {
    import.meta.hot.accept((updateModule)=>updateModule.render());
}