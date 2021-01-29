# vue 疑惑汇总

### Vue 中基础组件的编写

- 正常情况下,父组件里面定义的 attr(比如下面的 required,placeholder 等),都会作为基础组件内部根元素上的 props
- 如果不希望组件的根元素继承 attribute, 那么就在对象里面设置 inheritAttrs: false

- 有了 inheritAttrs: false 和 \$attrs，你就可以手动决定这些 attribute 会被赋予哪个元素。

```js

//基础组件内部
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})

// 外围的父组件
<base-input
  v-model="username"
  required
  placeholder="Enter your username"
></base-input>
```

### vue 中自定义全局的属性或者方法

```js
// main.js 里面定义 全局属性globalVariable 和全局方法 axios.js util.js
Vue.prototype.$http = axios
Vue.prototype.$GLOBAL = globalVariable
Vue.prototype.$util = util

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// util.js 里面包含好多方法
let util = {
  setSessionData: function(key, data) {
    try {
      sessionStorage.setItem(key, data)
    } catch (e) {
      console.error('写入session失败！')
    }
  },
}

export { util }

// 既然Vue的原型上挂载了好多的 方法,
// 那么Vue的组件(他们都是Vue的实例)就能继承这些Vue原型上的方法了
```

### 怎么将原生事件绑定到组件上(分为绑定到组件 根元素 还是 非根元素 的方式)

> 如果是将原生事件绑定到自定义组件的**根元素**,那么你可能会需要.native
> .native 的作用

- [vue 中自定义按钮组件为什么要加.native](vue中自定义按钮组件为什么要加.native)

- [将原生事件绑定到组件](https://cn.vuejs.org/v2/guide/components-custom-events.html)

- 如果在自定义的组件里面, 没有定义某一个原生事件(click),
- 那么当在外层调用这个组件的时候, 使用@click 是没用的,这时候就可以在外层调用这个自定义组件的时候,加上.native

> 如果是将原生事件 绑定到自定义组件的**非根元素**,那么你应该需要 \$listeners 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器

```js
// 外围的父组件
<base-input v-on:focus.native="onFocus"></base-input>

// 自定义组件内部
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

### slot-- 子组件作为公共模板,父组件提供个性化内容, 注入到 子组件的

> 先看一个例子, 他其实包含了模板插入和 数据 子传父

```html
<!-- 子组件current-user -->
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>

<!-- 父组件 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

<!-- 上面父组件的等价写法 -->
<current-user slot="default" slot-scope="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

- 在上面的这个例子中,其实包含了两方面的内容:
- 具名插槽(实际上是默认名称 name="default" /<slot name="default" v-bind:user="user"></slot>)
- 和插槽 props(就是 v-slot:default="slotProps", 也就是把子组件的动态属性 user, 传递给父组件用. 这也是数据)
- 而 v-slot 综合了 slot 和 slot-scope 这两个 API.现在用的是 v-slot 这个方法,而废弃了 slot 和 slot-scope

* \<slot></slot> 是写在子组件（子模板里面的）
* \<template v-slot:header> v-slot 是写在父组件里面的

> v-slot:header 具名插槽

```html
<!-- 子组件<base-layout> -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<!-- 父组件 -->
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

> 插槽 props

- 通过在子组件 slot 上面绑定一个 user 属性，这个属性是响应式的，这样父组件通过 slotProps 就能获取到了。

```html
<!-- 子组件current-user -->
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>

<!-- 父组件 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

> 解构插槽 props

```html
<!-- 父组件 -->
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```

> 具名插槽的简写

- 跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header

```html
<!-- 父组件 -->
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 自定义组件的 v-model

- 一般我们的 input 输入框 想要双向绑定的时候， 可以使用 v-modal。 如果我们 自定义的组件 需要双向绑定 v-model 呢？
- 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。model 选项可以用来避免这样的冲突：

```js
Vue.component('base-checkbox', {
  model: {
    // 通过 model 将prop 和 event 改写
    prop: 'checked',
    event: 'change',
  },
  props: {
    // 记得在props里面声明 checked 这个props
    checked: Boolean,
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `,
})
```

### 将原生事件 绑定到 自定义的组件上

- 想要在自定义组件的根元素上 绑定原生事件， 可以下面这样弄

```js
<base-input v-on:focus.native="onFocus"></base-input>
```

- 想要在自定义组件里面 的 子元素上（比如 base-input 组件里面的子元素 input）绑定原生事件, 这时候，父级的 .native 监听器将静默失败。它不会产生任何报错，但是 onFocus 处理函数不会如你预期地被调用。就像下面的 base-input 组件里面的 input 输入框一样，onFocus 处理函数不会如你预期地被调用

```js
// base-input
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>
```

- 为了解决上述的所有问题，Vue 提供了一个 \$listeners 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。
- 有了这个 $listeners 属性，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function() {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
            vm.$emit('input', event.target.value)
          },
        },
      )
    },
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `,
})
```

### .sync 修饰符 （v-on 事件里面） (v-on:update:title 事件的语法糖 )

> 我们可能需要对一个 prop 进行“双向绑定” 父组件和子组件数据（props） 的双向绑定  
> 而不是真的用 v-model

- 在子组件里面这样使用 \$emit

```js
this.$emit('update:title', newTitle)
```

- 这是在父组件里面使用

```html
<text-document v-bind:title.sync="doc.title"></text-document>
<!-- 等价于 -->
<text-document v-bind:title="doc.title" v-on:update:title="doc.title = $event"></text-document>
```

- [.sync 参考例子](https://zhuanlan.zhihu.com/p/78022987)

### vue 里面的依赖注入(provide inject) 与 react 里面的 context API 很相似(Provider Consumer)

### Vue 的 mixin
