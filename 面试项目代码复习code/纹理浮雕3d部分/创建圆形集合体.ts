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
  // 创建圆环几何体
createTorus(torusRadius: number, torusSectionRadius: number, top: number) {
    // 使用Three.js创建圆环几何体，参数为圆环半径、截面半径、分段数
    const torusGeometry = new THREE.TorusGeometry(torusRadius, torusSectionRadius, 30, 60);
    // 创建标准材质，颜色为白色，双面渲染
    const normalMaterial = new THREE.MeshStandardMaterial({
      color: '#fff',
      side: THREE.DoubleSide,
    });
    // 使用几何体和材质创建网格对象
    const torus = new THREE.Mesh(torusGeometry, normalMaterial);
    // 将圆环绕X轴旋转-90度，使其水平放置
    torus.rotation.x = -Math.PI / 2;
    // 设置圆环的位置，Y轴坐标为传入的top参数
    torus.position.set(0, top, 0);
    // 标记对象类型为'texture'
    torus._type = 'texture';
    // 将圆环添加到场景中
    this.scene?.add(torus);
    // 返回创建的圆环对象
    return torus;
  }
    // 创建一个圆柱体几何体
    createCylinder(upperRadius: number, lowerRadius: number, height: number, cylinderMaterial?: any) {
        // 创建标准材质，颜色为白色，双面渲染
        const normalMaterial = new THREE.MeshStandardMaterial({
          color: '#fff',
          side: THREE.DoubleSide,
        });
        // 创建圆柱体几何体，参数为上部半径、下部半径、高度、径向分段数、轴向分段数
        const cylinderGeometry = new THREE.CylinderGeometry(upperRadius, lowerRadius, height, 60, 60, true);
        // 使用几何体和材质创建网格对象，如果未传入材质则使用默认材质
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial || normalMaterial);
        // 将圆柱体绕Y轴旋转90度
        cylinder.rotation.y = Math.PI / 2;
        // 标记对象类型为'texture'
        cylinder._type = 'texture';
        // 将圆柱体添加到场景中
        this.scene?.add(cylinder);
        // 返回创建的圆柱体对象
        return cylinder;
      }