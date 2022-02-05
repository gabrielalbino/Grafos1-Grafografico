import './MiniPaint.css';

import { CirclePicker } from 'react-color';

import { generateGrid } from "./helpers/gridHelper"
import useWindowDimensions from "./helpers/browserHelper";
import { useState } from 'react';
import { doAction } from './helpers/paintHelper';
import { renderTools } from './helpers/toolsHelper';
import invert from 'invert-color';

function MiniPaint() {
  document.oncontextmenu = function (e) {
    stopEvent(e);
    console.log(e.target);
  }
  function stopEvent(event) {
    if (event.preventDefault != null)
      event.preventDefault();
    if (event.stopPropagation != null)
      event.stopPropagation();
  }
  const { height, width } = useWindowDimensions();

  const [grid, setGrid] = useState(generateGrid(height, width));

  const [tool, setTool] = useState(0);
  const [color, setColor] = useState('#ffffff');
  return (
    <div className="d-flex">
      <div className="controller">
        {renderTools(color, tool, setTool)}
        <CirclePicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
      </div>
      <div className="grid">
        {
          grid.map((row, rowIdx) => (
            <div className="d-flex" key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <div className="cell" style={{ backgroundColor: cell.color }} key={cellIdx} onContextMenu={(e) => { e.preventDefault(); doAction(tool, invert(color), cell, grid, setGrid) }} onClick={() => doAction(tool, color, cell, grid, setGrid)} />
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
