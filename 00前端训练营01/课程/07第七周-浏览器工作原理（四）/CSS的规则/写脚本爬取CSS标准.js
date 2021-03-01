//https://www.w3.org/TR/?tag=css
// 在这个网址里面写下面脚本，爬取数据

var lis = document.getElementById('container').children

var result = []
for (let li of lis) {
  if (li.getAttribute('data-tag').match(/css/)) {
    result.push({
      name: li.children[1].innerText,
      url: li.children[1].children[0].href
    })
  }
}

console.log(JSON.stringify(result, null, '        '))