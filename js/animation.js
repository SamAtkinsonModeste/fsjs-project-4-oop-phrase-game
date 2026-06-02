//!SECTION Animation File
// Handles:
// - Star creation
// - Star setup
// - GSAP overlay animations

const animationContainer = document.querySelector("#animation-container");
const leftAnimationDiv = document.querySelector("#left-animation");
const rightAnimationDiv = document.querySelector("#right-animation");

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
 * Sets up win / lose particles with random positions
 * @param {NodeList} particles Collection of particles to position
 * @param {number} min Minimum random position value
 * @param {number} max Maximum random position value
 * @param {HTMLElement} element Container or element used for positioning
 */
const winLoseSetup = (particles, min, max, element) => {
  particles.forEach((particle) => {
    winLoseRandomPositions(min, max, element, particle);
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
 * Generates random positions for win / lose particles
 * @param {number} min Minimum random position value
 * @param {number} max Maximum random position value
 * @param {HTMLElement} element Element used as the position reference
 * @param {HTMLElement} particle Particle element being positioned
 */
function winLoseRandomPositions(min, max, element, particle) {
  const positionX = Math.floor(Math.random() * (max - min) + min);
  const positionY = Math.floor(Math.random() * (max - min) + min);
  const elementX = element.offsetLeft;
  const elementY = element.offsetTop;
  const particleX = positionX;
  const particleY = positionY;
  const finalX = elementX + particleX;
  const finalY = elementY + particleY;

  particle.style.left = finalX + "px";
  particle.style.top = finalY + "px";
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

//!SECTION - GSAP Configs for start animation

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

//!SECTION - CALLING createSymbols FUNCTION - START STARS EMOJIS
createSymbols(20, leftAnimationDiv, "stars left-stars-float", "✷");
createSymbols(20, leftAnimationDiv, "stars left-stars-float2", "✷");
createSymbols(30, leftAnimationDiv, "stars left-stars-twinkle", "✷");
createSymbols(20, rightAnimationDiv, "stars right-stars-float", "✷");
createSymbols(20, rightAnimationDiv, "stars right-stars-float2", "✷");
createSymbols(30, rightAnimationDiv, "stars right-stars-twinkle", "✷");

//!SECTION - CALLING  createSymbols FUNCTION - WIN EMOJIS
createSymbols(1, animationContainer, "results central-win-wand", "🪄");
createSymbols(10, animationContainer, "results left-confetti");
createSymbols(10, animationContainer, "results center-confetti");
createSymbols(10, animationContainer, "results right-confetti");

//!SECTION - VARIABLES FROM CREATED STARS & HELPER FUNCTION STARSETUP
const starsLeft = leftAnimationDiv.querySelectorAll(".stars");
const starsRight = rightAnimationDiv.querySelectorAll(".stars");
const winWand = animationContainer.querySelector(".central-win-wand");
const leftConfetti = animationContainer.querySelectorAll(".left-confetti");
const centerConfetti = animationContainer.querySelectorAll(".center-confetti");
const rightConfetti = animationContainer.querySelectorAll(".right-confetti");

//!SECTION - ANIMATION FOR THE DIFFERENT CLASS NAMES OF THE OVERLAY
let startTimeline;
let winTimeline;
let loseTimeline;

function startOverlayAnimation() {
  if (winTimeline) {
    winTimeline.kill();
  }
  starsSetUp(starsLeft, leftAnimationDiv);
  starsSetUp(starsRight, rightAnimationDiv);
  gsap.set(".central-win-wand", {
    autoAlpha: 0,
  });
  gsap.set(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle",
    {
      autoAlpha: 1,
    },
  );

  startTimeline = gsap
    .timeline()
    .to("#left-animation .left-stars-float", floatStarsConfig(-10, 50))
    .to("#right-animation .right-stars-float", floatStarsConfig(10, 50), "<")
    .to("#left-animation .left-stars-float2", floatStarsConfig(10, 50), "<")
    .to("#right-animation .right-stars-float2", floatStarsConfig(-10, 50), "<")
    .to("#left-animation .left-stars-twinkle", twinkleStarsConfig(), "<")
    .to("#right-animation .right-stars-twinkle", twinkleStarsConfig(), "<");
}

function winOverlayAnimation() {
  gsap.killTweensOf(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle",
  );
  if (startTimeline) {
    startTimeline.kill();
  }
  winLoseSetup(leftConfetti, -20, 20, winWand);

  gsap.set(".central-win-wand", {
    autoAlpha: 1,
  });
  gsap.set(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle",
    {
      autoAlpha: 0,
    },
  );

  winTimeline = gsap.timeline().to(".central-win-wand", {
    rotation: "+=360",
    repeat: -1,
    duration: 0.6,
    ease: "none",
  });
}

// app.js:36 Uncaught TypeError: Cannot read properties of undefined (reading 'handleKeyboardEvts')
// at HTMLDocument.<anonymous> (app.js:36:10)Understand this error
