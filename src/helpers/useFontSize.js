import { useState, useEffect } from "react";

const useFontSize = () => {
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");

  useEffect(() => {
    document.documentElement.style.fontSize = getFontSizeValue(fontSize);
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  const getFontSizeValue = (size) => {
    switch (size) {
      case "small":
        return "12px";
      case "medium":
        return "16px";
      case "large":
        return "24px";
      case "x-large":
        return "50px";
      default:
        return "16px";
    }
  };

  const fontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  return {
    fontSize,
    fontSizeChange,
  };
};

export default useFontSize;
