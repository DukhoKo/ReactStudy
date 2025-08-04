import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function BoardRow({ startIndex, squares, onSquareClick }) {
  return (
    <div className="board-row">
      <Square value={squares[startIndex]} onSquareClick={() => onSquareClick(startIndex)} />
      <Square value={squares[startIndex + 1]} onSquareClick={() => onSquareClick(startIndex + 1)} />
      <Square value={squares[startIndex + 2]} onSquareClick={() => onSquareClick(startIndex + 2)} />
    </div>
  );
}

function BoardRows({squares, onSquareClick}){
  const rows = [];
  for(let i = 0; i<3; i++) {
    rows.push(
      <BoardRow key={i} startIndex={i*3} squares={squares} onSquareClick={onSquareClick} />
    );
  }
  return <>{rows}</>;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    
    const nextSquares = squares.slice();
    
    nextSquares[i] = xIsNext ? 'X' : 'O';
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if(!squares.includes(null)) { //squares에 null이 없으면 무승부 추가
    status = 'Draw';
  }else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {/* <BoardRow startIndex={0} squares={squares} onSquareClick={handleClick} />
      <BoardRow startIndex={3} squares={squares} onSquareClick={handleClick} />
      <BoardRow startIndex={6} squares={squares} onSquareClick={handleClick} /> */}
      <BoardRows squares={squares} onSquareClick={handleClick} />
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
