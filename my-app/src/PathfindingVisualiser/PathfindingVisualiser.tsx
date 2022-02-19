import React, { useState } from "react";
import { Node } from "./Node/Node";
import "./PathfindingVisualiser.css";

export const PathfindingVisualiser = () => {
  const [Grid, setGrid] = useState([]);

  const grid = initialiseGrid(20, 50);

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish } = node;
              return (
                <Node
                  key={`${rowIdx}_${nodeIdx}`}
                  isStart={isStart}
                  isFinish={isFinish}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const initialiseGrid = (height, width) => {
  const grid = [];

  for (let row = 0; row < height; row++) {
    const currentRow = [];
    for (let col = 0; col < width; col++) {
      const currentNode = {
        col,
        row,
        isStart: row === 10 && col === 5,
        isFinish: row === 10 && col === 45,
      };
      currentRow.push(currentNode);
    }
    grid.push(currentRow);
  }
  return grid;
};
