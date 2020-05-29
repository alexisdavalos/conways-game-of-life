import React, { useState } from "react";
import "../assetts/styles/index.scss";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../sketches/sketch-react.js";
import Loader from "./Loader.js";
import Menu from "./Menu.js";
function App() {
  const [state, setState] = useState({
    play: false,
    firstRun: true,
    empty: true,
    generate: false,
    clearGrid: false,
    nextGeneration: false,
    speed: 25,
  });
  return (
    <div id="wrapper" className="wrapper">
      <Loader />
      <Menu state={state} setState={setState} />
      <div className="control-panel">
        <div
          className="button"
          onClick={(e) =>
            setState({
              ...state,
              nextGeneration: !state.nextGeneration,
            })
          }
        >
          Next Frame
        </div>
        <div
          className="button"
          onClick={(e) =>
            setState({
              ...state,
              generate: !state.generate,
            })
          }
        >
          Generate
        </div>
        <div
          id="play"
          className="button"
          onClick={(e) => setState({ ...state, play: !state.play })}
        >
          Play/Stop
        </div>
        <div
          className="button"
          onClick={() => setState({ ...state, clearGrid: !state.clearGrid })}
        >
          Clear Grid
        </div>
      </div>
      <div className="status-panel">
        <div className="status-item">
          {state.play ? <p>Status: Playing</p> : <p>Status: Paused</p>}
        </div>
        <div id="generations" className="status-item"></div>
      </div>
      <P5Wrapper sketch={sketch} state={state} setState={setState} />
    </div>
  );
}

export default App;
