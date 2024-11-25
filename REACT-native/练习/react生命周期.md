在 React 中，生命周期方法可以分为几个主要阶段，适用于类组件。以下是一些关键的生命周期方法及其对应的阶段：

### 1. 挂载阶段 (Mounting)
当组件被创建并插入到 DOM 中时，执行以下生命周期方法：
- `constructor(props)`: 构造函数，用于初始化状态和绑定方法。
- `static getDerivedStateFromProps(nextProps, prevState)`: 在渲染之前调用，可以根据新的 props 更新 state。
- `render()`: 渲染组件的 UI。
- `componentDidMount()`: 组件已被渲染到 DOM 中，可以在此处进行数据获取、订阅等操作。

### 2. 更新阶段 (Updating)
当组件的 props 或 state 发生变化时，执行以下生命周期方法：
- `static getDerivedStateFromProps(nextProps, prevState)`: 同样在更新阶段调用，可以根据新的 props 更新 state。
- `shouldComponentUpdate(nextProps, nextState)`: 返回一个布尔值，决定组件是否需要重新渲染。可以用于优化性能。
- `render()`: 再次渲染组件的 UI。
- `getSnapshotBeforeUpdate(prevProps, prevState)`: 在更新前调用，可以获取 DOM 状态（如滚动位置）。
- `componentDidUpdate(prevProps, prevState, snapshot)`: 组件更新后调用，可以在此处进行网络请求等操作。

### 3. 卸载阶段 (Unmounting)
当组件从 DOM 中删除时，执行以下生命周期方法：
- `componentWillUnmount()`: 在组件卸载前调用，可以进行清理工作，如取消订阅、清除定时器等。

### 4. 错误处理阶段 (Error Handling)
用于捕获错误：
- `static getDerivedStateFromError(error)`: 当子组件抛出错误时调用，可以通过更新 state 来渲染备用 UI。
- `componentDidCatch(error, info)`: 捕获错误并进行日志记录或其他处理。

### 使用 Hooks 的函数组件
在函数组件中，React 使用 Hooks 来管理组件的生命周期，主要有：
- `useEffect(() => { ... }, [dependencies])`: 相当于 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount`，可以在此处进行副作用操作，如数据获取和订阅。

了解这些生命周期方法可以帮助你更好地管理组件状态和副作用。
