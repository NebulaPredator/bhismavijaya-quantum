import { scene, camera, renderer } from "./scene.js";
import { initHands } from "./hands.js";

const video = document.getElementById("input_video");

initHands(video);

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

animate();
