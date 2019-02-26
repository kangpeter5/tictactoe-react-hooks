import React, { useState } from "react"
import Board from "./Board"

export default function Game(props) {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) , chosen: null }])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)
    const [ascOrder, setAscOrder] = useState(true)
    const current = history[stepNumber]

    function handleClick(i) {
        const squares = [...current.squares];
        const chosen = i

        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory( history.concat([{ squares, chosen }]))
        setStepNumber(history.slice(0, stepNumber + 1).length)
        setXIsNext(!xIsNext)
    }

    function jumpTo(step) {
        setStepNumber(step)
        setXIsNext( (step % 2) === 0)

        let num = step + 1;
        let selected = document.querySelector('.game-info .selected');
        let el = document.querySelector(".game-info li:nth-of-type(" + num + ")");

        if(selected !== null){
            selected.classList.remove('selected')
            el.classList.add('selected')
        } else {
            el.classList.add('selected')
        }
    }

    function changeOrder(){
        setAscOrder(!ascOrder)
    }

    const winner = calculateWinner(current.squares)

    const moves = history.map( (step,move) => {
        let col = step.chosen % 3 + 1
        let row = Math.floor(step.chosen/3) + 1

        const desc = move ?
            'Go to move #' + move + " (col: "+ col + ", row:" + row+ ")" :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={ () => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    let status
    
    if(winner && winner.winner !== 'Draw'){
        status = 'Winner: ' + winner.winner;
    }
    else if(!winner && history.length === 10){
        status = "It's a Draw";
    }else{
        status = 'Current player: ' + (xIsNext ? 'X' : 'O');
    }
    if(!ascOrder){
        moves.sort(function(a,b){
            return b.key - a.key
        });
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <div className="order">
                    <button onClick={ () => changeOrder() }>Change Order</button>
                </div>
                <ol className="list-moves">{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return {
                winner: squares[a]
            };
        }
    }
}