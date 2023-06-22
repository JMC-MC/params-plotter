import * as THREE from 'three';
import { scene } from './threeDisplay';

const audioLoader = new THREE.AudioLoader();
const audioListener = new THREE.AudioListener();

export function playAudio() {
  scene.traverse((obj) => {
    if (obj.type == 'Audio') {
      obj.context.resume();
    }
  });
}

export { audioListener, audioLoader };
