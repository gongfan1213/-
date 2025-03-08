//参数
export const defMaterialParams = {
    metalness: 0.5,
    roughness: 0.6,
    normalScale: 0.5,
    clearcoat:0,
    clearcoatRoughness:0,
    specularIntensity:0,
    ior:1.5,
    iridescence:0,
    iridescenceIOR:1.5,
    reflectivity:0.5,
    specularIntensity:1,
}
//texturescene
export default class TextureScene {
   scene?: THREE.Scene;
   private widthMM: number = 100;
   private textureCache: THREE.Texture[]=[];
   private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
   private quality: number = 1;
   private textureCanvas :any;
   private isPlay: boolean = false;
   private cleanup?:() => void;
   private renderer?: THREE.WebGLRenderer;
   private camera?: THREE.PerspectiveCamera;
   private cameraControls?: THREE.OrbitControls;
   private helper?: THREE.GridHelper;
   constructor(textureCanavs:any,quality:number) {
    this.textureCanvas = textureCanavs;
    this.quality =quality || 1;

   }
   init(render_params?:any) {
    if(this.scene) return;
    const container =this.textureCanvas;
    const renderParams = render_params || defRenderParams;
    const camera = new THREE.PerspectiveCamera(renderParams.fov, renderParams.aspect, renderParams.near, renderParams.far);
    camera.position.set(renderParams.cameraPosition.x, renderParams.cameraPosition.y, renderParams.cameraPosition.z);
    this.camera = camera;
    //创建场景
    const scene = new THREE.Scene();
    this.scene = scene;
    scene.add(camera);
    //添加环境光
    scene.add(new THREE.AmbientLight('#b6b6b6',renderParams.ambientLight));
    //添加平行光
    const light = new THREE.DirectionalLight('#ffffff',renderParams.directionalLight);
    light.position.set(renderParams.directionalLightPosition.x, renderParams.directionalLightPosition.y, renderParams.directionalLightPosition.z);
    scene.add(light);
    //创建粒子光源
    const pointMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false, 
    })
    const particleLight = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), pointMaterial);
    scene.add(particleLight);
    particleLight.add(new THREE.PointLight('#ffffff', renderParams.pointLight));
    //加载环境贴图
    new THREE.TextureLoader().load(env,(texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
    })
    //创建渲染器
    const renderer = new THREE.WebGLRenderer({
        anialias:true,
        logarithmicDepthBuffer:true,
    });
    // logarithmicDepthBuffer 是 Three.js 中 WebGLRenderer 的一个配置选项，用于解决 3D 场景中的深度缓冲问题。

// 在 Three.js 中，默认的深度缓冲是线性的，这在处理大范围场景时可能会遇到精度问题。当场景中同时存在非常近和非常远的物体时，线性深度缓冲可能会导致远处的物体出现深度冲突（z-fighting）或渲染错误。

// logarithmicDepthBuffer: true 的作用是：

// 使用对数深度缓冲代替线性深度缓冲
// 可以更好地处理大范围场景的深度精度问题
// 特别适用于需要同时显示非常近和非常远物体的场景
// 可以减少 z-fighting 现象
// 不过需要注意的是，启用这个选项会带来一些性能开销，因为它需要额外的计算。因此，只有在确实需要处理大范围场景时才建议启用它。

// 在你的代码中，这个配置被用于 WebGLRenderer 的初始化，说明你的场景可能需要处理较大范围的深度值。
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
   // 这两行代码是用于配置 Three.js 渲染器的重要设置：

// renderer.setPixelRatio(window.devicePixelRatio);

// 设置渲染器的像素比
// window.devicePixelRatio 获取设备的物理像素与CSS像素的比率
// 在高分辨率屏幕（如Retina显示屏）上，这个值通常大于1
// 启用这个设置可以让渲染器在高分辨率设备上显示更清晰的图像
// 如果不设置，在高分辨率设备上可能会出现模糊的渲染效果
// renderer.setSize(container.clientWidth, container.clientHeight);

// 设置渲染器的大小
// container.clientWidth 和 container.clientHeight 获取容器元素的宽度和高度
// 这个设置使渲染器的画布大小与容器元素的大小相匹配
// 确保渲染内容能够正确填充整个容器
// 如果容器大小改变（如窗口调整大小），需要重新调用这个方法来更新渲染器大小
// 在你的代码中，这两行代码一起使用，确保渲染器：

// 在高分辨率设备上显示清晰
// 正确匹配容器的大小
// 提供最佳的视觉质量
// 这是 Three.js 应用中常见的标准配置，几乎所有 Three.js 项目都会使用类似的设置来确保渲染质量。
renderer.setAnimationLoop(() => {
    if(this.isPlay) {
      return; 
    }
    const timer = Date.now() * 0.00018;
    particleLight.position.x = Math.cos(timer) * 4;
    particleLight.position.x = Math.sin(timer * 7) * 4;
    particleLight.position.y = 0.5 + Math.cos(timer * 5) * 1;
    particleLight.position.z = Math.cos(timer * 3) * 4;   
//     X轴运动：

// Math.sin(timer * 7) * 4
// 使用正弦函数，乘以7使运动频率更快，乘以4扩大运动幅度
// 光源会在X轴上以较快的速度来回摆动
// Y轴运动：

// 0.5 + Math.cos(timer * 5) * 1
// 使用余弦函数，乘以5使运动频率中等，乘以1控制运动幅度
// 0.5是基础高度，光源会在Y轴上下小幅波动
// Z轴运动：

// Math.cos(timer * 3) * 4
// 使用余弦函数，乘以3使运动频率较慢，乘以4扩大运动幅度
// 光源会在Z轴上以较慢的速度前后移动
// 这种设置方式的好处是：

// 三个轴使用不同的三角函数（sin和cos）和不同的频率（7,5,3），使得光源的运动轨迹更加自然和随机
// 不同的振幅（4,1,4）让光源在空间中的运动范围更加立体
// 整体效果是光源会在场景中优雅地"舞动"，为场景带来动态的光影变化
// 这种设置常用于：

// 展示产品的动态光影效果
// 创建更加生动和有趣的场景
// 模拟自然光源的微妙变化
// 如果你想要调整效果，可以修改这些参数：

// 改变乘数（7,5,3）来调整运动频率
// 改变振幅（4,1,4）来调整运动范围
// 改变基础值（如Y轴的0.5）来调整中心位置   
    renderer.render(scene, camera);
});
//设置色条映射和背景颜色
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setClearColor(0x000000, 0);
//创建网格辅助对象
const helper = new THREE.GridHelper(100, 100, 0xffffff, 0xffffff);
helper.material.opacity =0.4;
helper.material.transparent = true;
scene.add(helper);
this.helper = helper;
//将渲染器添加到容器当中
container.appendChild(renderer.domElement);
//创建相机控制器
const cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
canmeraControls.target.set(0,0,0);
cameraControls.update();
this.cameraControls = cameraControls;
const onWindowResize=() => {
    setTimeout(()=> {
        renderer.setSize(container.clientWidth, container.clientHeight);
    },500)
};
window.addEventListener('resize', onWindowResize);
//清理函数
const cleanup= ()=> {
    window.removeEventListener('resize', onWindowResize);
};
this.cleanup = cleanup;
//保存渲染器和场景
this.renderer = renderer;
this.scene = scene;
   }

}


