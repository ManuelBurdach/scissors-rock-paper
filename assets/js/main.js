"use strict";

// VARIABLEN/CONST -------------------------------------------------
const roundsSelectionBtn = document.querySelectorAll("input[name=rounds]");
const userSelection = document.querySelectorAll("button");
const userScore = document.querySelector("#user");
const compScore = document.querySelector("#comp");
const restartBtn = document.querySelector("a");
const output = document.querySelector(".output");
const roundsHave = document.querySelector("#roundsHave");
const roundsSelect = document.querySelector("#roundsSelect");
const roundsOutput = document.querySelector("#roundsOutput");

// GAME -------------------------------------------------
const game = {
  blockGame: false,
  items: ["Rock", "Paper", "Scissors"],
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
  rounds: [0, 0],
  pc: 0,
  user: 0,
  comp: 0,
  message(msg) {
    output.innerHTML = msg;
  },
  animationWarning(element) {
    element.classList.add("ani");
    setTimeout(() => {
      element.classList.remove("ani");
    }, 200);
  },
  playGame(value) {
    if (this.rounds[1] > 0 && this.rounds[0] != this.rounds[1]) {
      if (this.blockGame == false) {
        this.blockGame = true;
        this.rounds[0] = this.rounds[0] + 1;
        this.pc = Math.ceil(Math.random() * 3);

        roundsSelect.style.display = "none";
        roundsHave.style.display = "block";
        roundsOutput.textContent = `${this.rounds[0]} / ${this.rounds[1]}`;

        this.checkWin.forEach((item) => {
          if (item[0] == `${Number(value) + 1}${this.pc}`) {
            this.user += item[2];
            this.comp += item[3];
            if (item[2] == 1) {
              userSelection[value].classList.add("green");
              this.message(`${this.items[value]}<span class="small">(user)</span> beats ${this.items[this.pc - 1]}<span class="small">(comp)</span>. You ${item[1]}!`);
            } else if (item[3] == 1) {
              userSelection[value].classList.add("red");
              this.message(`${this.items[this.pc - 1]}<span class="small">(comp)</span> beats ${this.items[value]}<span class="small">(user)</span>. You ${item[1]}!`);
            } else {
              userSelection[value].classList.add("orange");
              this.message(`It was a ${item[1]}! You both chose ${this.items[value]}`);
            }
          }
        });

        setTimeout(() => {
          this.blockGame = false;
          userScore.textContent = this.user;
          compScore.textContent = this.comp;
          userSelection[value].classList.remove("red");
          userSelection[value].classList.remove("green");
          userSelection[value].classList.remove("orange");
          if (this.rounds[0] == this.rounds[1]) {
            if (this.user > this.comp) {
              this.message("The user wins!");
            } else if (this.user < this.comp) {
              this.message("The comp wins!");
            } else {
              this.message("It is a draw!");
            }
            setTimeout(() => {
              this.message("Please restart the game!");
              this.animationWarning(restartBtn);
            }, 1500);
          } else {
            this.message("Let's Play");
          }
        }, 1500);
      }
    } else {
      if (this.rounds[1] == 0) {
        this.message("Please choose how many rounds you play!");
        this.animationWarning(roundsSelect);
      } else {
        this.message("Please restart the game!");
        this.animationWarning(restartBtn);
      }
    }
  },
};

// BUTTONS -------------------------------------------------
roundsSelectionBtn.forEach((item) => {
  item.addEventListener("click", (event) => {
    game.rounds[1] = event.target.value;
  });
});

userSelection.forEach((item) => {
  item.addEventListener("click", (event) => {
    game.playGame(event.target.value);
  });
});

restartBtn.addEventListener("click", () => {
  document.location.reload();
});
