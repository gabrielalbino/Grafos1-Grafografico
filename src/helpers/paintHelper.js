const paintCell = (color, cell, state, setState) => {
  const { gridHelper } = state;
  gridHelper.setCellColor(cell, color);
  setState({ ...state, gridHelper });
}


const doAction = (cell, color, state, setState) => {
  let { gridHelper, tool, selectedPoint } = state;
  if (tool === 0) {
    const cellCallback = (currCell) => {
      paintCell(color, currCell, state, setState)
    }
    state.gridHelper.BFS(cell, cellCallback);
  }
  else if (tool === 1) {
    paintCell(color, cell, state, setState)
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
          paintCell(color, cell, state, setState)
        });
        setState({ ...state, selectedPoint: [] })
      }
      const end = {
        cell,
        callback: foundCallback,
        fail: () => gridHelper.BFS(selectedPoint[0], null, end, true)
      }
      gridHelper.BFS(selectedPoint[0], null, end, false);
    }
    else {
      setState({ ...state, selectedPoint: [cell] });
    }
  }
}
export { doAction }