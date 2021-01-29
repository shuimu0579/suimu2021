<template>
  <div id="container" class="text" style="color: white"></div>
</template>

<script>
import * as THREE from 'three'

export default {
  methods: {
    data() {
      return {
        scene: '',
        camera: '',
        renderer: '',
        geometry: '',
        material: '',
        cube: '',

        labelRenderer: '',
        light: '',
        controls: '',
        fov: 60,
        biaozhudiv: '',
        img: '',
        biaozhuLabel: '',
      }
    },
    init() {
      // 1. 设置scene / camera / renderer
      // 其中camera.PerspectiveCamera里面， 有四个参数, 分别是 field of view（视野宽 单位为°）, aspect ratio（长宽比率）, the near clipping plane（近裁剪平面）,  the far clipping plane（远裁剪平面）,
      // renderer 渲染函数， renderer.setSize来确定渲染实例的尺寸， 最终将renderer.domElement DOM元素挂载到document.body元素上
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      const container = document.getElementById('container')
      container.appendChild(this.renderer.domElement)

      //2生成cube立方体实例， 然后增加到scene上
      //BoxGeometry几何形状、 MeshBasicMaterial材料特性
      //设置position.z =5, we simply move the camera out a bit.
      this.geometry = new THREE.BoxGeometry()
      this.material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      })
      this.cube = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.cube)
      this.camera.position.z = 5
    },
    animate() {
      let self = this
      //3 loop引起了 the renderer to draw the scene
      requestAnimationFrame(self.animate)
      //4 give the cube a nice rotation animation
      self.cube.rotation.x += 0.01
      self.cube.rotation.y += 0.01

      self.renderer.render(self.scene, self.camera)
    },
  },
  mounted() {
    this.init()
    this.animate()
  },
}
</script>

<style scoped>
.text {
  width: 100%;
  height: 600px;
  background-color: #ddd;
}
</style>
