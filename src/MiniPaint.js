import './MiniPaint.css';

import { CirclePicker } from 'react-color';

import { generateGrid } from "./helpers/gridHelper"
import * as Icon from 'react-bootstrap-icons';
import useWindowDimensions from "./helpers/browserHelper";
import { useState } from 'react';
import { doAction } from './helpers/paintHelper';

function MiniPaint() {
  const invert = require('invert-color');

  const { height, width } = useWindowDimensions();

  const [grid, setGrid] = useState(generateGrid(height, width));

  const [tool, setTool] = useState(0);
  const [color, setColor] = useState('#ffffff');
  return (
    <div className="d-flex">
      <div className="controller">
        <div className="d-flex">
          <div className={`tool ${tool === 0 && 'selected'}`} onClick={() => tool !== 0 && setTool(0)} style={{ backgroundColor: color }}>
            <Icon.BucketFill color={invert(color)} width="48" height="48" />
          </div>
          <div className={`tool ${tool === 1 && 'selected'}`} onClick={() => tool !== 1 && setTool(1)} style={{ backgroundColor: color }}>
            <Icon.Pencil color={invert(color)} width="48" height="48" />
          </div>
        </div>
        <CirclePicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
      </div>
      <div className="grid">
        {
          grid.map((row, rowIdx) => (
            <div class="d-flex" key={rowIdx}>
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
