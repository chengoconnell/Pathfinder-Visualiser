import "./Node.css";

export const Node = ({
  row,
  col,
  isStart,
  isEnd,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  isWall,
  isVisited,
}) => {
  const nodeType = isStart
    ? "node-start"
    : isEnd
    ? "node-finish"
    : isVisited
    ? "node-visited"
    : isWall
    ? "node-wall"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${nodeType}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};
