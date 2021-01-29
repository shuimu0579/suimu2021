### 怎么设计虚拟DOM

通过JSX创建的虚拟元素最终会被编译成调用React的createElement方法<br>
由于JSX只是一种语法糖的写法，所以Virtual DOM最终是通过createElement()来创建虚拟元素。<br>

Virtual DOM元素中 有三大虚拟组件，分别是 文本组件，DOM标签组件（也就是咱们在react中写的 div span 之类的，其实是虚拟组件），自定义组件。<br>

### diff 算法详解
> 传统的diff算法

计算一棵树形结构 转换成另一颗树形结构的最少操作， 传统额diff算法就是通过循环递归 对节点一次进行比较，这种算法的复杂度 达到了 O(n3)

React 配合 优化后的 diff 算法，成功的将 O(n3) 复杂度的问题 转换成 O(n) 复杂度的问题。

<b>那么react 的diff 算法 是怎么做到的呢？</b>

- tree diff <br>
对树进行分层比较，两棵树只会对同一层次的节点进行比较。<br>
在开发组件时，保持稳定的DOM结构有助于性能的提升。<br>
我们可以通过css样式中 show/hide 节点，不要真正的移除或添加DOM节点。<br>

- component diff <br>
只要两个组件是不同类型，哪怕它们的结构相似，也会直接删除原组件，并同时创建新组建以及它们的子节点<br>

- element diff <br>
每一个元素都给它们配备一个唯一的key<br>
在这种情况下，如果原节点和现节点的位置相同，只是位置不同的，只需要执行MOVE_EXISTING 方法了，这样引入key就能极大的提升性能了<br>
在其他情况下，就是对元素节点执行INSERT_MARKUP 和 REMOVE_NODE操作了。
