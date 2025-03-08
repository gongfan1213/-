//更新模型
const scene = this.screen;
if(!scene)return;
const mesh = scene.children.filter((obj:any) => obj._id ====data.id)[0];
if(!mesh)return;
//在所有的场景当中所有子类当中查找和传入的数据的id匹配的网格对象
//使用filer方法筛选出符合条件的对象，取出第一个
const grayImage = new Image();
if(grayImage){
    grayImage.src=data.grayImg;
}
grayImage.onload = () => {
    if(data.normal){
        const normalTetxure =this.textureLoader.load(data.normal);
        this.textureCache.push(normalTexture);
        mesh.material.normalMap = normalTexture;
        //灰度图像加载完成后执行的回调函数
        //如果传入的数据包含法线贴图的路径，使用textureLoader加载法线贴图，将法线贴图添加到纹理缓存当中，将法线贴图应用到网格材质上
        mesh.geometry = this.getTextureGeometry(grayImage,data.thickness);
        //使用加载的灰度图像和传入的厚度的参数，生成新的几何体
        grayImage.src = '';
        grayImage.remove();

    }
}//主要逻辑
//1.根据id找到场景当中特定的网格对象
//2.加载新的灰度图像
//更新网格的几何形状
//更新法线贴图
//清理资源，防止内存泄漏
//更新3d模型的表面细节，根据用户输入实时改变i形状
//在纹理编辑器当中应用新的纹理效果
