import * as THREE from 'three'


// 1. 设置scene / camera / renderer
// 其中camera.PerspectiveCamera里面， 有四个参数, 分别是 field of view（视野宽 单位为°）, aspect ratio（长宽比率）, the near clipping plane（近裁剪平面）,  the far clipping plane（远裁剪平面）,
// renderer 渲染函数， renderer.setSize来确定渲染实例的尺寸， 最终将renderer.domElement DOM元素挂载到document.body元素上
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//2生成cube立方体实例， 然后增加到scene上
//BoxGeometry几何形状、 MeshBasicMaterial材料特性
//设置position.z =5, we simply move the camera out a bit.
var geometry = new THREE.BoxGeometry()
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
})
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

//3 loop引起了 the renderer to draw the scene
var animate = function animate() {
    requestAnimationFrame(animate)

    //4 give the cube a nice rotation animation
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}
animate()