、、、
//jsxreact语法糖，描述ui界面
let element = (
  <div id="0">
    <div id="1">1</div>
    <div id="2">2</div>
  </div>
  )
  //将元素渲染到界面
  function render(element,rootParent) {
    console.log('root');
    //1。创建元素document.createElement
    let dom = document.createELement(element.type);
    //2.将元素上的属性添加上去
    Object.keys(elements.props)).filter(props=>props!="children").forEach(v=》
    dom[v]=elements.props[v];
    });
    //3.将自元素进行渲染
    if(Array.isArray(element.props.children)) {
    elements.props.children(forEach(c->render(c,dom));
    }else {
    dom.innerHTML =element.props.children;
    }//如果界面节点比较多，层次深的的，递归渲染比较耗时
    
  }
  rootParent.appendChild(dom);
  render(element,document.getElementById('root'));
  console.log(element)
  ReactDom.render(element,document.getElementById("root"));
、、、
- fiber是一个数据结构，可以用一个纯的js对象来标识的
- 执行单元，每次执行完一个执行单元，react就会检查
- 增量渲染的
- 暂停，终止，复用渲染任务
- 不同的更新优先级
- 请求调度，浏览器，浏览器事件处理，执行js，布局绘制，空闲时间，交给react执行任务，存在任务执行任务，就执行任务，交给浏览器的，执行某个任务耗时多长，处理reeact执行单元
- - 大多数设备的屏幕刷新频率是60次/秒，每秒24帧，帧数越高，所显示的动作会越流畅
  - 每个帧的预算事件是16.66毫秒
  - 开头包括计算布局和绘制
  - javascrit执行javascript引起和页面渲染在同一个线程当中，gui渲染和javascript和执行两者之间是互斥的
  - 如果某个任务执行时间过长，浏览器就会推迟渲染
  - requestanimationframe
  - 告诉浏览器希望执行一个动画，要求浏览器在下一次重绘之前调用指定的回调函数更新动画，传入一个回调函数作为参数，这个回调函数会在浏览器下一次重绘之前执行的
 
  、、、
  let start；
  let root = document.getElementById("root");
  function animate(timeStart){
  if(!start) {
  start=timeStart;
  }
  console.log(timeStart-start);
  root.style.transform="translateX("+timeStart*0.01+"px)";
  if(timeStart<1000){
  window.requestAnimationFrame(animate);
  }
  window.requestAnimationFrame(animate);
  }
  ```
  - requestidlecallback
  - 插入一个函数，这个函数载浏览器空闲的时候被调用的，这让开发者能够在主事件上执行后台和低优先级的工作，而不会影响延迟关键事件，如动画和输入响应函数一般会按照先进先调用的顺序执行，然后，如果回调函数制定了执行超时时间timeout则有可能为了在超时前执行函数而打乱执行顺序
  、、、
  function sleep（duration） 「
  let now=Date。now();
  while(duration+now>Date.now()){
  }
  }
  function works = {
  ()=> {
  console.log("renwu1");
  },
  ()=> {
  console.log("renwu1");
  },
  ()=> {
  console.log("renwu1");
  },
  ()=> {
  console.log("renwu1");
  },()=> {
  console.log("renwu1");
  }
  ]
  //浏览器空闲执行这5个任务
  function progress(dealine) {
  console.log("剩下多少空闲四件",deadline.timeRemaining);
  while(deadline.timeReamianing()>0 && works.length>0){
  performUnitOfWork();
  }
  if(works.length>0){
  window.requestIdleCallback(
  };
  function performUnitOfWork() {
  let work=work.shift();
  work()
  }
  window.requestIdleCallback(progress);
  
  }
  window.requestIdleCallback(progress);
  、、、
  - messagechannel
  # messagechannel
  - channel messaging api的messagechannel接口允许我们创建一个新的消息通道，并且通过他的两个mesageport属性发送数据
  - 目前requestdidlecallback只有chrome支持的
  - messagechannel 模拟了requestidlecallback将回调延迟到绘制操作之后执行的
  - 允许我们创建一个新的消息通道，通过两个messageport发送数据
  - message channel接口允许我们创建一个新的消息通道，通过他的两个messageport属性发送数据
  - react利用messagechannel模拟了requestidlecallback将回调延迟到绘制操作之后执行
  - 允许我们创建一个新的消息通道，通过他的两个messageport属性发送数据
  - 创建一个通信的管道，这个管道有两个端口，每隔段口都可以通过postmessage发送数据，而一个端口只要绑定了onmessage回调方法，就可以接受另外一个端口传过来的数据
  - 红任务

  、、、
  let channel = new MessageChannel();
  let port1 = channel.port1;
  let port2 = hcannel.port2;
  port1.onmessage = function(e) {
  console.log('port1接口到数据',e.data);
  }
  port2.onmessage - function(e){
  console.log('port2接受到数据',e.data)；
  }
  port1.ppostMessage('port1的数据'):
  port2.postMessage('port2的数据');
  let activeTimeFrame = 100/60;
  let deadFrameTime ;
  let pendingCallback;
  let channel = new MesageChanel;
  let timeRemaining =()=>deadFrmaeTime-performance.now();
  channel .por2.onmessage=function(){
  console.log("jieshoudaoport1返回的消息');
  let currentTime = performance.now();
  let didiTimeout=deadFrameTime<=currentTime;
  if(didTimeOut || timeRemianing()>0){
  if(pedingCallback){
  pendingCallback(didTimeout,timeRemianing)
  }
  }
  window.requestIdleCallback = function(callback,option) {
  window.requestAnimationFrame((rafTime)=>{
  console.log(rafTime);
  //后面是否超时的时候使用的
  deadFrameTime = rafTime +activeTimeFrame;
  pendingCallback =callbakc;
  channel.port1.postMessage("hello");
  
  });
  }
  
  、、、

  # 执行阶段
  - reconciliation协调render阶段和commit阶段
  - fiber也是普通js对象
  ```
  let workInProgressRoot = {
  stateNode:root,//fiber对象的dom节点
  props : {
  children:[element];
  },
  //child sibling
  }
  //当前处理的单元
  let nextUnitOfWork = workInProgressRoot；
  const Placement=‘placement’；
  //定义一个工作循环
  function workloop(deadline){
  console.log('开始工作循环');
  while(nextUnitOfWOrk && deadline.timeRemaing()>0){
  nextUnitOfWOrk = perfomUnitOfWork(nextUNitOfWork);
  }
  if(!nextUnitOfWOrk){
  commitRoot();
  }
  }
  //beginwork创建此fiber的真实dom，通过虚拟dom创建fiber树的结构
  function perfomUnitOfWork（workingInProgressFiber){
  for(let key in workingINPrgoressFiber.props){
  if(key!=='children'){
  workingINProgressfiber.stateNode[key]=workingInPorgressFiber.props[key]
  }
  let preivousFiber;
  Array.isArray(workingInProgressFiber.props.children)&&workingINProgress
  let childFiber = {
  type:child.type,
  props:child.props,
  return:workingInProgressFiber,
  effectTag:PLACEMNET<
  nextEffect:null，//下一个副作用
  }
  if(index==0){
  workingInProgressFiber.child=childFiber;
  }else {
  previousFiber.siblling=childFiber;
  }
  previousFiber=childFiber;
  ```
  
  
