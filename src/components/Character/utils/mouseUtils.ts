import * as THREE from "three";

// ---------- Mouse Move ----------
export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void,
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

// ---------- Touch Move ----------
export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void,
) => {
  if (event.touches.length === 0) return;

  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

// ---------- Touch End ----------
export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number,
  ) => void,
) => {
  setTimeout(() => {
    setMousePosition(0, 0, 0.03, 0.03);

    setTimeout(() => {
      setMousePosition(0, 0, 0.1, 0.2);
    }, 1000);
  }, 2000);
};

// ---------- Head Rotation ----------
export const handleHeadRotation = (
  headBone: THREE.Object3D | null,
  mouseX: number,
  mouseY: number,
  interpolationX: number,
  interpolationY: number,
  lerp: (from: number, to: number, t: number) => number,
) => {
  if (!headBone) return;

  const maxRotationY = Math.PI / 6;
  const minRotationX = -0.3;
  const maxRotationX = 0.4;

  if (window.scrollY < 200) {
    // Y rotation (left-right)
    headBone.rotation.y = lerp(
      headBone.rotation.y,
      mouseX * maxRotationY,
      interpolationY,
    );

    // X rotation (up-down)
    if (mouseY > minRotationX) {
      if (mouseY < maxRotationX) {
        headBone.rotation.x = lerp(
          headBone.rotation.x,
          -mouseY - 0.5 * maxRotationY,
          interpolationX,
        );
      } else {
        headBone.rotation.x = lerp(
          headBone.rotation.x,
          -maxRotationX - 0.5 * maxRotationY,
          interpolationX,
        );
      }
    } else {
      headBone.rotation.x = lerp(
        headBone.rotation.x,
        -minRotationX - 0.5 * maxRotationY,
        interpolationX,
      );
    }
  } else {
    // Idle pose after scroll
    if (window.innerWidth > 1024) {
      headBone.rotation.x = lerp(headBone.rotation.x, -0.4, 0.03);
      headBone.rotation.y = lerp(headBone.rotation.y, -0.3, 0.03);
    }
  }
};
