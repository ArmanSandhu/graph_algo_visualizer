import './Node.css';
import React from 'react';

function NodeDisplay (props) {

    const handleClick = e => {
        props.handleNodeChange(e, props.node.row, props.node.col);
    }

    return (
        <div className={`node ${props.node.start  ? "isStart" : ""} ${props.node.target ? "isTarget" : ""} ${props.node.visited ? "isVisted" : ""}`} onClick={handleClick}></div>
    );
}

export default NodeDisplay;