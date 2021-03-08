<!--suppress ALL -->
<template>
  <div id="container"></div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import { CSS2DRenderer, CSS2DObject } from 'three-css2drender'

// 文档参考
//光源加阴影 https://blog.csdn.net/qq_30100043/article/details/76177338
//增加有宽度的线条 https://www.npmjs.com/package/three.meshline
//模型沿着任意轨迹线运动 http://www.yanhuangxueyuan.com/doc/Three.js/curveRun.html
// 贴图动画  https://juejin.im/post/5e702162518825491d3237a5#heading-11
// MeshLineMaterial 能够设置lineWidth  https://github.com/ryanking1809/threejs-meshline
// Group组的使用 https://blog.csdn.net/ithanmang/article/details/84062933
// 可解析出模型动画的有：FBX， DAE,  JSON格式   http://www.360doc.com/content/20/0119/18/21412_887034428.shtml
// FBX 文件 转化为 JSON文件 https://blog.csdn.net/small_sheep_boy/article/details/83865970
//JSONLoader 被弃用 https://stackoverflow.com/questions/53929969/how-to-use-three-jsonloader-after-r99
// You have to checkout R110 and copy over the loader. LegacyJSONLoader and LegacyGLTFLoader were completely removed with R111. In any event, you rally shouldn't use these loaders anymore. Try to convert your legacy assets to something more recent like glTF

// MeshLine 能画 带有宽度的线
var { MeshLine, MeshLineMaterial } = require('three.meshline')
const OrbitControls = require('three-orbit-controls')(THREE)

const FBXLoader = require('three-fbx-loader')

export default {
  name: 'threeMap',
  data() {
    return {
      scene: '',
      labelRenderer: '',
      light: '',
      camera: '',
      controls: '',
      renderer: '',
      geometry: '',
      material: '',
      cube: '',
      fov: 45,
      biaozhudiv: '',
      img: '',
      biaozhuLabel: '',

      mixer: null,
      clock: null,
    }
  },
  mounted() {
    this.init()
    this.addObj()
    // y轴就是 3D的纵深轴
    const options = [
      // 类型一
      {
        points: [
          { x: -18, y: 5, z: -6 },
          { x: -18, y: 5, z: 3 },
          { x: -12, y: 5, z: 3 },
          { x: -4, y: 5, z: 3 },
        ],
        name: 'box1',
      },
      {
        points: [
          { x: 18, y: 5, z: -6 },
          { x: 18, y: 5, z: 3 },
          { x: 12, y: 5, z: 3 },
          { x: 4, y: 5, z: 3 },
        ],
        name: 'box2',
      },
      //类型二
      {
        points: [
          { x: -15, y: 0, z: 12 },
          { x: -14, y: 0, z: 0 },
          { x: -10, y: 0, z: 0 },
          { x: 0, y: 0, z: 0 },
        ],
        name: 'box3',
      },
      {
        points: [
          { x: 0, y: 0, z: 0 },
          { x: 15, y: 0, z: 1 },
          { x: 15, y: 0, z: 4 },
          { x: 15, y: 0, z: 12 },
        ],
        name: 'box4',
      },
      {
        points: [
          { x: 0, y: 0, z: 1.5 },
          { x: -4, y: 0, z: 1.5 },
          { x: -7, y: 0, z: 1.5 },
          { x: -8, y: 0, z: 7 },
        ],
        name: 'box5',
      },
      {
        points: [
          { x: 0, y: 0, z: 1.5 },
          { x: 4, y: 0, z: 1.5 },
          { x: 7, y: 0, z: 1.5 },
          { x: 8, y: 0, z: 7 },
        ],
        name: 'box6',
      },
      {
        points: [
          { x: -8, y: 0, z: 10 },
          { x: -7, y: 0, z: 16 },
          { x: -4, y: 0, z: 16 },
          { x: 4, y: 0, z: 16 },
        ],
        name: 'box7',
      },
      //类型三
      {
        points: [
          { x: -2, y: -3, z: 18 },
          { x: -6, y: -3, z: 18 },
        ],
        name: 'box8',
      },
      {
        points: [
          { x: 2, y: -3, z: 18 },
          { x: 6, y: -3, z: 18 },
        ],
        name: 'box9',
      },
    ]
    this.createAnimation(options)

    this.animate()
  },
  // destroyed(){
  //   console.log("实例已经被销毁");
  // },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      // 初始化光源
      this.scene.add(new THREE.AmbientLight(0x999999)) //环境光

      // this.light = new THREE.DirectionalLight(0xdfebff, 0.45) //从正上方（不是位置）照射过来的平行光，0.45的强度

      this.light = new THREE.SpotLight(0xffffff)
      this.light.position.set(60, 30, 100)

      //告诉平行光需要开启阴影投射
      this.light.castShadow = true
      this.scene.add(this.light)

      //初始化相机
      this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.set(0, 10, 20)
      this.camera.lookAt(new THREE.Vector3(0, 20, 10))
      this.camera.setFocalLength(60) //设置焦距

      //初始化控制器
      this.controls = new OrbitControls(this.camera)
      this.controls.target.set(0, 0, 0)
      // this.controls.minDistance = 80
      this.controls.minDistance = 100
      this.controls.maxDistance = 400
      // this.controls.maxPolarAngle = Math.PI / 3
      this.controls.maxPolarAngle = Math.PI / 2
      this.controls.update()

      this.controls.enablePan = false //禁止右键拖拽
      this.controls.enableZoom = false //禁止缩放
      this.controls.enableRotate = false //禁止旋转
      //渲染
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
      }) //会在body里面生成一个canvas标签,
      // this.renderer.setPixelRatio(window.devicePixelRatio) //为了兼容高清屏幕
      // this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      const container = document.getElementById('container')
      container.appendChild(this.renderer.domElement)
      //标注渲染
      // this.labelRenderer = new CSS2DRenderer()
      // this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
      // this.labelRenderer.domElement.style.position = 'absolute'
      // this.labelRenderer.domElement.style.top = 0
      // container.appendChild(this.labelRenderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false) //添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      this.render()
      requestAnimationFrame(this.animate)
      // 更新帧动画的时间
      this.mixer.update(this.clock.getDelta())
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    addObj() {
      new MTLLoader().setPath('src/assets/model/').load('experience.mtl', materials => {
        console.log('materials', materials)
        materials.preload()
        new OBJLoader()
          .setMaterials(materials)
          .setPath('src/assets/model/')
          .load('experience.obj', obj => {
            obj.scale.set(0.023, 0.023, 0.023)
            obj.position.set(0, 3, 3)
            obj.castShadow = true // 开启阴影投射
            //告诉obj需要接收阴影
            obj.receiveShadow = true
            this.scene.add(obj)
          })
      })
    },

    createAnimation(options) {
      //创建被移动的对象
      var group = new THREE.Group()
      var arrowSrc = 'src/assets/image/yuanxing.png'
      var arrowTexture = new THREE.TextureLoader().load(arrowSrc)
      var material = new THREE.SpriteMaterial({
        map: arrowTexture,
        color: 0xffffff,
        lineWidth: 0.5,
      })

      var box1 = new THREE.Sprite(material)
      var box2 = new THREE.Sprite(material)
      var box3 = new THREE.Sprite(material)
      var box4 = new THREE.Sprite(material)
      var box5 = new THREE.Sprite(material)
      var box6 = new THREE.Sprite(material)
      var box7 = new THREE.Sprite(material)
      var box8 = new THREE.Sprite(material)
      var box9 = new THREE.Sprite(material)
      box1.scale.set(0.4, 0.4, 0)
      box2.scale.set(0.4, 0.4, 0)
      box3.scale.set(0.4, 0.4, 0)
      box4.scale.set(0.4, 0.4, 0)
      box5.scale.set(0.4, 0.4, 0)
      box6.scale.set(0.4, 0.4, 0)
      box7.scale.set(0.4, 0.4, 0)
      box8.scale.set(0.4, 0.4, 0)
      box9.scale.set(0.4, 0.4, 0)
      box1.name = 'box1'
      box2.name = 'box2'
      box3.name = 'box3'
      box4.name = 'box4'
      box5.name = 'box5'
      box6.name = 'box6'
      box7.name = 'box7'
      box8.name = 'box8'
      box9.name = 'box9'
      group.add(box1, box2, box3, box4, box5, box6, box7, box8, box9)
      this.scene.add(group)

      // 创建多个帧动画的关键帧数据
      let posTrack = []
      for (var i = 0; i < options.length; i++) {
        posTrack.push(this.createKeyframeTrack(options[i]))
      }
      console.log('posTrack...'.posTrack)

      // 获取到关键帧数据之后，执行动画
      let duration = 101
      let clip = new THREE.AnimationClip('default', duration, posTrack)
      this.mixer = new THREE.AnimationMixer(group)
      let AnimationAction = this.mixer.clipAction(clip)
      AnimationAction.timeScale = 20
      AnimationAction.play()
      this.clock = new THREE.Clock() //声明一个时钟对象
    },

    createKeyframeTrack(option) {
      // 获得 轨道线
      let aa = []
      for (var i = 0; i < option.points.length; i++) {
        const { x, y, z } = option.points[i]
        aa.push(new THREE.Vector3(x, y, z))
      }

      var curve = new THREE.CatmullRomCurve3(aa)
      console.log('curve', curve)
      var points = curve.getPoints(100)
      console.log('points', points) //控制台查看返回的顶点坐标

      // 设置 轨道线的宽度
      var geometry = new THREE.Geometry()
      geometry.vertices = points
      var line = new MeshLine()
      line.setGeometry(geometry)
      var material = new MeshLineMaterial({ color: 0x003275, lineWidth: 0.5, useMap: 0, dashArray: 0 })
      var line = new THREE.Line(line.geometry, material)
      this.scene.add(line)

      // 通过Threejs的帧动画相关API播放网格模型沿着曲线做动画运动
      // 声明一个数组用于存储时间序列
      let arr = []
      for (let i = 0; i < 101; i++) {
        arr.push(i)
      }
      // 生成一个时间序列
      var times = new Float32Array(arr)

      var posArr = []
      points.forEach(elem => {
        posArr.push(elem.x, elem.y, elem.z)
      })
      // 创建一个和时间序列相对应的位置坐标系列
      var values = new Float32Array(posArr)
      // 创建一个帧动画的关键帧数据，曲线上的位置序列对应一个时间序列
      var posTrack = new THREE.KeyframeTrack(`${option.name}.position`, times, values)

      return posTrack
    },

    //传感器详情界面
    alarmDetail() {
      this.$router.push('experienceCenter')
      console.log('云镝体验中心')
    },
    //点击模块查看信息的3D界面
    viewDetailModel() {
      // this.fov = 80;
      // //改变相机
      // this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
      // this.camera.position.set(-20, 20, 35);
      // this.camera.lookAt(this.scene.position);
      // //控制器
      // this.controls = new OrbitControls(this.camera);
      // this.controls.target.set(0, 0, 0);
      // this.controls.minDistance = 80;
      // this.controls.maxDistance = 400;
      // this.controls.maxPolarAngle = Math.PI / 3;
      // this.controls.update();
      console.log('清除场景')
    },
  },
}
</script>

<style scoped>
#container {
  background-color: #21242c;
}
</style>
