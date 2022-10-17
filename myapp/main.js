import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera)

// GEOMETRY
const geometry = new THREE.TorusKnotGeometry(5, 1, 250, 20)
const material = new THREE.MeshStandardMaterial({ color: 0x3f7b9d });
const torusKnot = new THREE.Mesh(geometry, material)
scene.add(torusKnot)

// LIGHTING
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// HELPERS
const lighthelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper, gridHelper)

// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)

function animatae() {
  requestAnimationFrame(animatae);

  torusKnot.rotation.x += 0.01
  torusKnot.rotation.y += 0.01
  torusKnot.rotation.z += 0.01

  controls.update();
  renderer.render(scene, camera);
}
animatae();