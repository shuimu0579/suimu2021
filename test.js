function deepClone(obj) {
    if (obj === null) return null //null 的情况
    if (obj instanceof RegExp) return new RegExp(obj) //正则表达式的情况
    if (obj instanceof Date) return new Date(obj) //日期对象的情况
    if (typeof obj == 'Function') return new(function(obj) {})() //函数的情况
    if (typeof obj != 'object') {
        //非复杂类型,直接返回 也是结束递归的条件
        return obj
    }
    //[].__proto__.constructor=Array()
    //{}.__proto__.constructor=Object()
    //因此处理数组的情况时,可以取巧用这个办法来new新对象

    // 这里很巧妙，如果obj为[], 那么obj.__proto__.constructor() 就是 [].__proto__.constructor()，也就是 Array()
    // 如果obj为{}, 那么obj.__proto__.constructor() 就是 {}.__proto__.constructor()，也就是 Object()
    var newObj = new obj.__proto__.constructor()
    for (var key in obj) {
        newObj[key] = deepClone(obj[key]) //不管是对象还是数组， 都是可以使用key 和 obj[key] 来处理的
    }
    return newObj
}
//测试代码
var obj = {
    name: 'xm',
    birth: new Date(),
    desc: null,
    reg: /^123$/,
    ss: [1, 2, 3],
    fn: function() {
        console.log('123')
    },
}

var obj2 = deepClone(obj)
console.log(obj, obj2)
    // {
    //     name: 'xm',
    //     birth: 2020-12-17T08:57:58.899Z,
    //     desc: null,
    //     reg: /^123$/,
    //     ss: [ 1, 2, 3 ],
    //     fn: [Function: fn]
    //   } {
    //     name: 'xm',
    //     birth: 2020-12-17T08:57:58.899Z,
    //     desc: null,
    //     reg: /^123$/,
    //     ss: [ 1, 2, 3 ],
    //     fn: [Function: fn]
    //   }

obj.fn() //123
obj2.fn() //123