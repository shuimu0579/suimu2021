# TypeScript基础概念

-[TypeScript入门教程(这篇文章写的很好)](https://ts.xcatliu.com/advanced/class-and-interfaces)

-[JS+TS 混合项目  ESLint 配置](https://juejin.im/post/5dccc9b8e51d4510840165e2)

## enum 类型的定义

> 枚举类型是一组有名字的常量集合。

- 比如张三和李四，我想要获取他们的电话号码，只需要知道 张三和李四 的名字就可以了，而不需要去 硬编码 他们的 电话号码。
- 而且 电话号码 是容易变化的，人名是不容易变化的。 这样的话我们的代码中就可以用张三和李四来取得其电话号码，哪怕电话号码变了，代码也不需要修改。只需要修改 enum 枚举类型 里面的电话号码。

> 枚举类型用于取值被限定在一定范围内的场景。比如一周只有七天

```js
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

//上面的例子会被变异成为
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```

> 我们可以给枚举项手动赋值

- 手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1

```js
enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
console.log(Days["Tue"] === 2.5); // true
console.log(Days["Sat"] === 6.5); // true
```

> 常数项 和 计算所得项

- 枚举项又两种类型： 常数项 和 计算所得项
- 下面例子中"red".length是一个计算所得项。 如果在这个计算所得项后面是未手动赋值的项，那么这个 未手动赋值项 就会因为无法获得初始值而报错。

```js
enum Color {Red = "red".length, Green, Blue};

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

> 常数枚举

- 常数枚举是使用 const enum 定义的 枚举类型
- 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

```js
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// 上面例子的编译结果就是：
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 如果包含了计算成员，则会在编译阶段报错
const enum Color {Red, Green, Blue = "blue".length};

// index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
```

> 枚举相关案例

```js
// 在这里定义
export enum status {
  NORMAL= 1,
  FOCUS= 2
}

// 在这里运用
export default class QQQ extends React.PureComponent<Props, State> {
  static defaultProps = {
    aaa: status.NORMAL,
    bbb: theme.LIGHT
  }
}
```

## interface接口的概念

> interface 可以定义对象

```ts
interface StringArray {
    [index: number]: string
}
let chars: StringArray = ['a', 'b']
```

> interface 可以定义函数

```ts
interface Lib {
    (): void;
    version: string;
    doSomething(): void;
}

function getLib() {
    let lib = (() => {}) as Lib
    lib.version = '1.0.0'
    lib.doSomething = () => {}
    return lib;
}
let lib1 = getLib()
lib1()
let lib2 = getLib()
lib2.doSomething()
```

> interface 可以定义类（未完待续。。。）

## 类的基础概念

> Interfaces （不同类之间 公有的属性或者方法，可以抽象成一个接口）

- interface 接口定义了 参数的类型

```ts
interface CGRectMakeType {
  x: number
  y: number
  width: number
  height: number
}

export interface HHHProps {
  EEE?: CGRectMakeType,
  source?: string | { uri: string }
  containerStyle?: StyleProp<ViewStyle> // 整个容器的style
  FFF?: StyleProp<ViewStyle> // 动画容器的View
  BBB?: any // 动画组件的属性 具体看 https://github.com/react-native-community/lottie-react-native/blob/master/docs/api.md
}

export default class GGG extends React.PureComponent<HHHProps, HHHState> {
  static defaultProps = {
  }
  constructor (props: HHHProps) {
    super(props)
  }
}
```

> Classes

- Classes 定义了一件事物的抽象特点，包含了属性和方法。可以通过new生成类的实例对象。

```ts
export default class GGG extends React.PureComponent<HHHProps, HHHState> {
}
```

> Abstract Class（抽象类）

- Abstract Class 是供其他类 继承的 **基类**， 抽象类不允许被 new 实例化。抽象类中的抽象方法必须在子类中被实现。

> static 静态方法 和 静态属性

- ES7里面可以使用static定义一个静态属性，

```ts
export default class AAA extends React.Component<Props> {
  static navigationOptions = {  //
    header: null
  }
}
```

- 通过static修饰符修饰的方法 被称为 静态方法

> Classes 中有三种访问修饰符 public、private 和 protected

- 他们都是定义 属性和方法 的可访问性的
- public 在任何地方都能被访问到
- private 不能在他声明的类的外部访问
- 和 private 类似，区别就是它在子类中也是允许被访问的

```js
export default class BBB extends React.Component<BaseProps, BaseState> {
  static defaultProps = {
  }
  constructor (props: BaseProps) {
    super(props)
  }
  public emailInput: any
  private myScreen: any
}
```

> static 与 private， protected 的区别

- static new实例化的对象不可调用该属性和方法, 只有**类本身**及其**子类**可以调用该属性和方法
- private 只能在**类本身**内部使用，new实例化的对象和子类都不能使用。
- protected 只能在**类本身**以及**子类内部 非static方法**使用，new实例化的对象不能使用。
  - 与static类似，protected在实际工作中使用较少，而static运用较多

## 类与接口的相互继承

> ts中接口与类的区别

四种实现方式：

- class extends class
- interface extends interface
- interface extends class 接口继承类
- class implements interface 类实现接口

[ts中接口与类的区别](https://segmentfault.com/q/1010000005648974)

- class 与 interface 的区别:接口申明成员方法，但是不做实现；而类声明并实现方法。

- 在ts中， interface还可以定义变量。

> 类实现(implements)接口：

- 不同的类（A和B）之间有一些共同的特性，这是就可以把不同的特性提取成接口（interface-C）

```js
interface Alarm {
    alert();
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```

- 同一个类（A）可以实现不同的接口（interface-C、interface-D）

```js
interface Alarm {
    alert();
}

interface Light {
    lightOn();
    lightOff();
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

> 接口继承(extends)接口：

```js
interface Alarm {
    alert();
}

interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
```

> 接口继承(extends)类：

```js
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 泛型

> 在定义函数、接口、或者类的时候，不预先指定具体的类型，而是在使用的时候再指定类型的一种特性。

> 我发现最终泛型都是用来定义**函数**的输入和输出的

- 在下面的例子中，我们在函数名后添加<T>, 其中T用来指代任意输出的类型。在后面的输入 value: T 和输出 Array<T> 中即可使用了

```js
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

> 多个类型参数

- 定义泛型的时候，可以一次定义多个类型参数

```js
// 注意这里面的输入是  (tuple: [T, U]) 输出是 [U, T]， 刚好调转过来了
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

> 泛型约束

- 下面代码中，泛型 T 不一定包含属性 length，所以编译的时候报错了

```js
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

- 下面代码中，使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性

```js
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

- 下面代码中，多个类型参数可以相互约束， 泛型T继承于U

```js
// 输入的是(target: T, source: U) 返回的是T
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
```

> 泛型接口

```js
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

// => 等价于 下面

interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

> 泛型类

```js
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

## 相关案例

> 综合案例

```ts
import * as React from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native'
import AAA from 'lottie-react-native'

// 常用动画
export enum LottieAnimationType {
  GCTakeOffHat = require('@base/theme/lottieJson/GCTakeOffHat.json'),
  GCShakePen = require('@base/theme/lottieJson/GCShakePen.json'),
  GCRecordBook = require('@base/theme/lottieJson/GCRecordBook.json')
}

export function III (x: number,y: number,width: number,height: number) {
  return { x: x,y: y,width: width,height: height }
}
interface CGRectMakeType {
  x: number
  y: number
  width: number
  height: number
}

export interface HHHProps {
  EEE?: CGRectMakeType,
  source?: string | { uri: string }
  containerStyle?: StyleProp<ViewStyle> // 整个容器的style
  FFF?: StyleProp<ViewStyle> // 动画容器的View
  BBB?: any // 动画组件的属性 具体看 https://github.com/react-native-community/lottie-react-native/blob/master/docs/api.md
}
interface HHHState {
}

export default class GGG extends React.PureComponent<HHHProps, HHHState> {
  static defaultProps = {
  }
  constructor (props: HHHProps) {
    super(props)
  }

  render () {
    let CCC = this.props.EEE ? { width: this.props.EEE.width,height: this.props.EEE.height } : {}
    let DDD = this.props.EEE ? { top: this.props.EEE.y,left: this.props.EEE.x } : {}
    return (
      <View style={[{ position: 'absolute' },this.props.containerStyle,DDD]}>
        <AAA {...this.props.BBB} source={this.props.source} style={[this.props.FFF,CCC]}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})
```
