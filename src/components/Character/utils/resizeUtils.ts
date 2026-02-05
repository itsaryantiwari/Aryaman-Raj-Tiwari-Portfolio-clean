// import React from "react";
// import * as THREE from "three";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

// export default function handleResize(
//   renderer: THREE.WebGLRenderer,
//   camera: THREE.PerspectiveCamera,
//   canvasDiv: React.RefObject<HTMLDivElement>,
//   character: THREE.Object3D,
// ) {
//   if (!canvasDiv.current) return;
//   let canvas3d = canvasDiv.current!.getBoundingClientRect();
//   const width = canvas3d.width;
//   const height = canvas3d.height;
//   renderer.setSize(width, height);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
//   const workTrigger = ScrollTrigger.getById("work");
//   ScrollTrigger.getAll().forEach((trigger) => {
//     if (trigger != workTrigger) {
//       trigger.kill();
//     }
//   });
//   setCharTimeline(character, camera);
//   setAllTimeline();
// }


import type React from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D,
): void {
  const canvasEl = canvasDiv.current;
  if (!canvasEl) return;

  const { width, height } = canvasEl.getBoundingClientRect();

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const workTrigger = ScrollTrigger.getById("work");

  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger !== workTrigger) {
      trigger.kill();
    }
  });

  setCharTimeline(character, camera);
  setAllTimeline();
}
