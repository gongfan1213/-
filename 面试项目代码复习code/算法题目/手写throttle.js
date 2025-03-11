function throttle(func, delay) {
    let lastExecTime = 0; // 记录上次执行的时间
    return function (...args) {
        const now = Date.now(); // 获取当前时间
        if (now - lastExecTime >= delay) { // 如果距离上次执行的时间超过 delay
            func.apply(this, args); // 执行函数
            lastExecTime = now; // 更新上次执行时间
        }
    };
}
//限制函数在一定时间内只能执行一次的
function onScroll() {
    console.log('scrolling...');
}
const throttledScroll = throttle(onScroll, 1000);
window.addEventListener('scroll', throttledScroll);
function throttle(func, delay) {
   let timer = null;//定时器
   return function (...args) {
       if (!timer) {
           timer = setTimeout(() => {
               func.apply(this, args);//执行函数
               timer = null;//清除定时器
           }, delay);
       }
   } 
}