/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
const startBtn = document.querySelector("#btn__reset");
const qwertySection = document.querySelector("#qwerty");

startBtn.addEventListener("click", () => {
  game = new Game();
  game.startGame();
  console.log(game.activePhrase);
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
    // console.log(characterKey);
    // console.log(evt);
    game.handleKeyboardEvts(characterKey);
  } else {
    console.log("I am not a character key");
  }
});
