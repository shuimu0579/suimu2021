// process.argv 获取命令行参数
// 比如执行 `npm run builds yundeeDesign DEV`
let projectName = process.argv[2] // yundeePlatform - 项目名
let platformId = process.argv[3] // yundee - platformId平台id

// 下面两行代码 获取projectName后把保存起来，写入到projectEnter.js里，方便项目中的其它文件里引入使用
let fs = require('fs')
fs.writeFileSync(
  './scripts/multiProjectConfig/projectEnter.js',
  `exports.name = '${projectName}'`
)
fs.writeFileSync(
  './scripts/multiProjectConfig/projectPlatformId.js',
  `exports.platformId = '${platformId}'`
)

// 下面两行代码继续执行命令（npm run build），执行默认命令开始进行预览
let exec = require('child_process').execSync

if (platformId === 'yundee') {
  exec('npm run build:' + platformId, {
    stdio: 'inherit',
  })
} else {
  exec('npm run build', {
    stdio: 'inherit',
  })
}
