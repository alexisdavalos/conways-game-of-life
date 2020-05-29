const sketch = (p) => {
  // lobal Variables
  let grid;
  let cols;
  let rows;
  let fps;
  let resolution = 20;
  let firstRun = true;
  let gen = 0;
  let counter = document.createElement("p");
  document.getElementById("generations").appendChild(counter);
  let play;

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    //FPS/Animation Speed
    if (props.state.speed > 0) {
      fps = props.state.speed;
    }
    if (props.state.nextGeneration) {
      //When Next Frame Button is pressed
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
      let sum = 0;
      //check if grid is empty
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j] === 0) {
            sum += 0;
          } else {
            sum += 1;
          }
        }
      }
      if (sum > 0) {
        p.loop();
      } else {
        p.noLoop();
      }
    } else {
      play = props.state.play;
      p.noLoop();
    }
    // When Clear Button is pressed
    if (props.state.clearGrid) {
      clearGrid();
      p.noLoop();
      props.setState({ ...props.state, clearGrid: !clearGrid, play: false });
    }
  };
  // Generate Next Frame
  const nextFrame = () => {
    p.noLoop();
    p.redraw();
    gen += 0.5;
    counter.innerText = `Generations: ${gen}`;
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
    let canvas = p.createCanvas(600, 400);
    canvas.parent("wrapper");

    if (firstRun) {
      generate();
      firstRun = !firstRun;
    } else {
      generate();
    }
    p.noLoop();
  };

  // Generates data into 2D array
  const generate = () => {
    gen = 0;
    cols = p.width / resolution;
    rows = p.height / resolution;
    grid = create2DArr(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        //generates empty grid if firstRun, else fills nodes w/data
        if (firstRun) {
          grid[i][j] = 0;
        } else {
          // Randomly Generate Num Between 0-1
          grid[i][j] = Math.floor(Math.random() * 2);
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
    // displays # generations
    counter.innerText = `Generations: ${gen}`;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // define size of cells
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] === 1) {
          // live cell
          p.fill("#FF00F9");
          p.noStroke();
          p.rect(x, y, resolution - 1, resolution - 1);
        } else {
          // dead cell
          p.fill(1);
          p.stroke("#FF00F9");
          p.strokeWeight(2);
          p.rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
    // creates new 2D arr for next state
    let next = create2DArr(cols, rows);
    // Compute next based on current grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let neighbors = countNeighbors(grid, i, j);

        if (state === 0 && neighbors === 3) {
          next[i][j] = 1;
        } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
    // swaps grids
    grid = next;
    // if animation is playing increment # of gens
    if (play) {
      gen += 1;
    }
  };
  // Count Cell Neighbors
  const countNeighbors = (grid, x, y) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    // decrement self from total
    sum -= grid[x][y];
    return sum;
  };
  // Clears grid
  function clearGrid() {
    gen = 0;
    // updates inner counter
    counter.innerText = `Generations: ${gen}`;
    // pauses draw loop
    p.noLoop();
    // clears all canvas cells
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        // paints dead cell
        grid[i][j] = 0;
        p.fill(1);
        p.stroke("#FF00F9");
        p.strokeWeight(2);
        p.rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  p.mouseDragged = () => {
    if (!play) {
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          let x = i * resolution;
          let y = j * resolution;
          var distance = p.dist(
            p.mouseX,
            p.mouseY,
            x + resolution / 2,
            y + resolution / 2
          );
          if (distance < resolution / 2) {
            grid[i][j] = 1;
            p.fill("#FF00F9");
            p.noStroke();
            p.rect(x, y, resolution - 1, resolution - 1);
          }
        }
      }
    }
  };
};
export default sketch;
