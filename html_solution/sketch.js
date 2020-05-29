// Global Variables

let grid;
let cols;
let rows;
let resolution = 10;
let play = false;
let firstRun = true;
let empty = true;
let generations = 0;
let counter = document.createElement("p");
counter.className = "counter";

//generates 2D array data structure
function create2DArr(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  let myCanvas = createCanvas(600, 400);
  myCanvas.parent("wrapper");
  if (firstRun) {
    generate();
    firstRun = !firstRun;
  } else {
    generate();
  }
  noLoop();
}
//get current generations

// generates data into 2D array
function generate() {
  cols = width / resolution;
  rows = height / resolution;
  grid = create2DArr(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //generates empty grid if firstRun, else fills nodes w/data
      firstRun
        ? (grid[i][j] = 0 && (generations = 0))
        : (grid[i][j] = floor(random(2)) && (empty = !empty));
    }
  }
  //redraws the canvas and resets data in arr
  redraw();
}

//actually paints nodes on screen based on arr
function draw() {
  if (empty) {
    document.getElementById("menu").appendChild(counter);
    counter.innerText = `Generations: 0`;
  } else {
    document.getElementById("menu").appendChild(counter);
    counter.innerText = `Generations: ${generations}`;
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        //alive
        fill("green");
        stroke("black");
        strokeWeight(1);
        rect(x, y, resolution - 1, resolution - 1);
      } else {
        //dead
        fill(1);
        stroke(0);
        stroke("green");
        strokeWeight(1);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  //creates state of next arr
  let next = create2DArr(cols, rows);

  // Compute next based on current grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
  generations += 1;
}

//start and stop animation
function playStop() {
  play = !play;
  console.log("play:", { play });
  if (play) {
    loop();
  } else {
    noLoop();
  }
}
//plays one frame
function nextGen() {}
//clears grid
function clearGrid() {
  generations = 0;
  empty = true;
  noLoop();
  console.log("cleared grid");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      grid[i][j] = 0;
      fill(1);
      rect(x, y, resolution - 1, resolution - 1);
    }
  }
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
