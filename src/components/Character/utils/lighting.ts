import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

// Extend Scene safely (Three.js r155+ props)
type SceneWithEnv = THREE.Scene & {
  environmentIntensity: number;
  environmentRotation: THREE.Euler;
};

const setLighting = (scene: THREE.Scene) => {
  const sceneEnv = scene as SceneWithEnv;

  // ---------- Directional Light ----------
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  // ---------- Point Light ----------
  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // ---------- HDR Environment ----------
  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;

      sceneEnv.environmentIntensity = 0;
      sceneEnv.environmentRotation = new THREE.Euler(5.76, 85.85, 1);
    });

  // ---------- Screen Glow → Point Light ----------
  
  // function setPointLight(
  //   screenLight: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>,
  // ) {
  //   if (screenLight.material.opacity > 0.9) {
  //     pointLight.intensity = screenLight.material.emissiveIntensity * 20;
  //   } else {
  //     pointLight.intensity = 0;
  //   }
  // }

  function setPointLight(screenLight: THREE.Object3D | null) {
    if (
      !screenLight ||
      !(screenLight instanceof THREE.Mesh) ||
      !screenLight.material ||
      Array.isArray(screenLight.material)
    ) {
      pointLight.intensity = 0;
      return;
    }

    const material = screenLight.material as THREE.MeshStandardMaterial;

    if (material.opacity > 0.9) {
      pointLight.intensity = (material.emissiveIntensity || 1) * 20;
    } else {
      pointLight.intensity = 0;
    }
  }


  // ---------- Light Animation ----------
  function turnOnLights() {
    gsap.to(sceneEnv, {
      environmentIntensity: 0.64,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to(directionalLight, {
      intensity: 1,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return {
    setPointLight,
    turnOnLights,
  };
};

export default setLighting;
