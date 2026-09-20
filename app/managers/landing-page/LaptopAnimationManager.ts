import {
  MathUtils,
  Object3D,
  PerspectiveCamera,
  Quaternion,
  Scene,
} from "three";
import ScrollManager from "../ScrollManager";

/**
 * Enumeration to list all animation status states available.
 */
enum AnimationState {
  unzooming, // when the camera takes higher look to unravel the laptop
  idling, // doing nothing
  opening, // when the laptop's lid opens
  zooming, // when the camera zooms on the screen
}

/**
 * Object to map an animation state to a range of motion
 */
const AnimationRange = {
  [AnimationState.unzooming]: [0.0, 0.25],
  [AnimationState.idling]: [0.26, 0.35],
  [AnimationState.opening]: [0.36, 0.75],
  [AnimationState.zooming]: [0.76, 1],
};

class LaptopAnimationManager {
  /**
   * The minimum camera y position.
   */
  static minimumYCameraPosition = 2.65;

  /**
   * The scene containing the laptop.
   */
  static #scene: Scene | undefined;

  /**
   * The laptop's lid object extracted from the .glb 3D model file.
   */
  static #laptopLid: Object3D | undefined;

  /**
   * The camera of the laptop scene.
   */
  static #camera: PerspectiveCamera;

  /**
   * The status of the animation.
   */
  static #animationStatus: AnimationState = AnimationState.unzooming;

  /**
   * The progress percentage (0 - 1) of the current animation state.
   */
  static #stateProgress: number = 0.0;

  /**
   * Getter for the scene containing the laptop.
   *
   * @returns the Scene object containing the laptop
   */
  static getScene() {
    return LaptopAnimationManager.#scene;
  }

  /**
   * Getter for the camera of the laptop's scene.
   *
   * @returns the Camera object of the laptop's scene
   */
  static getCamera() {
    return LaptopAnimationManager.#camera;
  }

  /**
   * Getter for the animation status / phase.
   *
   * @returns an AnimationState enum value corresponding to the animation state
   */
  static getAnimationStatus() {
    return LaptopAnimationManager.#animationStatus;
  }

  /**
   * Setter for the scene containing the laptop.
   *
   * @param scene the scene containing the laptop
   */
  static setScene(scene: Scene) {
    LaptopAnimationManager.#scene = scene;
    this.#laptopLid = undefined;
  }

  /**
   * Setter for the camera of the laptop's scene.
   *
   * @param camera the camera of the laptop's scene
   */
  static setCamera(camera: PerspectiveCamera) {
    LaptopAnimationManager.#camera = camera;
  }

  static #computeStateProgress() {
    // Compute animation progress
    let progress =
      1 -
      (ScrollManager.getTarget() - ScrollManager.getScroll()) /
        (AnimationRange[LaptopAnimationManager.#animationStatus][1] -
          AnimationRange[LaptopAnimationManager.#animationStatus][0]);

    // Bound this value between 0 - 1 range
    progress = Math.max(0, progress);
    progress = Math.min(1, progress);

    LaptopAnimationManager.#stateProgress = progress;
  }

  static performAnimation() {
    this.updateAnimationStatus();

    // Compute animation progress
    this.#computeStateProgress();

    // Perform the animation corresponding do the animation status
    switch (LaptopAnimationManager.#animationStatus) {
      case AnimationState.unzooming:
        this.#performUnzoomingAnimation();
        break;
      case AnimationState.idling:
        break;
      case AnimationState.opening:
        this.#performOpeningAnimation();
        break;
      case AnimationState.zooming:
        this.#performZoomingAnimation();
        break;
    }
  }

  /**
   * Sets the animation status to the updated value corresponding to the scroll value
   */
  static updateAnimationStatus() {
    const scrollValue = ScrollManager.getScroll();
    switch (true) {
      case scrollValue >= AnimationRange[AnimationState.unzooming][0] &&
        scrollValue < AnimationRange[AnimationState.unzooming][1]:
        this.#animationStatus = AnimationState.unzooming;
        ScrollManager.updateTarget(AnimationRange[AnimationState.unzooming][1]);
        break;
      case scrollValue >= AnimationRange[AnimationState.idling][0] &&
        scrollValue < AnimationRange[AnimationState.idling][1]:
        this.#animationStatus = AnimationState.idling;
        ScrollManager.updateTarget(AnimationRange[AnimationState.idling][1]);
        break;
      case scrollValue >= AnimationRange[AnimationState.opening][0] &&
        scrollValue < AnimationRange[AnimationState.opening][1]:
        this.#animationStatus = AnimationState.opening;
        ScrollManager.updateTarget(AnimationRange[AnimationState.opening][1]);
        break;
      case scrollValue >= AnimationRange[AnimationState.zooming][0] &&
        scrollValue < AnimationRange[AnimationState.zooming][1]:
        this.#animationStatus = AnimationState.zooming;
        ScrollManager.updateTarget(AnimationRange[AnimationState.zooming][1]);
        break;
    }
  }

  /**
   * Performs the next movement of the unzooming animation.
   */
  static #performUnzoomingAnimation() {
    // Apply the camera movement
    this.#camera.position.y =
      this.minimumYCameraPosition + this.#stateProgress * 2;
  }

  /**
   * Performs the next movement of the opening animation.
   */
  static #performOpeningAnimation() {
    if (this.#scene === undefined) return;

    if (this.#laptopLid === undefined) {
      this.#laptopLid = this.#scene.getObjectByName("_top");
      return;
    }
    this.#laptopLid.rotation.x =
      MathUtils.degToRad(90) - MathUtils.degToRad(90 * this.#stateProgress);
  }

  /**
   * Performes the next movement of the zooming animation.
   */
  static #performZoomingAnimation() {}
}

export default LaptopAnimationManager;
