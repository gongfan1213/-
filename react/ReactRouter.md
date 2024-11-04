# history.pushState
- 无刷新增加历史栈的记录
- pushState(state:Object,title:String,[url:String]):undefined;
- 状态对象,标题目前被忽略，可选的url
- 历史栈是浏览器统一管理的，不属于某个具体的页面，并不存在于页面的内存当中，所以历史栈在刷新页面之后不会丢失，栈中记录的各个state对象也是持久化存储的，pushState的调用会- 引起历史栈的变化，浏览器通常会维护一个用户访问过的历史栈，单击浏览器的前进和后退还有调用window.history,go等方法在历史栈当中移动,url,state两个参数，
# history.replaceState
- 修改当前的历史记录，而不是新建一个
# window.history.go
- 可以加载历史列表当中某个特定具体的页面，用来完成在用户历史记录当中向前或者向后跳转
- history.go仅仅移动栈指针，不会修改栈记录，不会对栈的记录数量造成影响
- history.go和history.pushState的主要区别是，一个不产生历史栈，仅仅控制栈指针在栈内的移动，一个会产生历史栈，history.go相当于浏览器的前进和后退，调用会触发popState事件，history.pushState会清空当前指针位置之上的所有的历史栈，并且入栈一个历史记录作为栈顶，同时移动指针指向它，在history.pushState被调用多次后，单机浏览器的后退按钮，浏览器就会完成历史栈的出栈的操作，事实上，这时候栈的数量并不会改变，单机浏览器的前进和后退的按钮，包括执行histroy.go等操作都仅仅是移动指向栈记录的指针，造成指针位置的改变，浏览器并不会执行出栈，
# window.histroy.forward
- 作为跳转到当前栈所指前一个记录的方法，栈指针向前移动一位，window.history,forWard等同于history.go(1)
# window.location.href
- 会产生一个新的历史记录，将字符串设置到window.location和设置到window.location.href行为是一致的，
# poptstate
- history.pushState和history.replaceState产生的历史栈的记录当中，当移动栈指针或者单击浏览器的前进或者后托按钮的时候会触发popState的时候，可以通过- window.addEeventListener监听该事件
- 部分浏览器对popState的事件实现不一致的，当网页加载完成以后，部分浏览器会触发popState的事件，部分浏览器不会触发popState的事件，当编码的时候对于这种情况，可以使用- - history.state获取状态对象的state,而不是从popState事件对象当中获取state对象
- 如果通过location.href设置hash的值，如location.href='#123',则无论前后设置的值是否相同，都会触发popState事件，当前后两次设置的值相同，只添加一个历史栈
仅在移动栈指针会触发
# 页签机制
- 在浏览器当中，原生页签可以开启多个，即使域名和路径一致的，也可以存在多个页签，在一个页签下，可以容纳一个域名下的多个单页或者多页页面，也可以容纳多个域名的多个页面，
- 好处：用户可以在不同的业务之间快速切换，来获得更好的应用内导航的能力
应用内的页签不同于浏览器的页签，存在很多的限制，不能容纳多个域名，在不适用iframe的方案情况下，通常也不建议在页签内刷新跳转页面，页签的数量也不如浏览器页签可以无限的添加，在内存允许的情况下，
- 页签之间的标志不可以重复
- 页签数量是固定的，有一定的上线的
- 页签需要标志进行标识
- 页签内的页面不能跨域名的（在没有iframe的情况下）
# link
- 提供声明式导航方式，相比直接通过history导航，将其渲染dom元素，具有组件特性，to定义了要导航的具体地址，replace定义了是否替换历史栈的方式进行导航innerRef提供了link内部dom元素的引用，
