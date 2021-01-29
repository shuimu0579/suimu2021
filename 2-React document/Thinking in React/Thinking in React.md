### 通过UI设计稿 或者 data 数据结构  分析  页面层次，

> a component should ideally only do one thing.
> <br> UI and data models tend to adhere to the same information architecture, which means the work of separating your UI into components is often trivial. Just break it up into components that represent exactly one piece of your data model.

### 创建一个 静态的 页面， data数据写死。

> 就像 Build A Static Version in React，这一步Component已经拆分好了,并且已经组合成了静态页面了。

> At the end of this step, you’ll have a library of reusable components that render your data model.

### 设置 最少的 state ,以 在app里面 够用为原则。

> To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. 

> 怎么确认是否应该设置  state
- Is it passed in from a parent via props? If so, it probably isn’t state.
- Does it remain unchanged over time? If so, it probably isn’t state.
- Can you compute it based on any other state or props in your component? If so, it isn’t state.

### 确定 state 应该 存放在 哪个 Component

> 找到这个Component<br>
Find a common owner component (a single component above all the components that need the state in the hierarchy)<br>
一般这个 Component 是在  all the components that need the state   的上层，也就是这些需要 state 的顶层。

### 在哪里 修改 state, 单项数据流
<br> Add Inverse Data Flow






