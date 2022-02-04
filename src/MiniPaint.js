import './MiniPaint.css';

import { CirclePicker } from 'react-color';

import { generateGrid } from "./helpers/gridHelper"
import useWindowDimensions from "./helpers/browserHelper";
import { useState } from 'react';
import { doAction } from './helpers/paintHelper';
import { renderTools } from './helpers/toolsHelper';

function MiniPaint() {

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
                <div className="cell" style={{ backgroundColor: cell.color }} key={cellIdx} onClick={() => doAction(tool, color, [rowIdx, cellIdx], grid, setGrid)}>
                </div>
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
