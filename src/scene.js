import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

camera.position.z = 25;

export const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three_canvas"),
  antialias:true,
  alpha:true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

scene.add(new THREE.AmbientLight(0xffffff,0.5));

const light = new THREE.PointLight(0x00f0ff,1.2);
light.position.set(0,10,15);
scene.add(light);

window.addEventListener("resize",()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
