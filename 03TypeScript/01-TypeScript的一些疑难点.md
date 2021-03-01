# TypeScript的一些疑难点

## [interface 和 type 类型的 区别是什么](https://juejin.im/post/5c2723635188252d1d34dc7d)

- 原则就是，如果不清楚什么时候用interface/type，**能用interface实现，就用interface**, 不然就用type
- 相同点：都可以描述一个对象或者函数； 都允许扩展extend
- 不同点：
  - type可以声明基本类型别名，联合类型，元组（什么是元组：数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。），但是interface不行
  - interface可以声明合并，但是type不行。

```ts
/**
 * 用type定义 元组类型
 */
export type Button = Array<{
  index: number, // 按钮索引，用于回调event
  text: string, // 按钮文本
  btnType: ButtonType, // 按钮类型，cancel | default
  style?: TextStyle // 目前只支持font、color {font: 14, color: '#32CB9D'}
}>

/**
 * 用type定义 联合类型
 */
export type status = 'A' | 'B' | 'C';
```
