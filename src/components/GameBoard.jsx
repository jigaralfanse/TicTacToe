import React from 'react';

const GameBoard = ({ onSelectSquare, board }) => {
    return (
        <ol id='game-board'>
            {board.map((row, ri) => (
                <li key={ri}>
                    <ol>
                        {row.map((playerSymbol, ci) => (
                            <li key={ci}>
                                <button
                                    onClick={() => onSelectSquare(ri, ci)}
                                    disabled={playerSymbol !== null}
                                    // You can add more conditions to disable the button if needed
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
};

export default GameBoard;
