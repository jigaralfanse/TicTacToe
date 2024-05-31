import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import Players from "./components/Players";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combination.js";
import GameOver from "./components/Gameover.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriverActivePlayer(gameTurns) {
  let currentplayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentplayer = 'O';
  }

  return currentplayer;
}

function App() {
  const  [players, setPlayers] = useState({
    'X':'Player 1',
    'O':'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriverActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map(array=>[...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner ;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length===9 && !winner;

  function handleSelectSquare(ri, ci) {
    setGameTurns((prevTurns) => {
      const currentplayer = deriverActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: ri, col: ci },
          player: currentplayer
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players name="player 1" symbol='X' isActive={activePlayer === 'X'} onChangename = {handlePlayerNameChange} />
          <Players name="player 2" symbol='O' isActive={activePlayer === 'O'} onChangename = {handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw)&& <GameOver winner = { winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
