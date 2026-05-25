/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase("Which book title is this?", "The Chamber of Secrets"),
      new Phrase("Which book title is this?", "The Order of the Phoenix"),
      new Phrase("Which book title is this?", "The Goblet of Fire"),
      new Phrase("Which Hogwarts professor is this?", "Severus Snape"),
      new Phrase("Which Hogwarts professor is this?", "Minerva McGonagall"),
      new Phrase("Which Hogwarts professor is this?", "Albus Dumbledore"),
      new Phrase("Which dark wizard is this?", "Lord Voldemort"),
      new Phrase("Which dark wizard is this?", "Lucius Malfoy"),
      new Phrase("Which dark witch is this?", "Bellatrix Lestrange"),
      new Phrase("Which Hogwarts student wizard is this?", "Ron Weasley"),
      new Phrase("Which Hogwarts student wizard is this?", "Harry Potter"),
      new Phrase("Which Hogwarts student wizard is this?", "Draco Malfoy"),
      new Phrase("Which Hogwarts student witch is this?", "Hermione Granger"),
      new Phrase("Which Hogwarts student witch is this?", "Luna Lovegood"),
      new Phrase("Which Hogwarts student witch is this?", "Cho Chang"),
    ];
    this.activePhrase = null;
    this.overlay = document.querySelector("#overlay");
  }

  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  startGame() {
    const sectionPhrase = document.querySelector("#phrase");
    sectionPhrase.classList.add("movePhraseSection");
    const sectionQwerty = document.querySelector("#qwerty");
    sectionQwerty.classList.add("moveSection");

    this.overlay.className = "hide";
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  checkForWin() {
    const spanBoxesShow = document.querySelectorAll(".box.show");
    const spanBoxes = document.querySelectorAll(".box");
    return spanBoxesShow.length === spanBoxes.length;
  }

  removeLife() {
    this.missed += 1;
    const lives = document.querySelectorAll(".tries img");
    lives[this.missed - 1].src = "images/broken-wand.png";

    if (this.missed >= 5) {
      this.gameOver();
    }
  }

  gameOver(gameResults) {
    const resultsMessageH1 = document.querySelector("#game-over-message");
    const overlayDiv = document.querySelector("#overlay");
    const btnPlayAgain = document.querySelector("#btn__reset");

    if (gameResults) {
      overlayDiv.style.display = "flex";
      overlayDiv.className = "win";
      resultsMessageH1.textContent = "Victory to Harry's Team 🥳";
      btnPlayAgain.textContent = "Play Again?";
    } else if (!gameResults) {
      overlayDiv.style.display = "flex";
      overlayDiv.className = "lose";
      resultsMessageH1.textContent = "Victory to Voldermorts Team 😱";
      btnPlayAgain.textContent = "Play Again?";
    }
  }
}
