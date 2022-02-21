import React, { useState } from "react";
import { Dijkstra } from "../Algorithms/Dijkstra";
import { Node } from "./Node/Node";
import "./PathfindingVisualiser.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;

export const PathfindingVisualiser = () => {
  const [grid, setGrid] = useState(initialiseGrid());

  // setStateGrid(grid);
  const animateDijkstra = (visitedNodesInOrder) => {
    for (const i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      const newGrid = grid.slice();
      const newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.row][node.col] = newNode;
      setTimeout(() => setGrid(newGrid), 100);
    }
  };
  const visualiseDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = Dijkstra(grid, startNode, endNode);
    animateDijkstra(visitedNodesInOrder);
  };
  return (
    <div className="grid">
      <button onClick={visualiseDijkstra}>Start Dijkstra</button>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isEnd, isVisited } = node;
              return (
                <Node
                  key={`${rowIdx}_${nodeIdx}`}
                  isStart={isStart}
                  isEnd={isEnd}
                  isVisited={isVisited}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const initialiseGrid = () => {
  const grid = [];

  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const createNode = (row, col) => {
  // return an object of the node info
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
