import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Rat3DProps {
  width?: number;
  height?: number;
}

const Rat3D: React.FC<Rat3DProps> = ({ width = 400, height = 400 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false); // Add ref to capture hover state in animation loop
  const mousePositionRef = useRef({ x: 0, y: 0 }); // Track mouse position for head following

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene with transparent background
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Add renderer to DOM
    containerRef.current.appendChild(renderer.domElement);

    // Better lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Add fill light from the front
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.6);
    frontLight.position.set(0, 5, 10);
    scene.add(frontLight);

    // Load the rat model
    const loader = new GLTFLoader();
    loader.load(
      "/models/rat/scene.gltf",
      (gltf) => {
        console.log("GLTF loaded:", gltf);
        const object = gltf.scene;
        modelRef.current = object;

        // Log model info
        console.log("Model children:", object.children);
        console.log("Model position:", object.position);
        console.log("Model scale:", object.scale);

        // Get bounding box
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log("Model bounding box size:", size);
        console.log("Model center:", center);

        // Scale the model to be appropriately sized
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 8 / maxDimension;
        object.scale.setScalar(scale);

        // Center and position the model
        object.position.copy(center).multiplyScalar(-scale);
        object.position.y -= 1;

        // Find the specific bones we need for waving and head tracking
        let rightShoulder: THREE.Bone | null = null;
        let rightElbow: THREE.Bone | null = null;
        let rightWrist: THREE.Bone | null = null;
        let leftShoulder: THREE.Bone | null = null;
        let leftElbow: THREE.Bone | null = null;
        let leftWrist: THREE.Bone | null = null;
        let headBone: THREE.Bone | null = null;

        object.traverse((child) => {
          if (child instanceof THREE.Bone) {
            // Target the specific right arm bones
            if (child.name === "arm_right_shoulder_2_0142") {
              rightShoulder = child;
              rightShoulder.rotation.z = 0.5;
              rightShoulder.rotation.y = -0.5;
              rightShoulder.rotation.x = -0.8;
              console.log("Found right shoulder bone and set arm down!");
            }
            if (child.name === "arm_right_elbow_0145") {
              rightElbow = child;
              rightElbow.rotation.x = 0;
              rightElbow.rotation.y = 1;
              rightElbow.rotation.z = 0;
              console.log("Found right elbow bone!");
            }
            if (child.name === "arm_right_wrist_0147") {
              rightWrist = child;
              rightWrist.rotation.z = 0;
              rightWrist.rotation.x = 0;
              console.log("Found right wrist bone!");
            }

            // Target the specific left arm bones
            if (child.name === "arm_left_shoulder_2_0119") {
              leftShoulder = child;
              leftShoulder.rotation.z = -0.5;
              leftShoulder.rotation.y = 0.5;
              leftShoulder.rotation.x = -0.8;
              console.log("Found left shoulder bone and set arm down!");
            }
            if (child.name === "arm_left_elbow_0122") {
              leftElbow = child;
              leftElbow.rotation.x = 0;
              leftElbow.rotation.y = -1;
              leftElbow.rotation.z = 0;
              console.log("Found left elbow bone!");
            }
            if (child.name === "arm_left_wrist_0124") {
              leftWrist = child;
              leftWrist.rotation.z = 0;
              leftWrist.rotation.x = 0;
              console.log("Found left wrist bone!");
            }

            // Look for head bone
            if (child.name === "head_neck_upper_044") {
              headBone = child;
              console.log("Found head bone:", child.name);
            }
          }
        });

        scene.add(object);

        // Store original rotations for reset
        const originalShoulderRotation =
          (rightShoulder as THREE.Bone | null)?.rotation.clone() ?? null;
        const originalElbowRotation =
          (rightElbow as THREE.Bone | null)?.rotation.clone() ?? null;
        const originalWristRotation =
          (rightWrist as THREE.Bone | null)?.rotation.clone() ?? null;
        const originalHeadRotation =
          (headBone as THREE.Bone | null)?.rotation.clone() ?? null;

        // Animation loop
        const clock = new THREE.Clock();
        let waveTime = 0;

        const animate = () => {
          animationRef.current = requestAnimationFrame(animate);
          const deltaTime = clock.getDelta();

          // Wave animation when hovered
          if (isHoveredRef.current) {
            waveTime += deltaTime * 3;

            // Two-phase animation: lift first (0-1 seconds), then wave (1+ seconds)
            const liftPhase = Math.min(waveTime, 1.0);
            const wavePhase = Math.max(0, waveTime - 1.0);

            if (rightShoulder) {
              const liftAmount = liftPhase * 0.4;
              const waveMotion =
                wavePhase > 0 ? Math.sin(wavePhase * 4) * 0.1 : 0;

              rightShoulder.rotation.z = liftAmount + waveMotion + 0.5;
              rightShoulder.rotation.y =
                -0.5 + (wavePhase > 0 ? Math.sin(wavePhase * 0.5) * 0.1 : 0);
              rightShoulder.rotation.x =
                -0.8 +
                liftPhase * 1.3 +
                (wavePhase > 0 ? Math.sin(wavePhase * 0.3) * 0.1 : 0);
            }

            if (rightElbow) {
              const bendAmount = liftPhase * -1.5;
              const waveMotion =
                wavePhase > 0 ? Math.sin(wavePhase * 4) * 0.2 : 0;

              rightElbow.rotation.y = 1 + bendAmount + waveMotion;
              rightElbow.rotation.x =
                wavePhase > 0 ? Math.sin(wavePhase * 0.5) * 0.1 : 0;
              rightElbow.rotation.z =
                wavePhase > 0 ? Math.sin(wavePhase * 0.3) * 0.05 : 0;
            }

            if (rightWrist) {
              const palmRotation = liftPhase * Math.PI;
              const waveZ = wavePhase > 0 ? Math.sin(wavePhase * 8) * 0.8 : 0;
              const waveX = wavePhase > 0 ? Math.sin(wavePhase * 6) * 0.3 : 0;

              rightWrist.rotation.z = waveZ;
              rightWrist.rotation.x = waveX;
              rightWrist.rotation.y = palmRotation;
            }
          }

          if (!isHoveredRef.current) {
            if (rightShoulder && originalShoulderRotation) {
              rightShoulder.rotation.x = THREE.MathUtils.lerp(
                rightShoulder.rotation.x,
                originalShoulderRotation.x,
                deltaTime * 2
              );
              rightShoulder.rotation.z = THREE.MathUtils.lerp(
                rightShoulder.rotation.z,
                originalShoulderRotation.z,
                deltaTime * 2
              );
            }

            if (rightElbow && originalElbowRotation) {
              rightElbow.rotation.y = THREE.MathUtils.lerp(
                rightElbow.rotation.y,
                originalElbowRotation.y,
                deltaTime * 2
              );
            }

            if (rightWrist && originalWristRotation) {
              rightWrist.rotation.z = THREE.MathUtils.lerp(
                rightWrist.rotation.z,
                originalWristRotation.z,
                deltaTime * 2
              );
              rightWrist.rotation.x = THREE.MathUtils.lerp(
                rightWrist.rotation.x,
                originalWristRotation.x,
                deltaTime * 2
              );
              rightWrist.rotation.y = THREE.MathUtils.lerp(
                rightWrist.rotation.y,
                originalWristRotation.y,
                deltaTime * 2
              );
            }

            if (waveTime > 0) {
              console.log("Stopping wave animation");
              waveTime = 0;
            }
          }

          // Head tracking mouse movement
          if (headBone) {
            const mouseX = mousePositionRef.current.x;
            const mouseY = mousePositionRef.current.y;

            const targetRotationY = originalHeadRotation
              ? originalHeadRotation.y + mouseX * 0.3
              : mouseX * 0.3;
            const targetRotationX = originalHeadRotation
              ? originalHeadRotation.x + mouseY * 0.2
              : mouseY * 0.2;

            headBone.rotation.y = THREE.MathUtils.lerp(
              headBone.rotation.y,
              targetRotationY,
              deltaTime * 3
            );
            headBone.rotation.x = THREE.MathUtils.lerp(
              headBone.rotation.x,
              targetRotationX,
              deltaTime * 3
            );
          }

          // Very subtle idle animation
          const baseY = object.position.y;
          object.position.y =
            baseY + Math.sin(clock.getElapsedTime() * 0.8) * 0.001;

          renderer.render(scene, camera);
        };

        animate();
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100 + "%"
        );
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    const handleMouseEnter = () => {
      console.log("👋 Remy says Hi!");
      setIsHovered(true);
      isHoveredRef.current = true;
      if (containerRef.current) {
        containerRef.current.style.cursor = "pointer";
      }
    };

    const handleMouseLeave = () => {
      console.log("👋 Remy waves goodbye!");
      setIsHovered(false);
      isHoveredRef.current = false;
      if (containerRef.current) {
        containerRef.current.style.cursor = "default";
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        mousePositionRef.current = { x, y };
      }
    };

    // Add event listeners
    if (containerRef.current) {
      containerRef.current.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
      containerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        containerRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        if (
          renderer.domElement &&
          containerRef.current.contains(renderer.domElement)
        ) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
      className="rounded-lg overflow-hidden bg-transparent transition-transform hover:scale-105"
      title="Hover over Remy to see him wave! 👋"
    />
  );
};

export default Rat3D;
