import { NodeAttributes } from "../PathfindingVisualiser/PathfindingVisualiser";

export const dijkstra = (grid, startNode, endNode) => {
  // handle edge cases
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === endNode) return visitedNodesInOrder;
    updateUnvisitedNeighbours(closestNode, grid);
  }
};

const sortNodesByDistance = (unvisitedNodes) => {
  // use comparison function for sorting
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbours = (node, grid) => {
  const neighbours = getUnvisitedNeighbours(node, grid);

  for (const neighbour of neighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
};

const getUnvisitedNeighbours = (node, grid) => {
  const neighbours = [];
  const { col, row } = node;
  // get north neighbour
  if (row > 0) neighbours.push(grid[row - 1][col]);
  // get south neighbour
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  // get east neighbour
  if (col > 0) neighbours.push(grid[row][col - 1]);
  // get west neigbour
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
};

const getAllNodes = (grid) => {
  // converts 2d array of nodes to 1 array
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

// backtracks from endNode to startNode to create array of nodes in shortest path order
export const getNodesInShortestPathOrder = (endNode: NodeAttributes) => {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};
