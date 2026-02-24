import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { addVoxel, removeVoxel, snapToGrid, updateGhost } from "./voxels.js";
import { AppState } from "./state.js";

const PINCH = 0.05;

export function initHands(video){

  const hands = new Hands({
    locateFile:(file)=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });

  hands.setOptions({
    maxNumHands:2,
    modelComplexity:1,
    minDetectionConfidence:0.7,
    minTrackingConfidence:0.7
  });

  hands.onResults(results=>{
    if(!results.multiHandLandmarks) return;

    results.multiHandLandmarks.forEach((landmarks,i)=>{

      const tip = landmarks[8];
      const thumb = landmarks[4];

      const pinch = Math.hypot(
        thumb.x-tip.x,
        thumb.y-tip.y
      ) < PINCH;

      const world = new THREE.Vector3(
        (0.5-tip.x)*30,
        (0.5-tip.y)*20,
        -tip.z*35
      );

      const snapped = snapToGrid(world);
      updateGhost(snapped);

      if(pinch && Date.now()-AppState.lastBuildTime>200){
        if(results.multiHandedness[i].label==="Right"){
          addVoxel(snapped);
        } else {
          removeVoxel(snapped);
        }
        AppState.lastBuildTime = Date.now();
      }
    });
  });

  new Camera(video,{
    onFrame: async()=>{
      await hands.send({image:video});
    },
    width:1280,
    height:720
  }).start();
}
