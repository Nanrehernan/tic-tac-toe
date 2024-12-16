import { useState } from "react";

import Square from "./Square";

import "./App.css"

const TURNS = { x: "❌", o: "⚪" };

const WINNING_COMBINATIONS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

export default function App() {
   const [board, setBoard] = useState(Array(9).fill(null));
   const [turn, setTurn] = useState(TURNS.x);
   const [winner, setWinner] = useState(null);

   function gameOver(board, turn) {
      return WINNING_COMBINATIONS.some((combination) =>
         combination.every((index) => board[index] === turn)
      );
   }

   function updateBoard(index) {
      if (winner || board[index]) return;

      const newBoard = [...board];
      newBoard[index] = turn;

      if (gameOver(newBoard, turn)) {
         setBoard(newBoard);
         setWinner(turn);
         return;
      }

      if (newBoard.every((square) => square !== null)) {
         setBoard(newBoard);
         setWinner("Empate");
         return;
      }

      setBoard(newBoard);
      setTurn(turn === TURNS.x ? TURNS.o : TURNS.x);
   }

   return (
      <main>
         <h1 className="titulo">Tic Tac Toe</h1>

         <section className="game">
            {board.map((square, index) => (
               <Square key={index} index={index} updateBoard={updateBoard}>
                  {square}
               </Square>
            ))}
         </section>

         <section className="status">
            {winner ? (
               winner === "Empate" ? (
                  <p>Es un empate</p>
               ) : (
                  <p>¡Felicidades, jugador {winner} ha ganado!</p>
               )
            ) : (
               <p>Turno de {turn}</p>
            )}
         </section>
      </main>
   );
}
