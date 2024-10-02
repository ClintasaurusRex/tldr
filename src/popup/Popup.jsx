import React, { useState, useEffect } from 'react';
import './Popup.scss';
import PopupItems from '../components/PopupItems';
import useDarkMode from '../helpers/useDarkMode';
import '../styles/base.scss';


import clickSoundFile from '../assets/sounds/7-11.mp3';
// import buttonSoundFile from '../assets/sounds/ding.mp3';

const Popup = () => {
  const { darkMode } = useDarkMode();

  // Create audio objects for the sounds
  const clickSound = new Audio(clickSoundFile);
  // const buttonSound = new Audio(buttonSoundFile);

  // Function to play click sound for the popup
  const handlePopupSound = () => {
    clickSound.play();
  };

  // // Function to play button sound (can be passed down to PopupItems if needed)
  // const handleButtonClick = () => {
  //   buttonSound.play();
  // };

  return (
    <div className={`Popup ${darkMode ? 'dark-mode' : ''}`} onClick={handlePopupSound}>
      
      <PopupItems />
    </div>
  );
};

export default Popup;
