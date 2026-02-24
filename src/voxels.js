import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { scene } from "./scene.js";
import { AppState } from "./state.js";

const GRID = 1.2;

const geometry = new THREE.BoxGeometry(GRID*0.96,GRID*0.96,GRID*0.96);
const material = new THREE.MeshPhongMaterial({
  color:0x000a0f,
  emissive:0x00f0ff,
  emissiveIntensity:0.4,
  transparent:true,
  opacity:0.9
});

const ghostMaterial = new THREE.MeshBasicMaterial({
  color:0x00f0ff,
  transparent:true,
  opacity:0.2
});

export const voxelGroup = new THREE.Group();
scene.add(voxelGroup);

export const ghost = new THREE.Mesh(geometry, ghostMaterial);
scene.add(ghost);

const placed = new Map();

export function snapToGrid(v){
  return new THREE.Vector3(
    Math.round(v.x/GRID)*GRID,
    Math.round(v.y/GRID)*GRID,
    Math.round(v.z/GRID)*GRID
  );
}

export function updateGhost(position){
  ghost.position.copy(position);
}

export function addVoxel(position){
  if(placed.size >= AppState.maxVoxels) return;

  const key = `${position.x},${position.y},${position.z}`;
  if(placed.has(key)) return;

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  mesh.scale.set(0,0,0);
  voxelGroup.add(mesh);

  animateScale(mesh);

  placed.set(key, mesh);
}

export function removeVoxel(position){
  const key = `${position.x},${position.y},${position.z}`;
  if(!placed.has(key)) return;

  voxelGroup.remove(placed.get(key));
  placed.delete(key);
}

function animateScale(mesh){
  let s = 0;
  const grow = ()=>{
    s += 0.1;
    mesh.scale.set(s,s,s);
    if(s<1) requestAnimationFrame(grow);
  };
  grow();
}
