import dingSoundFile from '../assets/sounds/ding.mp3';

const useSound = () => {

  const soundEffect = new Audio(dingSoundFile);

  // Function to play the sound based on user preference
  const playSound = () => {
    chrome.storage.sync.get(['soundEnabled'], function (result) {
      if (result.soundEnabled) {
        soundEffect.play();  // Play the sound only if sound is enabled
      }
    });
  };

  return { playSound };
};

export default useSound;
