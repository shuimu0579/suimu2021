// 这个文件其实更简单了，通过获取当前项目名来区分根页面的路径
const projectName = require('./projectEnter')
const config = {
  yundeePlatform: {
    name: 'yundeePlatform',
    pages: {
      index: {
        entry: 'src/projects/yundeePlatform/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        title: 'yundeePlatform',
        chunks: [
          'vue',
          'vuex',
          'vue-router',
          'element-ui',
          'vendors',
          'utils',
          'manifest',
          'index',
        ],
      },
    },
  },
  yundeeDesign: {
    name: 'yundeeDesign',
    pages: {
      index: {
        entry: 'src/projects/yundeeDesign/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        title: 'yundeeDesign',
        chunks: [
          'vue',
          'vuex',
          'vue-router',
          'element-ui',
          'vendors',
          'utils',
          'manifest',
          'index',
        ],
      },
    },
  },
}

const configObj = config[projectName.name]
module.exports = configObj
