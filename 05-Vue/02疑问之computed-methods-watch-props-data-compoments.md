# computed/methods/watch props/data components

```js
export default {
  components: {},

  props: {},
  data() {},

  created() {},
  mounted() {},
  beforeDestroy() {},

  computed: {},
  watch: {},
  methods: {},
}
```

## [compute 与 watch 的区别](https://juejin.im/post/5c9990d6f265da60ea146d21)

- compute 不是一个方法，他是一个计算**属性**，
  - 如果 某一个中间数据 依赖 其他的初始数据，那么就用 其他的初始数据 获得这个 中间数据

```html
<!-- 动态属性 nodeContainer  -->
<div ref="node" class="table" :style="nodeContainer" @click.stop="tableChoose(index)"></div>
```

```js
// 动态属性nodeContainer
computed: {
    // 节点容器样式
    nodeContainer: {
        get() {
            return {
                top: this.node.top,
                left: this.node.left,
            }
        }
    },
},
```

- watch 监听某个数据的变化，然后根据数据变化来进行回调(所以 watch 里面一般都跟着一个函数,在调用这个函数的过程中,达到计算属性难以达到的效果)。也就是这个数据变了我会进行一些什么操作。
  - watch 既可以监听 data 里面**动态数据(类似于局部的 state)**的变化，又可以监听 computed 里面**动态属性**的变化

```html
<!-- :visible -->
<el-dialog class="dialogCls" :title="title" :visible.sync="showDialog" width="25%" center @close="no"> </el-dialog>
```

```js
// visible
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(newval) {
      this.showDialog = newval
    },
  },
}
```

- [watch 高级用法](https://juejin.im/post/5ae91fa76fb9a07aa7677543)
  - watch 中 handle 方法 和 immediate 属性 和 deep 属性

## [compute 与 method 的区别](https://vuejs.org/v2/guide/computed.html)

- compute 是用初始属性 来计算 中间属性
  - 只有依赖的原始属性改变了，才会重新计算，有缓存机制，会节省性能
- methods 就是普通的 function 域
  - methods 每次都会调用，性能开销较大

```js
//template
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

//conputed
computed: {
  // a computed getter
  reversedMessage: function () {
    // `this` points to the vm instance
    return this.message.split('').reverse().join('')
  }
}
```

```js
//template
<p>Reversed message: "{{ reverseMessage() }}"</p>

// methods
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

## computed && getter && setter

- computed 默认提供 getter 方法。也就是说不用写 get, 默认也会提供 getter 方法

```js
// 方式一
computed: {
  // a computed getter
  reversedMessage: function () {
    // `this` points to the vm instance
    return this.message.split('').reverse().join('')
  }
}

// 方式二
computed: {
    // 节点容器样式
    nodeContainer: {
        get() {
            return {
                top: this.node.top,
                left: this.node.left,
            }
        }
    },
}

// 方式三
computed: {
  getRangData () {
    // 控制表格搜索和分页展示
    return this.searchData().slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    )
  }
}
```

- computed setter 方法
- [getter 和 setter 的一些思考，这篇讲的挺好的](https://www.jianshu.com/p/56f337688d6b)

```js
<template>
    <div id="demo">
         <p> {{ fullName }} </p>
         <input type="text" v-model="fullName">
         <input type="text" v-model="firstName">
         <input type="text" v-model="lastName">
    </div>
</template>

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'zhang',
    lastName: 'san'
  },
  computed: {
    fullName: {
      //getter 方法
        get(){
            console.log('computed getter...')
            return this.firstName + ' ' + this.lastName
        }，
   //setter 方法
        set(newValue){
            console.log('computed setter...')
            var names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
            return this.firstName + ' ' + this.lastName
        }
    }
  },
  updated () {
     console.log('updated')
  }
})

// console.log('computed setter...')
// console.log('computed getter...')
// console.log('updated')
```

- 分析：
- input 是直接绑 v-model="fullName"，如果我们这里直接修改了 fullName 的值，那么就会触发 setter，同时也会触发 getter 以及 updated 函数。顺序是 setter->getter->updated

```js
set(newValue){
    console.log('computed setter...')
    // var names = newValue.split(' ')
    //  this.firstName = names[0]
  //  this.lastName = names[names.length - 1]
  return this.firstName + ' ' + this.lastName
}

//console.log('computed setter...')
//console.log('updated')
```

- 分析：
- 并不是 setter 触发了就会触发 getter, setter 和 getter 是相互独立的。
- 在这里面之所以会触发 getter, 是因为在 setter 里面修改了 this.firstName 和 this.lastName 。如果没修改 this.firstName 和 this.lastName，是不会调用 getter 方法的

## [vue props 与 data 的联系和区别](https://dev.to/proticm/how-to-vue---props-vs-data-o41)

- props 与 data 的相同点：都是 reactive 的，vue will handle update for us

- props 与 data 的不同点：
  - props 是父传子，**I expect to get these genes from my parent.**
  - data 是自己这个组件的 pravite memory. **my own specific genes I've received when I was born**

## components 注册子组件

- 在 script 里面注册，在 template 里面运用

```js
<template>
  <Design
          ref="design"
          v-show="initConfig"
          :firstInit="firstInit"
          :isClearData="isClearData"
          :peid="eid"
          :frwtype="configForm.frwtype"
          :mid="configForm.plan"
          @handleBack="handleBack"
  ></Design>
</template>


<script>
  import Design from "./Design"

  export default {
    components: {
        ConnTestDialog,
        CommDialog,
        Design
    }
  }
</script>
```
