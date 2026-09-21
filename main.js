import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(-100, 100);
camera.lookAt(0, 0, 0);

// 1. Base light (illuminates all sides equally)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Color, Intensity
scene.add(ambientLight);

// 2. Directional light (simulates sun / creates shadows and highlights)
const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
sunLight.position.set(5, 10, 7); // Position light above and to the side
scene.add(sunLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

const loader = new GLTFLoader();

loader.load('/assets/tree.glb', (gltf) => {
  const tree = gltf.scene;
  tree.position.set(0, 0, 0);
  tree.scale.set(10,10,10)
  scene.add(tree);
  console.log("tree loaded");
});
/* 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
*/

/* 
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = []
points.push(new THREE.Vector3(-10, 0, 0))
points.push(new THREE.Vector3(0, 10, 0))
points.push(new THREE.Vector3(10, 0, 0))
points.push(new THREE.Vector3(0, -10, 0))
points.push(new THREE.Vector3(-10, 0, 0))
*/

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);