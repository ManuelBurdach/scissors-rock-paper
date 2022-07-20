"use strict";

// VARIABLEN/CONST -------------------------------------------------
const rounds = document.querySelectorAll("input[name=rounds]");
const userSelection = document.querySelectorAll("button");
const userResult = document.querySelector("#user");
const compResult = document.querySelector("#comp");
const restart = document.querySelector("a");
const output = document.querySelector(".output");
const roundsHave = document.querySelector("#roundsHave");
const roundsSelect = document.querySelector("#roundsSelect");
const roundsOutput = document.querySelector("#roundsOutput");

// GAME -------------------------------------------------
const game = {
  blockGame: false,
  rounds: [0, 0],
  pc: 0,
  items: ["Rock", "Paper", "Scissors"],
  user: 0,
  comp: 0,
  checkWin: [
    [11, "draw", 0, 0],
    [12, "lose", 0, 1],
    [13, "win", 1, 0],
    [21, "win", 1, 0],
    [22, "draw", 0, 0],
    [23, "lose", 0, 1],
    [31, "lose", 0, 1],
    [32, "win", 1, 0],
    [33, "draw", 0, 0],
  ],
  playGame(value) {},
};

// BUTTONS -------------------------------------------------
rounds.forEach((item) => {
  item.addEventListener("click", (event) => {
    game.rounds[1] = event.target.value;
  });
});

userSelection.forEach((item) => {
  item.addEventListener("click", (event) => {
    game.playGame(event.target.value);
  });
});

restart.addEventListener("click", () => {
  document.location.reload();
});
