import { BFS } from "./gridHelper";

const paintCell = (color, cell, grid, state, setState) => {
  const { x, y } = cell;
  grid[x][y].color = color;
  setState({ ...state, grid: [...grid] });
}


const doAction = (cell, color, state, setState) => {
  let { grid, tool, selectedPoint } = state;
  if (tool === 0) {
    const cellCallback = (currCell) => {
      paintCell(color, currCell, grid, state, setState)
    }
    BFS(grid, cell, cellCallback);
  }
  else if (tool === 1) {
    paintCell(color, cell, grid, state, setState)
  }
  else if (tool === 2) {
    if (selectedPoint.length) {
      const foundCallback = (controlGrid) => {
        const cellsToPaint = [];
        var currControlCell = controlGrid[cell.x][cell.y];
        do {
          cellsToPaint.push(currControlCell)
          currControlCell = currControlCell.previous ? controlGrid[currControlCell.previous.x][currControlCell.previous.y] : null;
        } while (currControlCell)
        cellsToPaint.forEach(cell => {
          paintCell(color, cell, grid, state, setState)
        });
        setState({ ...state, selectedPoint: [] })
      }
      const end = {
        cell,
        callback: foundCallback,
        fail: () => BFS(grid, selectedPoint[0], null, end, true)
      }
      BFS(grid, selectedPoint[0], null, end, false);
    }
    else {
      setState({ ...state, selectedPoint: [cell] });
    }
  }
}
export { doAction }