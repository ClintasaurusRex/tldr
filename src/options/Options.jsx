import './Options.css';



import React, { useEffect } from 'react';

const Options = () => {
  useEffect(() => {
    console.log("Options component rendered");
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Options</h2>
      <p>This is your options page. You can add more settings here later.</p>
    </div>
  );
};

export default Options;
