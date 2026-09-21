import animateRender from "@/app/components/landing-page/animateRender";
import createVector from "@/app/functions/three-js/createVector";
import handleResize from "@/app/functions/three-js/handleResize";
import createDirectionalLight from "@/app/functions/three-js/lightning/createDirectionalLight";
import LaptopAnimationManager from "@/app/managers/landing-page/LaptopAnimationManager";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  OutputPass,
  RenderPass,
  SMAAPass,
} from "three/examples/jsm/Addons.js";
import handleWheel from "./handleWheel";
import loadLaptopModel from "./loadLaptopModel";

const LaptopScene = () => {
  let stopAnimation: () => void | undefined;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f2ea);
    LaptopAnimationManager.setScene(scene);

    // Initialize Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.y = LaptopAnimationManager.minimumYCameraPosition;
    camera.lookAt(0, 0, 0);
    LaptopAnimationManager.setCamera(camera);

    // Initialize Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new SMAAPass());
    composer.addPass(new OutputPass());

    // Load Laptop Model
    loadLaptopModel(scene);

    // Main light
    createDirectionalLight(
      scene,
      0xffffff,
      5,
      createVector(40, 20, 3),
      createVector(0, 0, 0),
    );

    // Render at each frame
    stopAnimation = animateRender(composer);

    // Resize renderer when window is resized
    const callHandleResize = () => handleResize(camera, renderer);
    window.addEventListener("resize", callHandleResize);

    // Animate on scroll
    window.addEventListener("wheel", handleWheel);

    // Cleanup function on re-render
    return () => {
      scene.clear();
      stopAnimation?.();
      composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      window.removeEventListener("resize", callHandleResize);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return <div ref={containerRef}></div>;
};

export default LaptopScene;
