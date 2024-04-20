import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState } from 'react';
import CarShow from './components/CarShow';
import './style.css';
import Navbar from './components/Navbar';
import { Loader } from '@react-three/drei';
import ControlsPanel from './components/ControlsPanel';

const App = () => {
  const [showInfoText, setShowInfoText] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cameraPosition, setCameraPosition] = useState({ x: -5.5, y: 1.1, z: -1.5 });
  const [clickCount, setClickCount] = useState(0);
  const [firstLightIntensity, setFirstLightIntensity] = useState(450);
  const [secondLightIntensity, setSecondLightIntensity] = useState(345);
  const [bloomIntensity, setBloomIntensity] = useState(0.25);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <div className='app-container'>
      <Navbar selectedOption={selectedOption} onOptionClick={handleOptionClick} />
      <Suspense fallback={<Loader containerStyles={{ backgroundColor: 'black' }} innerStyles={{ width: '50px' }} />}>
        <Canvas shadows>
          <CarShow
            selectedOption={selectedOption}
            cameraPosition={cameraPosition}
            setCameraPosition={setCameraPosition}
            showInfoText={showInfoText}
            clickCount={clickCount}
            firstLightIntensity={firstLightIntensity}
            secondLightIntensity={secondLightIntensity}
            bloomIntensity={bloomIntensity}
          />
        </Canvas>
      </Suspense>
      <ControlsPanel
        setFirstLightIntensity={setFirstLightIntensity}
        setSecondLightIntensity={setSecondLightIntensity}
        setBloomIntensity={setBloomIntensity}
      />
    </div>
  );
};

export default App;