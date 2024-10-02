import dingSoundFile from '../assets/sounds/ding.mp3';

const useSound = () => {

  const soundEffect = new Audio(dingSoundFile);

  
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
