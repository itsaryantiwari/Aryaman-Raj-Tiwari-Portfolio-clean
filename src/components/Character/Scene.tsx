import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import setProgress from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef(new THREE.Scene());

  //const [character, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    const canvasEl = canvasDiv.current;
    if (!canvasEl) return;

    // ---------------- Scene Setup ----------------
    const rect = canvasEl.getBoundingClientRect();
    const scene = sceneRef.current;
    const aspect = rect.width / rect.height;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasEl.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    // ---------------- Variables ----------------
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    const clock = new THREE.Clock();

    const light = setLighting(scene);
    const { loadCharacter } = setCharacter(renderer, scene, camera);
    setProgress({ percent: 0 });

    // ---------------- Load Character ----------------
    loadCharacter().then((gltf) => {
      if (!gltf) return;

      const animations = setAnimations(gltf);
      mixer = animations.mixer;

      const model = gltf.scene;
      //setChar(model);
      scene.add(model);

      headBone = model.getObjectByName("spine006") ?? null;
      screenLight = model.getObjectByName("screenlight") ?? null;

      if (hoverDivRef.current) {
        animations.hover(gltf, hoverDivRef.current);
      }

      setTimeout(() => {
        light.turnOnLights();
        animations.startIntro();
      }, 2500);

      const onResize = () => handleResize(renderer, camera, canvasDiv, model);
      window.addEventListener("resize", onResize);
    });

    // ---------------- Mouse / Touch ----------------
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    let debounce: number | undefined;

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y })),
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, ix, iy) => {
        mouse = { x, y };
        interpolation = { x: ix, y: iy };
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    // ---------------- Animation Loop ----------------
    const animate = () => {
      requestAnimationFrame(animate);

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp,
        );

        light.setPointLight(screenLight);
      }

      const delta = clock.getDelta();
      mixer?.update(delta);
      renderer.render(scene, camera);
    };

    animate();

    // ---------------- Cleanup ----------------
    return () => {
      clearTimeout(debounce);
      scene.clear();
      renderer.dispose();

      document.removeEventListener("mousemove", onMouseMove);

      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }

      if (canvasEl.contains(renderer.domElement)) {
        canvasEl.removeChild(renderer.domElement);
      }
    };

    /// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
