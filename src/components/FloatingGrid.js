import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { RepeatWrapping, TextureLoader } from 'three'

const FloatingGrid = React.memo(() => {
    const texturePath = process.env.PUBLIC_URL + "/textures/grid-texture.png";
    const diffuse = useLoader(TextureLoader, texturePath);


    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30,30);
        diffuse.offset.set(0,0)
    }, [diffuse]);

    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * 3.68;
        diffuse.offset.set(0,t);
    });
        


    return (
       <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.0001, 0]}>
            <planeGeometry args={[35,35]} />
            <meshBasicMaterial
                color={[1,1,1]}
                opacity={0.075}
                map={diffuse}
                alphaMap={diffuse}
                transparent={true}
                />
       </mesh>
    )
})

export default FloatingGrid