import React, { useState } from "react";
import logo from "./logo.svg";
import "../assetts/styles/index.scss";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../p5js/sketch-react.js";
console.log(sketch);
function App() {
  const [state, setState] = useState({
    play: false,
    firstRun: true,
    empty: true,
    generations: 0,
    generate: false,
    clearGrid: false,
    nextGeneration: false,
  });

  return (
    <div id="wrapper" className="wrapper">
      <div id="menu" className="menu">
        {state.play ? <p>Play Status: Playing</p> : <p>Play Status: Paused</p>}
        <p>Generations:{state.generations}</p>
      </div>
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
      <P5Wrapper sketch={sketch} state={state} setState={setState} />
    </div>
  );
}

export default App;
