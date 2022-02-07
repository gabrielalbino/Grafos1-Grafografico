import './MiniPaint.css';

import { CirclePicker } from 'react-color';

import { generateGrid } from "./helpers/gridHelper"
import useWindowDimensions from "./helpers/browserHelper";
import { useState } from 'react';
import { doAction } from './helpers/paintHelper';
import { renderTools } from './helpers/toolsHelper';
import invert from 'invert-color';

function MiniPaint() {

  const { height, width } = useWindowDimensions();

  const [state, setState] = useState({
    grid: generateGrid(height, width),
    tool: 0,
    color: "#ffffff",
    selectedPoint: []
  });

  const cellClick = (e, cell, isInverted) => {
    e.preventDefault();
    doAction(cell, isInverted ? invert(state.color) : state.color, state, setState)
  };

  return (
    <div className="d-flex">
      <div className="controller">
        {renderTools(state, setState)}
        <CirclePicker color={state.color} onChangeComplete={(color) => setState({ ...state, color: color.hex })} />
      </div>
      <div className="grid">
        {
          state.grid.map((row, rowIdx) => (
            <div className="d-flex" key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <div className="cell" style={{ backgroundColor: cell.color }} key={cellIdx} onClick={e => cellClick(e, cell, false)} onContextMenu={e => cellClick(e, cell, true)} />
              )
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default MiniPaint;
