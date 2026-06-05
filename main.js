// import three

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getFresnelMat  } from "./getFresnelMat.js";
import getStarfield  from "./getStarfield.js";
//create scene and camera:
const speed = 0.001;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const sunDirection = new THREE.Vector3(-2, 0.5, 1.5);





const rander = new THREE.WebGLRenderer();
rander.setSize(window.innerWidth, window.innerHeight);
rander.setAnimationLoop(animate);
document.body.appendChild(rander.domElement);
new OrbitControls(camera, rander.domElement);
//shepes:
const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);
const stars = getStarfield();
scene.add(stars); 
const texture = new THREE.TextureLoader();
const earthTexture = texture.load("./textures/earth-map-5k.jpg");
const geometry = new THREE.SphereGeometry(1.2, 64, 32);
const material = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

//object ligth earth texture:
const light_mat = new THREE.MeshBasicMaterial({map: texture.load('./textures/earth-nightmap-4k.jpg'), blending: THREE.AdditiveBlending });
const earthLight = new THREE.Mesh(geometry, light_mat);
earthGroup.add(earthLight);
// end light


//cluad:
const cloudMat = new THREE.MeshStandardMaterial({
    map: texture.load('./textures/earth-clouds-4k.jpg'),
    blending: THREE.AdditiveBlending,
});
const cloudMesh = new THREE.Mesh(geometry, cloudMat);
cloudMesh.scale.setScalar(1.003);
earthGroup.add(cloudMesh);
//end

//glowing:

const frensnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, frensnelMat);
glowMesh.scale.setScalar(1.01)
earthGroup.add(glowMesh);

//end

const sphere = new THREE.Mesh(geometry, material);
earthGroup.add(sphere);
const sunLight = new THREE.DirectionalLight(0xffffff, 0.5);
sunLight.position.copy(sunDirection);
scene.add(sunLight);

// camera position:
camera.position.set(0.1, 0,5);

//function loop:
function animate(time = 0) {

  sphere.rotation.y += speed;
  earthLight.rotation.y += speed;
  cloudMesh.rotation.y += speed + 0.001;
  glowMesh.rotation.y += speed;
  rander.render(scene, camera);

}
