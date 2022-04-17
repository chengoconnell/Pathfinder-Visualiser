import "./Node.css";

export const Node = ({
  row,
  col,
  isStart,
  isEnd,
  isMousePressed,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  isWall,
}) => {
  const nodeType = isStart
    ? "node-start"
    : isEnd
    ? "node-finish"
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
