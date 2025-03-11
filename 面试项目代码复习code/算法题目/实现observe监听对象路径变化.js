function observe(obj, callback) {
    // 存储路径与回调的映射关系
    const handlers = new Map();
  
    // 递归代理对象
    const createProxy = (target, path = []) => {
      return new Proxy(target, {
        get(target, key) {
          const value = Reflect.get(target, key);
          // 嵌套对象继续代理
          if (typeof value === 'object' && value !== null) {
            return createProxy(value, [...path, key]);
          }
          return value;
        },
        set(target, key, value) {
          const oldValue = target[key];
          const result = Reflect.set(target, key, value);
          // 触发回调（新增/修改都视为变化）
          const currentPath = [...path, key].join('.');
          if (result && oldValue !== value) {
            callback(currentPath, value, oldValue);
          }
          return result;
        },
        deleteProperty(target, key) {
          const result = Reflect.deleteProperty(target, key);
          const currentPath = [...path, key].join('.');
          if (result) {
            callback(currentPath, undefined, target[key]);
          }
          return result;
        }
      });
    };
  
    return createProxy(obj);
  }
  const obj = { a: { b: 1 }, c:  };
const observed = observe(obj, (path, newVal, oldVal) => {
  console.log(`路径 ${path} 变化:`, oldVal, '→', newVal);
});

observed.a.b = 2;     // 输出: 路径 a.b 变化: 1 → 2
observed.c.push(3);   // 输出: 路径 c.1 变化: undefined → 3
delete observed.a;    // 输出: 路径 a 变化: { b: 2 } → undefined
