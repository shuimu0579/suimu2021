#React Hook

## 什么是Hook

- [React Hooks](https://juejin.im/post/5be3ea136fb9a049f9121014)
- [这篇文章讲react Hooks 讲的很好](https://github.com/happylindz/blog/issues/19)

> Hook本质上就是一个函数

- 这个函数可以有自己的状态，还可以更新自己的状态

> Hooks解决的痛点有哪些？

- 用 渲染属性（Render Props）和 高阶组件（Higher-Order Components） 来复用 有状态组件 的话，无意义的组件嵌套太多，不利于代码的可读性和可维护性。有了Hooks就不需要 渲染属性 和 高阶组件 了
- 生命周期钩子里面的 逻辑太多太杂了，不符合一个函数只做一件事情的原则。有了Hooks,就可以不用生命周期方法了
- 通过function 函数式编程，就可以不使用有状态组件Class了。既然不需要Class了，那么我们就不需要关注this的绑定了。
- 当无状态组件是运用 function 写成的时候， 由于需求的修改，这个组件必须得有自己的状态state，这时候又需要将function改为Class的形式，就会相当的麻烦。

> Hooks的介绍

- Hooks 是 React16.8才有的新特性，他就是运用函数式编程的思想，做到有状态组件的复用。
- 这样就不需要使用 渲染属性（Render Props）和高阶组件（Higher-Order Components）这样的有状态组件的复用形式，从而也就避免了组件更多层级的嵌套，代码可读性可维护性也更好。

- 只在最顶层调用Hook, 不要在循环、条件、嵌套函数中调用Hook
- 只在React函数中调用Hook,不要在普通的JS函数中调用Hook。
  - 可以在React函数组件中调用Hook
  - 在自定义Hook中调用其他Hook

## 什么是State Hooks

> UseState 是 react 自带的一个Hook函数，他的作用就是用来声明状态变量。

```js
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
```

- useState这个函数接收的参数是我们的状态初始值（initial state）
  - 上面的代码就是： 把状态参数的初始值设为0
- useState返回了一个数组，这个数组的第[0]项是当前当前的状态值，第[1]项是可以改变状态值的方法函数
  - 声明了一个状态变量count，同时提供了一个可以更改当前状态参数的函数setCount

## 什么是Effect Hooks

> 对于一个状态组件来说， UI渲染线程才是主线程，才是主要的工作方式。除此之外的都是副作用。

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

- 状态组件，通常会产生很多的副作用（side effect），比如发起ajax请求获取数据，添加一些监听的注册和取消注册，手动修改dom等等
- 之前都把这些副作用的函数写在生命周期函数钩子里，比如componentDidMount，componentDidUpdate和componentWillUnmount。而现在的useEffect就相当与这些声明周期函数钩子的集合体。它以一抵三。

## 为什么要编写一个自定义的Hooks呢

- 只有这样我们才能把可复用的逻辑抽离出来。
- 其实自定义的Hooks 里面也是由基础的useState 和 useEffect 演变而来的

## Hook是怎么执行的

> React 怎么知道哪个 state 对应哪个 useState？答案是 React 靠的是 Hook 调用的顺序。

```js
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}


// ------------
// 首次渲染
// ------------
useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
useEffect(updateTitle)     // 4. 添加 effect 以更新标题

// -------------
// 二次渲染
// -------------
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
useEffect(persistForm)     // 2. 替换保存 form 的 effect
useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
useEffect(updateTitle)     // 4. 替换更新标题的 effect

// ...
```
> 如果我们将一个 Hook (例如 persistForm effect) 调用放到一个条件语句中，Hook 的调用顺序可能就会发生变化
```js
// 🔴 在条件语句中使用 Hook 违反第一条规则
if (name !== '') {
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });
}

useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)  // 🔴 此 Hook 被忽略！
useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败
```
> 正确的做法是什么呢？
```js
useEffect(function persistForm() {
  // 👍 将条件判断放置在 effect 中
  if (name !== '') {
    localStorage.setItem('formData', name);
  }
});
```


### 为什么在React 中加入 Hook?
> 使用 Hook 其中一个目的就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。

- Hook 允许我们按照代码的用途分离他们， 而不是像生命周期函数那样。

```js
//逻辑混合在一起的方法
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

```js
//使用Hook的方式
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

- 通过跳过 Effect 进行性能优化 

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。在 class 组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决：
```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
在Hook中，如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可
```js
//没有清楚操作的effct
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新

//有清除操作的effect
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅
```

### 怎么编写自定义Hook

> 将React中build-in 的Hook 组合到定制的Hook中。从而在不同组件中复用状态逻辑。

### 如何使用Hook进行数据获取？

- [Hook 进行data数据获取](https://www.robinwieruch.de/react-hooks-fetch-data/)

- useEffect 的性能优化

> 通过跳过 Effect 进行性能优化 
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```
> 怎么让effect 只执行一次? 可以传递一个空数组.
- 如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 [] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, []);
```
