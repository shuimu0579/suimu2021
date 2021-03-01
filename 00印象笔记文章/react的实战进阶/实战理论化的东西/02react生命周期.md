
### 生命周期

- 不管是外部传来的props的改变，还是内部state的改变， 都会触发 componentDidUpdate 方法。

- 在react16.3里面，没有使用了 componentWillMount, componentWillReciveProps 等生命周期方法。而是使用了 getDerivedStateFromProps 和 getSnapshotBeforeUpdate。

> constructor <br>
用于初始化内部状态，很少使用。<br>
唯一可以直接修改state的地方

> getDerivedStateFromProps <br> 
这个生命周期方法 是 react16.3 里面的方法, 但是在 react16.4 用这个方法的时候，会有些问题，参考这个 链接： https://cmichel.io/react-just-got-ugly-with-16-4-update/

```javascript
// This was easy for componentWillReceiveProps:
componentWillReceiveProps(nextProps) {
    // if new value props was received, overwrite state
    // happens f.i. when changing pages
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

//But not so easy with static getDerivedStateFromProps: It’s static and we only receive (props, state) as arguments. To compare props with prevProps we have to save prevProps in state to be able to access it.
constructor(props) {
    super(props);
    this.state = {
      prevProps: props,
      value: props.value,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // comment this "if" and see the component break
    if (props.value !== state.prevProps.value) {
      return {
        prevProps: props,
        value: props.value
      };
    }
  }
```

当state需要从props初始化时使用，尽量不要使用。


> componentDidMount <br>
UI渲染完成后调用<br>
只执行一次<br>
典型场景：获取外部资源

> getSnapshotBeforeUpdate <br>
在页面render之前调用，state已更新<br>
典型场景：获取render之前的DOM状态。

> componentDidUpdate <br>
每次UI更新时被调用<br>
典型场景：页面需要根据props变化，重新获取数据。

> shouldComponentUpdate <br>
决定Virtual DOM是否需要重绘<br>
一般可以不用这个方法，可以由PureComponent自动实现<br>
典型场景就是性能优化。

```javascript
class MyComponent extends React.Component {...}
//使用PureComponent
class MyComponent extends React.PureComponent {...}

//纯组件忽略重新渲染时，不仅会影响它本身，而且会影响它的说有子元素，所以，使用PureComponent的最佳情况就是展示组件，它既没有子组件，也没有依赖应用的全局状态。
```

> componentWillUnmount <br>
典型场景就是 将一些资源释放。

> 代码示例 参考如下：
https://codesandbox.io/s/2043z6r3jj


