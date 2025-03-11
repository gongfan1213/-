Function.prototype.myCall = function(context, ...args) {
    // 如果 context 为 null 或 undefined，默认指向全局对象（浏览器中是 window）
    context = context || window;
    
    // 使用 Symbol 创建一个唯一的属性名，避免与 context 原有属性冲突
    const fnKey = Symbol('fn');
    
    // 将当前函数（this）挂载到 context 上
    context[fnKey] = this;
    
    // 调用函数，并传入参数
    const result = context[fnKey](...args);
    
    // 删除挂载的函数，避免污染 context
    delete context[fnKey];
    
    // 返回函数执行结果
    return result;
};
function greet(message) {
    console.log(`${message}, ${this.name}`);
}

const person = { name: 'Alice' };

greet.myCall(person, 'Hello'); // 输出: Hello, Alice
//手写call，写完之后让我直接挂载函数到context，发生原有属性冲突怎么办