import React, { useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Car = React.forwardRef(({ ref }) => {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/car/scene.glb', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    if (gltf) {
      gltf.scene.position.set(0, -0.05, 0);
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = 20;
        }
      });
    }
  }, [gltf]);

  console.log(gltf.scene.children[0].children[0].children[0].children[5].children[21]);

  useFrame((state, delta) => {
    if (gltf) {
      let t = state.clock.getElapsedTime();
      let group = gltf.scene.children[0].children[0].children[0];
      group.children[8].rotation.x = t * -15;
      group.children[9].rotation.x = t * -15;
      group.children[10].rotation.x = t * -15;
      group.children[11].rotation.x = t * -15;
    }
  });

  return (
    <primitive
      ref={ref}
      object={gltf ? gltf.scene : null}
      position={[0, 0, 0]}
    />
  );
});

export default Car;