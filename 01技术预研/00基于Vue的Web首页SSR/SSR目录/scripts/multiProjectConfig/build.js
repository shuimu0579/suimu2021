// process.argv 获取命令行参数
// 比如执行 `npm run builds yundeeDesign DEV`
let projectName = process.argv[2] // yundeePlatform - 项目名
// let env = process.argv[3]; // DEV - 环境配置

// 下面两行代码 获取projectName后把保存起来，写入到projectEnter.js里，方便项目中的其它文件里引入使用
let fs = require('fs')
fs.writeFileSync(
  './scripts/multiProjectConfig/projectEnter.js',
  `exports.name = '${projectName}'`
)

// 下面两行代码继续执行命令（npm run build），执行默认命令开始进行预览
let exec = require('child_process').execSync
// exec("npm run build:" + env, {
//     stdio: "inherit"
// });

exec('npm run build', {
  stdio: 'inherit',
})
