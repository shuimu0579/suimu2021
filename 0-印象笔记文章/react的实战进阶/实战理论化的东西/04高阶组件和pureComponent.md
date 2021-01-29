### Component 与 pureComponent 的联系和区别

> pureComponent 里面内置了 shouldComponentUpdate方法

只是有一点需要注意的是：pureComponent 只能进行浅比较。而且这个组件里面的 子组件 也需要是能作为pureComponent（也就是说它的props and state 不能有复杂的数据结构）<br>
React.PureComponent implements it with a shallow prop and state comparison.<br>
如果 传递过来的 props 和自身的 state  的数据结构复杂（也就是嵌套逻辑比较深）的话，用pureComponent就没什么意义了。<br>

> 那么怎么进行在数据结构比较复杂的情况下，进行深比较呢？又能提高性能呢？

在这里我们就可以用到 Immutable.js 来进行深比较了。


### 高阶组件 和 用函数作为子组件 

上面两者都是一种设计模式。

>高阶组件 WarperComponent(PresentComponent)

本质上就是 将一些data 作为props 传入给 被包裹的组件<br>
其中 WarperComponent 只负责 传递 props 给PresentComponent<br>
而PresentComponent 只是负责 展示页面。

```javascript
import React from "react";

export default function withTimer(WrappedComponent) {
  return class extends React.Component {
    state = { time: new Date() };
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        time: new Date()
      });
    }
    render() {
      return <WrappedComponent time={this.state.time} {...this.props} />;
    }
  };
}
```

>函数作为子组件，配合this.props.children

有关于 委托继承 还是 组合 继承的问题， react 官方的 态度就是 我们尽量使用 组合继承 ，而不是 委托继承<br>
那么哪些是委托继承呢？ 比如 Cisco 里面的 InputManager 组件
哪些是组合继承呢？ 比如下面的这个例子：

```javascript
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class AdvancedTabSelector extends PureComponent {
  static propTypes = {
    value: PropTypes.object,
    options: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.func
  };

  static defaultProps = {
    value: null,
    options: [],
    onChange: () => {},
    children: () => {}
  };

  render() {
    const { options, value, onChange } = this.props;
    return (
      <div className="tab-selector">
        <ul>
          {options.map(opt => (
            <li
              key={opt.value}
              className={`tab-item ${
                opt.value === this.props.value ? "selected" : ""
              }`}
              onClick={() => this.props.onChange(opt.value)}
            >
              {opt.name}
            </li>
          ))}
        </ul>
        <br />
        <br />
        {this.props.value && this.props.children(this.props.value)}  //通过 this.props.children(parameter) 就可以做到  组合组件了
      </div>
    );
  }
}

const colors = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Orange", value: "orange" }
];

const animals = [
  { name: "Tiger", value: "tiger" },
  { name: "Elephant", value: "elephant" },
  { name: "Cow", value: "cow" }
];

export class AdvancedTabSelectorSample extends PureComponent {
  state = {
    color: null
  };
  render() {
    return (
      <div>
        <h3>Select color: </h3>
        <AdvancedTabSelector
          options={colors}
          value={this.state.color}
          onChange={c => this.setState({ color: c })}
        >
          {color => (
            <span
              style={{
                display: "inline-block",
                backgroundColor: color,
                width: "40px",
                height: "40px"
              }}
            />
          )}   //这里面就对应着  AdvancedTabSelector组件 里面 的 this.props.children(parameter)了
        </AdvancedTabSelector>
        <br />
        <br />
        <br />
        <h3>Select animal: </h3>
        <AdvancedTabSelector
          options={animals}
          value={this.state.animal}
          onChange={c => this.setState({ animal: c })}
        >
          {animal => (
            <img width="100px" src={require(`../../images/${animal}.png`)} />
          )}
        </AdvancedTabSelector>
      </div>
    );
  }
}
```