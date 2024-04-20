import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const InterestPoint = ({ attachPoint, title, paragraph }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    // Handle click event, e.g., display more information or trigger an action
    console.log(`Clicked on interest point: ${title}`);
  };

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  return (
    <Html attach={attachPoint}>
      <div
        className={`interest-point ${hovered ? 'hovered' : ''}`}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <h3>{title}</h3>
        <p>{paragraph}</p>
      </div>
    </Html>
  );
};

export default InterestPoint;