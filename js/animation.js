//!SECTION Animation File
// Handles:
// - Star creation
// - Star setup
// - GSAP overlay animations

const animationContainer = document.querySelector("#animation-container");
const leftAnimationDiv = document.querySelector("#left-animation");
const rightAnimationDiv = document.querySelector("#right-animation");
const overlayDiv = document.querySelector("#overlay");
const phraseLIs = document.querySelectorAll(".li-phrase");

//!SECTION - HELPER FUNCTIONS

/**
 * Creates decorative symbol elements and appends them to a container
 * @param {number} num Number of symbols to create
 * @param {HTMLElement} side Container where the symbols should be added
 * @param {string} className CSS classes added to each symbol
 * @param {string} symbol Character or symbol displayed inside each element
 */
const createSymbols = (num, side, className, symbol) => {
  for (let i = 0; i < num; i++) {
    const container = document.createElement("span");
    container.className = className;
    container.textContent = symbol;
    side.append(container);
  }
};

/**
 * Sets up a group of stars with random positions and values
 * @param {NodeList} elements Collection of star elements to set up
 * @param {HTMLElement} container Container used for random positioning
 */
const starsSetUp = (elements, container) => {
  elements.forEach((star) => {
    randomPositions(container, star);
    randomValues(star);
  });
};

/**
 * Sets up win / lose symbols with fixed positions
 * @param {NodeList} elements Collection of symbol elements to position
 * @param {HTMLElement} container Container used for positioning symbols
 */
const winLoseSetup = (elements, container) => {
  elements.forEach((symbol, index) => {
    winLosePositions(container, symbol, index);
  });
};

/**
 * Gives one element a random position inside a container
 * @param {HTMLElement} container Container used to calculate the random position
 * @param {HTMLElement} element Element that will receive the random position
 */

function randomPositions(container, element) {
  const positionX = Math.floor(Math.random() * container.offsetWidth);
  const positionY = Math.floor(Math.random() * container.offsetHeight);
  const side = positionX + "px";
  const top = positionY + "px";
  element.style.left = side;
  element.style.top = top;
}

/**
 * Positions win / lose symbols into rows inside a container
 * @param {HTMLElement} container Container used for positioning symbols
 * @param {HTMLElement} element Symbol element being positioned
 * @param {number} index Position number used to calculate row and column
 */
function winLosePositions(container, element, index) {
  const emojisPerRow = 10;
  const row = Math.floor(index / emojisPerRow);
  const column = index % emojisPerRow;
  const rowHeight = 40;
  const startY = 620;
  const positionX = (column + 1) * (container.offsetWidth / (emojisPerRow + 1));
  const positionY = startY + row * rowHeight;
  element.style.left = positionX + "px";
  element.style.top = positionY + "px";
}

/**
 * Applies random visual values to a star element
 * @param {HTMLElement} element
 */
function randomValues(element) {
  const minFont = 0.45;
  const maxFont = 0.95;
  const min = 0.1;
  const max = 0.7;
  const randomFontNumber = Math.random() * (maxFont - minFont) + minFont;
  const randomOpacityNumber = Math.random() * (max - min) + min;
  const fontSize = randomFontNumber + "rem";
  element.style.fontSize = fontSize;
  element.style.opacity = randomOpacityNumber;
}

/**
 * Creates reusable GSAP float animation settings
 * @param {number} xPosition X movement amount for the animation
 * @param {number} yPosition Y movement amount for the animation
 * @returns {Object} GSAP animation configuration object
 */

function floatStarsConfig(xPosition, yPosition) {
  return {
    x: xPosition,
    y: yPosition,
    opacity: 0.7,
    repeat: -1,
    yoyo: true,
    duration: 6,
    stagger: 0.2,
    ease: "power2.inOut",
  };
}

/**
 * Creates reusable GSAP rotation settings for win / lose symbols
 * @param {number} num Rotation amount in degrees
 * @returns {Object} GSAP animation configuration object
 */
function winLoseRotateConfig(num) {
  return {
    rotation: num,
    repeat: -1,
    duration: 2,
  };
}

/**
 * Creates reusable GSAP up and down animation settings
 * @param {number} yPosition Vertical movement amount in pixels
 * @returns {Object} GSAP animation configuration object
 */
function winLoseUpDownConfig(yPosition) {
  return {
    y: yPosition,
    repeat: -1,
    yoyo: true,
    duration: 2,
  };
}

/**
 * Creates reusable GSAP twinkle animation settings
 * @returns {Object} GSAP animation configuration object
 */

function twinkleStarsConfig() {
  return {
    rotation: 360,
    opacity: 0.7,
    repeat: -1,
    duration: 10,
  };
}

/**
 * Returns phrase entry animation settings
 * using the supplied coordinates array
 * and direction index
 * @param {array} coordinates - Array of GSAP direction objects
 * @param {number} index - Position within the coordinates array
 * @returns {object} Selected GSAP animation settings object
 */
function phraseEntryDirections(coordinates, index) {
  coordinates = [...coordinates];
  return coordinates[index];
}

//!SECTION - CALLING createSymbols FUNCTION - START STARS EMOJIS
createSymbols(20, leftAnimationDiv, "stars left-stars-float", "✷");
createSymbols(20, leftAnimationDiv, "stars left-stars-float2", "✷");
createSymbols(30, leftAnimationDiv, "stars left-stars-twinkle", "✷");
createSymbols(20, rightAnimationDiv, "stars right-stars-float", "✷");
createSymbols(20, rightAnimationDiv, "stars right-stars-float2", "✷");
createSymbols(30, rightAnimationDiv, "stars right-stars-twinkle", "✷");

//!SECTION - CALLING  createSymbols FUNCTION - WIN EMOJIS
createSymbols(10, rightAnimationDiv, "results right-celebrate-stars", "✨");
createSymbols(10, rightAnimationDiv, "results right-celebrate-wands", "🪄");
createSymbols(10, rightAnimationDiv, "results right-celebrate-stars2", "✨");
createSymbols(10, rightAnimationDiv, "results right-celebrate-wands2", "🪄");
createSymbols(10, rightAnimationDiv, "results right-celebrate-stars3", "✨");
createSymbols(10, leftAnimationDiv, "results left-celebrate-stars", "✨");
createSymbols(10, leftAnimationDiv, "results left-celebrate-wands", "🪄");
createSymbols(10, leftAnimationDiv, "results left-celebrate-stars2", "✨");
createSymbols(10, leftAnimationDiv, "results left-celebrate-wands2", "🪄");
createSymbols(10, leftAnimationDiv, "results left-celebrate-stars3", "✨");

//!SECTION - VARIABLES FROM CREATED STARS & HELPER FUNCTION STARSETUP
const starsLeft = leftAnimationDiv.querySelectorAll(".stars");
const starsRight = rightAnimationDiv.querySelectorAll(".stars");
const resultsRight = rightAnimationDiv.querySelectorAll(".results");
const resultsLeft = leftAnimationDiv.querySelectorAll(".results");

//!SECTION - ANIMATION FOR THE DIFFERENT CLASS NAMES OF THE OVERLAY

function startOverlayAnimation() {
  starsSetUp(starsLeft, leftAnimationDiv);
  starsSetUp(starsRight, rightAnimationDiv);
  gsap.set(
    ".left-celebrate-wands, .right-celebrate-wands, .left-celebrate-stars, .right-celebrate-stars,.left-celebrate-wands2, .right-celebrate-wands2, .left-celebrate-stars2,.left-celebrate-stars3 .right-celebrate-stars2, .right-celebrate-stars3",
    {
      autoAlpha: 0,
    },
  );
  gsap.set(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle",
    {
      autoAlpha: 1,
    },
  );
  gsap
    .timeline()
    .to("#left-animation .left-stars-float", floatStarsConfig(-10, 50))
    .to("#right-animation .right-stars-float", floatStarsConfig(10, 50), "<")
    .to("#left-animation .left-stars-float2", floatStarsConfig(10, 50), "<")
    .to("#right-animation .right-stars-float2", floatStarsConfig(-10, 50), "<")
    .to("#left-animation .left-stars-twinkle", twinkleStarsConfig(), "<")
    .to("#right-animation .right-stars-twinkle", twinkleStarsConfig(), "<");
}

function winOverlayAnimation() {
  winLoseSetup(resultsRight, rightAnimationDiv);
  winLoseSetup(resultsLeft, leftAnimationDiv);

  gsap.set(
    ".left-celebrate-wands, .right-celebrate-wands, .left-celebrate-stars, .right-celebrate-stars,.left-celebrate-wands2, .right-celebrate-wands2, .left-celebrate-stars2,.left-celebrate-stars3 .right-celebrate-stars2, .right-celebrate-stars3",
    {
      autoAlpha: 1,
    },
  );
  gsap.set(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle",
    {
      autoAlpha: 0,
    },
  );

  gsap
    .timeline()
    .to("#left-animation .left-celebrate-wands", winLoseRotateConfig(360))
    .to(
      "#right-animation .right-celebrate-wands",
      winLoseRotateConfig(360),
      "<",
    )

    .to(
      "#right-animation .right-celebrate-stars",
      winLoseUpDownConfig(150),
      "<",
    )
    .to("#left-animation .left-celebrate-stars", winLoseUpDownConfig(150), "<")
    .to("#left-animation .left-celebrate-wands2", winLoseRotateConfig(360), "<")
    .to(
      "#right-animation .right-celebrate-wands2",
      winLoseRotateConfig(360),
      "<",
    )
    .to(
      "#right-animation .right-celebrate-stars3",
      winLoseUpDownConfig(-150),
      "<",
    )
    .to(
      "#left-animation .left-celebrate-stars3",
      winLoseUpDownConfig(-150),
      "<",
    );
}
