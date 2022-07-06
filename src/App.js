import './App.css';
import React, { useState } from 'react';

const ROWS = 25;
const COLS = 25; 

function App() {

  const [nodes, setNodes] = useState(Array(ROWS).fill(Array(COLS).fill(null)));

  return (
    <div className="map">
      {nodes.map((row, rowIndex) => (
        <div className="row" id={rowIndex}>
          {row.map((col, colIndex) => (
            <div className="node" id={colIndex}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
