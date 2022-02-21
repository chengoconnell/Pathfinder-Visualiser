import "./Node.css";

export const Node = ({ isStart, isEnd, isVisited }) => {
  const nodeType = isStart
    ? "node-start"
    : isEnd
    ? "node-finish"
    : isVisited
    ? "node-visited"
    : "";
  return <div className={`node ${nodeType}`}></div>;
};
