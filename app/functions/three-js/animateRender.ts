import { EffectComposer } from "three/examples/jsm/Addons.js";

/**
 * Handles the Three.JS animation on each frame.
 *
 * @param composer the composer of the scene
 * @returns the id of the animationFrame
 */
const animateRender = (composer: EffectComposer) => {
  const animationID = requestAnimationFrame(() => animateRender(composer));
  composer.render();

  return animationID;
};

export default animateRender;
