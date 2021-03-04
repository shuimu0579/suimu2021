# 体验中心模块总结

当下和未来会有更多的终端和屏幕，这已经是不争的事实。不信的话，普通人离开了手机或者电脑，在现代社会基本就无法正常的生活和工作了。

科技作家凯文凯利在他《必然》这本书中讲到了未来科技这个新物种不断变迁的 12 种必然趋势，其中有一个就是--屏读。放眼四周，有智能手表屏幕、手机屏幕、iPad 平板、笔记本电脑屏幕、电子书阅读器、车载平板、电视屏幕、电影屏幕，可以说屏幕无处不在。

身处这样的屏读时代，前端就离屏幕前的用户更近了，提供良好的用户体验，也是前端开发人员需要考虑甚至重视的问题。

为了更绚丽的视觉效果，为了更极致的用户体验，前端图形学这几年就成了一个热门的方向。前端图形学脱胎于计算机图形学，计算机图形学是由计算机创建的图形，更普遍地说是计算机对图形数据的表示和操作。

同样的，前端图形学也是对图形数据的处理，最终生成好看好用的图像--也就是大家在各大屏幕上看到的东西。

在前端图形学方面，CSS3 的动画变换、Canvas API 等主要聚焦于 2D 图形;WebGL API 配合\<canvas\>元素，主要用于绘制硬件加速的 2D 和 3D 图形。

由于现代浏览器已经内置了 WebGL API,只配备了浏览器和文本编辑器的大量开发人员终于可以基于 WebGL API 进行 3D 应用程序开发了。

可是 WebGL 的学习曲线较为陡峭，对初涉 3D 应用程序的开发人员挑战较大，一般可以使用 Three.js，它是以 WebGL 为基础的库，封装了一些 3D 渲染需求中重要的工具方法与渲染循环，对 WebGL 提供的接口进行了非常好的封装，简化了很多细节，大大降低了学习成本。

上面说了这么多，终于说到今天的主角 Three.js 了，它能够做绚丽的动效，能够做基于 H5 的小游戏甚至网游页游，能够实现 VR 虚拟效果，比如房产中介 App 里面的 VR 看房等。现在做的这个就是体验中心的展示和链接跳转。

开始接触 threejs 进行项目预研的时候，踩过了好多的坑，在看代码之前，先回顾一下踩坑的过程：

开发项目的第一步，就是将设计师制作好的 3D 模型数据导入到项目代码中。而这里就涉及到模型数据格式的问题。

最开始是导入的后缀为 obj 和 mtl 的格式，这两种格式的文件可以导入模型几何信息和模型材质，但是导入不了光信息 Lights 和模型阴影信息，也无法导入动画信息。

然后想到模型里面怎么能包含动画信息，设计师给到的数据格式里面，只有后缀为 fbx 的带有动画信息。可是 fbx 格式在 threejs 里面不能直接加载，需要转换 fbx 格式为 threejs 中能使用的格式。首先想到的是转为最常用的 json 格式，转换之后发现 json 格式文件的加载器 JSONLoaderz 在 Threejs 里面已经被移除了。接下来就是将 fbx 格式转为 glb 格式的，glb 格式是 threejs 官方推荐的模型导入格式。

glb 格式确实是能够导入动画，但是也仅仅能导入位移动画而不能导入变形动画，这样就出现了下一个问题，带宽度的折线及其折角处动画怎么实现？

运用 MeshLine 和 MeshLineMaterial 可以实现带宽度的线条绘制，运用 THREE.CatmullRomCurve3 API 可以画出曲线效果，可是就是没办法实现有宽度的折线效果。

还有一种办法就是基于 Line、LineMaterial、LineGeometry 等 API 的进一步的封装，这时就能画出有宽度的折线了，接下来还有一个问题--这样基于封装的 API 没有提供生成折线轨迹点 Point 的方法，没有这些点，就不能为动画的各个关键帧提供相应的空间位置，所以这些这折线就不能作为轨迹设置动画了。

山重水复疑无路，柳暗花明又一村。后来说看看能不能导入视频的方式做出效果，这样既不用担心格式的问题，又能展示有宽度的折线及其动画。定好了初步方案，预研发现还是可行的，最终就有了现在的体验中心现在的样子--虽然 3D 效果不明显,但是比起做的 2D 平面效果，解决了各种屏幕大小的自适应问题，解决了 2D 平面效果线条动画闪烁的问题。

最后再讲一下，对于不熟悉不了解的领域，怎么做好预研呢？ 有一个方法就是 Google 或者百度找到相关的资料，而最好的资料就是官方文档。找到相关的资料之后，尝试着根据资料做一个 demo 出来，用来验证预研方向的可行性。

在软件工程里面，有一个 MVP 的软件思想，这里不是 NBA 里面最佳球员的 MVP,而是最小化可行产品(Minimun Viable Product),运用这种思想就能投入较小的成本来试错和寻找方向。

以 Threejsde 官方文档为例，我们可以参考里面的 examples, 在这些例子的 html 文件里面不断的调试，最终寻找到突破的方向。

```txt
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
//How to use THREE.JSONLoader after R99?  https://stackoverflow.com/questions/53929969/how-to-use-three-jsonloader-after-r99
//将FBX 转换成glb版本  https://developers.facebook.com/docs/sharing/3d-posts/glb-tutorials/#convert-from-fbx
//验证glb后缀的文件是否可用 https://gltf-viewer.donmccurdy.com/
//GLTFLoader示例 https://threejs.org/docs/#examples/zh/loaders/GLTFLoader
//在three.js中使用THREE.GLTFLoader导入和播放多个动画 https://www.coder.work/article/2662693
//THREE.JS 绘制飞线 攻击线 迁移线 拓扑图动画线条等 https://www.jianshu.com/p/eb90d1296c2b
//缓动的数学公式 https://www.jianshu.com/p/5f27bea6732a
//使用VideoTexture实现视频Video更新纹理 https://blog.csdn.net/qq_30100043/article/details/80275413
```

PS:代码参考：nextcloud\src\views\platformProducts\ExperienceCenter.vue

```html
<template>
  <div>
    <div id="container">
      <div class="nav">
        <img src="../../assets/image/logo.png" />
      </div>
    </div>
    <video id="video" loop muted autoplay crossorigin="anonymous" playsinline style="display:none">
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
```
