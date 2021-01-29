### What is Map


new Map([iterable])
- 首先iterable这个参数是可选的，
- 然后这里面的参数应该为iterable的，那么普通的Object就不是可遍历的，iterable的参数有String,Array,TypedArray,Map,Set(因为以上这些构造函数的原型对象prototype objects都有@@iterator方法)
- 还有一点就是，这个iterable里面的element 必须是key-value pairs(array with two elements)(比如[[ 1, 'one' ],[ 2, 'two' ]] 这样的类型)
<br>A Map object iterates its elements in insertion order — a for...of loop returns an array of [key, value] for each iteration. 