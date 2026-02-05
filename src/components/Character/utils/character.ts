// import * as THREE from "three";
// import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
// import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
// import { decryptFile } from "./decrypt";

// const setCharacter = (
//   renderer: THREE.WebGLRenderer,
//   scene: THREE.Scene,
//   camera: THREE.PerspectiveCamera
// ) => {
//   const loader = new GLTFLoader();
//   const dracoLoader = new DRACOLoader();
//   dracoLoader.setDecoderPath("/draco/");
//   loader.setDRACOLoader(dracoLoader);

//   const loadCharacter = () => {
//     return new Promise<GLTF | null>(async (resolve, reject) => {
//       try {
//         const encryptedBlob = await decryptFile(
//           "/models/character.enc",
//           "Character3D#@"
//         );
//         const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

//         let character: THREE.Object3D;
//         loader.load(
//           blobUrl,
//           async (gltf) => {
//             character = gltf.scene;
//             await renderer.compileAsync(character, camera, scene);
//             character.traverse((child: any) => {
//               if (child.isMesh) {
//                 const mesh = child as THREE.Mesh;
//                 child.castShadow = true;
//                 child.receiveShadow = true;
//                 mesh.frustumCulled = true;
//               }
//             });
//             resolve(gltf);
//             setCharTimeline(character, camera);
//             setAllTimeline();
//             character!.getObjectByName("footR")!.position.y = 3.36;
//             character!.getObjectByName("footL")!.position.y = 3.36;
//             dracoLoader.dispose();
//           },
//           undefined,
//           (error) => {
//             console.error("Error loading GLTF model:", error);
//             reject(error);
//           }
//         );
//       } catch (err) {
//         reject(err);
//         console.error(err);
//       }
//     });
//   };

//   return { loadCharacter };
// };

// export default setCharacter;


import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();

  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc",
        "Character3D#@",
      );

      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      const gltf: GLTF = await new Promise((resolve, reject) => {
        loader.load(
          blobUrl,
          (loadedGltf: GLTF) => resolve(loadedGltf),
          undefined,
          (error) => reject(error),
        );
      });

      const character = gltf.scene;

      await renderer.compileAsync(character, camera, scene);

      character.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.frustumCulled = true;
        }
      });

      setCharTimeline(character, camera);
      setAllTimeline();

      character.getObjectByName("footR")!.position.y = 3.36;
      character.getObjectByName("footL")!.position.y = 3.36;

      dracoLoader.dispose();

      return gltf;
    } catch (error) {
      console.error("Error loading character:", error);
      return null;
    }
  };

  return { loadCharacter };
};

export default setCharacter;