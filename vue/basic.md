# vue组件间通信方式
props,emit,$attrs,
$parent,$root,
ref,eventBus,vuex 
1.父子组件之间的通信
1.props,2.$emit 3.$attrs 4.$parent 5.$root 6.ref 7.eventBus 8.vuex
2.兄弟组件之间的通信
1.parent 2.root 3.eventBus 4.vuex 
3.跨层级组件的通信传递
1.eventBus,2vuex,3.provide/inject
### attrs:
在 Vue 中，`attrs` 是一个用于处理父组件传递给子组件的属性的特殊对象。它通常与 `v-bind` 指令一起使用，用于动态绑定属性。

### 使用场景
`attrs` 主要用于以下场景：

1. **传递未被声明的 props**：
   当你在子组件中希望接收并使用父组件传递的属性，但不希望在子组件中为每个属性都声明 props 时，`attrs` 提供了一个方便的方法。

2. **实现高阶组件**：
   在高阶组件中，你可能希望将一些属性转发给子组件，这时可以通过 `attrs` 来实现。

### 示例

假设有一个父组件和一个子组件，父组件传递了一些属性给子组件。

#### 父组件

```vue
<template>
  <ChildComponent id="child1" class="child" style="color: red;" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent }
};
</script>
```

#### 子组件

```vue
<template>
  <div v-bind="attrs"></div>
</template>

<script>
export default {
  inheritAttrs: false, // 允许手动处理 attrs
  computed: {
    attrs() {
      return this.$attrs; // 访问父组件传递的属性
    }
  }
};
</script>
```

### 说明

- `inheritAttrs: false`：这是一个选项，告诉 Vue 不要自动将父组件的属性绑定到子组件的根元素。这使得你可以手动控制这些属性的绑定。
- `this.$attrs`：在子组件中可以通过 `this.$attrs` 访问到所有未被声明的 props 和其他属性。

### 总结

使用 `attrs` 可以帮助你更灵活地处理组件间的属性传递，尤其是在构建可重用的组件时非常有用。
# v-for和v-if的优先级
vue2：v-for> v-if 
vue3: v-if>v-for 
vue2:v-for>v-if 
vue3:v-if>v-for 
# 3.组件的生命周期以及每个生命周期应该做什么事情？
beforeCreate组件实例被创建之初
created:组件实例已经被创建
beforeMount:组件挂载之前
mounted:组件挂载之后
beforeUpdate:组件的数据发生变化，在整正更新之前
updated：数据更新以后
beforeDestory:组件销毁之前
Destoryed:组件销毁之后
activated：keep-alive组件被激活的时候
deactiviated:keep-alive停止使用
errorCaptured:错误监听,vue.config.errorHandler
renderTracked,renderTriggered,serverPrefetch
在Vue.js开发中，处理错误和调试渲染过程是非常重要的。Vue.js提供了多种钩子和配置项来帮助开发者捕获错误、监听渲染过程以及处理服务端预取。以下是对`errorCaptured`、`vue.config.errorHandler`、`renderTracked`、`renderTriggered`和`serverPrefetch`的详细介绍：

### `errorCaptured` (Vue 2 和 Vue 3)

`errorCaptured`是一个组件级的钩子，用于捕获该组件及其子组件中的错误。它允许你在错误发生时执行一些自定义逻辑。

**用法：**
```javascript
export default {
  errorCaptured(err, vm, info) {
    // 处理错误
    console.error(err);
    // 返回 false 以阻止错误进一步传播
    return false;
  }
};
```

**参数：**
- `err`: 错误对象
- `vm`: 发生错误的组件实例
- `info`: 一个字符串，提供错误来源的上下文信息

### `vue.config.errorHandler` (Vue 2 和 Vue 3)

`vue.config.errorHandler`是一个全局配置项，用于全局捕获Vue实例中的错误。它适用于整个应用，而不仅仅是单个组件。

**用法：**
```javascript
Vue.config.errorHandler = function (err, vm, info) {
  // 处理错误
  console.error(`Error: ${err.toString()}\nInfo: ${info}`);
};
```

**参数：**
- `err`: 错误对象
- `vm`: 发生错误的Vue实例
- `info`: 一个字符串，提供错误来源的上下文信息

### `renderTracked` (Vue 3)

`renderTracked`是Vue 3中的一个调试钩子，用于在组件的响应式依赖被追踪时触发。这对于调试组件的响应式依赖非常有用。

**用法：**
```javascript
export default {
  renderTracked(e) {
    console.log('renderTracked:', e);
  }
};
```

**参数：**
- `e`: 追踪事件对象，包含以下属性：
  - `target`: 目标对象
  - `key`: 被追踪的属性
  - `type`: 追踪类型（'get'）

### `renderTriggered` (Vue 3)

`renderTriggered`是Vue 3中的一个调试钩子，用于在组件的响应式依赖被触发时触发。这对于调试组件的重新渲染原因非常有用。

**用法：**
```javascript
export default {
  renderTriggered(e) {
    console.log('renderTriggered:', e);
  }
};
```

**参数：**
- `e`: 触发事件对象，包含以下属性：
  - `target`: 目标对象
  - `key`: 被触发的属性
  - `type`: 触发类型（'set', 'add', 'delete'）

### `serverPrefetch` (Vue 2.6+ 和 Vue 3)

`serverPrefetch`是一个用于服务器端渲染（SSR）的钩子，它允许你在组件实例化之前预取数据。这个钩子在服务端渲染时会自动调用，并且返回一个Promise。

**用法：**
```javascript
export default {
  async serverPrefetch() {
    this.data = await fetchData();
  }
};
```

**注意：**
- `serverPrefetch`返回的Promise会被Vue SSR引擎等待，直到所有Promise都解析完毕。
- 该钩子在客户端渲染时不会被调用。

### 总结

- **`errorCaptured`**: 组件级错误捕获钩子，用于捕获组件及其子组件中的错误。
- **`vue.config.errorHandler`**: 全局错误处理器，用于捕获整个应用中的错误。
- **`renderTracked`**: Vue 3中的调试钩子，用于在响应式依赖被追踪时触发。
- **`renderTriggered`**: Vue 3中的调试钩子，用于在响应式依赖被触发时触发。
- **`serverPrefetch`**: 用于服务器端渲染的钩子，允许在组件实例化之前预取数据。
# vue数据响应式原理
v-bind: v-on: value绑定，绑定对应的事件监听
function set(target:Array<any> | Object,key:any,value:any):any {
    if(Array.isArray(target)&&isValidArrayIndex(key)) {
        target.length = Math.max(target.length ,key);
        target.splice(key,1,val)
        return val 
    }
    //对象如果是该属性原来已经存在于对象当中，则直接更新
    if(key in target &&!(key in Object.prototype)){
        target[key]=value;
        return val;
    }
    //vue给响应式对象比如data当中定义了对象，都添加了一个_ob_属性
    //如果一个对象都有这个_ob_的属性，那么就说明这个对象是响应式对象，修改对象已有的属性的时候就会触发页面的渲染
    //非data里的定义的就不是响应式对象
    const ob = (target:any)._ob_ 
    if(target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV!== 'production' && warn(
            `Avoid adding reactive properties to a Vue instance or its root $data ` +
            `at runtime - declare it upfront in the data option.`
        )
        return val;

    }
    //是响应式对象，进行依赖的收集
    defineReactive(ob.value,key,val)
    //触发更新视图
    ob.dep.notify()
    return val;


}
数据驱动视图，将视图和数据进行分离，通过数据的变化来驱动视图的更新
在vue当中，数据通常是存储在组件的data属性当中，当数据发生变化的时候，vue会自动检测到这些变化，并且触发响应的更新函数来更新视图。
观察者模式实现的
vue会对data属性当中每一个属性创建一个观察者对象，当属性发生变化的时候，会通知观察者对象，观察者对象会触发更新函数来更新视图。
在更新视图的时候，vue会使用虚拟dom技术来提高性能，虚拟dom是一个轻量级的javascript对象，表示实际的dom结构，当需要更新视图的时候，vue会比较虚拟dom和实际的dom结构，并且只更新发生变化的部分，从而提高性能
数据驱动视图的机制使得开发者可以专注于业务的逻辑的开发，不需要过多关注数据和视图的手动同步，
Object.defineProperty允许你定义或者修改对象上的一个属性，并且可以指定该属性的访问器方法,getter和setter当属性被读取或者设置的时候，响应的getter和setter就会被调用
在vue当中，模板会被编译成为渲染函数，也就是我们响应式当中的副作用函数，数据变化的时候，就会重新执行依赖相关的渲染函数，实现视图的更新
1.vue2的响应式系统
在vue2当中，响应式系统基于Object.defineProperty来实现的，对于每一个响应式数据对象
vue都会递归遍历该对象的所有属性，并且使用Object.defineProperty来定义这些属性的getter和setter，当属性被访问或者修改的时候，就会触发对应的getter和setter，从而实现数据的响应式，这些方法内部会记录依赖关系，并且在数据变化的时候通知观察者更新视图
数据观测：
当vue实例创建的时候，他会遍历data对象的所有的属性，并且使用Obejct.defineProperty将每个属性转换成为响应式的这个过程是由Observer来完成的
依赖收集：
当模板渲染或者计算属性计算的时候，vue会追踪那些数据被访问了，这通知Dep类和Watcher类来完成，Watcher会在读取数据的时候自身添加到数据的依赖列表当中
数据变更通知：当数据修改的时候，对应的watcher会收到通知并触发视图的更新
vue3的响应式原理：
vue3当中，响应式数据不再是直接修改原生对象，而是通过reactive函数包装后的代理对象，这个代理对象使用proxy创建的，可以拦截所有的读取和写入的操作
读取操作的追踪：当访问响应式数据的属性的，时候，rpxoy的get方法会被调用，vue的响应式系统会记录下这次读取操作，并且将其于当前的副作用函数effect关联起来
写入操作的追踪：当修改响应式数据的属性的时候，proxy的set方法会被调用,vue的响应式系统会检测那些副作用函数依赖这个属性，并标记他们需要更新
触发更新：
当执行到被标记为需要更新的副作用函数的时候，vue的调度器会确保他们重新执行，从而触发视图的更新，这个过程通常是异步的，来提高性能
