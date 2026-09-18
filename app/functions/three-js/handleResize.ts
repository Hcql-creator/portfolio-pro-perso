import { WebGLRenderer } from "three";
import { PerspectiveCamera } from "three/webgpu";

/**
 * Updates the camera and renderer based on window size.
 *
 * @param camera the camera linked to the scene
 * @param renderer the renderer to set the new size of
 */
const handleResize = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(windowWidth, windowHeight);
};

export default handleResize;
