/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
const startBtn = document.querySelector("#btn__reset");
const qwertySection = document.querySelector("#qwerty");
let gameIndex = 0;

startOverlayAnimation();

startBtn.addEventListener("click", (evt) => {
  console.log(evt.target);
  game = new Game();
  game.startGame(gameIndex);
  console.log(game.activePhrase);
  console.log(game.xYCoordinates);
  console.log(gameIndex);
  if (gameIndex !== game.xYCoordinates.length - 1) {
    gameIndex++;
  } else {
    gameIndex = 0;
  }
});

qwertySection.addEventListener("click", (evt) => {
  if (evt.target.tagName === "BUTTON") {
    const keyboardBtn = evt.target;
    game.handleInteraction(keyboardBtn);
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.code.startsWith("K")) {
    console.log(evt.key);
    const characterKey = evt.key;
    if (game) {
      game.handleKeyboardEvts(characterKey);
    }
  }
});
