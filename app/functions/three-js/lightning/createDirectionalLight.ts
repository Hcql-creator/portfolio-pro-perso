import { ColorRepresentation, DirectionalLight, Scene, Vector3 } from "three";

/**
 * Creates a directional lightning and adds it to the given scene.
 *
 * @param scene the scene for the light to be added onto
 * @param color the color of the directional light
 * @param intensity the intensity of the light
 * @param source the source of the light
 * @param target the target of the directional light
 */
const createDirectionalLight = (
  scene: Scene,
  color: ColorRepresentation,
  intensity: number,
  source: Vector3,
  target: Vector3,
) => {
  const directionalLight = new DirectionalLight(color, intensity);

  directionalLight.position.set(source.x, source.y, source.z);
  directionalLight.target.position.set(target.x, target.y, target.z);

  directionalLight.castShadow = true;

  scene.add(directionalLight);
};

export default createDirectionalLight;
