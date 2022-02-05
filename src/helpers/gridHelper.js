const _generateControlGrid = () => {
  const newNode = () => ({ visited: false });
  const newRow = () => Array.apply(null, Array(25)).map(() => newNode());
  const newGrid = Array.apply(null, Array(25)).map(() => newRow());
  return newGrid;
}

const generateGrid = () => {
  const newNode = (x, y) => ({ color: '#ffffff', x, y });
  const newRow = (x) => Array.apply(null, Array(25)).map((_, y) => newNode(x, y));
  const newGrid = Array.apply(null, Array(25)).map((_, x) => newRow(x));
  return newGrid;
}

const getNeighboors = (grid, node, controlGrid) => {
  const { x, y, color } = node;
  let neighboors = [];
  let offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  offsets.forEach((offset) => {
    const [offsetX, offsetY] = offset;
    const neighboorX = x + offsetX;
    const neighboorY = y + offsetY;
    if (neighboorX >= 0 && neighboorX < grid.length &&
      neighboorY >= 0 && neighboorY < grid[0].length) {
      const neighboor = grid[neighboorX][neighboorY];
      const controlCell = controlGrid[neighboorX][neighboorY];
      const isSameColor = neighboor && neighboor.color === color;
      const { visited } = controlCell || false;
      if (isSameColor && !visited) neighboors.push(neighboor);
    }
  })
  return neighboors;
}

const BFS = (grid, cell, end, execFunction) => {
  const controlGrid = _generateControlGrid(grid);
  let queue = [cell];
  while (queue.length) {
    const currCell = queue.pop();
    const { x, y } = currCell;
    controlGrid[x][y].visited = true;
    getNeighboors(grid, currCell, controlGrid).forEach(neighboor => queue.push(neighboor));
    execFunction(currCell);
  }
}

export { generateGrid, BFS };