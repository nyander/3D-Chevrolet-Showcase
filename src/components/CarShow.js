import { CubeCamera, Environment, Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Ground } from './Ground';
import { useControls } from 'leva';
import Car from './Car';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import FloatingGrid from './FloatingGrid';
import Rings from './Rings';
import Boxes from './Boxes';
import { Vector3 } from 'three';
import { Tween, Easing, update as tweenUpdate } from '@tweenjs/tween.js';

const CarShow = ({ selectedOption, showInfoText, clickCount, firstLightIntensity, secondLightIntensity, bloomIntensity }) => {
  const carRef = useRef();
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const [tweenCompleted, setTweenCompleted] = useState(false);
  const [showRings, setShowRings] = useState(false);
  const [showBoxes, setShowBoxes] = useState(false);

  useEffect(() => {
    let targetPosition;

    switch (selectedOption) {
      case 'Performance':
        targetPosition = new Vector3(1.5, 2.6, -4);
        break;
      case 'Design':
        targetPosition = new Vector3(3.7, 2.1, 2.9);
        break;
      case 'Wheel Utility':
        targetPosition = new Vector3(2.5, 0.5, -2.3);
        break;
      case 'Boxes':
        setShowBoxes((prevState) => !prevState);
        break;
      case 'Rings':
        setShowRings((prevState) => !prevState);
        break;
      default:
        targetPosition = new Vector3(0.1, 6.0, 5.0);
        break;
    }

    if (cameraRef.current && targetPosition) {
      const cameraTween = new Tween(cameraRef.current.position)
        .to(targetPosition, 1000)
        .easing(Easing.Quadratic.InOut)
        .onUpdate(() => {
          controlsRef.current.update();
        })
        .onComplete(() => {
          setTweenCompleted(true);
        })
        .start();

      const animate = (time) => {
        requestAnimationFrame(animate);
        tweenUpdate(time);
      };

      animate();

      return () => {
        cameraTween.stop();
        setTweenCompleted(false);
      };
    }
  }, [selectedOption, clickCount]);


  return (
    <>
      {/* <Perf/> */}
      <OrbitControls ref={controlsRef} maxPolarAngle={1.5} />
      <PerspectiveCamera ref={cameraRef} makeDefault fov={50} position={[0.1, 2.0, 5.0]} />

      {showInfoText && tweenCompleted && (
        <Html position={[1, 1, 0]}>Hello World, this is a test!</Html>
      )}
      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Suspense>
              <Car ref={carRef} />
            </Suspense>
          </>
        )}
      </CubeCamera>

      <FloatingGrid />
      {showRings && <Rings />}
      {showBoxes && <Boxes />}
      

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={firstLightIntensity}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={secondLightIntensity}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={bloomIntensity}
          width={320}
          height={320}
          kernelSize={3}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0005, 0.0012]} />
      </EffectComposer>
    </>
  );
};

export default CarShow;