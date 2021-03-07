# Vue2.0 和 Vue3.0 响应式原理区别

## [解析 Vue2.0 和 3.0 的响应式原理和异同(带源码)](https://zhuanlan.zhihu.com/p/125715026)

> Vue2.0 响应式系统的实现

- 基于 Object.defineProperty，不具备监听数组的能力，需要重新定义数组的原型来达到响应式。
- Object.defineProperty 无法检测到对象属性的添加和删除 。
- 由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所有属性必须在 data 对象上存在才能让 Vue 将它转换为响应式。
- 深度监听需要一次性递归，对性能影响比较大。

```js
function defineReactive(target, key, value) {
  //深度监听
  observer(value)

  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      //深度监听
      observer(value)
      if (newValue !== value) {
        value = newValue

        updateView()
      }
    },
  })
}

function observer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }

  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }

  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

// 重新定义数组原型
const oldAddrayProperty = Array.prototype
const arrProto = Object.create(oldAddrayProperty)
;['push', 'pop', 'shift', 'unshift', 'spluce'].forEach(
  methodName =>
    (arrProto[methodName] = function() {
      updateView()
      oldAddrayProperty[methodName].call(this, ...arguments)
    })
)

// 视图更新
function updateView() {
  console.log('视图更新')
}

// 声明要响应式的对象
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京', // 需要深度监听
  },
  nums: [10, 20, 30],
}

// 执行响应式
observer(data)
```

> Vue3.0 响应式系统的实现

- 基于 Proxy 和 Reflect，可以原生监听数组，可以监听对象属性的添加和删除。
- 不需要一次性遍历 data 的属性，可以显著提高性能。
- 因为 Proxy 是 ES6 新增的属性，有些浏览器还不支持,只能兼容到 IE11 。

```js
const proxyData = new Proxy(data, {
  get(target, key, receive) {
    // 只处理本身(非原型)的属性
    const ownKeys = Reflect.ownKeys(target)
    if (ownKeys.includes(key)) {
      console.log('get', key) // 监听
    }
    const result = Reflect.get(target, key, receive)
    return result
  },
  set(target, key, val, reveive) {
    // 重复的数据，不处理
    const oldVal = target[key]
    if (val == oldVal) {
      return true
    }
    const result = Reflect.set(target, key, val, reveive)
    console.log('set', key, val)
    return result
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key)
    console.log('delete property', key)
    console.log('result', result)
    return result
  },
})

// 声明要响应式的对象,Proxy会自动代理
const data = {
  name: 'zhangsan',
  age: 20,
  info: {
    address: '北京', // 需要深度监听
  },
  nums: [10, 20, 30],
}
```

## [vue2.0 reactivity 响应式（双向绑定原理）](https://juejin.cn/post/6844904162786820109)

## [vue3.0 reactivity 响应式（双向绑定原理）](https://www.bilibili.com/video/BV1Rt4y1B7sC?p=1)
