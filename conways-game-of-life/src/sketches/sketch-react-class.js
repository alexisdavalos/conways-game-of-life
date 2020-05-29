import Node from "./node.js";
const sketch = (p) => {
  // lobal Variables
  let grid;
  let cols;
  let rows;
  let fps = 50;
  let resolution = 20;
  let firstRun = true;
  let generations;
  let play;
  //   //mouse pressed
  //   function mousePressed() {
  //     let distance = dist(mouseX, mouseY, x + res / 2, y + res / 2);
  //     if (distance < res / 2) {
  //       grid[i][j] = 1;
  //     }
  //   }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    // When Next Frame Button is pressed
    if (props.state.nextGeneration) {
      nextFrame();
      props.setState({
        ...props.state,
        nextGeneration: !props.state.nextGeneration,
      });
    }
    // When Generate Button is pressed
    if (props.state.generate) {
      generate();
      props.setState({ ...props.state, generate: !props.state.generate });
    }
    // When Play/Stop Button is pressed
    if (props.state.play) {
      play = props.state.play;
      p.loop();
    } else {
      play = props.state.play;
      p.noLoop();
    }
    // When Clear Button is pressed
    if (props.state.clearGrid) {
      clearGrid();
      props.setState({ ...props.state, clearGrid: !clearGrid });
    }
  };
  // Generate Next Frame
  const nextFrame = () => {
    p.noLoop();
    p.redraw();
  };
  // Generate New 2D Array Structure
  const create2DArr = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  };
  // Canvas Set Up Function
  p.setup = () => {
    p.createCanvas(600, 400);

    if (firstRun) {
      console.log("generating!");
      generate();
      firstRun = !firstRun;
    } else {
      generate();
    }
    p.noLoop();
  };

  // Generates data into 2D array
  const generate = () => {
    cols = p.width / resolution;
    rows = p.height / resolution;
    grid = create2DArr(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        //generates empty grid if firstRun, else fills nodes w/data
        if (firstRun) {
          grid[i][j] = new Node();
        } else {
          // Randomly Generate Num Between 0-1
          //   grid[i][j] = Math.floor(Math.random() * 2);
          grid[i][j] = new Node();
          grid[i][j].changeValue(Math.floor(Math.random() * 2));
          // Toggles firstRun to false
          firstRun = false;
        }
      }
    }
    //redraws the canvas and resets data in arr
    p.redraw();
  };
  // Loops through and paints cells based on Algorithm rules
  p.draw = () => {
    p.frameRate(fps);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // define size of cells
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j].value === 1) {
          // live cell
          p.fill("green");
          p.noStroke();
          p.rect(x, y, resolution - 1, resolution - 1);
        } else {
          // dead cell
          p.fill(1);
          p.stroke("green");
          p.strokeWeight(0.5);
          p.rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
    console.log("getting to next");
    // creates new 2D arr for next state
    let next = create2DArr(cols, rows);
    console.log("next:", next);
    // Compute next based on current grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        console.log(state.value);
        // Count live neighbors!
        let neighbors = countNeighbors(grid, i, j);
        console.log(neighbors);
        if (state.value === 0 && neighbors === 3) {
          next[i][j] = new Node(1);
          console.log(next[i][j]);
        } else if (state.value === 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = new Node(0);
        } else {
          next[i][j] = state;
        }
      }
    }
    // swaps grids
    console.log("previous grid:", grid);
    grid = next;
    console.log("new grid:", grid);
    // increment # of generations
    generations += 1;
  };
  // Count Cell Neighbors
  const countNeighbors = (grid, x, y) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row].value;
      }
    }
    // decrement self from total
    sum -= grid[x][y];
    return sum;
  };
  // Clears grid and Arr
  function clearGrid() {
    generations = 0;
    p.noLoop();
    console.log("cleared grid");
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        // paints dead cell
        grid[i][j].value = 0;
        p.fill(1);
        p.stroke("green");
        p.strokeWeight(1);
        p.rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  //   p.mousePressed = () => {
  //     for (var i = 0; i < cols; i++) {
  //       for (var j = 0; j < rows; j++) {
  //         let x = i * resolution;
  //         let y = j * resolution;
  //         var distance = p.dist(
  //           p.mouseX,
  //           p.mouseY,
  //           x + resolution / 2,
  //           y + resolution / 2
  //         );
  //         console.log(distance);
  //         if (distance < resolution / 2) {
  //           grid[i][j] = 1;
  //           console.log(grid[i][j]);
  //         } else {
  //           grid[i][j] = 0;
  //         }
  //       }
  //     }
  //   };
};
export default sketch;
