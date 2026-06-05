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
    this.xYCoordinates = [
      { x: -1000, stagger: -0.1, ease: "bounce" },
      { y: 150, stagger: -0.1, ease: "bounce.in" },
      { x: 1000, stagger: 0.1, ease: "bounce" },
      { y: -150, stagger: 0.1, ease: "bounce.in" },
    ];

    this.keyBtnSounds = new Audio("../audio/key-button-sounds.mp3");
    this.wandBreaksSound = new Audio("../audio/wand-breaks.mp3");
    this.loseGameSound = new Audio("../audio/lose-game.mp3");
    this.winGameSound = new Audio("../audio/win-game.mp3");

    this.allSounds = [
      this.keyBtnSounds,
      this.wandBreaksSound,
      this.loseGameSound,
      this.winGameSound,
    ];
  }

  /**
   * Selects and returns a random Phrase object from the phrases array.
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * Starts a new game round by hiding the overlay, selecting a phrase,
   * displaying it, and animating the phrase letters onto the board.
   * @param {number} index - Current phrase entry animation direction index.
   */
  startGame(index) {
    const sectionPhrase = document.querySelector("#phrase");
    sectionPhrase.classList.add("movePhraseSection");
    const sectionQwerty = document.querySelector("#qwerty");
    sectionQwerty.classList.add("moveSection");
    startOverlayAnimation();
    this.overlay.className = "hide";
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    this.phraseLIs = sectionPhrase.querySelectorAll(".li-phrase");

    const direction = phraseEntryDirections(this.xYCoordinates, index);
    gsap.from("#phrase .li-phrase", {
      ...direction,
      duration: 1.8,
      ease: "bounce",
    });
  }

  /**
   * Checks whether all phrase letters have been revealed.
   * @return {boolean} True if the player has revealed the full phrase.
   */
  checkForWin() {
    const spanBoxesShow = document.querySelectorAll(".box.show");
    const spanBoxes = document.querySelectorAll(".box");
    return spanBoxesShow.length === spanBoxes.length;
  }

  /**
   * Removes one life, plays the broken wand sound,
   * and ends the game if the player has missed five guesses.
   */
  removeLife() {
    this.missed += 1;
    this.lives[this.missed - 1].src = "images/broken-wand.png";
    this.wandBreaksSound.currentTime = 0;
    this.wandBreaksSound.play();

    if (this.missed >= 5) {
      this.qwertyBtns.forEach((qwertyBtn) => {
        qwertyBtn.disabled = true;
      });
      this.gameOver();
    }
  }

  /**
   * Ends the game after a short delay, shows the win or lose overlay,
   * plays the correct end-game sound, and prepares the keyboard for replay.
   * @param {boolean} gameResults - True if the player won, false if they lost.
   */
  gameOver(gameResults) {
    const resultsMessageH1 = document.querySelector("#game-over-message");
    const btnPlayAgain = document.querySelector("#btn__reset");

    setTimeout(() => {
      if (gameResults) {
        this.overlay.className = "win";
        resultsMessageH1.style.transform = "translateY(-350px)";
        resultsMessageH1.textContent = "Victory to Harry's Team 🥳";
        btnPlayAgain.style.transform = "translateY(235px)";
        btnPlayAgain.textContent = "Play Again?";
        this.winGameSound.loop = true;
        this.winGameSound.play();
        winOverlayAnimation();
      } else {
        this.overlay.className = "lose";
        resultsMessageH1.style.transform = "translateY(130px)";
        resultsMessageH1.textContent = "Victory to Voldermorts Team 😱";
        btnPlayAgain.style.transform = "translateY(150px)";
        btnPlayAgain.textContent = "Play Again?";
        this.loseGameSound.loop = true;
        this.loseGameSound.play();
        loseOverlayAnimation();
      }
      this.qwertyBtns.forEach((qwertyBtn) => {
        qwertyBtn.removeAttribute("disabled");
        qwertyBtn.className = "key";
      });
    }, 1400);
  }

  /**
   * Handles a clicked onscreen keyboard button and updates the game state
   * based on whether the guessed letter is correct or incorrect.
   * @param {HTMLButtonElement} button - The selected keyboard button.
   */
  handleInteraction(button) {
    button.disabled = true;
    if (!this.activePhrase.checkLetter(button.textContent)) {
      button.classList.add("wrong");
      this.removeLife();
    } else {
      button.classList.add("chosen");
      this.keyBtnSounds.currentTime = 0;
      this.keyBtnSounds.play();
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

  /**
   * Handles physical keyboard input by matching the pressed key
   * to an onscreen keyboard button.
   * @param {string} key - The pressed keyboard letter.
   */
  handleKeyboardEvts(key) {
    this.qwertyBtns.forEach((qwertyBtn) => {
      if (key === qwertyBtn.textContent) {
        if (qwertyBtn.disabled !== true) {
          this.handleInteraction(qwertyBtn);
        }
      }
    });
  }

  /**
   * Resets the phrase board, clears game-over text,
   * stops end-game sounds, and restores all wand images.
   */
  gameReset() {
    const ulPhrase = document.querySelector("#phrase ul");
    const gameOverMessageH1 = document.querySelector("#game-over-message");

    ulPhrase.innerHTML = "";

    gameOverMessageH1.textContent = "";
    this.winGameSound.pause();
    this.winGameSound.currentTime = 0;

    this.loseGameSound.pause();
    this.loseGameSound.currentTime = 0;

    this.lives.forEach((lifeImage) => (lifeImage.src = "images/wands.png"));
  }
}
