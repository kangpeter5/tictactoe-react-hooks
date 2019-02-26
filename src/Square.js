import React from  "react"

export default function Square(props) {
    const winningSquareStyle ={
        backgroundColor: '#00ff00'
    }
    return (
        <button className="square" style={props.winningSquare ? winningSquareStyle : null} onClick={props.onClick}>
            {props.value}
        </button>
    );
}