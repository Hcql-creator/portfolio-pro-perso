import LaptopAnimationManager from "@/app/managers/landing-page/LaptopAnimationManager";
import ScrollManager from "@/app/managers/ScrollManager";

/**
 * Handles wheel Y-axis scrolling event for 3d laptop model animation.
 *
 * @param e the WheelEvent event object
 */
const handleWheel = (e: WheelEvent) => {
  // Compute the delta of total animation progression the user can do in one scroll
  let delta =
    e.deltaY >= 0 ? Math.min(e.deltaY, 0.2) : Math.max(e.deltaY, -0.2);
  delta /= 100;
  ScrollManager.updateScroll(ScrollManager.getScroll() + delta);
  LaptopAnimationManager.performAnimation();
};

export default handleWheel;
