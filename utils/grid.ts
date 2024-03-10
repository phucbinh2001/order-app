export function getGridItemPosition(index: number, numOfColumns: number = 5) {
  const y = Math.floor(index / numOfColumns);
  const x = index % numOfColumns;
  return { x, y };
}
