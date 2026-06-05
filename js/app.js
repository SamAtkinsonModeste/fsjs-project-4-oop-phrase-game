/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
const startBtn = document.querySelector("#btn__reset");
const qwertySection = document.querySelector("#qwerty");
const overlayDiv = document.querySelector("#overlay");
const musicBtn = document.querySelector("#music-control-Btn");
const musicBtnP = musicBtn.querySelector("#sound-text");
const musicBtnImg = musicBtn.querySelector("img");
const titleH2 = document.querySelector(".title");
const titleSpan = titleH2.querySelector(".title-line-2");
const startMusic = new Audio("audio/start-game.mp3");
let soundMuted = false;

let gameIndex = 0;

musicBtn.addEventListener("click", () => {
  if (!soundMuted) {
    soundMuted = true;
    startMusic.muted = true;
    if (game) {
      game.allSounds.forEach((sound) => {
        sound.muted = true;
      });
    }

    musicBtnP.textContent = "Click to unmute sound";
    musicBtnImg.src = "images/magic-speaker-off.svg";
  } else {
    soundMuted = false;
    startMusic.muted = false;
    if (game) {
      game.allSounds.forEach((sound) => {
        sound.muted = false;
      });
    }
    musicBtnP.textContent = "Click to mute sound";
    musicBtnImg.src = "images/magic-speaker-on.svg";
  }
});

startBtn.addEventListener("click", (evt) => {
  if (overlayDiv.className === "welcome") {
    startOverlayAnimation();
    musicBtn.style.display = "flex";
    startMusic.loop = true;
    startMusic.play();
    overlayDiv.className = "start";
    startBtn.textContent = "Start Game";
    titleH2.innerHTML = `Harry Potter <br><span class="title-line-2">Wizard Word Duel</span>`;
  } else {
    if (game) {
      game.gameReset();
    }
    game = new Game();
    game.startGame(gameIndex);
    startMusic.pause();
    startMusic.currentTime = 0;

    // Keep track of animation direction between games because
    // a new Game object is created every round which resets class properties
    if (gameIndex !== game.xYCoordinates.length - 1) {
      gameIndex++;
    } else {
      gameIndex = 0;
    }
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
    const characterKey = evt.key;
    if (game) {
      game.handleKeyboardEvts(characterKey);
    }
  }
});
