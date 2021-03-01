import * as THREE from 'three'

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)

var scene = new THREE.Scene()

//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
})

var points = []
points.push(new THREE.Vector3(-10, 0, 0))
points.push(new THREE.Vector3(0, 10, 0))
points.push(new THREE.Vector3(10, 0, 0))

var geometry = new THREE.BufferGeometry().setFromPoints(points)