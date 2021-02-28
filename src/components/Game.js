import React, { useState } from "react";
import "./Game.css";

export default function Game(props) {
  const [arr, setArr] = useState(["", "", "", "", "", "", "", "", ""]);
  let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [matrix, setMatrix] = useState([
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ]);

  const [count, setCount] = useState(0);
  let currentP = props.player;

  function checkWinner() {
    for (let i = 0; i < 3; i++) {
      if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
        if (matrix[i][2] === 1) return 1;
        else if (matrix[i][2] === 0) return 0;
      }
      if (matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]) {
        if (matrix[2][i] === 1) return 1;
        else if (matrix[2][i] === 0) return 0;
      }
    }
    if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
      if (matrix[2][2] === 1) return 1;
      else if (matrix[2][2] === 0) return 0;
    }
    if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
      if (matrix[2][0] === 1) return 1;
      else if (matrix[2][0] === 0) return 0;
    }
    return -1;
  }

  function Change(index) {
    if (arr[index] === "") {
      props.setPlayer(!props.player);
      if (props.player) {
        let newArr = [...arr];
        newArr[index] = <img src={props.CrossDark} alt="X" />;
        setArr(newArr);
      } else {
        let newArr = [...arr];
        newArr[index] = <img src={props.CircleDark} alt="O" />;
        setArr(newArr);
      }
      setCount(count + 1);
      console.log(count);

      // matrix filling
      let i = parseInt(index / 3);
      let j = parseInt(index % 3);

      currentP ? (matrix[i][j] = 1) : (matrix[i][j] = 0);
      console.table(matrix);
      currentP = !currentP;

      let ans = checkWinner();
      if (ans === 1) {
        console.log(props.names[1] + " won ");
      } else if (ans === 0) {
        console.log(props.names[0] + " won ");
      }
    }
    // console.log(arr);
    if (count === 8) props.Result();
  }

  const Cell = (i) => {
    return (
      <div className="button">
        <button className="buttons" onClick={() => Change(i)}>
          {arr[i]}
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="game">{array.map((i) => Cell(i))}</div>
      {count === 9 && (
        <button
          className="refresh"
          onClick={() => {
            setArr(["", "", "", "", "", "", "", "", ""]);
            setCount(0);
            props.setProceed(true);
            props.setNames(["Player 1 ", "Player 2 "]);
          }}
        >
          Refresh
        </button>
      )}
    </>
  );
}
