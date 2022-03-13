export const dijkstra = (grid, startNode, endNode) => {
  // handle edge cases
  const visitedNodesInOrder = [];
  if (startNode === endNode) return false;
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // handle walls (later)
    // handle impossible conditions (later)
    // handle animation (later)
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    // return an array of nodes in the order we visited them in for animation
    if (closestNode === endNode) return visitedNodesInOrder;
    updateNeighbours(closestNode, grid);
  }
};

const sortNodesByDistance = (unvisitedNodes) => {
  // use comparison function for sorting
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateNeighbours = (node, grid) => {
  const neighbours = getNeighbours(node, grid);

  for (const neighbour of neighbours) {
    neighbour.distance = node.distance + 1;
  }
};

const getNeighbours = (node, grid) => {
  const neighbours = [];
  const { row, col } = node;
  // get north neighbour
  if (row > 0) neighbours.push(grid[row - 1][col]);
  // get south neighbour
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  // get east neighbour
  if (col > 0) neighbours.push(grid[row][col - 1]);
  // get west neigbour
  if (col < grid[row].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours;
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
