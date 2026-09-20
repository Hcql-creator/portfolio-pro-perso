import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import LaptopAnimationManager from "@/app/managers/landing-page/LaptopAnimationManager";

/**
 * Loads the laptop model from the '/models/laptop-3d-model.glb' path and adds it to the given scene.
 *
 * @param scene the scene we want the 3d laptop model to be added to
 */
const loadLaptopModel = async (scene: THREE.Scene) => {
  try {
    const loader = new GLTFLoader();

    const glb = await loader.loadAsync("/models/laptop-3d-model.glb");

    const laptop = glb.scene;

    // Trap the laptop in a box of it's size
    let box = new THREE.Box3().setFromObject(laptop);
    const size = box.getSize(new THREE.Vector3());

    // Take the larger side of our box
    const maxDimension = Math.max(size.x, size.y, size.z);

    // Scale the laptop to reach a value of 5
    const scale = 5 / maxDimension;
    laptop.scale.setScalar(scale);

    // Compute new laptop box
    box = new THREE.Box3().setFromObject(laptop);

    // Substract to the laptop position it's own position (its coordinates become (0, 0, 0))
    const center = box.getCenter(new THREE.Vector3());
    laptop.position.sub(center);

    scene.add(laptop);
  } catch (e) {
    console.error("An error occured while loading the laptop model:", e);
  }
};

export default loadLaptopModel;
