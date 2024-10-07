import React from "react";
import useFontSize from "../helpers/useFontSize"; 

const ResponseApi = function (props) {
  const { responseText } = props;
  const { fontSize } = useFontSize(); 

  return (
    <div className="response-text">
      <h2 style={{ fontSize: fontSize }}>Response</h2> 
      <p style={{ fontSize: fontSize }}>{responseText}</p> 
    </div>
  );
};

export default ResponseApi;
