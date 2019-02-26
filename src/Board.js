import React from "react"
import Square from "./Square"

export default function Board(props) {
    function renderSquare(i) {
        return (
            <Square 
                value={props.squares[i]}
                onClick={ () => props.onClick(i) } 
            />
        );
    }
    let board = [];
    for(var i=0; i<3; i++){
        let cell = []

        for(var j=0; j<3; j++){
            let rel = i * 3 + j
            cell.push(
                <span key={rel}>
                    {renderSquare(rel)}
                </span>
            );
        }
        board.push(
            <div className="board-row" key={i}>{cell}</div>
        );
    }
    return (
        <div>
            {board}
        </div>
    );
}