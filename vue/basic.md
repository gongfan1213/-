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

