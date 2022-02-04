const paintCell = (color, cell, grid, setGrid) => {
  grid[cell[0]][cell[1]].color = color;
  setGrid([...grid]);
}


const doAction = (tool, color, cell, grid, setGrid) => {
  if (tool === 1) {
    paintCell(color, cell, grid, setGrid)
  }
  else {
    //bucketfill
  }
}
export { doAction }