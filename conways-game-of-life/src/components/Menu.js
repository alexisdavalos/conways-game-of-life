import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
const Menu = ({ state, setState }) => {
  return (
    <div id="menu" className="menu">
      <h3>The Game of Life:</h3>
      <p>
        This algorithm is a cellular automaton devised by the British
        mathematician John Horton Conway in 1970. <br />
        <br />
        It is a zero-player game, meaning that its evolution is determined by
        its initial state, requiring no further input. <br />
        <br />
        One interacts with the Game of Life by creating an initial configuration
        and observing how it evolves. It is Turing complete and can simulate a
        universal constructor or any other Turing machine.
      </p>
      <p>Speed: {Math.floor((state.speed / 60) * 100)}%</p>
      <Range
        defaultValue={[state.speed]}
        min={1}
        max={60}
        onChange={(e) => setState({ ...state, speed: e[0] })}
      />
      <h3>Game Rules:</h3>

      <p>
        1. Any live cell with fewer than two live neighbours dies, as if by
        underpopulation.
      </p>

      <p>
        2. Any live cell with two or three live neighbours lives on to the next
        generation.
      </p>

      <p>
        3. Any live cell with more than three live neighbours dies, as if by
        overpopulation.
      </p>

      <p>
        4. Any live cell with more than three live neighbours dies, as if by
        overpopulation.
      </p>
    </div>
  );
};
export default Menu;
