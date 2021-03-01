# Mobx

### observable / @observable / extendObservable

> Map 类型

```js
Using ES6 Map constructor :
observable(new Map())

for class properties :
@observable map = new Map()

map.has(key)
```

> Array 类型

```js
import {observable, autorun} from "mobx";

var todos = observable([
    { title: "Spoil tea", completed: true },
    { title: "Make coffee", completed: false }
]);

autorun(() => {
    console.log("Remaining:", todos
        .filter(todo => !todo.completed)
        .map(todo => todo.title)
        .join(", ")
    );
});
// Prints: 'Remaining: Make coffee'

todos[0].completed = false;
// Prints: 'Remaining: Spoil tea, Make coffee'

todos[2] = { title: 'Take a nap', completed: false };
// Prints: 'Remaining: Spoil tea, Make coffee, Take a nap'

todos.shift();
// Prints: 'Remaining: Make coffee, Take a nap'
```

> object 为 一个 plain object

- 当object 为 一个 plain object(wasn't created using a constructor function but has Object as its prototype or  no prototype at all) 的时候, 可以利用 **observable**

```js
import {observable, autorun, action} from "mobx";

var person = observable({
    // observable properties:
    name: "John",
    age: 42,
    showAge: false,

    // computed property:
    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    },

    setAge(age) {
        this.age = age;
    }
}, {
    setAge: action
});

// object properties don't expose an 'observe' method,
// but don't worry, 'mobx.autorun' is even more powerful
autorun(() => console.log(person.labelText));

person.name = "Dave";
// prints: 'Dave'

person.setAge(21);
// etc
```

> object 带有 prototype , JS简单类型 , 函数

- If value is an object with a prototype, a JavaScript primitive or function, use **@observable / decorate** in its class definition instead, observable.object(object) is actually an alias for extendObservable({}, object)

```js
import { observable, computed } from "mobx";
class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    @computed get total() {
        return this.price * this.amount;
    }
}
```

- Use **extendObservable** in the constructor, ExtendObservable can be used to add observable properties to the existing target objects.

```js
var Person = function(firstName, lastName) {
    // initialize observable properties on a new instance
    extendObservable(this, {
        firstName: firstName,
        lastName: lastName,
        get fullName() {
            return this.firstName + "  " + this.lastName
        },
        setFirstName(firstName) {
            this.firstName = firstName
        }
    }, {
        setFirstName: action
    });
}

var matthew = new Person("Matthew", "Henry");

// add an observable property to an already observable object
extendObservable(matthew, {
    age: 353
});
```

- Use **Boxed Observable** observables instead if you want to create a stand-alone observable reference to such a value.

```js
import {observable} from "mobx";

const cityName = observable.box("Vienna");

console.log(cityName.get());
// prints 'Vienna'

cityName.observe(function(change) {
    console.log(change.oldValue, "->", change.newValue);
});

cityName.set("Amsterdam");
// prints 'Vienna -> Amsterdam'
```

### When Mobx will not  react to

- Values that are obtained from observables, but outside a tracked function

- Observables that are read in an asynchronously invoked code block

### when to use actions

- Actions should only, and always, be used on functions that modify state. If MobX is used in strict mode, MobX will enforce that no state can be modified outside actions.

- as actions only apply to the current stack. (好好理解这一句话)

### when to use runInAction

- Instead of creating an action for the entire callback, you can also run only the state modifying part of the callback in an action. 

### when to use computed

- if you want to create a value based on the current state, use computed.

### when to use autorun

> when need a function that observes the state

```js
autorun(function() {
    console.log("Completed %d of %d items",
        todoStore.completedCount,
        todoStore.todos.length
    );
});
```
