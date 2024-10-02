// import React from 'react';
import "./Popup.scss";
import PopupItems from "../components/PopupItems"; 
import useDarkMode from "../helpers/useDarkMode";
import "../styles/base.scss";

// Import the sound file
import buttonSoundFile from '../assets/sounds/ding.mp3';

const Popup = () => {
  const { darkMode } = useDarkMode();

  // Create an audio object for the button sound
  const buttonSound = new Audio(buttonSoundFile);

  // Function to play button sound
  const handleButtonSound = () => {
    buttonSound.play();
  };

  return (
    <div className={`Popup ${darkMode ? "dark-mode" : ""}`}>
      <PopupItems />
    </div>
  );
};

export default Popup;
