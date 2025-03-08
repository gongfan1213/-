  // 创建一个圆形几何体
  createCircle(radius: number, top: number) {
    // 创建圆形几何体，参数为半径和分段数
    const circleGeometry = new THREE.CircleGeometry(radius, 60);
    // 创建标准材质，颜色为白色，双面渲染
    const normalMaterial = new THREE.MeshStandardMaterial({
      color: '#fff',
      side: THREE.DoubleSide,
    });
    // 使用几何体和材质创建网格对象
    const circle = new THREE.Mesh(circleGeometry, normalMaterial);
    // 将圆形绕X轴旋转-90度，使其水平放置
    circle.rotation.x = -Math.PI / 2;
    // 设置圆形的位置，Y轴坐标为传入的top参数
    circle.position.set(0, top, 0);
    // 标记对象类型为'texture'
    circle._type = 'texture';
    // 将圆形添加到场景中
    this.scene?.add(circle);
    // 返回创建的圆形对象
    return circle;
  }