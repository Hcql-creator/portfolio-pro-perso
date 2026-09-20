class ScrollManager {
  /**
   * The current scroll value (0 - 1).
   */
  static #currentScroll: number = 0.0;

  /**
   * The target scroll value (0 - 1).
   */
  static #targetScroll: number = 0.0;

  /**
   * Getter for the currentScroll value.
   *
   * @returns the currentScroll value
   */
  static getScroll() {
    return ScrollManager.#currentScroll;
  }

  /**
   * Getter for the targetScroll value.
   *
   * @returns the targetScroll value
   */
  static getTarget() {
    return ScrollManager.#targetScroll;
  }

  /**
   * Updates the scroll value while keeping it betwen bounds.
   *
   * @param newValue the new value to set (if valid) as scroll value
   */
  static updateScroll(newValue: number) {
    if (newValue < 0.0) {
      ScrollManager.#currentScroll = 0.0;
      return;
    }

    if (newValue > 1.0) {
      ScrollManager.#currentScroll = 1.0;
      return;
    }

    ScrollManager.#currentScroll = newValue;
  }

  /**
   * Updates the target scroll value while keeping it between bounds.
   *
   * @param newValue the new value to set (if valid) as scroll value
   */
  static updateTarget(newValue: number) {
    if (newValue < 0.0) {
      ScrollManager.#targetScroll = 0.0;
      return;
    }

    if (newValue > 1.0) {
      ScrollManager.#targetScroll = 1.0;
      return;
    }

    ScrollManager.#targetScroll = newValue;
  }
}

export default ScrollManager;
