import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { DirectionalLight } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xFFFF33 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// lights
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(10, 10, 10);
const ambiantlight = new THREE.AmbientLight(0xffffff , 1);
scene.add(pointlight , ambiantlight);
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(gridhelper);

// Directional Light
// const directionallight = new THREE.DirectionalLight(0xFFFFFF , 1.0);
// directionallight.position.set(2, 10, 1);
// directionallight.target.position(0, 0, 0);
// scene.add(directionallight , directionallight.target);

// React area light
// const width = 2.0;
// const height = 20.0;
// // RectAreaLightUniformsLib.init();
// const rectarealight = new THREE.RectAreaLight(0xf5f5f5 , 1.0, width, height);
// rectarealight.position.set(0, 6, 0)
// rectarealight.lookAt(0, 0, 0);
// scene.add(rectarealight);

const controls = new OrbitControls(camera , renderer.domElement);


function addstar(){
  const geometry = new THREE.SphereGeometry(0.25 , 25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry , material);


  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addstar);

const spacetexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spacetexture;

const moontexture = new THREE.TextureLoader().load('moon.jpg');
const newmoon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 33, 33),
  new THREE.MeshStandardMaterial({
    map: moontexture,
  } )
);
scene.add(newmoon);

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  newmoon.rotation.y +=0.01;


controls.update();
  renderer.render(scene , camera);
}
animate();