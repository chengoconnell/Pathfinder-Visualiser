import "./Node.css";

export const Node = ({ isStart, isFinish }) => {
  const nodeType = isStart ? "node-start" : isFinish ? "node-finish" : "";
  return <div className={`node ${nodeType}`}></div>;
};
