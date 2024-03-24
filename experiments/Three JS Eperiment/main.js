import * as THREE from "three";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x808080);

// ! Setting Camera
// setupCamera();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 6;

// ! Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ! Taking a cube and setting sizes
const geometry = new THREE.BoxGeometry(1, 1, 1);

// ! Adding Phong Material
const material = new THREE.MeshPhongMaterial({
    color: 0x8a2be2, // Soft purple color
    specular: 0x050505, // Low specular highlights
    shininess: 10, // Low shininess for a soft effect
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ! Adding Light
// addLight();
var light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(5, 5, 5);
scene.add(light);

// cube.rotation.x = 4;
// cube.rotation.y = 4;

renderer.render(scene, camera);
