import animateRender from "@/app/functions/three-js/animateRender";
import createVector from "@/app/functions/three-js/createVector";
import handleResize from "@/app/functions/three-js/handleResize";
import createDirectionalLight from "@/app/functions/three-js/lightning/createDirectionalLight";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import loadLaptopModel from "./loadLaptopModel";
import {
  EffectComposer,
  OutputPass,
  RenderPass,
  SMAAPass,
} from "three/examples/jsm/Addons.js";
import ScrollManager from "@/app/managers/ScrollManager";

const LaptopScene = () => {
  let animationID: number;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f2ea);

    // Initialize Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.y = 2.65;
    camera.lookAt(0, 0, 0);

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

    // Animate each Frame and update based on scrolling
    animationID = animateRender(composer, camera);

    // Resize renderer when window is resized
    window.addEventListener("resize", () => handleResize(camera, renderer));

    // Animate on scroll
    window.addEventListener("wheel", (e) => {
      ScrollManager.updateTarget(ScrollManager.getTarget() + e.deltaY / 100);
    });

    // Cleanup function on re-render
    return () => {
      cancelAnimationFrame(animationID);
      composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      window.removeEventListener("resize", () =>
        handleResize(camera, renderer),
      );
    };
  }, []);
  return <div ref={containerRef}></div>;
};

export default LaptopScene;
