import './MiniPaint.css';

import { ChromePicker } from 'react-color';

import GridHelper from "./helpers/gridHelper"
import { useState } from 'react';
import { doAction } from './helpers/paintHelper';
import { renderTools } from './helpers/toolsHelper';
import invert from 'invert-color';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';

function MiniPaint() {
  const cubeSize = 25;
  const [state, setState] = useState({
    gridHelper: new GridHelper(0, 0, null, null),
    tool: 0,
    color: "#ffffff",
    selectedPoint: [],
    gridQueue: []
  });

  const gridRef = useRef(null)

  useLayoutEffect(() => {
    const { clientHeight, clientWidth } = gridRef.current;
    console.log(clientHeight, clientWidth)
    setState(s => {
      s.gridHelper.setDimensions(Math.ceil(clientHeight / cubeSize), Math.ceil(clientWidth / cubeSize));
      console.log(s.gridHelper);
      return { ...s }
    })
  }, [gridRef.current?.clientHeight, gridRef.current?.clientWidth])

  const cellClick = (e, cell, isInverted) => {
    e.preventDefault();
    doAction(cell, isInverted ? invert(state.color) : state.color, state, setState)
  };

  return (
    <div id="wrapper" className="d-flex">
      <div className="controller">
        {renderTools(state, setState)}
        <ChromePicker color={state.color} onChangeComplete={(color) => setState({ ...state, color: color.hex })} />
      </div>
      <div className="grid" ref={gridRef}>
        {
          state.gridHelper.getGrid().map((row, rowIdx) => (
            <div className="d-flex" key={rowIdx} >
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
