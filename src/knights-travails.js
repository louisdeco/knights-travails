function Graph() {
  const adjacencyList = {};

  function vertexToString(vertex) {
    return vertex.join();
  }

  function addVertex(vertex) {
    adjacencyList[vertexToString(vertex)] = [];
  }

  function addEdge(vertex1, vertex2) {
    adjacencyList[vertexToString(vertex1)].push(vertex2);
  }

  function getNeighbors(vertex) {
    return adjacencyList[vertexToString(vertex)] || [];
  }

  function getAdjacencyList() {
    return adjacencyList;
  }

  function doesVertexExist(vertex) {
    return vertexToString(vertex) in adjacencyList;
  }

  return {
    addVertex,
    addEdge,
    getNeighbors,
    getAdjacencyList,
    doesVertexExist,
  };
}

function KnightMoves() {
  const movesOffset = [
    [-1, -2],
    [-2, -1],
    [1, -2],
    [2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
  ];

  function isValidPosition(vertex) {
    return vertex[0] >= 0 && vertex[0] < 8 && vertex[1] >= 0 && vertex[1] < 8;
  }

  function possibleMoves(vertex) {
    const moves = movesOffset
      .map(([col, row]) => [col + vertex[0], row + vertex[1]])
      .filter(isValidPosition);
    return moves;
  }

  return { possibleMoves };
}

function PathFinder() {
  function shortestPath(vertexStart, vertexEnd) {
    let queue = [vertexStart];
    let path = [];
    let graph = Graph();
    let parentMap = {};
    let visited = new Set([vertexStart.toString()]);

    while (queue.length > 0) {
      let currentNode = queue.shift();

      if (currentNode.toString() === vertexEnd.toString()) {
        console.log(`Found destination: ${currentNode}`);
        path.push(currentNode);
        return reconstructPath(parentMap, vertexStart, vertexEnd);
      }

      graph.addVertex(currentNode);
      console.log(`Exploring from: ${currentNode}`);

      let possibleMoves = KnightMoves().possibleMoves(currentNode);

      possibleMoves.forEach((neighbor) => {
        const neighborString = neighbor.toString();

        if (!visited.has(neighborString)) {
          visited.add(neighborString);
          graph.addVertex(neighbor);
          graph.addEdge(currentNode, neighbor);
          queue.push(neighbor);
          parentMap[neighborString] = currentNode;
        }
      });

      path.push(currentNode);
    }

    return null;
  }

  function reconstructPath(parentMap, start, end) {
    let path = [end];
    let current = end.toString();
    while (current !== start.toString()) {
      let parent = parentMap[current];
      path.unshift(parent);
      current = parent.toString();
    }

    return path;
  }
  return { shortestPath };
}

export { PathFinder };
