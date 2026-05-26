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
