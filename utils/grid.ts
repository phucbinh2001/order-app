export function getGridItemPosition(index: number, numOfColumns: number = 4) {
  const y = Math.floor(index / numOfColumns);
  const x = index % numOfColumns;
  return { x, y };
}
