import React, { useState, useEffect } from 'react';
import './Popup.scss';
import PopupItems from '../components/PopupItems';


const Popup = () => {

  return (
    <div className="Popup">
      <PopupItems />
    </div>
  );
};

export default Popup;