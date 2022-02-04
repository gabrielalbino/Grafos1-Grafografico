import * as Icon from 'react-bootstrap-icons';
const toolsTips = [
  "Clique em um pixel para pinta-lo",
  "Clique em um pixel para preencher a area",
  "Clique em dois pixels para formar uma linha"
]

const renderTools = (color, tool, setTool) => {
  const invert = require('invert-color');
  return (
    <>
      <div className="d-flex">
        <div className={`tool ${tool === 0 && 'selected'}`} onClick={() => tool !== 0 && setTool(0)} style={{ backgroundColor: color }}>
          <Icon.PaintBucket color={invert(color)} width="48" height="48" />
        </div>
        <div className={`tool ${tool === 1 && 'selected'}`} onClick={() => tool !== 1 && setTool(1)} style={{ backgroundColor: color }}>
          <Icon.BrushFill color={invert(color)} width="48" height="48" />
        </div>
        <div className={`tool ${tool === 2 && 'selected'}`} onClick={() => tool !== 2 && setTool(2)} style={{ backgroundColor: color }}>
          <Icon.VectorPen color={invert(color)} width="48" height="48" />
        </div>
      </div>
      <p>{toolsTips[tool]}</p>
    </>
  )
}

export { renderTools }