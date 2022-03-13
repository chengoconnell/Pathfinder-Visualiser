import React, { useState } from "react";
import { dijkstra } from "../Algorithms/Dijkstra";
import { Node } from "./Node/Node";
import "./PathfindingVisualiser.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;

export interface NodeAttributes {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: null;
  isMousePressed: boolean;
}

export const PathfindingVisualiser = () => {
  const [grid, setGrid] = useState(initialiseGrid());
  const [isMousePressed, setMousePressed] = useState(false);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => setMousePressed(false);

  // setStateGrid(grid);
  const animateDijkstra = (visitedNodesInOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = grid.slice();
        const newNode = {
          ...node,
          isVisited: true,
        };
        newGrid[node.row][node.col] = newNode;
        console.log(document.getElementById(`node-${node.row}-${node.col}`));
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = `node node-visited`;
        setGrid(newGrid);
      }, 100 * i);
    }
  };
  const visualiseDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
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
                  row={row}
                  col={node}
                  isMousePressed={isMousePressed}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
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

export const createNode = (row: number, col: number): NodeAttributes => {
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
    isMousePressed: false,
  };
};

export const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
