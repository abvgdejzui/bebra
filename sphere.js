import * as THREE from './build/three.module.js';
import { STLLoader } from './build/STLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 10, 30);
camera.rotation.set(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(40);
scene.add(axesHelper);


// *** задаю датчик ***
const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 1,
    opacity: 1,
    transparent: false,
    transmission: 0.49,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
    emissive: 0x00FF00
})
let mesh;
const loader = new STLLoader();
loader.load('./models/vera.stl', function (geometry){
    geometry.scale(0.08,0.08,0.08)
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.x = -5;
    mesh.position.y = 7;
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = -Math.PI;
});


// *** задаю кольцо1 ***
const materialFlag1 = new THREE.MeshPhysicalMaterial({
    color: 0xAf1100,
    metalness: 1,
    roughness: 1,
    opacity: 1,
    transparent: false,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
    emissive: 0xAf1100
})
let meshFlag1;
const loaderFlag1 = new STLLoader();
loader.load('./models/flag1.stl', function (geometry){
    meshFlag1 = new THREE.Mesh(geometry, materialFlag1);
    geometry.scale(0.35,0.35,0.35)
    meshFlag1.rotation.x = -Math.PI / 2;
    meshFlag1.position.x = 5;
    meshFlag1.position.y = 4;
    scene.add(meshFlag1);
});

// *** задаю кольцо2 ***
const materialFlag2 = new THREE.MeshPhysicalMaterial({
    color: 0xAf1100,
    metalness: 1,
    roughness: 1,
    opacity: 1,
    transparent: false,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
    emissive: 0x000CD,
})
let meshFlag2;
const loaderFlag2 = new STLLoader();
loader.load('./models/flag2.stl', function (geometry){
    meshFlag2 = new THREE.Mesh(geometry, materialFlag2);
    geometry.scale(0.35,0.35,0.35)
    meshFlag2.rotation.x = -Math.PI / 2;
    meshFlag2.position.x = 5;
    meshFlag2.position.y = 13;
    scene.add(meshFlag2);
});

// *** задаю кольцо3 ***
const materialFlag3 = new THREE.MeshPhysicalMaterial({
    color: 0xAf1100,
    metalness: 1,
    roughness: 1,
    opacity: 1,
    transparent: false,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
    emissive: 0xFFFFFF,
})
let meshFlag3;
const loaderFlag3 = new STLLoader();
loader.load('./models/flag2.stl', function (geometry){
    meshFlag3 = new THREE.Mesh(geometry, materialFlag3);
    geometry.scale(0.35,0.35,0.35)
    meshFlag3.rotation.x = -Math.PI / 2;
    meshFlag3.position.x = 5;
    meshFlag3.position.y = 22;
    scene.add(meshFlag3);
});


// *** задаю стол ***
const materialStol = new THREE.MeshPhysicalMaterial({
    color: 0xAf1100,
    metalness: 1,
    roughness: 1,
    opacity: 1,
    transparent: false,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
    emissive: 0xFF8C00,
})

let meshStol;
const loaderStol = new STLLoader();
loader.load('./models/stol.stl', function (geometry){
    geometry.scale(0.5,0.5,0.5)
    meshStol = new THREE.Mesh(geometry, materialStol);
    scene.add(meshStol);
    meshStol.rotation.x = -Math.PI / 2;
    meshStol.position.y = -1;
    meshStol.position.x = 10;
})


let mouseDown = false;
let mousewheel = false;
let prevMousePos = { x: 0, y: 0 };

document.addEventListener('mousedown', event => {
    if (event.button === 0) {
        mouseDown = true;
    }
    else if (event.button === 1) {
        mousewheel = true;
    }
});

document.addEventListener('mouseup', event => {
    if (event.button === 0) {
        mouseDown = false;
    }
    else if (event.button === 1) {
        mousewheel = false;
    }
});

document.addEventListener('mousemove', event => {
    const deltaMove = {
        x: event.offsetX - prevMousePos.x,
        y: event.offsetY - prevMousePos.y
    };

    if (mouseDown) {
        mesh.position.x += deltaMove.x * 0.05;
        mesh.position.z += deltaMove.y * 0.05;
    }

    else if (mousewheel) {
        mesh.rotation.z -= (deltaMove.x * 0.05) * -1;
    }
    prevMousePos = { x: event.offsetX, y: event.offsetY };
});

// Функция анимации
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();