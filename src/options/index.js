import React from "react";
import ReactDOM from "react-dom";
import Options from "./Options.jsx";

document.title = "Options";

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);

const root = ReactDOM.createRoot(rootDiv);
root.render(<Options />);
