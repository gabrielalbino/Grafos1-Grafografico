const generateGrid = () => {
  const newNode = () => ({ color: '#ffffff' });
  const newRow = () => Array.apply(null, Array(25)).map(() => newNode());
  const newGrid = Array.apply(null, Array(25)).map(() => newRow());
  return newGrid;
}

export { generateGrid };