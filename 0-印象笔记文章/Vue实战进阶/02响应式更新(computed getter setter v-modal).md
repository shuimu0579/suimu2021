### computed getter 和 setter 的一些思考

> [getter/setter/v-modal/响应式更新]（https://www.jianshu.com/p/56f337688d6b）

> computed 计算和改变的是(运用 getter 和 setter) 响应式数据

> computed 中的值 是否变化 依赖的是响应式数据

### computed 计算属性 与 watch 侦听器的 区别

> 都是用于侦听数据变化。

> 都是用于修改 响应式数据，即:selectedKeys="selectedKeys" 这样的响应式数据

> computed 计算属性

- 减少模板中计算逻辑
- 数据缓存（响应式数据没有改变时，就不会重新调用计算属性）
- computed 依赖于固定的数据类型（响应式数据），所以当数据类型不是响应式数据类型的时候，我们在 computed 里面是无法计算这种响应式数据类型的。

> watch 侦听器

- 更加灵活，通用
- watch 中可以执行任何逻辑如函数节流，Ajax 异步获取数据，甚至 DOM 操作

### v-modal 响应式更新的原理

> [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

> Object.defineProperty 中 getter 和 setter 方法来实现的。
