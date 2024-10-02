import dingSoundFile from '../assets/sounds/ding.mp3';

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

export default useSound;