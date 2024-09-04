import './Options.css';



import React, { useEffect } from 'react';

const Options = () => {
  useEffect(() => {
    console.log("Options component rendered");
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Options</h2>
      <p>Starting from the bottom, now we're here!</p>
    </div>
  );
};

export default Options;
