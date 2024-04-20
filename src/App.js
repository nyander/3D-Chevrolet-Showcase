import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState } from 'react';
import CarShow from './components/CarShow';
import './style.css';
import Navbar from './components/Navbar';

const App = () => {
  const [showInfoText, setShowInfoText] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cameraPosition, setCameraPosition] = useState({ x: -5.5, y: 1.1, z: -1.5 });

  const handleOptionClick = (option) => {
      setSelectedOption(option);
  };

  return (
    <div className='app-container'>
      <Navbar selectedOption={selectedOption} onOptionClick={handleOptionClick} />
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow
            selectedOption={selectedOption}
            cameraPosition={cameraPosition}
            setCameraPosition={setCameraPosition}
            showInfoText={showInfoText}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;