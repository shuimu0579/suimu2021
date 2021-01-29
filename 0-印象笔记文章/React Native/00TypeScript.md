# TypeScript

### TypeScript with React

> [TS静态类型检查](https://zh-hans.reactjs.org/docs/static-type-checking.html)

> [TS文档之基本类型](https://www.typescriptlang.org/docs/handbook/basic-types.html)

boolean

```ts
let isDone: boolean = false;
```

number

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

string

```ts
let color: string = "blue";

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }. I'll be ${ age + 1 } years old next month.`;
```

Array

```ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

object

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

Tuple类型

```ts
//Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

enum 枚举类型

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log(colorName); // Displays 'Green' as its value is 2 above
```

any

```ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

let list: any[] = [1, true, "free"];

list[1] = 100;
```

void
<br/>You may commonly see this as the return type of functions that do not return a value

```ts
function warnUser(): void {
    console.log("This is my warning message");
}
```

null and undefined

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

never

```ts

```

Type assertions

<br/>Type assertions are a way to tell the compiler “trust me, I know what I’m doing.”

<br/>The two samples are equivalent. Using one over the other is mostly a choice of preference; however, when using TypeScript with JSX, only as-style assertions are allowed.

```ts
//1
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
//2
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
> TS基础文档

- [TS基础文档--必看](https://www.tutorialsteacher.com/typescript/typescript-static)

> [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)

- [TS文档之JS的迁移](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
- [JSX 转换成 TSX](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
- [在React中运用 Tsx](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)

```ts
//interface 的作用
- 定义 type 类型，用于类型检查
- The TypeScript compiler uses interface for type checking.
//private的作用
- 静态Props and 静态方法
```ts
class Circle {
    static pi = 3.14;

    static calculateArea(radius:number) {
        return this.pi * radius * radius;
    }

    calculateCircumference(radius:number):number { 
        return 2 * Circle.pi * radius;
    }
}
Circle.calculateArea(5); // returns 78.5
let circleObj = new Circle();
circleObj.calculateCircumference(5) // returns 31.4000000
//circleObj.calculateArea(); <-- cannot call this
```
//abstract 
- 定义一个抽象类，抽象类主要用于对其他类的继承，
- 不能够在抽象类 的基础上新建一个实例。
```


> [TS文档之React与Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)