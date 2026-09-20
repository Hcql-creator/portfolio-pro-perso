import ScrollManager from "@/app/managers/ScrollManager";
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

  // Update Scrolling
  let scrollDelta =
    (ScrollManager.getTarget() - ScrollManager.getScroll()) * 0.2;

  scrollDelta = Math.round(scrollDelta * 100) / 100;
  ScrollManager.updateScroll(ScrollManager.getScroll() + scrollDelta);

  // Zooming
  camera.position.y = ScrollManager.getScroll();

  // Complete the re-render
  const animationID = requestAnimationFrame(() =>
    animateRender(composer, camera),
  );
  composer.render();

  return animationID;
};

export default animateRender;
