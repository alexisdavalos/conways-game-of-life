import React from "react";
import logo from "./logo.svg";
import "../assetts/styles/index.scss";

function App() {
  return (
    <div id="wrapper" class="wrapper">
      <div id="menu" class="menu">
        <a href="/">Menu Item 1</a>
        <a href="/">Menu Item 1</a>
        <a href="/">Menu Item 1</a>
        <a href="/">Menu Item 1</a>
      </div>
      <div class="control-panel">
        <div class="button" onClick="nextGen()">
          Next Generation
        </div>
        <div class="button" onClick="generate()">
          Generate
        </div>
        <div id="play" class="button" onClick="playStop()">
          Play/Stop
        </div>
        <div class="button" onClick="clearGrid()">
          Clear Grid
        </div>
        <div class="button">Toggle Music</div>
      </div>
    </div>
  );
}

export default App;
