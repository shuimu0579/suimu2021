<!--suppress ALL -->
<template>
  <div id="container"></div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import { CSS2DRenderer, CSS2DObject } from 'three-css2drender'

// MeshLine 能画 带有宽度的线
var { MeshLine, MeshLineMaterial } = require('three.meshline')

const OrbitControls = require('three-orbit-controls')(THREE)
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
      // fov: 70,
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

    const options01 = {
      points: [
        { x: -18, y: 5, z: -6 },
        { x: -18, y: 5, z: 3 },
        { x: -4, y: 5, z: 3 },
      ],
    }
    const options02 = {
      points: [
        { x: 18, y: 5, z: -6 },
        { x: 18, y: 5, z: 3 },
        { x: 4, y: 5, z: 3 },
      ],
    }
    this.addLine(options01)
    this.addLine(options02)

    this.animate()
  },
  // destroyed(){
  //   console.log("实例已经被销毁");
  // },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      this.scene.add(new THREE.AmbientLight(0x999999)) //环境光
      this.light = new THREE.DirectionalLight(0xdfebff, 0.45) //从正上方（不是位置）照射过来的平行光，0.45的强度
      this.light.position.set(50, 200, 100)
      this.light.position.multiplyScalar(0.3)
      this.scene.add(this.light)
      //初始化相机
      this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.set(0, 10, 20)
      // this.camera.lookAt(this.scene.position)
      this.camera.lookAt(new THREE.Vector3(0, 20, 10))
      // this.camera.setFocalLength(14) //设置焦距
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

      // this.controls.enablePan = false //禁止右键拖拽
      // this.controls.enableZoom = false //禁止缩放
      // this.controls.enableRotate = false //禁止旋转
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
      // this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      this.render()
      requestAnimationFrame(this.animate)
      // 更新帧动画的时间
      this.mixer.update(this.clock.getDelta())
    },
    render() {
      this.renderer.render(this.scene, this.camera)
      // this.labelRenderer.render(this.scene, this.camera)
    },
    addObj() {
      new MTLLoader().setPath('src/assets/model/').load('experience.mtl', materials => {
        console.log('materials', materials)
        materials.preload()
        new OBJLoader()
          .setMaterials(materials)
          .setPath('src/assets/model/')
          .load('experience.obj', obj => {
            // obj.scale.set(0.8, 0.8, 0.8)
            // obj.scale.set(0.05, 0.05, 0.05)
            // obj.scale.set(0.08, 0.08, 0.08)
            obj.scale.set(0.023, 0.023, 0.023)
            // obj.position.set(-40, -50, 10)
            // obj.position.set(0, 3, 3)
            obj.position.set(0, 3, 3)
            this.scene.add(obj)
          })
      })
    },
    addLine(options) {
      //增加有宽度的线条 https://www.npmjs.com/package/three.meshline
      //模型沿着任意轨迹线运动 http://www.yanhuangxueyuan.com/doc/Three.js/curveRun.html
      // 贴图动画  https://juejin.im/post/5e702162518825491d3237a5#heading-11
      // MeshLineMaterial 能够设置lineWidth  https://github.com/ryanking1809/threejs-meshline

      // var geometry = new THREE.Geometry()
      // for (var i = 0; i < options.points.length; i++) {
      //   const { x, y, z } = options.points[i]
      //   geometry.vertices.push(new THREE.Vector3(x, y, z))
      // }

      // var line = new MeshLine()
      // line.setGeometry(geometry)

      // var material = new MeshLineMaterial({ color: 0x003275, lineWidth: 0.5 })
      // var mesh = new THREE.Mesh(line.geometry, material) // this syntax could definitely be improved!

      this.BBB(options)
      //将线添加到场景
      // this.scene.add(mesh)
    },
    BBB(options) {
      //创建被移动的对象
      // var arrowSrc = 'https://p1.music.126.net/NBwpm3-g3isuPkL98Eqqug==/109951164532405066.png'
      var arrowSrc = 'src/assets/image/yuanxing.png'
      var arrowTexture = new THREE.TextureLoader().load(arrowSrc)
      // var arrowAni = new TextureAnimator(arrowTexture, 13, 1, 13, 75)
      var arrowAni = this.TextureAnimator(arrowTexture, 13, 1, 13, 75)
      var material = new THREE.SpriteMaterial({
        map: arrowTexture,
        color: 0xffffff,
        lineWidth: 0.5,
      })
      var mesh = new THREE.Sprite(material)
      // mesh.scale.set(33, 15, 1)
      this.scene.add(mesh)

      // 获得 轨道线
      let aa = []
      for (var i = 0; i < options.points.length; i++) {
        const { x, y, z } = options.points[i]
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
      // var line = new THREE.Line(geometry, material)
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
      var posTrack = new THREE.KeyframeTrack('.position', times, values)
      let duration = 101
      let clip = new THREE.AnimationClip('default', duration, [posTrack])
      this.mixer = new THREE.AnimationMixer(mesh)
      let AnimationAction = this.mixer.clipAction(clip)
      AnimationAction.timeScale = 20
      AnimationAction.play()
      this.clock = new THREE.Clock() //声明一个时钟对象
    },

    TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
      this.tilesHorizontal = tilesHoriz
      this.tilesVertical = tilesVert
      this.numberOfTiles = numTiles
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical)

      this.tileDisplayDuration = tileDispDuration

      this.currentDisplayTime = 0

      this.currentTile = 0

      this.update = milliSec => {
        this.currentDisplayTime += milliSec
        while (this.currentDisplayTime > this.tileDisplayDuration) {
          this.currentDisplayTime -= this.tileDisplayDuration
          this.currentTile++
          if (this.currentTile === this.numberOfTiles) {
            this.currentTile = 0
          }
          const currentColumn = this.currentTile % this.tilesHorizontal
          texture.offset.x = currentColumn / this.tilesHorizontal
          const currentRow = Math.floor(this.currentTile / this.tilesHorizontal)
          texture.offset.y = currentRow / this.tilesVertical
        }
      }
    },
    //传感器详情界面
    alarmDetail() {
      // this.$router.push('alarmPage')
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
