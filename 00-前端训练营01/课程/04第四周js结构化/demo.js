// 怎么在浏览器里面代码调试
// 如下所示  在浏览器里面 地址栏输入 about:blank
// 在代码里面可以加入debugger  
// 将代码粘贴到 console里面去，这样就能顺利调试了

async function afoo() {
  console.log('-2')
  await new Promise(resolve => resolve())
  console.log('-1')
}

new Promise(resolve => (console.log('0'), resolve())).then(() => (console.log('1'),
  new Promise(resolve => resolve()).then(() => {
    console.log('1.5')
  })))



setTimeout(function () {
  console.log(2);
  new Promise(resolve => resolve()).then(console.log('3'))
}, 0)
console.log('4')
console.log('5')
afoo()