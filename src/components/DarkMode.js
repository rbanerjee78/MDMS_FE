import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const DarkMode = ({ isDarkMode, setIsDarkMode }) => {
    

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
          root.style.setProperty('--widget-card-background-color', 'var(--widget-card-background-color-dark)');
          root.style.setProperty('--widget-card-foreground-color', 'var(--widget-card-foreground-color-dark)');

          root.style.setProperty('--wrapper-background-color', 'var(--wrapper-background-color-dark)');
          root.style.setProperty('--wrapper-foreground-color', 'var(--wrapper-foreground-color-dark)');
          
          root.style.setProperty('--wrapper-background-image', 'var(--wrapper-background-image-dark)');
          
          root.style.setProperty('--navbar-background-color', 'var(--navbar-background-color-dark)');
          root.style.setProperty('--navbar-foreground-color', 'var(--navbar-foreground-color-dark)');



        } else {
          root.style.setProperty('--widget-card-background-color', 'var(--widget-card-background-color-light)');
          root.style.setProperty('--widget-card-foreground-color', 'var(--widget-card-foreground-color-light)');   
          root.style.setProperty('--wrapper-background-color', 'var(--wrapper-background-color-light)');
          root.style.setProperty('--wrapper-foreground-color', 'var(--wrapper-foreground-color-light)');
          root.style.setProperty('--wrapper-background-image', 'var(--wrapper-background-image-light)');
          root.style.setProperty('--navbar-background-color', 'var(--navbar-background-color-light)');
          root.style.setProperty('--navbar-foreground-color', 'var(--navbar-foreground-color-light)');

        
        }
      }, [isDarkMode]);
  
    const handleDarkModeToggle = () => {
      setIsDarkMode(prevMode => !prevMode);
      console.log(isDarkMode);
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
