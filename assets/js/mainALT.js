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
  items: ["Rock", "Paper", "Scissors"],
  user: 0,
  comp: 0,
  playGame(value) {
    if (this.rounds[1] > 0 && this.rounds[0] != this.rounds[1]) {
      if (this.blockGame == false) {
        this.blockGame = true;
        roundsSelect.style.display = "none";
        roundsHave.style.display = "block";
        this.rounds[0] = this.rounds[0] + 1;
        this.pc = Math.ceil(Math.random() * 3);
        roundsOutput.textContent = `${this.rounds[0]} / ${this.rounds[1]}`;
        this.checkWin.forEach((item) => {
          if (item[0] == `${Number(value) + 1}${this.pc}`) {
            this.user += item[2];
            this.comp += item[3];
            if (item[2] == 1) {
              userSelection[value].classList.add("green");
              output.innerHTML = `${
                this.items[value]
              }<span class="small">(user)</span> beats ${
                this.items[this.pc - 1]
              }<span class="small">(comp)</span>. You ${item[1]}!`;
              return;
            } else if (item[3] == 1) {
              userSelection[value].classList.add("red");
              output.innerHTML = `${
                this.items[this.pc - 1]
              }<span class="small">(comp)</span> beats ${
                this.items[value]
              }<span class="small">(user)</span>. You ${item[1]}!`;
              return;
            } else {
              output.innerHTML = `It was a ${item[1]}! You both chose ${this.items[value]}`;
            }
          }
        });
        setTimeout(() => {
          this.blockGame = false;
          userResult.textContent = this.user;
          compResult.textContent = this.comp;
          userSelection[value].classList.remove("red");
          userSelection[value].classList.remove("green");
          // console.log(
          //   this.user - this.comp - (this.rounds[0] - this.rounds[1])
          // );
          if (this.rounds[0] == this.rounds[1]) {
            if (this.user > this.comp) {
              output.textContent = "The user wins!";
            } else if (this.user < this.comp) {
              output.textContent = "The comp wins!";
            } else {
              output.textContent = "It is a draw!";
            }
            setTimeout(() => {
              output.textContent = "Please restart the game!";
              restart.classList.add("ani");
              setTimeout(() => {
                restart.classList.remove("ani");
              }, 200);
            }, 1500);
          } else {
            output.textContent = "Let's Play";
          }
        }, 1500);
      }
    } else {
      if (this.rounds[1] == 0) {
        output.textContent = "Please choose how many rounds you play!";
        roundsSelect.classList.add("ani");
        setTimeout(() => {
          roundsSelect.classList.remove("ani");
        }, 200);
      } else {
        output.textContent = "Please restart the game!";
        restart.classList.add("ani");
        setTimeout(() => {
          restart.classList.remove("ani");
        }, 200);
      }
    }
  },
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
