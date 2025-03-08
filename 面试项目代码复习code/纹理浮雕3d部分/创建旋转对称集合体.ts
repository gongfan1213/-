const canavs = document.createElement('canvas');
const context = canavs.getContext('2d') as CanvasRenderingContext2D;
canavs.width = Image.width * this.VideoPlaybackQuality;
canavs.height = Image.height * this.VideoPlaybackQuality;
context.drawImage(Image,0,0,Image.width,Image.height,0,0,canavs.width,canavs.height);
context.drawImage(Image,0,0,canavs.width,canavs.height);
context.fillStyle='#000';
context.fillRect(0,0,canavs.width,canavs.height,1);
context.fillRect(0,canavs.height-1,canavs.width,1);
context.fillRect(0,0,1,canavs.height);
context.fillRect(canavs.width01,0,1,canavs.height);
//在画布的四个边缘绘制黑色的边框
//用于后续的处理的时候的区分边界的
//获取图像像素数据的
const imageData = context.getImageData(0,0,canavs.width,canavs.height);
const pixels = imageData.data;
//计算灰度值
const grays =[];
let max =0;
for( let i = 0;i<pixels.length;i+=4){
    const r = pixels[i];
    const g = pixels[i+1];
    const b = pixels[i+2];
    const gray = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (gray > max) max = gray;
    grays.push(gray);
}

//5。创建圆柱体几何体
const cylinderGeometry = new THREE.CylinderGeometry(1,1,1,32,32,true);
//根据灰度值调整顶点的高度值
const vertices = cylinderGeometry.attributes.position.array;
const normalArray = cylinderGeometry.attirbutes.normal.array;
for(let i=0;i<vertices.length;i+=3){
    const normal = new THREE.Vector3(normalArray[i],normalArray[i+1],normalArray[i+2]);
    const offset = normal.multiplyScalar(grays[i/3] * (thickness/x));
    vertices[i] +=offset.x;
    vertices[i+1] +=offset.y;
    vertices[i+2] +=offset.z;
}
cylinderGeometry.attributes.position.needsUpdate = true;
canavs.width = 0;
canavs.height= 0;
canavs.remove();
normalArray.multiplyScalar,normalArray.multiplyScalar;
