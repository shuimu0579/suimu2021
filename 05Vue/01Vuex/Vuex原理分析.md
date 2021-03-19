# Vuex原理分析

- [理解Vuex，看这篇就够了](https://mobilesite.github.io/2016/12/18/vuex-introduction/)

> 先不要去理解什么mapState、mapGetters、mapActions、mapMutations，先理解state、getters、actions、mutations他们之间怎么串联起来

- getters和state的关系，就相当于computed计算属性与data中状态之间的关系，getters和state里面存储的都是状态。
- 调用this.$store.dispatch('increment', payload)可以触发actions里面的方法increment，接着increment触发context.commit，接着触发mutations里面的increment，最终修改state里面的状态state,这样一条基本的调用链条就形成了。
- actions对象里的方法，既可以是同步调用，也可以是异步调用。

```js
// 同步调用
actions: {
  increment (context) {
    context.commit('increment')
  }
}
// 异步调用
actions: {
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

- 需要注意的是：actions里面也是可以dispatch的

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

> 理解了state、getters、actions、mutations他们之间怎么串联起来，接下来就可以来理解mapState、mapGetters、mapActions、mapMutations了。

- 首先mapState、mapGetters、mapActions、mapMutations只是state、getters、actions、mutations对应的封装，并没有什么神秘的，适合工程化。在项目中使用`this.$store.dispatch('increment', payload)` 或者`...mapActions(['increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')` ])`都是可以的,两者选其一就好了。
如果想要理解状态管理的原理，最好还是先理解state、getters、actions、mutations他们之间怎么串联起来。

- mapState、mapGetters是在组件中的computed使用的，mapActions、mapMutations是在methods里面使用的

```js
import { mapState } from 'vuex'
export default {
  // ...
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    }),
    othercomputedState(){

    }
  }
  
}
// 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
computed: {
  ...mapState([
    // 映射 this.count 为 store.state.count
    'count'
  ]),
  othercomputedState(){

  }
}


```

```js
// 如果你想将一个 getter 属性另取一个名字，使用对象形式：
import { mapGetters } from 'vuex'
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters({
      // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    }),
    othercomputedState(){

    }
  }
}

// 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
computed: {
// 使用对象展开运算符将 getter 混入 computed 对象中
  ...mapGetters([
    'doneTodosCount',
    'anotherGetter',
    // ...
  ]),
  othercomputedState(){

  }
}

```

```js
import { mapActions } from 'vuex'
export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    otherMethods(){

    }
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }

}
```

```js
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    otherMethods(){
      
    }
  }
}
```

> 调用commit方法--不仅仅可以用this.$store.dispatch的方式，调用actions里面的commit方法；还可以通过触发事件的方式（比如input事件）

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state,payload) {
      state.count++
    }
  },
  actions: {
    increment (context, payload) {
      context.commit('increment')
    }
  }
})

// 在组件里面 以载荷形式分发
this.$store.dispatch('increment', {
  amount: 10
})
```

```html
// template
<input :value="message" @input="updateMessage">

// script
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}

// store module 里面的 mutations
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

> 单项数据流的闭环：`vue component—-dispatch—->actions—-commit—->mutations—-mutate—->state—-render—->vue component`。从而形成闭环。
