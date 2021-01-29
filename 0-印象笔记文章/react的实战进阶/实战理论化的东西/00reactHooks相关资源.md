# React Hooks

## Hooks 官方文档

- [Hooks API 官方文档](https://react.docschina.org/docs/hooks-reference.html)

- [Hooks API](https://www.jianshu.com/p/2a37851d7749)

- https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889

- https://link.zhihu.com/?target=https%3A//reactjs.org/docs/hooks-intro.html

## useState

- 处理状态。useState不帮你处理状态，所以开发者需要自己处理逻辑
- setState 非覆盖式更新状态； 而useState 覆盖式更新状态  比如{ ...obj, count: obj.count + 1 }

```js
import React, { useState } from "react";
function App() {
  const [obj, setObject] = useState({
    count: 0,
    name: "alife"
  });
  return (
    <div className="App">
      Count: {obj.count}
      <button onClick={() => setObject({ ...obj, count: obj.count + 1 })}>+</button>
      <button onClick={() => setObject({ ...obj, count: obj.count - 1 })}>-</button>
    </div>
  );
}
```

## useEffect

- 副作用处理（也就是说 除了处理正常UI渲染展示的，其余的都是副作用），常见的副作用有处理异步操作

```js
import React, { Component } from "react";
class App extends Component {
  state = {
    count: 1
  };
  componentDidMount() {
    const { count } = this.state;
    document.title = "componentDidMount" + count;
    this.timer = setInterval(() => {
      this.setState(({ count }) => ({
        count: count + 1
      }));
    }, 1000);
  }
  componentDidUpdate() {
    const { count } = this.state;
    document.title = "componentDidMount" + count;
  }
  componentWillUnmount() {
    document.title = "componentWillUnmount";
    clearInterval(this.timer);
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        Count:{count}
        <button onClick={() => clearInterval(this.timer)}>clear</button>
      </div>
    );
  }
}
```

## useContext (替代 React Context API 和 props render)

- 减少组件层级

```js
// createContext and useContext
const CurrentUser = React.createContext("xiaoming");
const Notifications = React.createContext("hurry-up");

function HeaderBar() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);
  return (
    <header>
      Welcome back, {user.name}!
      You have {notifications.length} notifications.
    </header>
  );
}
```

## useReducer（mini版的redux版本）

- useReducer 这个 Hooks 在使用上几乎跟 Redux/React-Redux 一模一样，
- 唯一缺少的就是无法使用 redux 提供的中间件。其实中间件不也没事，OneIdientity项目中recovery UI 不也没有用 redux中间件吗

```js
import React, { useReducer } from "react";
const initialState = {
  count: 0
};
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
        -
      </button>
    </>
  );
}
```

## useMemo 和 useCallback 的区别

- [这篇文章讲react Hooks 讲的很好](https://github.com/happylindz/blog/issues/19)

- useCallback 记忆函数   useMemo 记忆组件。
- useCallback 不会执行第一个参数函数，而是将它返回给你；useMemo 会执行第一个参数函数，并将第一个这个参数函数的执行结果返回给你。
- 所以的话，useCallback常用于记忆**事件函数**，useMemo更适合经过函数计算得到一个确定的值。

## useLayoutEffect 的作用, 比如flatList 需要在DOM更新之后，才执行scrollToIndex

- 如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行

## useImperativeHandle 让父组件获取子组件的里面的DOM元素

- 比如flatList这个真实DOM 的ref是在子组件，却要在screen父组件里面调用

```js
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

// Child子组件
function ChildInputComponent(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  return <input type="text" name="child input" ref={inputRef} />;
}

const ChildInput = forwardRef(ChildInputComponent);

// App父组件
function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );
}
```

- 建议useImperativeHandle和forwardRef同时使用，减少暴露给父组件的属性，

```js
import {  useRef,forwardRef,MutableRefObject,useImperativeHandle,Ref} from "react";

//只暴露value、getType、focus给父级
const InputEl = forwardRef((props: {}, ref: Ref<any>): JSX.Element=>{
    const inputEl: MutableRefObject<any> = useRef();

    useImperativeHandle(ref, ()=>({//第一个参数：暴露哪个ref；第二个参数：暴露什么
        value: (inputEl.current as HTMLInputElement).value,
        getType: () => (inputEl.current as HTMLInputElement).type,
        focus: () => (inputEl.current as HTMLInputElement).focus()
    }));

    return(
        <input ref={inputEl} type="text" {...props}/>
    )
})
//暴露整个input节点给父级
const InputEl = forwardRef((props: {}, ref: Ref<any>): JSX.Element=>{
    return(
        <input ref={ref} type="text" {...props}/>
    )
});

//父级
function InputWithFocusButton() {
    const inputEl: MutableRefObject<any> = useRef(null);

    function onButtonClick() {
        console.log('子组件input的对象:', inputEl.current);
        inputEl.current.focus();
    };
    return (
        <>
            <InputEl ref={inputEl} />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}
```

## useRef保存引用值

- ref相当于在rendering过程中保留着唯一的引用， 所有对ref的赋值，拿到的都只是一个最终状态，而不会在每个render之间存在隔离
- 总之，useRef 创建一个引用（类似于Class类组件中的this变量，也是一个引用），就可以有效规避 React Hooks 中 Capture Value 特性