import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as Convert from '../utils/converters';
import { params } from '../app.js';
import { scene } from './threeDisplay';
import { audioListener, audioLoader } from './audio';

//Make each loader a promise
let loader = new GLTFLoader();

export function shipModels(
  modelPath,
  relposXnm,
  relposYnm,
  course,
  name,
  type
) {
  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      function (gltf) {
        let model = gltf.scene;
        model.position.set(
          Convert.distanceToThreeCanvas(relposXnm),
          0,
          Convert.distanceToThreeCanvas(relposYnm)
        );
        // Three JS rotates anti-clockwise, subtract angles from Paper JS
        model.rotation.y = -course;
        model.name = name;
        if (params.environment === 'resVis') {
          // Add audio
          audioLoader.load(getAudioPath(type), function (buffer) {
            const audio = new THREE.PositionalAudio(audioListener);
            audio.setBuffer(buffer);
            audio.setRefDistance(10);
            audio.setLoop(true);
            if (type == 'PDV') {
              audio.offset = Math.random();
            }
            model.add(audio);
            scene.add(model);
          });
        } else scene.add(model);

        resolve('success');
      },
      undefined,
      function (err) {
        reject(err);
      }
    );
  });
}

export function buoyModels(
  modelPath,
  relposXnm,
  relposYnm,
  name,
  number,
  buoyFlashInterval,
  buoyFlashLength,
  buoys
) {
  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      function (gltf) {
        let model = gltf.scene;
        model.position.set(
          Convert.distanceToThreeCanvas(relposXnm),
          0,
          Convert.distanceToThreeCanvas(relposYnm)
        );
        model.name = name;
        model.number = number;
        model.flashInterval = buoyFlashInterval;
        model.flashLength = buoyFlashLength;
        model.lightOn = true;
        buoys.add(model);
        resolve('success');
      },
      undefined,
      function (err) {
        reject(err);
      }
    );
  });
}

const getAudioPath = function (type) {
  return fogSignals[type];
};

// Create object with types of vessels and paths to audio

const fogSignals = {
  PDV: 'assets/pdv-fog-signal.mp3',
  SV: 'assets/lame-duck-fog-signal.mp3',
  VEIF: 'assets/lame-duck-fog-signal.mp3',
  NUC: 'assets/lame-duck-fog-signal.mp3',
  RAM: 'assets/lame-duck-fog-signal.mp3',
  anchorless100m: 'assets/at-anchor-less-than-100m.mp3',
};
