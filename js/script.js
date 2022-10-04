// import "../css/style.css";
// import "../css/animate.css";
// import "../css/font-awesome.css";
// import "../css/font-awesome.min.css";
// import "../css/namari-color.css";

import * as THREE from "three";
import gsap from "gsap";

const parameters = {
  materialColor: "#b90000",
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/1.png");
const renderTexture = textureLoader.load("/textures/diamond/render.jpg");
const normalTexture = textureLoader.load("/textures/diamond/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/diamond/ambientOcclusion.jpg"
);
const displacementTexture = textureLoader.load(
  "/textures/diamond/displacement.jpg"
);
const colorTexture = textureLoader.load("/textures/diamond/color.jpg");
const specularityTexture = textureLoader.load(
  "/textures/diamond/specularity.jpg"
);

// const gradientTexture = textureLoader.load("textures/gradients/5.jpg");
// gradientTexture.magFilter = THREE.NearestFilter;

const material = new THREE.MeshStandardMaterial({
  // map: colorTexture,
  // displacementMap: displacementTexture,
  aoMap: ambientOcclusionTexture,
  normalMap: normalTexture,
  displacementMap: displacementTexture,
  displacementScale: 0.0,
  metalness: 0.3,
  roughness: 0.2,
  color: "#b90000",
  alphaMap: specularityTexture,
  aoMapIntensity: 1,
  flatShading: true,

  // gradientMap: gradientTexture,
  // shininess: 150,
  // flatShading: true,
});

const objectDistance = 4;

const mesh1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 10), material);

// const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);

// const mesh3 = new THREE.Mesh(new THREE.OctahedronGeometry(1, 1), material);

mesh1.position.y = -objectDistance * -0.08;
mesh1.position.x = 1;

// mesh2.position.y = -objectDistance * 1;
// mesh2.position.x = -2;

// mesh3.position.y = -objectDistance * 2;
// mesh3.position.x = 2;

scene.add(mesh1);

const sectionMeshes = [mesh1];

let currentIntersect = null;

const raycaster = new THREE.Raycaster();

const intersects = raycaster.intersectObjects(sectionMeshes);

if (intersects.length) {
  if (currentIntersect === null) {
  }
  currentIntersect = intersects[0];
} else {
  currentIntersect = null;
}
// const particlesCount = 1500;
// const positions = new Float32Array(particlesCount * 3);

// for (let i = 0; i < particlesCount; i++) {
//   positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
//   positions[i * 3 + 1] = objectDistance * 0.5 - Math.random() * 15;
//   positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
// }

// const particlesGeometry = new THREE.BufferGeometry();
// particlesGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions, 3)
// );

// const particlesMaterial = new THREE.PointsMaterial({
//   color: "black",
//   sizeAttenuation: true,
//   size: 0.03,
//   transparent: true,
//   alphaMap: particleTexture,
//   map: particleTexture,
//   depthTest: false,
//   blending: THREE.AdditiveBlending,
// });

// const particles = new THREE.Points(particlesGeometry, particlesMaterial);

// scene.add(particles);

const directionalLight = new THREE.DirectionalLight("#ffffff", 1.1);
directionalLight.position.set(1, 0, 1);
scene.add(directionalLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("load", () => {
  const newSection = Math.round(scrollY / sizes.height);

  currentSection = newSection;
  gsap.to(sectionMeshes[currentSection].rotation, {
    duration: 3,
    ease: "power.inOut",
    y: "+=5",
    x: "+=1",
  });
});

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    currentSection = newSection;
    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power.inOut",
      y: "+=3",
      x: "+=1",
    });
  }
});

// window.addEventListener("click", (e) => {
//   const newSection = Math.round(scrollY / sizes.height);

//   currentSection = newSection;
//   gsap.to(sectionMeshes[currentSection].rotation, {
//     duration: 3,
//     ease: "power.inOut",
//     y: "+=5",
//     x: "+=1",
//   });
// });

const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.1;
  cursor.y = e.clientY / sizes.height - 0.1;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  camera.position.y = (-scrollY / sizes.height) * objectDistance;

  const parallaxX = cursor.x;
  const parallaxY = cursor.y;
  // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.0009;
  // cameraGroup.position.y += (-parallaxY - cameraGroup.position.y) * 0.0009;

  for (const mesh of sectionMeshes) {
    mesh.rotation.x += deltaTime * 0.1;
    mesh.rotation.y += deltaTime * 0.4;
  }

  raycaster.setFromCamera(cursor, camera);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
