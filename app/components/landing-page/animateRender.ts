import LaptopAnimationManager from "@/app/managers/landing-page/LaptopAnimationManager";
import { PerspectiveCamera } from "three";
import { EffectComposer } from "three/examples/jsm/Addons.js";

/**
 * Handles the Three.JS animation on each frame.
 *
 * @param composer the composer of the scene
 * @param camera the camera of the scene
 * @returns the id of the animationFrame
 */
const animateRender = (composer: EffectComposer, camera: PerspectiveCamera) => {
  // --- Manage animations ---
  LaptopAnimationManager.performAnimation();

  // Complete the re-render
  const animationID = requestAnimationFrame(() =>
    animateRender(composer, camera),
  );
  composer.render();

  return animationID;
};

export default animateRender;
