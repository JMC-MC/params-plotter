// Imports
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import * as Convert from './utils/converters.js';
import { updateShips, NC, params } from './app.js';

// Declare variables
let camera, scene, renderer;
let water, sun;
let bloomPass, bloomComposer, finalComposer, finalPass;
const parameters = {
  elevation: -10,
  azimuth: 90,
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
// Declare variable for controls
let zoomed = false;
let turnRate = 0;

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

// audio

const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener();
camera.add(listener);

//Make each loader a promise
var loader = new GLTFLoader();

// Create object with types of vessels and paths to audio

const fogSignals = {
  PDV: '/assets/pdv-fog-signal.mp3',
  SV: '/assets/lame-duck-fog-signal.mp3',
  VEIF: '/assets/lame-duck-fog-signal.mp3',
  NUC: '/assets/lame-duck-fog-signal.mp3',
  RAM: '/assets/lame-duck-fog-signal.mp3',
  anchorless100m: '/assets/at-anchor-less-than-100m.mp3',
};

const loaderProm = (modelPath, relposXnm, relposYnm, course, name, type) => {
  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      function (gltf) {
        let model = gltf.scene;
        model.position.set(convertPos(relposXnm), 0, convertPos(relposYnm));
        // Three JS rotates anti-clockwise, subtract angles from Paper JS
        model.rotation.y = -course;
        model.name = name;
        if (params.resVis) {
          // Add audio
          audioLoader.load(getAudioPath(type), function (buffer) {
            const audio = new THREE.PositionalAudio(listener);
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
};

const buoyLoaderProm = (modelPath, relposXnm, relposYnm, name, number) => {
  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      function (gltf) {
        let model = gltf.scene;
        model.position.set(convertPos(relposXnm), 0, convertPos(relposYnm));
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
};

function buildThreeDRendering() {
  //Rotate camera to own ships head
  // - pi/2 as the orientation for Paper JS is 90 degrees different.
  camera.rotation.y = -window.shipsAfloat[0].course - Math.PI / 2;
  $('#base-wrapper').css(
    'transform',
    'rotate(' +
      Math.round((shipsAfloat[0].course * 180) / Math.PI + 90) +
      'deg)'
  );

  parameters.elevation = params.elevation;

  // Start async loading models as soon as page loads
  const totalLoader = new Promise((resolve, reject) => {
    (async () => {
      try {
        const proms = [];
        //Loop through shipsAfloat and create a promise for each model loader
        window.shipsAfloat.slice(1).forEach((ship) => {
          proms.push(
            loaderProm(
              '/assets/' + ship.type + '.glb',
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
              buoyLoaderProm(
                '/assets/portMarker.glb',
                marker.x,
                marker.y,
                `port_marker_${i}`,
                i
              )
            );
          });
          NC.markers.relPositionsStarboard.forEach((marker, i) => {
            proms.push(
              buoyLoaderProm(
                '/assets/stbMarker.glb',
                marker.x,
                marker.y,
                `starboard_marker_${i}`,
                i
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
        '/assets/waternormals.jpg',
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
    if (params.resVis) {
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

    $('#course-display').append(
      `<p>${Convert.brngToFourFigStrng(
        Convert.vecAngleToCompassBrng(
          window.shipsAfloat[0].vector.angle
        ).toFixed(1)
      )}&deg;</p>`
    );
    $('#speed-display').append(
      `<p>${window.shipsAfloat[0].speed.toFixed(1)} Kts</p>`
    );

    resolve('success');
    reject('Error during intialization');
    console.log(scene);
  });

  //Await init and animate to complete before animating

  (async () => {
    try {
      await Promise.all([totalLoader, init]);
      // Set dark variable
      if (parameters.elevation > 2 && parameters.elevation < 178) dark = false;
      else {
        dark = true;
        shipLightControl(dark);
      }

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
      updateShips(interval);
      // Only call if three canvas is visible
      if ($('#lookOut').is(':visible')) {
        if (dark) renderBloom();
        render();
        control();
        showBrng();
        // Animate ships movement
        // Ship models can be found in scene.children
        for (let i = 2; i < scene.children.length; i++) {
          if (scene.children[i].name.startsWith('00')) {
            let shipName = scene.children[i].name;
            // Find the index number for ship with the same name from the shipsAfloat array
            // Defined in nameToIndex function
            let indexNo = nameToIndex(shipName);
            scene.children[i].position.set(
              convertPos(window.shipsAfloat[indexNo].relposXnm),
              0,
              convertPos(window.shipsAfloat[indexNo].relposYnm)
            );

            // If dark control directional lights
            if (dark) {
              dLights(indexNo, scene.children[i]);
            }
            overHorizon(indexNo, scene.children[i]); // If ship over 11nm away make invisible
            //Audio
            if ((shipName = '003')) {
              // Get audio element (last element in the model)
              const audio =
                scene.children[i].children[
                  scene.children[i].children.length - 1
                ];
              if (audio.isPlaying == false) {
                audio.play();
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
                    convertPos(NC.markers.relPositionsPort[MarkerNumber].x),
                    0,
                    convertPos(NC.markers.relPositionsPort[MarkerNumber].y)
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
                    convertPos(
                      NC.markers.relPositionsStarboard[MarkerNumber].x
                    ),
                    0,
                    convertPos(NC.markers.relPositionsStarboard[MarkerNumber].y)
                  );
                }
              }
              // Animate Flashing light
              if (scene.children[i].children[j].visible == true && dark)
                flashLight(scene.children[i].children[j]);
            }
          }
        }
      }
    }
  }
}
// Other functions

// If ship over 11nm away make invisible
function overHorizon(indexNo, shipObject) {
  if (window.shipsAfloat[indexNo].range > 11) shipObject.visible = false;
  else shipObject.visible = true;
}

// Turn directional lights on/off;
function dLights(indexNo, shipObject) {
  const shipUSN = window.shipsAfloat[indexNo].USNRel;
  shipObject.traverse((el) => {
    // Starboard side light
    if (
      el.name.includes('SG') &&
      ((shipUSN > 0 && shipUSN < 112.5) || (shipUSN > 354 && shipUSN < 360))
    )
      el.visible = true;
    if (el.name.includes('SG') && shipUSN > 112.5 && shipUSN < 354)
      el.visible = false;
    // Port side light
    if (
      el.name.includes('SR') &&
      ((shipUSN > 247.5 && shipUSN < 360) || (shipUSN > 0 && shipUSN < 4))
    )
      el.visible = true;
    if (el.name.includes('SR') && shipUSN > 4 && shipUSN < 247.5)
      el.visible = false;
    // Mast Head light
    if (
      el.name.includes('MH') &&
      ((shipUSN > 247.5 && shipUSN < 360) || (shipUSN > 0 && shipUSN < 112.5))
    )
      el.visible = true;
    if (el.name.includes('MH') && shipUSN > 112.5 && shipUSN < 247.5)
      el.visible = false;
    // Stern light
    if (el.name.includes('STRN') && shipUSN > 112.5 && shipUSN < 247.5)
      el.visible = true;
    if (el.name.includes('STRN') && shipUSN > 0 && shipUSN < 112.5)
      el.visible = false;
    if (el.name.includes('STRN') && shipUSN > 247.5 && shipUSN < 360)
      el.visible = false;
  });
}

// ShipsAfloat and Scene do not have the ships in the same order. Therefore match name to index.
function nameToIndex(shipName) {
  return window.shipsAfloat.findIndex(function checkName(array) {
    return array.name == shipName;
  });
}
// Ship Lights functions

function shipLightControl(dark) {
  // All lights are visible by default
  // Turn off all lights if dark is false
  if (!dark) {
    scene.traverse((obj) => {
      if (obj.name.includes('light')) {
        obj.visible = false;
      }
    });
  }
}

function startFlashing(buoy) {
  const randomTimeDelta = Math.random() * buoyFlashLength;
  buoy.lastSwitch = Date.now() - randomTimeDelta;
}

function flashLight(buoy) {
  if (!buoy.lastSwitch) startFlashing(buoy); // Start flashing sequence at different times
  const timeSinceSwitch = Date.now() - buoy.lastSwitch;
  // If light is on and time since last switch is greater than flash length turn it off
  if (buoy.lightOn && timeSinceSwitch > buoy.flashLength) {
    buoy.traverse((obj) => {
      if (obj.name.includes('light')) {
        obj.visible = false;
      }
      buoy.lightOn = false;
      buoy.lastSwitch = Date.now();
    });
    // If light is off and time since last switch is greater than flash interval length turn it on
  } else if (!buoy.lightOn && timeSinceSwitch > buoy.flashInterval) {
    buoy.traverse((obj) => {
      if (obj.name.includes('light')) {
        obj.visible = true;
      }
      buoy.lightOn = true;
      buoy.lastSwitch = Date.now();
    });
  }
}

function control() {
  //Zoomed variable
  if (!zoomed) {
    camera.fov = 45;
    camera.updateProjectionMatrix();
  } else {
    camera.fov = 20;
    camera.updateProjectionMatrix();
  }

  camera.rotation.y += turnRate;
}

//Bearing Display
let currentBearing = '';

function showBrng() {
  let vector = new THREE.Vector3();
  camera.getWorldDirection(vector);
  // Add Pi/2 to get back to north up orientation.
  let radians = Math.atan2(vector.z, vector.x) + Math.PI / 2;
  // Convert to bearing for bearing logger
  if (radians < 0) radians += 2 * Math.PI;
  currentBearing = Math.round((radians * 180) / Math.PI);
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

//Scale 12NM = 12000M
function convertPos(pos) {
  var b = pos * 1000;
  return b;
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

const getAudioPath = function (type) {
  return fogSignals[type];
};

const playAudio = function () {
  console.log('Fired play audio');
  scene.traverse((obj) => {
    if (obj.type == 'Audio') {
      console.log(obj);
      obj.context.resume();
    }
  });
};
// On document ready
$(function () {
  // Change view
  $('#zoom-view').on('touchstart mousedown', function () {
    zoomed = true;
    $('#zoom-view').addClass('view-selected');
    $('#eye-view').removeClass('view-selected');
    $('#compass-view').removeClass('view-selected');
    if ($('#compass-cont').is(':visible')) $('#compass-cont').toggle();
    if ($('#instrument-panel').is(':visible'));
    else $('#instrument-panel').toggle();
    $('#left-arrow i')
      .addClass('fa-duotone fa-chevrons-left')
      .removeClass('fa-regular fa-chevron-left');
    $('#right-arrow i')
      .addClass('fa-duotone fa-chevrons-right')
      .removeClass('fa-regular fa-chevron-right');
  });

  $('#eye-view').on('touchstart mousedown', function () {
    zoomed = false;
    $('#eye-view').addClass('view-selected');
    $('#zoom-view').removeClass('view-selected');
    $('#compass-view').removeClass('view-selected');
    if ($('#compass-cont').is(':visible')) $('#compass-cont').toggle();
    if ($('#instrument-panel').is(':visible'));
    else $('#instrument-panel').toggle();
    // Change arrows
    $('#left-arrow i')
      .addClass('fa-duotone fa-chevrons-left')
      .removeClass('fa-regular fa-chevron-left');
    $('#right-arrow i')
      .addClass('fa-duotone fa-chevrons-right')
      .removeClass('fa-regular fa-chevron-right');
  });

  $('#compass-view').on('touchstart mousedown', function () {
    zoomed = false;
    $('#eye-view').removeClass('view-selected');
    $('#zoom-view').removeClass('view-selected');
    $('#compass-view').addClass('view-selected');
    if ($('#compass-cont').is(':visible'));
    else $('#compass-cont').toggle();
    if ($('#instrument-panel').is(':visible')) $('#instrument-panel').toggle();
    bearingLogger(true);
    // Change arrows
    $('#left-arrow i')
      .addClass('fa-regular fa-chevron-left')
      .removeClass('fa-duotone fa-chevrons-left');
    $('#right-arrow i')
      .addClass('fa-regular fa-chevron-right')
      .removeClass('fa-duotone fa-chevrons-right');
  });

  // Camera Controls

  // Controls
  $('#left-arrow').on(
    'hover',
    function (e) {
      $(this).css('color', 'rgba(255, 255, 255, 1)');
    },
    function () {
      $(this).css('color', 'rgba(255, 255, 255, 0.75)');
    }
  );

  $('#left-arrow').on('touchstart mousedown', function (e) {
    e.preventDefault();
    if ($('#compass-cont').is(':visible')) {
      turnRate = 0.0009;
      bearingLogger();
    } else turnRate = 0.01;
    $(this).css('color', 'rgba(255, 255, 255, 1)');
  });

  $('#left-arrow').on('touchend mouseup', function (e) {
    e.preventDefault();
    turnRate = 0;
    $(this).css('color', 'rgba(255, 255, 255, 0.75)');
  });
  // Keys
  $(document).on('keydown', function (e) {
    if (e.which == 37) {
      if ($('#compass-cont').is(':visible')) {
        turnRate = 0.0009;
        bearingLogger();
      } else turnRate = 0.01;
    }
  });

  $(document).on('keyup', function (e) {
    if (e.which == 37) {
      turnRate = 0;
    }
  });

  $('#right-arrow').on(
    'hover',
    function (e) {
      $(this).css('color', 'rgba(255, 255, 255, 1)');
    },
    function () {
      $(this).css('color', 'rgba(255, 255, 255, 0.75)');
    }
  );

  $('#right-arrow').on('touchstart mousedown', function (e) {
    e.preventDefault();
    if ($('#compass-cont').is(':visible')) {
      turnRate = -0.0009;
      bearingLogger();
    } else turnRate = -0.01;
    $(this).css('color', 'rgba(255, 255, 255, 1)');
  });
  $('#right-arrow').on('touchend mouseup', function (e) {
    e.preventDefault();
    turnRate = 0;
    $(this).css('color', 'rgba(255, 255, 255, 0.75)');
  });

  //Keys
  $(document).on('keydown', function (e) {
    if (e.which == 39) {
      if ($('#compass-cont').is(':visible')) {
        turnRate = -0.0009;
        bearingLogger();
      } else turnRate = -0.01;
    }
  });

  $(document).on('keyup', function (e) {
    if (e.which == 39) {
      turnRate = 0;
    }
  });
  // Call for bearing logger and playAudio
  $('#lookout-button').on('touchstart mousedown', function () {
    bearingLogger(); // Check if bearing is being taken. This is to capture occasions when the compass is left displayed and view is changed from and then back to look out.
    playAudio(); //
  });
});

// Bearing Logger
let currentTime = '';
const bearingLogger = function (clickedCompass) {
  // Only log when using compass
  const timeAtLastClick = currentTime;
  currentTime = Date.now();
  // Time since last rotation click
  const dwellTime = currentTime - timeAtLastClick;

  // Check if bearing has been taken
  window.shipsAfloat.slice(1).forEach((ship) => {
    // Get absolute difference between currentBearing and ship bearing
    const bearingDiff = Math.abs(
      Convert.vecAngleToCompassBrng(Math.round(ship.vecOwnShip.angle)) -
        currentBearing
    );
    if (dwellTime > 1000 && bearingDiff < 3) {
      -console.log(
        `bearingDiff = ${bearingDiff} | dwellTime = ${dwellTime} |  actualBearing = ${ship.bearing}`
      );
      ship.bearingsTaken.push(timeAtLastClick);
    }
    // Change to compass view already on the right bearing "clickedCompass"
    // Ignore dwellTime
    if (clickedCompass && bearingDiff < 4) {
      ship.bearingsTaken.push(currentTime);
    }
  });
};
export { buildThreeDRendering };
