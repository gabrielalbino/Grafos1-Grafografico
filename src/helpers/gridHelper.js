class GridHelper {

  constructor(width, height, grid, controlGrid) {
    this.width = width;
    this.height = height;
    if (grid != null) {
      this.grid = grid;
    }
    else {
      this.grid = this._generateGrid();
    }
    this.controlGrid = controlGrid
  }

  getGrid() {
    return this.grid;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  getControlGrid = () => {
    return this.controlGrid;
  }

  setDimensions(height, width) {
    this.width = width;
    this.height = height;
    console.log("this.setDimensions", this, width, height)
    this.grid = this._generateGrid(null)
  }

  setCellColor(cell, color) {
    const { x, y } = cell;
    this.grid[x][y].color = color;
  }

  _generateControlGrid = () => {
    return this._generateGrid((x, y) => ({ visited: false, previous: null, x, y }));
  }

  _getNeighbors = (node, ignoreColor) => {
    const { x, y, color } = node;
    let neighbors = [];
    let offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    offsets.forEach((offset) => {
      const [offsetX, offsetY] = offset;
      const neighborX = x + offsetX;
      const neighborY = y + offsetY;
      if (neighborX >= 0 && neighborX < this.grid.length &&
        neighborY >= 0 && neighborY < this.grid[0].length) {
        const neighbor = this.grid[neighborX][neighborY];
        const controlCell = this.controlGrid[neighborX][neighborY];
        const isSameColor = (neighbor && neighbor.color === color) || ignoreColor;
        const { visited } = controlCell || false;
        if (neighbor && isSameColor && !visited) neighbors.push(neighbor);
      }
    })
    return neighbors;
  }

  _addNeighbors = (neighbor, previousCell, queue) => {
    const neighborX = neighbor.x;
    const neighborY = neighbor.y;
    this.controlGrid[neighborX][neighborY].previous = previousCell;
    this.controlGrid[neighborX][neighborY].visited = true;
    queue.push(neighbor);
  };

  _generateGrid = (renderObj) => {
    const element = renderObj ? renderObj : (x, y) => ({ color: '#ffffff', x, y });
    const newNode = (x, y) => element(x, y);
    const newRow = (x) => Array.apply(null, Array(this.width)).map((_, y) => newNode(x, y));
    const newGrid = Array.apply(null, Array(this.height)).map((_, x) => newRow(x));
    return newGrid;
  }

  BFS = (cell, execFunction, end, ignoreColor) => {
    let found = false;
    this.controlGrid = this._generateControlGrid();
    let queue = [cell];
    this.controlGrid[cell.x][cell.y].visited = true;
    while (queue.length) {
      const currCell = queue.shift();
      this._getNeighbors(currCell, ignoreColor).forEach(neighbor =>
        this._addNeighbors(neighbor, currCell, queue)
      );
      execFunction && execFunction(currCell);
      if (end && currCell === end.cell) {
        end.callback(this.controlGrid);
        found = true;
        break;
      }
    }
    if (end && !found) {
      end.fail();
    }
  }
}

export default GridHelper;