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
    if (symbol) {
      container.textContent = symbol;
    }
    side.append(container);
  }
};

/**
 * Sets up a group of stars with random positions and values
 * @param {NodeList} elements Collection of star elements to set up
 * @param {HTMLElement} container Container used for random positioning
 */
const starsSetUp = (elements, container) => {
  elements.forEach((element) => {
    randomPositions(container, element);
    randomValues(element);
  });
};

/**
 * Sets up a group of confetti with random X positions
 * @param {NodeList} elements Collection of confetti elements to set up
 * @param {HTMLElement} container Container used for random positioning
 */
const confettiSetUp = (elements, container) => {
  elements.forEach((element) => {
    randomXPositions(container, element);
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
 * Gives one element a random X axis position inside a container
 * @param {HTMLElement} container Container used to calculate the random position
 * @param {HTMLElement} element Element that will receive the random position
 */

function randomXPositions(container, element) {
  const positionX = Math.floor(Math.random() * container.offsetWidth);
  const side = positionX + "px";
  element.style.left = side;
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

//!SECTION - Win Lose GSAP Configs

function confettiFromConfigs() {
  return {
    y: 0,
    rotation: 0,
    opacity: 1,
  };
}

function confettiToConfigs() {
  return {
    y: 900,
    rotation: 360,
    keyframes: [
      { opacity: 0.8 },
      { opacity: 0.9 },
      { opacity: 1 },
      { opacity: 0 },
    ],
    repeat: -1,
    stagger: 0.08,
    ease: "none",
    duration: 3,
  };
}

function skullFromConfigs() {
  return {
    y: 0,
    rotation: 0,
    opacity: 0,
    scale: 0,
  };
}

function skullToConfigs() {
  return {
    y: 900,
    rotation: 360,
    keyframes: [
      { opacity: 0.8 },
      { opacity: 0.9 },
      { opacity: 1 },
      { opacity: 0 },
    ],
    scale: 2.8,
    repeat: -1,
    stagger: 0.7,
    ease: "none",
    duration: 3,
  };
}

function skullNoRotateToConfigs() {
  return {
    y: 900,
    rotation: 0,
    keyframes: [
      { opacity: 0.8 },
      { opacity: 0.9 },
      { opacity: 1 },
      { opacity: 0 },
    ],
    scale: 2.8,
    repeat: -1,
    stagger: 0.7,
    ease: "power1.in",
    duration: 3,
  };
}

//!SECTION - CALLING createSymbols FUNCTION - START STARS EMOJIS
createSymbols(20, leftAnimationDiv, "stars left-stars-float", "✷");
createSymbols(20, leftAnimationDiv, "stars left-stars-float2", "✷");
createSymbols(30, leftAnimationDiv, "stars left-stars-twinkle", "✷");
createSymbols(20, rightAnimationDiv, "stars right-stars-float", "✷");
createSymbols(20, rightAnimationDiv, "stars right-stars-float2", "✷");
createSymbols(30, rightAnimationDiv, "stars right-stars-twinkle", "✷");

//!SECTION - CALLING  createSymbols FUNCTION - WIN CONFETTI
createSymbols(40, animationContainer, "confetti gold");
createSymbols(40, animationContainer, "confetti gold2");
createSymbols(40, animationContainer, "confetti gold3");

//!SECTION - CALLING  createSymbols FUNCTION - LOSE CONFETTI
createSymbols(40, animationContainer, "confetti skull-bones", "☠️");
createSymbols(40, animationContainer, "confetti skull-fire", "💀");
createSymbols(40, animationContainer, "confetti skull-bones2", "☠️");
createSymbols(40, animationContainer, "confetti skull-fire2", "💀");
//!SECTION - VARIABLES FROM CREATED STARS
const starsLeft = leftAnimationDiv.querySelectorAll(".stars");
const starsRight = rightAnimationDiv.querySelectorAll(".stars");

//!SECTION - VARIABLES FROM CREATED GOLD & SKULL CONFETTI
const gold = animationContainer.querySelectorAll(".gold");
const gold2 = animationContainer.querySelectorAll(".gold2");
const gold3 = animationContainer.querySelectorAll(".gold3");
const bones = animationContainer.querySelectorAll(".skull-bones");
const fire = animationContainer.querySelectorAll(".skull-fire");
const bones2 = animationContainer.querySelectorAll(".skull-bones2");
const fire2 = animationContainer.querySelectorAll(".skull-fire2");

//!SECTION - ANIMATION FOR THE DIFFERENT CLASS NAMES OF THE OVERLAY
let startTimeline;
let winTimeline;
let loseTimeline;

//START
function startOverlayAnimation() {
  if (winTimeline) {
    winTimeline.kill();
  }
  starsSetUp(starsLeft, leftAnimationDiv);
  starsSetUp(starsRight, rightAnimationDiv);
  gsap.set(
    ".gold, .gold2, .gold3, .skull-bones, .skull-bones2, .skull-fire, .skull-fire2",
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

  startTimeline = gsap
    .timeline()
    .to("#left-animation .left-stars-float", floatStarsConfig(-10, 50))
    .to("#right-animation .right-stars-float", floatStarsConfig(10, 50), "<")
    .to("#left-animation .left-stars-float2", floatStarsConfig(10, 50), "<")
    .to("#right-animation .right-stars-float2", floatStarsConfig(-10, 50), "<")
    .to("#left-animation .left-stars-twinkle", twinkleStarsConfig(), "<")
    .to("#right-animation .right-stars-twinkle", twinkleStarsConfig(), "<");
}

// Win

function winOverlayAnimation() {
  gsap.killTweensOf(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle, .skull-bones, .skull-bones2, .skull-fire, .skull-fire2",
  );
  if (startTimeline) {
    startTimeline.kill();
  }

  confettiSetUp(gold, animationContainer);
  confettiSetUp(gold2, animationContainer);
  confettiSetUp(gold3, animationContainer);

  gsap.set(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle, .skull-bones, .skull-bones2, .skull-fire, .skull-fire2",
    {
      autoAlpha: 0,
    },
  );

  gsap.set(".gold, .gold2, .gold3", {
    autoAlpha: 1,
  });

  winTimeline = gsap
    .timeline()
    .fromTo(".gold", confettiFromConfigs(), confettiToConfigs())
    .fromTo(".gold2", confettiFromConfigs(), confettiToConfigs(), "<")
    .fromTo(".gold3", confettiFromConfigs(), confettiToConfigs(), "<");
}

// LOSE
function loseOverlayAnimation() {
  gsap.killTweensOf(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle,.gold, .gold2, .gold3 ",
  );
  if (startTimeline) {
    startTimeline.kill();
  }

  confettiSetUp(bones, animationContainer);
  confettiSetUp(fire, animationContainer);
  confettiSetUp(bones2, animationContainer);
  confettiSetUp(fire2, animationContainer);

  gsap.set(
    ".left-stars-float, .right-stars-float, .left-stars-float2, .right-stars-float2, .left-stars-twinkle, .right-stars-twinkle,.gold, .gold2, .gold3",
    {
      autoAlpha: 0,
    },
  );

  gsap.set(".skull-bones, .skull-bones2, .skull-fire, .skull-fire2", {
    autoAlpha: 1,
  });

  loseTimeline = gsap
    .timeline()
    .fromTo(".skull-bones", skullFromConfigs(), skullToConfigs())
    .fromTo(".skull-fire", skullFromConfigs(), skullNoRotateToConfigs(), "<1.5")
    .fromTo(".skull-bones2", skullFromConfigs(), skullToConfigs(), "<1.5")
    .fromTo(
      ".skull-fire2",
      skullFromConfigs(),
      skullNoRotateToConfigs(),
      "<1.5",
    );
}

// app.js:36 Uncaught TypeError: Cannot read properties of undefined (reading 'handleKeyboardEvts')
// at HTMLDocument.<anonymous> (app.js:36:10)Understand this error
