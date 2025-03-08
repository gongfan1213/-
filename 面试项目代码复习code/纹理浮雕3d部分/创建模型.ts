//创建旋转对象的3d模型的方法
//主要是用于生成类似被子的3d模型
//1.初始化检查
if(!textureData || !this.textureCanavs)return;
if(!this.scene)return;
//场景的设置
this.isPlay = true;
const max = Math.max(textureData.width,textureData.height);
this.helper = visible = false;
this.camera.position.set(0,60,350+max);
this.cameraControls.minDistance =0;//设置最小距离
this.cameraControls.maxDistance = 1000;//设置最大距离
this.cameraControls.update();
this.renderer .render(this.screen,this.camera);
this.WebGLRenderbuffer.toneMappingExpusure=0.9;
//材质准备
const tetxure =this.textureLoader.load(textureData.colorBase64);
this.textureCache.push(texture);
tetxure.colorSpace=THREE.SRGBColorSpace;
const cylinderMaterial = new THREE.MeshPhyscialMaterial({
    metalness:0,
    roughtness:0.5,
    map:tetxure;
})
//模型参数的计算
const upperRadius = rotary_params.upperD / 2,
  lowerRadius = rotary_params.bottomD / 2,
  height = rotary_params.cupHeight,
  cylinderThickness = upperRadius * 0.13;
  //创建基础模型的解构
  //loading的时候占位
this.createCylinder(upperRadius - 0.08, lowerRadius - 0.08, height);
//里圈
this.createCylinder(upperRadius - cylinderThickness, lowerRadius - cylinderThickness, height);
//隔层
this.createCylinder(upperRadius - 0.02, lowerRadius - 0.02, height, cylinderMaterial);
//上杯口
this.createTorus(upperRadius - cylinderThickness / 2, cylinderThickness / 2, height / 2);
//下杯口
this.createTorus(lowerRadius - cylinderThickness / 2, cylinderThickness / 2, -height / 2);
//杯底
this.createCircle(lowerRadius - cylinderThickness / 2, -height / 2 - cylinderThickness / 2);
//创建把手
if (rotary_params.hasHandle) {
    const min = Math.min(upperRadius, lowerRadius);
    const max = Math.max(upperRadius, lowerRadius);
    const right = (max - min) / 2 + min;
    const tan = (upperRadius - lowerRadius) / height;
    this.createTube(height / 2 - height * 0.18, ((upperRadius + lowerRadius) / 2) * 0.11, tan, right);
  }
  //创建纹理细节
  //遍历纹理数据，创建具有纹理的圆柱体
  // 遍历灰度数据数组，为每个数据项创建纹理圆柱体
textureData.grayData.forEach((data: any) => {
    // 加载颜色纹理，如果data.grayColorImg不存在则使用textureData.colorBase64
    const texture = this.textureLoader.load(data.grayColorImg || textureData.colorBase64);
    // 将纹理添加到缓存中以便后续管理
    this.textureCache.push(texture);
    // 设置纹理颜色空间为SRGB
    texture.colorSpace = THREE.SRGBColorSpace;
  
    // 创建新的Image对象用于加载灰度图像
    const grayImage = new Image();
    // 设置灰度图像的源路径
    grayImage.src = data.grayImg;
  
    // 创建圆柱体材质，使用加载的纹理
    const cylinderMaterial = new THREE.MeshPhysicalMaterial({
      map: texture, // 设置基础颜色纹理
      transparent: true, // 启用透明度
      opacity: 1, // 设置不透明度为完全不透明
    });
  
    // 如果数据中包含法线贴图路径
    if (data.normal) {
      // 加载法线贴图
      const normalTexture = this.textureLoader.load(data.normal);
      // 将法线贴图添加到缓存
      this.textureCache.push(normalTexture);
      // 将法线贴图应用到材质
      cylinderMaterial.normalMap = normalTexture;
    }
  
    // 获取材质参数，如果没有则使用默认参数
    const color_material_params = data.material_params || defMaterialParams;
  
    // 遍历材质参数对象
    for(let key in color_material_params){
      // 如果参数是normalScale，需要转换为Vector2
      if(key === 'normalScale'){
        cylinderMaterial[key] = new THREE.Vector2(color_material_params[key], color_material_params[key]);
      }else{
        // 其他参数直接赋值
        cylinderMaterial[key] = color_material_params[key];
      }
    }
  
    // 当灰度图像加载完成时执行
    grayImage.onload = () => {
      // 根据灰度图像和参数生成旋转对称的圆柱体几何体
      const cylinderGeometry = this.getRotatingTextureGeometry(
        grayImage, // 灰度图像
        data.thickness, // 厚度参数
        upperRadius, // 上半径
        lowerRadius, // 下半径
        height // 高度
      );
  
      // 使用生成的几何体和材质创建圆柱体
      const cylinder = this.createColorCylinder(cylinderGeometry, cylinderMaterial);
      // 设置圆柱体的唯一标识符
      cylinder._id = data.id;
      // 标记圆柱体类型为'texture'
      cylinder._type = 'texture';
    };
  });
//   upperRadius：杯子上部半径，通过rotary_params.upperD / 2计算得到
// lowerRadius：杯子底部半径，通过rotary_params.bottomD / 2计算得到
// height：杯子高度，直接使用rotary_params.cupHeight
// cylinderThickness：圆柱体厚度，设置为上部半径的13%
// 创建三个圆柱体：
// 第一个用于加载时的占位
// 第二个是杯子的内壁
// 第三个是杯子的隔层
// 创建两个圆环（上杯口和下杯口）
// 创建一个圆形（杯底）
// 如果参数中包含把手，则创建把手
// 计算把手的位置和角度
