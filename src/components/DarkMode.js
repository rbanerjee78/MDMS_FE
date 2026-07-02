import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const DarkMode = ({ isDarkMode, setIsDarkMode }) => {
    

    const handleDarkModeToggle = () => {
      setIsDarkMode(prevMode => !prevMode);
    };

  return (
    <div>
      <div  onClick={handleDarkModeToggle} style={{"cursor":"pointer", 'padding':'5px'}}>
        {isDarkMode ? 
        (<FontAwesomeIcon icon={faSun}></FontAwesomeIcon>)
        :
        (<FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>)
        }
        </div>
    </div>
  );
};

export default DarkMode;
