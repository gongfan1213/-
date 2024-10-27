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
