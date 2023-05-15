import { useState } from 'react';
import Square from './Square';

export function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if (squares[i] || WinnerLogic(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(newSquares);
  }

  const winner = WinnerLogic(squares);
  let game_status = winner ? (winner + ' is the Winner') : ('Next Player is : ' + (xIsNext ? 'X' : 'O'));

  return (
    <>
      <div style={{marginLeft: '600px', fontSize:'50px', }}>{game_status}</div>
      <div style={{marginLeft: '600px'}} className="board-row">
        <Square  value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div style={{marginLeft: '600px'}} className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div style={{marginLeft: '600px'}} className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>

  )
}

export function WinnerLogic(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ((squares[a]) && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const [xIsNext, setxIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(newSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setxIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setxIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, index) => {
    let itemDes = "";
    if (index > 0) {
      itemDes = "Go to move #" + index;
    } else {
      itemDes = "Please start the game";
    }

    return (
      <li>
        <button style={{backgroundColor:'gray',color:'white', padding: '10px', border:'none', borderRadius:'5px', marginTop:'10px', marginLeft: '690px'}} key={index} onClick={() => jumpTo(index)}>{itemDes}</button>
      </li>
    )
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <li style={{listStyleType:'none'}}>{moves}</li>
      </div>
    </div>
  );
}



export default Game;
