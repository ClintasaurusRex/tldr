import dingSoundFile from '../assets/sounds/mixkit-old-camera-shutter-click-1137.wav';
import { useState, useEffect } from 'react';

const useSound = (volume = 1) => {
const soundEffect = new Audio(dingSoundFile);

  soundEffect.volume = volume;  

  const playSound = () => {
    chrome.storage.sync.get(['soundEnabled'], function (result) {
      if (result.soundEnabled) {
        soundEffect.play();  
      }
    });
  };

  return { playSound };
};
export const useSoundSettings = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    // Fetches the sound setting from Chrome storage
    chrome.storage.sync.get(['soundEnabled'], function (result) {
      if (result.soundEnabled !== undefined) {
        setIsSoundEnabled(result.soundEnabled);
      }
    });
  }, []);

  // Handles toggling on and off
  const toggleSound = (isChecked) => {
    setIsSoundEnabled(isChecked);
    chrome.storage.sync.set({ soundEnabled: isChecked }); // Save preference in Chrome storage
  };

  return {
    isSoundEnabled,
    toggleSound,
  };
};

export default useSound;