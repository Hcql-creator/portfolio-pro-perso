import { Vector3 } from "three";

/**
 * Creates a Three.js Vector3 and returns it.
 *
 * @param x the x coordinate
 * @param y the y coordinate
 * @param z the z coordinate
 * @returns the Vector3 created from the given coordinates
 */
const createVector = (x: number, y: number, z: number) => {
  return new Vector3(x, y, z);
};

export default createVector;
