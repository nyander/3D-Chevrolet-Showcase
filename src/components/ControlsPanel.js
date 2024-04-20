import { useControls, Leva } from 'leva';
import './css/ControlsPanel.css';

const ControlsPanel = ({ setFirstLightIntensity, setSecondLightIntensity, setBloomIntensity }) => {
  const { firstLightIntensity, secondLightIntensity, bloomIntensity } = useControls({
    firstLightIntensity: {
      value: 450,
      min: 1,
      max: 500,
      step: 1,
      onChange: (value) => setFirstLightIntensity(value),
    },
    secondLightIntensity: {
      value: 345,
      min: 1,
      max: 500,
      step: 1,
      onChange: (value) => setSecondLightIntensity(value),
    },
    bloomIntensity: {
      value: 0.25,
      min: 0.1,
      max: 5,
      step: 0.1,
      onChange: (value) => setBloomIntensity(value),
    },
  });

  return (
    <div className="controls-panel">
      <Leva collapsed />
    </div>
  );
};

export default ControlsPanel;