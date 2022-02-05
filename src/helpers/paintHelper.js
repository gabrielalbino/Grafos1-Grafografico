import { BFS } from "./gridHelper";

const paintCell = (color, cell, grid, setGrid) => {
  const { x, y } = cell;
  grid[x][y].color = color;
  setGrid([...grid]);
}


const doAction = (tool, color, cell, grid, setGrid) => {
  if (tool === 1) {
    paintCell(color, cell, grid, setGrid)
  }
  else if (tool === 0) {
    const newGrid = [...grid];
    BFS(grid, cell, null, (currCell) => {
      paintCell(color, currCell, grid, setGrid)
    });
    setGrid(newGrid);
  }
}
export { doAction }