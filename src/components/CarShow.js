import { CubeCamera, Environment, Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
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

const CarShow = ({ selectedOption, showInfoText }) => {
  const carRef = useRef();
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const [tweenCompleted, setTweenCompleted] = useState(false);
  const [showRings, setShowRings] = useState(false);
  const [showBoxes, setShowBoxes] = useState(false);

  useEffect(() => {
    let targetPosition;

    if (selectedOption === "Boxes") {
      showBoxes === true ? setShowBoxes(false) : setShowBoxes(true)
      setShowBoxes(!showBoxes);
      console.log(showBoxes)
    } else if (selectedOption === "Rings") {
      showRings === true ? setShowRings(false) : setShowRings(true)
      console.log(showRings)
    } else {
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
        default:
          targetPosition = new Vector3(0.1, 6.0, 5.0);
          break;
      }

      setShowRings(false);
      setShowBoxes(false);
    }

    if (cameraRef.current) {
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
  }, [selectedOption]);

  const {
    firstLightIntensity,
    secondLightIntensity,
    bloomIntensity,
    cameraPositioning,
    textPositioning,
  } = useControls({
    firstLightIntensity: {
      value: 450,
      min: 1,
      max: 500,
      step: 1,
    },
    secondLightIntensity: {
      value: 345,
      min: 1,
      max: 500,
      step: 1,
    },
    bloomIntensity: {
      value: 0.25,
      min: 0.1,
      max: 5,
      step: 0.1,
    },
    cameraPositioning: {
      value: { x: 0, y: 0.5, z: 4 },
      step: 0.1,
    },
    textPositioning: {
      value: { x: 1, y: 2.5, z: 0 },
      step: 0.1,
    },
  });



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
            <Car ref={carRef} />
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