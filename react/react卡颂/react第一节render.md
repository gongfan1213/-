该网页主要围绕React中Fiber节点创建和Fiber树构建展开，详细介绍了render阶段的工作流程，具体内容如下：
1. **render阶段入口**：render阶段始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用，二者分别对应同步更新和异步更新。这两个方法内部会调用`workLoopSync`或`workLoopConcurrent`方法。
2. **核心工作方法**
    - `workLoopSync`：通过`while`循环持续调用`performUnitOfWork(workInProgress)`，直至`workInProgress`为`null`。
    - `workLoopConcurrent`：与`workLoopSync`类似，但会在循环条件中调用`shouldYield`。若浏览器帧无剩余时间，`shouldYield`会中止循环，待浏览器有空闲时间后继续遍历。
    - `performUnitOfWork`：负责创建下一个Fiber节点并赋值给`workInProgress`，将其与已创建的Fiber节点连接成Fiber树。该方法的工作分为“递”和“归”两个阶段。
3. **“递”阶段**：从`rootFiber`开始向下深度优先遍历，为每个遍历到的Fiber节点调用`beginWork`方法，该方法会根据传入的Fiber节点创建子Fiber节点并连接它们，直到遍历到叶子节点时进入“归”阶段。
4. **“归”阶段**：调用`completeWork`处理Fiber节点。若当前Fiber节点存在兄弟Fiber节点（`fiber.sibling!== null`），则进入兄弟Fiber的“递”阶段；若不存在兄弟Fiber节点，则进入父级Fiber的“归”阶段。“递”和“归”交错执行，直至回到`rootFiber`，render阶段结束。
5. **示例**：以`function App() { return (<div>i am <span>KaSong</span></div>); }`为例，render阶段依次执行`rootFiber beginWork`、`App Fiber beginWork`等一系列`beginWork`和`completeWork`方法，由于性能优化，只有单一文本子节点的Fiber（如“KaSong”对应的Fiber）不会执行`beginWork`和`completeWork`。
6. **递归版本示例**：`performUnitOfWork`的递归版本代码大致为在函数内部，先执行`beginWork`相关操作，若有子节点则递归调用`performUnitOfWork(fiber.child)`，再执行`completeWork`相关操作，若有兄弟节点则递归调用`performUnitOfWork(fiber.sibling)`。
7. **后续内容预告**：接下来的章节将详细讲解`beginWork`和`completeWork`的具体工作。同时提供了参考资料，方便读者进一步深入学习。 
