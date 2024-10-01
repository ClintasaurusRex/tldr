// import React, { useState, useEffect } from 'react';
import "./Popup.scss";
import PopupItems from "../components/PopupItems";
import useDarkMode from "../helpers/useDarkMode";
import "../styles/base.scss";

const Popup = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`Popup ${darkMode ? "dark-mode" : ""}`}>
      <PopupItems />
    </div>
  );
};

export default Popup;
