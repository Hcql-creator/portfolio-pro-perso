import { EffectComposer } from "three/examples/jsm/Addons.js";

/**
 * Handles the Three.JS animation on each frame.
 *
 * @param composer the composer of the scene
 */
const animateRender = (composer: EffectComposer) => {
  let animationID: number;

  const animate = () => {
    animationID = requestAnimationFrame(animate);
    composer.render();
  };

  animate();

  return () => cancelAnimationFrame(animationID);
};

export default animateRender;
