# 得到 App ReactNative 演化之路

- [得到 App 混合开发实践](https://juejin.im/post/5e20483bf265da3e3a53767b)

## 怎么使用 store

> 类似于 众安银行 App 中
> 用非继承类<类里面使用 mobx>来存储 store 类, 每个页面需要用到 store 的时候，就 new 一个类，这样一个 store 就对应着一个页面
> 页面之间的数据传递，就通过 navagitor 导航器 的 parmas 对象 和回调函数来进行

- 去掉状态追踪， 最精简的将状态抽离到一个类中进行管理

```js
class MyStore {
  public name: string = '';
  public updateName(name: string): void {
    this.name = name;
  }
}
const store = Vue.observable(new MyStore());
```

- 单一组件树的代表就是 vuex/redux； 而 mobx 却能做到
  实现了多状态的 Store 方案：一个页面对应一个 Store，Store 和页面的生命周期保持一致的方案。逻辑跟展现分离，页面间又不耦合，最重要的是简单；

## 使用数据缓存提升页面体验优化（数据缓存 驱动页面 立即渲染）

- 我们知道 View=fn(State)，在 Store 方案中我们已经将页面的状态都放到 store 中了，只需要缓存 Store 就可以了
- 那么在什么时候缓存，在什么时候还原？ 就是在页面销毁时，我们序列化 Store，等页面在打开，还原 Store 。
