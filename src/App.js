import './App.css';
import React, { useState, useEffect } from 'react';
import NodeDisplay from './components/Node/NodeDisplay';
import { Node } from './components/Node';

const ROWS = 5;
const COLS = 5;

function App() {

  const [nodes, setNodes] = useState([]);
  const [startNode, setStart] = useState(null);
  const [targetNode, setTarget] = useState(null);
  const [playing, setPlay] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let array = [];
    for (let row = 0; row < ROWS; row++) {
      let subArray = [];
      for (let col = 0; col < COLS; col++) {
        subArray.push(new Node(row, col));
      }
      array.push(subArray);
    }
    setNodes(array);
  }, []);

  useEffect(() => {
    let generator = dfs(startNode, nodes);
    let latestNodes = nodes;
    let nextValue = 0;
    if (!done && playing) {
      let timerFunc = window.setInterval(() => {
        const action = generator.next(nextValue);
        if (action.done) {
          console.log("Done!");
          setDone(true);
          return;
        } else if (action.value[0] === 'visit') {
          console.log(action);
          const row = action.value[1];
          const col = action.value[2];
          if (latestNodes[row][col].visited === false) {
            latestNodes[row][col].visited = true;
          }
          latestNodes = [...latestNodes];
          setNodes(latestNodes);
          if ((latestNodes[row][col].row === targetNode.row) && (latestNodes[row][col].col === targetNode.col)) {
            console.log("Found Target!");
            setDone(true);
            return;
          }
        }
      }, 200);

      return () => {
        window.clearInterval(timerFunc);
      }
    }
  }, [done, playing]);

  const handleNodeChange = (e, row, col) => {
    let node = nodes[row][col];
    if (e.shiftKey && !startNode) {
      node.start = true;
      setStart(node);
      setNodes(nodes);
    }
    if (e.ctrlKey && !targetNode) {
      node.target = true;
      setTarget(node);
      setNodes(nodes);
    }
  }

  const findNeighbours = (row, col, nodes) => {
    let neigbours = [];
    // find the north neighbour
    if (row > 0 && nodes[row - 1][col]) {
      if (nodes[row - 1][col].visited === false) {
        neigbours.push(nodes[row - 1][col]);
      }
    }
    // find the west neighbour
    if (col > 0 && nodes[row][col - 1]) {
      if (nodes[row][col - 1].visited === false) {
        neigbours.push(nodes[row][col - 1]);
      }
    }
    // find the south neighbour
    if (row < ROWS - 1 && nodes[row + 1][col]) {
      if (nodes[row + 1][col].visited === false) {
        neigbours.push(nodes[row + 1][col]);
      }
    }
    // find the east neighbour
    if (col < COLS - 1 && nodes[row][col + 1]) {
      if (nodes[row][col + 1].visited === false) {
        neigbours.push(nodes[row][col + 1]);
      }
    }
    return neigbours;
  }

  function visitNode(row, col) {
    return ['visit', row, col];
  }
  
  
  function* dfs(startNode, nodes) {
    let queue = [];
      queue.push(startNode);
      while (queue.length > 0) {
        let node = queue.shift();
        // node.visited = true;
        // if ((node.row === targetNode.row) && (node.col === targetNode.col)) {
        //   console.log("Found Target!");
        //   break;
        // }
        yield visitNode(node.row, node.col);
        let neigbours = findNeighbours(node.row, node.col, nodes);
        queue.push(...neigbours);
  }
}

  const findTarget = () => {
    if (startNode !== null && targetNode !== null) {
      if (playing && done) {
        console.log("Visualization Done!");
      } else {
        setPlay(true);
      }
    } else {
      console.log("Set Start and Target!");
    }
  }

  return (
    <div className='container'>
      <div className="map">
        {nodes.map((row, rowIndex) => (
          <div className="row" id={rowIndex}>
            {row.map((col, colIndex) => (
              <NodeDisplay node={nodes[rowIndex][colIndex]} handleNodeChange={handleNodeChange} isStart={startNode} isTarget={targetNode}/>
            ))}
          </div>
        ))}
      </div>
      <button onClick={findTarget}>Find Target using BFS</button>
    </div>
  );
}

export default App;
