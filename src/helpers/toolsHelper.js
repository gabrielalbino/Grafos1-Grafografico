import * as Icon from 'react-bootstrap-icons';

const toolsTips = [
  ["Clique em um pixel para pinta-lo"],
  ["Clique em um pixel para preencher a area"],
  ["Clique em dois pixels para formar uma linha", "Selecione o segundo pixel"]
]

const renderTools = (state, setState) => {
  const { color, tool, selectedPoint } = state;
  return (
    <>
      <div className="d-flex">
        <div className={`tool ${tool === 0 && 'selected'}`} onClick={() => tool !== 0 && setState({ ...state, tool: 0 })} style={{ backgroundColor: color }}>
          <Icon.PaintBucket color={getColorByBgColor(color)} width="48" height="48" />
        </div>
        <div className={`tool ${tool === 1 && 'selected'}`} onClick={() => tool !== 1 && setState({ ...state, tool: 1 })} style={{ backgroundColor: color }}>
          <Icon.BrushFill color={getColorByBgColor(color)} width="48" height="48" />
        </div>
        <div className={`tool ${tool === 2 && 'selected'}`} onClick={() => tool !== 2 && setState({ ...state, tool: 2 })} style={{ backgroundColor: color }}>
          <Icon.VectorPen color={getColorByBgColor(color)} width="48" height="48" />
        </div>
      </div>
      <p>{toolsTips[tool][selectedPoint.length]}</p>
    </>
  )
}

/**
 * Get color (black/white) depending on bgColor so it would be clearly seen.
 * @param bgColor
 * @returns {string}
 */
const getColorByBgColor = (bgColor) => {
  if (!bgColor) { return ''; }
  return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
}
export { renderTools }