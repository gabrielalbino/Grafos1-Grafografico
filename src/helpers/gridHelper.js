const _generateControlGrid = () => {
  const newNode = (x, y) => ({ visited: false, previous: null, x, y });
  const newRow = (x) => Array.apply(null, Array(25)).map((_, y) => newNode(x, y));
  const newGrid = Array.apply(null, Array(25)).map((_, x) => newRow(x));
  return newGrid;
}

const generateGrid = () => {
  const newNode = (x, y) => ({ color: '#ffffff', x, y });
  const newRow = (x) => Array.apply(null, Array(25)).map((_, y) => newNode(x, y));
  const newGrid = Array.apply(null, Array(25)).map((_, x) => newRow(x));
  return newGrid;
}

const getNeighbors = (grid, node, controlGrid, ignoreColor) => {
  const { x, y, color } = node;
  let neighbors = [];
  let offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  offsets.forEach((offset) => {
    const [offsetX, offsetY] = offset;
    const neighborX = x + offsetX;
    const neighborY = y + offsetY;
    if (neighborX >= 0 && neighborX < grid.length &&
      neighborY >= 0 && neighborY < grid[0].length) {
      const neighbor = grid[neighborX][neighborY];
      const controlCell = controlGrid[neighborX][neighborY];
      const isSameColor = (neighbor && neighbor.color === color) || ignoreColor;
      const { visited } = controlCell || false;
      if (neighbor && isSameColor && !visited) neighbors.push(neighbor);
    }
  })
  return neighbors;
}

const addNeighbors = (neighbor, previousCell, queue, controlGrid) => {
  const neighborX = neighbor.x;
  const neighborY = neighbor.y;
  controlGrid[neighborX][neighborY].previous = previousCell;
  controlGrid[neighborX][neighborY].visited = true;
  queue.push(neighbor);
};

const BFS = (grid, cell, execFunction, end, ignoreColor) => {
  let found = false;
  const controlGrid = _generateControlGrid(grid);
  let queue = [cell];
  controlGrid[cell.x][cell.y].visited = true;
  while (queue.length) {
    const currCell = queue.shift();
    getNeighbors(grid, currCell, controlGrid, ignoreColor).forEach(neighbor => addNeighbors(neighbor, currCell, queue, controlGrid));
    execFunction && execFunction(currCell);
    if (end && currCell === end.cell) {
      end.callback(controlGrid);
      found = true;
      break;
    }
  }
  if (end && !found) {
    end.fail();
  }
}


const DFS = (grid, cell, execFunction) => {
  const controlGrid = _generateControlGrid(grid);
  let queue = [cell];
  while (queue.length) {
    const currCell = queue.pop();
    const { x, y } = currCell;
    controlGrid[x][y].visited = true;
    getNeighbors(grid, currCell, controlGrid).forEach(neighbor => {
      const neighborX = neighbor.x;
      const neighborY = neighbor.y;
      controlGrid[neighborX][neighborY].previous = currCell;
      queue.push(neighbor);
    });
    execFunction(currCell);
  }
}

export { generateGrid, BFS, DFS };