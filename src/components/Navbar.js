import React, { useState } from 'react';

const Navbar = ({ selectedOption, onOptionClick }) => {
  const [isNavbarOptionsVisible, setIsNavbarOptionsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleHamburgerClick = () => {
    setIsNavbarOptionsVisible(!isNavbarOptionsVisible);
  };

  const handleOptionClick = (option) => {
    onOptionClick(option);
    setIsNavbarOptionsVisible(false);
    setClickCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <div className='main-navbar'>
        <div className='navbar-content'>
          <h1 className='chevrolet-logo'>CHEVROLET</h1>
          <div
            className={`hamburger ${isNavbarOptionsVisible ? 'active' : ''}`}
            onClick={handleHamburgerClick}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>
      
        <div className={`main-navbar-options ${isNavbarOptionsVisible ? 'active' : 'exit'}`}>
        {/* {isNavbarOptionsVisible && ( */}
          <div className='navigation-content'>
            <div className='left-nav-content'>
              <h2 onClick={() => handleOptionClick('Performance')}>Performance</h2>
              <h2 onClick={() => handleOptionClick('Design')}>Design</h2>
              <h2 onClick={() => handleOptionClick('Wheel Utility')}>Wheel Utility</h2>
              <h2 onClick={() => handleOptionClick('Rings')}>Rings</h2>
              <h2 onClick={() => handleOptionClick('Boxes')}>Boxes</h2>
            </div>
            <div className='right-nav-content'>
            
            </div>
          </div>
          {/* )} */}
        </div>
    </div>
  );
};

export default Navbar;