import { AmbientLight, ColorRepresentation, Scene } from "three";

/**
 * Creates an ambient lightning and adds it to the given scene.
 *
 * @param scene the scene for the light to be added onto
 * @param color the color of the ambient light
 * @param intensity the intensity of the light
 */
const createAmbientLight = (
  scene: Scene,
  color: ColorRepresentation,
  intensity: number,
) => {
  const ambientLight = new AmbientLight(color, intensity);
  scene.add(ambientLight);
};

export default createAmbientLight;
