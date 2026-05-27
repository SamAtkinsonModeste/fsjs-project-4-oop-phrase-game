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
    this.lives = document.querySelectorAll(".tries img");
    this.qwertyBtns = document.querySelectorAll(".key");
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
    this.lives[this.missed - 1].src = "images/broken-wand.png";

    if (this.missed >= 5) {
      this.qwertyBtns.forEach((qwertyBtn) => {
        qwertyBtn.disabled = true;
      });
      this.gameOver();
    }
  }

  gameOver(gameResults) {
    const resultsMessageH1 = document.querySelector("#game-over-message");
    const btnPlayAgain = document.querySelector("#btn__reset");

    if (gameResults) {
      setTimeout(() => {
        this.overlay.className = "win";
        resultsMessageH1.style.transform = "translateY(-350px)";
        resultsMessageH1.textContent = "Victory to Harry's Team 🥳";
        btnPlayAgain.style.transform = "translateY(235px)";
        btnPlayAgain.textContent = "Play Again?";
        this.gameReset();
      }, 1400);
    } else if (!gameResults) {
      setTimeout(() => {
        this.overlay.className = "lose";
        resultsMessageH1.style.transform = "translateY(130px)";
        resultsMessageH1.textContent = "Victory to Voldermorts Team 😱";
        btnPlayAgain.style.transform = "translateY(150px)";
        btnPlayAgain.textContent = "Play Again?";
        this.gameReset();
      }, 1400);
    }
  }

  handleInteraction(button) {
    button.disabled = true;
    if (!this.activePhrase.checkLetter(button.textContent)) {
      button.classList.add("wrong");
      this.removeLife();
    } else {
      button.classList.add("chosen");
      this.activePhrase.showMatchedLetter(button.textContent);
      const playerWins = this.checkForWin();
      if (playerWins) {
        this.qwertyBtns.forEach((qwertyBtn) => {
          qwertyBtn.disabled = true;
        });
        this.gameOver(playerWins);
      }
    }
  }

  handleKeyboardEvts(key) {
    this.qwertyBtns.forEach((qwertyBtn) => {
      if (key === qwertyBtn.textContent) {
        if (qwertyBtn.disabled !== true) {
          this.handleInteraction(qwertyBtn);
        }
      }
    });
  }

  gameReset() {
    const ulPhrase = document.querySelector("#phrase ul");
    const gameOverMessageH1 = document.querySelector("#game-over-message");
    ulPhrase.innerHTML = "";
    if (!this.overlay.className === "hide") {
      this.overlay.className === "hide";
      gameOverMessageH1.textContent = "";
    }

    this.qwertyBtns.forEach((qwertyBtn) => {
      qwertyBtn.removeAttribute("disabled");
      qwertyBtn.className = "key";
    });

    this.lives.forEach((lifeImage) => (lifeImage.src = "images/wands.png"));
  }
}
