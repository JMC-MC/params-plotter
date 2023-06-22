// Imports
import * as THREE from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import * as Convert from '../utils/converters.js';
import { TSS, NC, params, shipsAfloat } from '../app.js';
import * as gameController from '../gameController.js';
import * as Ran from '../utils/randomizers.js';
import * as Load from './loaders.js';
import * as Light from './lights.js';
import { audioListener, playAudio } from './audio.js';
import { initControls } from './controls.js';
import { overHorizon, nameToIndex } from './shipHandler.js';

// Declare variables
let camera, scene, renderer;
let water, sun;
let bloomPass, bloomComposer, finalComposer, finalPass;
const parameters = {
  sunriseElevation: 2,
  sunsetElevation: 178,
  elevation: null,
  azimuth: 90,
  zoomed: false,
  turnRate: 0,
  currentBearing: 0,
};
const fps = 30;
let now;
let then = Date.now();
const interval = 1000 / fps;
let delta;
let buoys = new THREE.Group();
buoys.name = 'buoys';
let dark;
const buoyFlashInterval = 1000; // Milliseconds
const buoyFlashLength = 1000; // Milliseconds

// Create variable for selective bloom process
const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
const materials = {};

// Create scene
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  1,
  20000
);
camera.position.set(30, 30, 100);

camera.add(audioListener);

function buildThreeDRendering() {
  initControls();
  // Setup elevation from environment variable
  switch (params.environment) {
    case 'day':
      parameters.elevation = Ran.IntFromInterval(
        parameters.sunriseElevation,
        parameters.sunsetElevation
      );
      dark = false;
      break;
    case 'night':
      parameters.elevation = Ran.IntFromInterval(
        parameters.sunriseElevation,
        -parameters.sunsetElevation
      );
      dark = true;
      break;
  }
  //Rotate camera to own ships head
  // - pi/2 as the orientation for Paper JS is 90 degrees different.
  camera.rotation.y = -shipsAfloat[0].course - Math.PI / 2;
  $('#base-wrapper').css(
    'transform',
    'rotate(' +
      Math.round((shipsAfloat[0].course * 180) / Math.PI + 90) +
      'deg)'
  );

  // Start async loading models as soon as page loads
  const totalLoader = new Promise((resolve, reject) => {
    (async () => {
      try {
        const proms = [];
        //Loop through shipsAfloat and create a promise for each model loader
        shipsAfloat.slice(1).forEach((ship) => {
          proms.push(
            Load.shipModels(
              'assets/' + ship.type + '.glb',
              ship.relposXnm,
              ship.relposYnm,
              ship.course,
              ship.name,
              ship.type
            )
          );
        });
        // Add buoys for narrow channels
        if (NC) {
          NC.markers.relPositionsPort.forEach((marker, i) => {
            proms.push(
              Load.buoyModels(
                'assets/portMarker.glb',
                marker.x,
                marker.y,
                `port_marker_${i}`,
                i,
                buoyFlashInterval,
                buoyFlashLength,
                buoys
              )
            );
          });
          NC.markers.relPositionsStarboard.forEach((marker, i) => {
            proms.push(
              Load.buoyModels(
                'assets/stbMarker.glb',
                marker.x,
                marker.y,
                `starboard_marker_${i}`,
                i,
                buoyFlashInterval,
                buoyFlashLength,
                buoys
              )
            );
          });
        }
        const all = await Promise.all(proms);
        if (NC) scene.add(buoys);
        resolve(all);
      } catch (err) {
        reject(err);
      }
    })();
  });

  // Intiate other elements
  const init = new Promise((resolve, reject) => {
    renderer = new THREE.WebGLRenderer({
      canvas: ThreeDcanvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    //

    scene = new THREE.Scene();
    const renderScene = new RenderPass(scene, camera);

    //

    sun = new THREE.Vector3();

    // Water

    const waterGeometry = new THREE.PlaneGeometry(100000, 100000);

    water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        'assets/waternormals.jpg',
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });

    water.rotation.x = -Math.PI / 2;

    scene.add(water);

    // Skybox

    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;

    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    let renderTarget;

    //Fog
    if (params.environment === 'resVis') {
      skyUniforms['mieCoefficient'].value = 0.8;
      skyUniforms['mieDirectionalG'].value = 0.5;
      scene.fog = new THREE.Fog(0x484849, 1000, 1100);
      parameters.elevation = 55.23;
    }

    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms['sunPosition'].value.copy(sun);
      water.material.uniforms['sunDirection'].value.copy(sun).normalize();
      water.material.blendDst = 2;

      if (renderTarget !== undefined) renderTarget.dispose();

      renderTarget = pmremGenerator.fromScene(sky);

      scene.environment = renderTarget.texture;
    }

    updateSun();

    // Bloom
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 5;
    bloomPass.radius = 1;

    bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        defines: {},
      }),
      'baseTexture'
    );

    finalPass.needsSwap = true;

    finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    //Make Canvas responsive
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
      finalComposer.setSize(window.innerWidth, window.innerHeight);
    });
    window.addEventListener('orientationchange', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
      finalComposer.setSize(window.innerWidth, window.innerHeight);
    });

    // Instrument display

    $('#course-display')
      .empty()
      .append(
        `<p>${Convert.brngToFourFigStrng(
          Convert.vecAngleToCompassBrng(shipsAfloat[0].vector.angle).toFixed(1)
        )}&deg;</p>`
      );
    $('#speed-display')
      .empty()
      .append(`<p>${shipsAfloat[0].speed.toFixed(1)} Kts</p>`);

    resolve('success');
    reject('Error during intialization');
  });

  //Await init and animate to complete before animating

  (async () => {
    try {
      await Promise.all([totalLoader, init]);

      Light.shipSwitch(dark);

      animate();
      $('.threeOverlay').hide();
    } catch (err) {
      console.log(err);
    }
  })();
}

function animate() {
  requestAnimationFrame(animate);
  if (params.play === true) {
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      // update time variables
      then = now - (delta % interval);

      // update positions
      // Update ships
      gameController.updateShips(interval, params, shipsAfloat, TSS, NC);
      // Only call if three canvas is visible
      if ($('#lookOut').is(':visible')) {
        if (dark) renderBloom();
        render();
        controlCamera();
        showBrng();
        // Animate ships movement
        // Ship models can be found in scene.children
        for (let i = 2; i < scene.children.length; i++) {
          if (scene.children[i].name.startsWith('00')) {
            let shipName = scene.children[i].name;
            let indexNo = nameToIndex(shipName, shipsAfloat);
            scene.children[i].position.set(
              Convert.distanceToThreeCanvas(shipsAfloat[indexNo].relposXnm),
              0,
              Convert.distanceToThreeCanvas(shipsAfloat[indexNo].relposYnm)
            );

            // If dark control directional lights
            if (dark) {
              Light.simDirection(indexNo, scene.children[i]);
            }
            overHorizon(indexNo, scene.children[i], shipsAfloat); // If ship over 11nm away make invisible
            //Audio
            if ((shipName = '003')) {
              // Get audio element (last element in the model)
              const audio =
                scene.children[i].children[
                  scene.children[i].children.length - 1
                ];
              if (audio.isPlaying == false) {
                playAudio();
              }
            }
          }
          // Animate buoys
          if (NC && scene.children[i].name == 'buoys') {
            for (let j = 0; j < scene.children[i].children.length; j++) {
              const MarkerNumber = scene.children[i].children[j].number;
              if (scene.children[i].children[j].name.startsWith('port')) {
                const range = Math.sqrt(
                  Math.pow(NC.markers.relPositionsPort[MarkerNumber].x, 2) +
                    Math.pow(NC.markers.relPositionsPort[MarkerNumber].y, 2)
                );
                if (range > 11) scene.children[i].children[j].visible = false;
                else {
                  scene.children[i].children[j].visible = true;
                  scene.children[i].children[j].position.set(
                    Convert.distanceToThreeCanvas(
                      NC.markers.relPositionsPort[MarkerNumber].x
                    ),
                    0,
                    Convert.distanceToThreeCanvas(
                      NC.markers.relPositionsPort[MarkerNumber].y
                    )
                  );
                }
              } else if (
                scene.children[i].children[j].name.startsWith('starboard')
              ) {
                const range = Math.sqrt(
                  Math.pow(
                    NC.markers.relPositionsStarboard[MarkerNumber].x,
                    2
                  ) +
                    Math.pow(
                      NC.markers.relPositionsStarboard[MarkerNumber].y,
                      2
                    )
                );
                // Make invisible if over 11nm
                if (range > 11) scene.children[i].children[j].visible = false;
                else {
                  scene.children[i].children[j].visible = true;
                  scene.children[i].children[j].position.set(
                    Convert.distanceToThreeCanvas(
                      NC.markers.relPositionsStarboard[MarkerNumber].x
                    ),
                    0,
                    Convert.distanceToThreeCanvas(
                      NC.markers.relPositionsStarboard[MarkerNumber].y
                    )
                  );
                }
              }
              // Animate Flashing light
              if (scene.children[i].children[j].visible == true && dark)
                Light.flash(scene.children[i].children[j]);
            }
          }
        }
      }
    }
  }
}
// Other functions

function controlCamera() {
  //Zoomed variable
  if (!parameters.zoomed) {
    camera.fov = 45;
    camera.updateProjectionMatrix();
  } else {
    camera.fov = 20;
    camera.updateProjectionMatrix();
  }

  camera.rotation.y += parameters.turnRate;
}

function showBrng() {
  let vector = new THREE.Vector3();
  camera.getWorldDirection(vector);
  // Add Pi/2 to get back to north up orientation.
  let radians = Math.atan2(vector.z, vector.x) + Math.PI / 2;
  // Convert to bearing for bearing logger
  if (radians < 0) radians += 2 * Math.PI;
  parameters.currentBearing = Math.round((radians * 180) / Math.PI);
  // Create an array of bearings 1 degree apart
  let bearings = [
    radians - 0.035,
    radians - 0.0175,
    radians,
    radians + 0.0175,
    radians + 0.035,
  ];
  // Convert all radians to degrees add 00s and convert to strings
  bearings.forEach(function (bearing, index) {
    // Add 90 degrees
    if (bearing < 0) bearing += 2 * Math.PI;
    let rounded = Math.round((bearing * 180) / Math.PI);
    bearings[index] = Convert.brngToFourFigStrng(rounded);
  });
  $('#orientator').css('transform', 'rotate(' + bearings[2] + 'deg)');
  $('#vis-bearing').text('');
  bearings[2] = '<span id=fcsBrng>' + bearings[2] + '</span>';
  $('#vis-bearing').append(bearings.join('  '));
}

function render() {
  const time = performance.now() * 0.001;
  if (water.material.uniforms) {
    water.material.uniforms['time'].value += 1.0 / 60.0;
  }

  renderer.render(scene, camera);
  // render scene with bloom
  renderBloom(true);
  // render the entire scene, then render bloom scene on top
  finalComposer.render();
}

// Blacking out scene and then restoring
function renderBloom(mask) {
  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.traverse(restoreMaterial);
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && !obj.name.includes('light')) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

// Function to clear the scene
export function clearScene() {
  // Remove all objects from the scene
  while (scene.children.length > 0) {
    var child = scene.children[0];
    scene.remove(child);
  }

  // Remove all lights from the scene
  scene.traverse(function (object) {
    if (object instanceof THREE.Light) {
      scene.remove(object);
    }
  });

  // Remove all cameras from the scene
  scene.traverse(function (object) {
    if (object instanceof THREE.Camera) {
      scene.remove(object);
    }
  });
}

export { buildThreeDRendering, scene, parameters };
