
### 有哪些 bulit-in object 是 Inheritence from Function

> Function<br>
Math<br>
Reflect<br>
WebAssemble<br>



### object.property

> #### Object.prototype（对象的原型）    
首先 对象的原型是一个对象。

是对象构造器（the Object constructor）的一个属性（a property）
也是 原型链（prototype chain）的最末端。

一个典型的对象继承属性或者方法，通过 对象原型（a typical object inherits properties (including methods) from Object.prototype）。

> #### Object.prototype.constructor (对象原型构造器)（也就是构造函数）

```javascript
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array; // true

var n = new Number(3);
n.constructor === Number; // true
```

### Object.methods

> #### Object.assign()

这个方法用来复制对象，将一个或者多个source object 复制到  target object 里面，返回的也是这个target object。

> #### Object.create(proto, [propertiesObject])

proto<br/>The object which should be the prototype of the newly-created object.

> #### Object.defineProperty(obj, prop, descriptor) and Object.defineProperties()

这个方法用于直接在对象中 定义或者修改对象的属性，返回的是这个修改后的对象。

<b>descriptor：</b>

>> configurable <br/> the type of this property descriptor <br/> 比如 data descriptor 和 accessor descriptor 可以 相互 change

>> enumerable <br/> 可枚举的

>> value <br/> 属性值

>> writable <br/> property & value 是可以 改变的。

>> get <br/> property is accessed <br/> A function which serves as a getter for the property

>> set <br/> property is accessed <br/> A function which serves as a setter for the property

```javascript
var o = {}; // Creates a new object

// data descriptor

// Example of an object property added
// with defineProperty with a data property descriptor
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
});
// 'a' property exists in the o object and its value is 37



//accessor descriptor

// Example of an object property added
// with defineProperty with an accessor property descriptor
var bValue = 38;
Object.defineProperty(o, 'b', {
  // Using shorthand method names (ES2015 feature).
  // This is equivalent to:
  // get: function() { return bValue; },
  // set: function(newValue) { bValue = newValue; },
  get() { return bValue; },
  set(newValue) { bValue = newValue; },
  enumerable: true,
  configurable: true
});
o.b; // 38
// 'b' property exists in the o object and its value is 38
// The value of o.b is now always identical to bValue,
// unless o.b is redefined
```


> #### Object.freeze()

这个方法可以 freeze obj 里面的 属性和方法<br/>
这种freeze只是 浅冻结  <br/>
那怎么才能达到deep freeze 的目的呢？<br/>
答案就是：递归，自身调用自身，设置好递归终止的条件， 类比于数学归纳法。

```javascript
function deepFreeze(object) {

  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  
  for (let name of propNames) {
    let value = object[name];

    object[name] = value && typeof value === "object" ? 
      deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

var obj2 = {
  internal: {
    a: null
  }
};

deepFreeze(obj2);

obj2.internal.a = 'anotherValue'; // fails silently in non-strict mode
obj2.internal.a; // null
``` 

> #### Object.entries(obj)
将一个obj 转换成一个二维数组

> #### Object.fromEntries()
将一个 key-value pairs 的二维数组 转换成为一个对象。<br/> 这个方法是 Object.entries(obj)的逆过程。

> #### Object.keys()
> #### Object.values()

> #### Object.getOwnPropertyNames()
return an array of all properties.<br/>这个方法可以筛选出enumerable and non-enumerable 的 properties.
<br/>如果仅仅是想筛选出 enumerable 的 properties, 那么可以用for...in... loop 或者 Object.keys()
<br/>而不管是 Object.getOwnPropertyNames 还是 Object.keys, Items on the prototype chain are not listed.

> #### Object.getPrototypeOf(obj)
返回的是obj这个对象的原型。

> #### Object.is()
判断两个值是不是同一个值

> #### Object.isFroen()
判断一个对象是不是frozen

### object.prototype methods

> #### Object.prototype.hasOwnProperty()
 this method does not check for a property in the object's prototype chain.

> #### Object.prototype.isPrototypeOf(obj)
check if obj exists in another object's prototype chain
```javascript
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```
> #### Object.prototype.toString()


> #### Object.prototype.toLocaleString()
```javascript
const date1 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

console.log(date1.toLocaleString('ar-EG'));
// expected output: "٢٠‏/١٢‏/٢٠١٢ ٤:٠٠:٠٠ ص"

const number1 = 123456.789;

console.log(number1.toLocaleString('de-DE'));
// expected output: "123.456,789"
```


