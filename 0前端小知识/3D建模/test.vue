<template>
  <div>
    <div id="container">
      <div class="nav">
        <img src="../../assets/image/logo.png" />
      </div>
    </div>
    <video id="video" loop muted autoplay crossOrigin="anonymous" playsinline style="display:none">
      <source src="../../assets/model/底图_1.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
    </video>
    <CommonDialog
      class="deleteModal1"
      :visible="attachDialog"
      DialogWidth="690px"
      @no="cancelDialogAttach"
      title="温馨提示"
      :buttonView="dialogBtnView"
    >
      <div class="tipsText">
        您还没有登录账号，无法继续体验
        <br />如没有注册账号，可以选择默认账号登录
      </div>
      <el-button class="el-button1" @click="login('default')">体验账号登录</el-button>
      <el-button class="el-button2" @click="login()">已有帐号登录</el-button>
    </CommonDialog>
  </div>
</template>
<script>
import * as THREE from 'three'
import spriteData from '../../assets/data/btnSpriteData.js'
import cookieHelper from '../../utils/cookies.js'
const OrbitControls = require('three-orbit-controls')(THREE)
const cq_config = require('cq_config')
const CommonDialog = () => import('../../components/dialog/CommonDialog.vue')

//文档参考
//光源加阴影 https://blog.csdn.net/qq_30100043/article/details/76177338
//增加有宽度的线条 https://www.npmjs.com/package/three.meshline
//模型沿着任意轨迹线运动 http://www.yanhuangxueyuan.com/doc/Three.js/curveRun.html
//贴图动画  https://juejin.im/post/5e702162518825491d3237a5#heading-11
//MeshLineMaterial 能够设置lineWidth  https://github.com/ryanking1809/threejs-meshline
//Group组的使用 https://blog.csdn.net/ithanmang/article/details/84062933
//可解析出模型动画的有：FBX， DAE,  JSON格式   http://www.360doc.com/content/20/0119/18/21412_887034428.shtml
//FBX 文件 转化为 JSON文件 https://blog.csdn.net/small_sheep_boy/article/details/83865970
//JSONLoader 被弃用 https://stackoverflow.com/questions/53929969/how-to-use-three-jsonloader-after-r99
//You have to checkout R110 and copy over the loader. LegacyJSONLoader and LegacyGLTFLoader were completely removed with R111. In any event, you rally shouldn't use these loaders anymore. Try to convert your legacy assets to something more recent like glTF
//将FBX 转换成glb版本  https://developers.facebook.com/docs/sharing/3d-posts/glb-tutorials/#convert-from-fbx
//验证glb后缀的文件是否可用 https://gltf-viewer.donmccurdy.com/
//GLTFLoader示例 https://threejs.org/docs/#examples/zh/loaders/GLTFLoader
//在three.js中使用THREE.GLTFLoader导入和播放多个动画 https://www.coder.work/article/2662693
//THREE.JS 绘制飞线 攻击线 迁移线 拓扑图动画线条等 https://www.jianshu.com/p/eb90d1296c2b
//缓动的数学公式 https://www.jianshu.com/p/5f27bea6732a

export default {
  name: 'ExperienceCenter',
  components: {
    CommonDialog,
  },
  data() {
    return {
      scene: '',
      camera: '',
      controls: '',
      renderer: '',
      selectObject: null,
      hoverObject: null,
      btnGroup: null,
      mouseX: 0,
      mouseY: 0,
      sprite: {},
      attachDialog: false,
      dialogBtnView: 'none',
      open_url: '',
    }
  },
  mounted() {
    this.init()
    this.animate()
    window.addEventListener('click', this.onDocumentMouseMove, false)
    window.addEventListener('mousemove', this.onMouseMove, false)
    window.addEventListener('resize', this.onWindowResize, false) //添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
  },

  methods: {
    init() {
      const self = this
      this.scene = new THREE.Scene()

      //摄像机
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 60), 1, 1100)
      this.camera.target = new THREE.Vector3(0, 0, 0)
      this.camera.position.set(0, 0, 9)
      this.camera.up.set(0, 1, 0)
      this.camera.lookAt(new THREE.Vector3(0, 0, 9))
      this.camera.setFocalLength(60) //设置焦距

      //渲染
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
      }) //会在body里面生成一个canvas标签,
      this.renderer.setSize(window.innerWidth, window.innerHeight - 60)

      // 摄像头轨道控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enablePan = false //禁止右键拖拽
      this.controls.enableZoom = false //禁止缩放
      this.controls.enableRotate = false //禁止左键旋转
      // this.controls.minPolarAngle = 1.25;
      // this.controls.maxPolarAngle = 1.25;
      // this.controls.minAzimuthAngle = (-1 / 64) * Math.PI;
      // this.controls.maxAzimuthAngle = (1 / 64) * Math.PI;
      // 添加点击按钮
      this.btnGroup = new THREE.Group()
      let arr = spriteData.map(item => {
        return self.switchSprite(item.name, item.url, item.position, item.scale)
      })
      this.btnGroup.add(...arr)
      this.scene.add(this.btnGroup)

      //添加video
      let geometry = new THREE.PlaneGeometry(600, 300) //矩形平面
      let video = document.getElementById('video')
      video.play()
      let texture = new THREE.VideoTexture(video)
      let material = new THREE.MeshBasicMaterial({ map: texture })
      let mesh = new THREE.Mesh(geometry, material)
      mesh.scale.set(0.0095, 0.0095, 0.0095)
      this.scene.add(mesh)

      //cavans节点挂载到container元素上
      const container = document.getElementById('container')
      container.appendChild(this.renderer.domElement)
    },

    switchSprite(name, url, position, scale) {
      const { x = 0, y = 0, z = 0 } = position
      const { scalex = 0, scaley = 0, scalez = 0 } = scale
      var spriteMap = new THREE.TextureLoader().load(url)
      let sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: spriteMap }))
      sprite.position.set(x, y, z)
      // sprite.scale.set(0.4, 0.1, 0.1);
      sprite.scale.set(scalex, scaley, scalez)
      sprite.name = name
      return sprite
    },
    onDocumentMouseMove(event) {
      const self = this
      event.preventDefault()
      if (self.selectObject) {
        // self.selectObject.material.color.set("yellow");
        self.selectObject = null
      }
      var intersects = self.getIntersects(event.layerX, event.layerY)

      if (intersects.length > 0) {
        var res = intersects.filter(function(res) {
          return res && res.object
        })[0]
        if (res && res.object) {
          self.selectObject = res.object
          const { name = '' } = self.selectObject || {}
          const filterArr = spriteData.filter(item => item.name === name)
          const { link } = filterArr && filterArr[0]

          if (name === 'sideBar' || name === 'test03' || name === 'test15') {
            return false
          }
          if (link && link !== '') {
            this.open_url = link
          }
          if (!cookieHelper.isLogin()) {
            this.attachDialog = true
          } else {
            window.open(link)
          }
        }
      }
    },
    cancelDialogAttach() {
      this.attachDialog = false
    },
    onMouseMove(event) {
      const self = this
      event.preventDefault()

      var intersects = self.getIntersects(event.layerX, event.layerY)
      var res = intersects.filter(function(res) {
        return res && res.object
      })[0]

      if (self.hoverObject) {
        // 当鼠标一直在按钮里面的时候，取消 remove 和 add 操作
        const { name = '' } = (res && res.object) || {}
        const spriteName = self.sprite && self.sprite.name
        if (name === spriteName && name !== '') {
          return false
        }

        self.btnGroup.remove(self.sprite)
        self.btnGroup.add(self.hoverObject)
        self.hoverObject = null
      }

      if (res && res.object) {
        self.hoverObject = res.object
        const { name, position, scale } = self.hoverObject || {}
        if (name === 'sideBar' || name === 'test03' || name === 'test15') {
          return false
        }
        self.sprite = self.switchSprite(name, require(`../../assets/image/${name}_hover.png`), position, {
          scalex: scale.x,
          scaley: scale.y,
          scalez: scale.z,
        })
        self.btnGroup.remove(self.hoverObject)
        self.btnGroup.add(self.sprite)
      }
    },

    getIntersects(x, y) {
      const self = this
      var raycaster = new THREE.Raycaster()
      var mouseVector = new THREE.Vector2()
      //将鼠标位置转换成设备坐标。x和y方向的取值范围是(-1 to 1)
      x = (x / window.innerWidth) * 2 - 1
      y = -(y / (window.innerHeight - 60)) * 2 + 1
      mouseVector.set(x, y)

      //通过摄像机和鼠标位置更新射线
      raycaster.setFromCamera(mouseVector, self.camera)

      // 返回物体和射线的焦点
      return raycaster.intersectObject(self.btnGroup, true)
    },

    onWindowResize() {
      this.renderer.setSize(window.innerWidth, window.innerHeight - 60)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.render()
    },
    render() {
      const self = this
      self.controls.update()
      self.renderer.render(self.scene, self.camera)
    },

    login(type) {
      let url = ''
      if (type) {
        url =
          cq_config.yundee_center_login_url +
          '?vtenant=' +
          cq_config.platformid +
          '&isfrom=ExperienceCenter&username=yundeeDemo&password=yundee1234&service=' +
          window.location.href +
          '?redirect_url=true'
      } else {
        url =
          cq_config.yundee_center_login_url +
          '?vtenant=' +
          cq_config.platformid +
          '&isfrom=ExperienceCenter&service=' +
          window.location.href +
          '?redirect_url=true'
      }
      localStorage.setItem('experienceCenter_url', this.open_url)
      window.location.href = url
    },
  },
}
</script>
