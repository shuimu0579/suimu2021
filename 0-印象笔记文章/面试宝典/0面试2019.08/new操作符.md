# new 操作符

MDN上的解释：
1、一个继承自 Person.prototype 的新对象被创建。

2、使用指定的参数调用构造函数 Person ，并将 this 绑定到新创建的对象。new Person 等同于 new Person()，也就是没有指定参数列表，Person 不带任何参数调用的情况。

3、由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

```js
function person (sex, weight, color){
  this.sex = sex
  this.weight = weight
  this.color = color
}
function newSelf(fn) {
  // 第一步：创建一个新对象
  var obj = {}
  // 新对象继承Person.prototype
  obj.__proto__ = fn.prototype
  return function () {
    // 使用指定的参数调用构造函数 Person ，并将 this 绑定到新创建的对象
    fn.apply(obj,arguments)
    return obj
  }
}
var person2 = newSelf (person)('男', '75kg', 'yellow')
console.log(person2.__proto__ == person.prototype) //true
```