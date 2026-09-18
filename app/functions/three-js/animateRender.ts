import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

/**
 * Handles the Three.JS animation on each frame.
 *
 * @param scene the scene the render
 * @param camera the camera linked to the given scene
 * @param renderer the renderer of the given scene
 * @returns
 */
const animateRender = (
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) => {
  const animationID = requestAnimationFrame(() =>
    animateRender(scene, camera, renderer),
  );
  renderer.render(scene, camera);

  return animationID;
};

export default animateRender;
