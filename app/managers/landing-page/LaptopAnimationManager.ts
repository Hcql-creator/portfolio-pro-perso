import { PerspectiveCamera, Scene } from "three";
import ScrollManager from "../ScrollManager";

/**
 * Enumeration to list all animation status states available.
 */
enum AnimationState {
  unzooming, // when the camera takes higher look to unravel the laptop
  opening, // when the laptop's lid opens
  zooming, // when the camera zooms on the screen
}

class LaptopAnimationManager {
  /**
   * The scene containing the laptop.
   */
  static #scene: Scene;

  /**
   * The camera of the laptop scene.
   */
  static #camera: PerspectiveCamera;

  /**
   * The status of the animation.
   */
  static #animationStatus: AnimationState;

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
  }

  /**
   * Setter for the camera of the laptop's scene.
   *
   * @param camera the camera of the laptop's scene
   */
  static setCamera(camera: PerspectiveCamera) {
    LaptopAnimationManager.#camera = camera;
  }

  static performAnimation() {
    // Compute the amount of animation progress to display
    let scrollDelta =
      (ScrollManager.getTarget() - ScrollManager.getScroll()) * 0.2;

    // Round this computed value into a 2 decimals number
    scrollDelta = Math.round(scrollDelta * 100) / 100;

    // Update scroll progress towards target
    ScrollManager.updateScroll(ScrollManager.getScroll() + scrollDelta);

    // Perform the animation corresponding do the animation status
    switch (LaptopAnimationManager.#animationStatus) {
      case AnimationState.unzooming:
        this.#performUnzoomingAnimation();
        break;
      case AnimationState.opening:
        this.#performOpeningAnimation;
        break;
      case AnimationState.zooming:
        this.#performZoomingAnimation;
        break;
    }

    this.#updateAnimationStatus();
  }

  /**
   * Sets the animation status to the updated value corresponding to the scroll value
   */
  static #updateAnimationStatus() {
    const scrollValue = ScrollManager.getScroll();
    switch (true) {
      case scrollValue <= 5:
        this.#animationStatus = AnimationState.unzooming;
        break;
      case scrollValue > 5 && scrollValue <= 10:
        this.#animationStatus = AnimationState.opening;
        break;
      default:
        this.#animationStatus = AnimationState.zooming;
    }
  }

  /**
   * Performs the next movement of the unzooming animation.
   */
  static #performUnzoomingAnimation() {
    this.#camera.position.y = ScrollManager.getScroll();
  }

  /**
   * Performs the next movement of the opening animation.
   */
  static #performOpeningAnimation() {}

  /**
   * Performes the next movement of the zooming animation.
   */
  static #performZoomingAnimation() {}
}

export default LaptopAnimationManager;
