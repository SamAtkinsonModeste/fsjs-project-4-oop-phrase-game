//!SECTION Animation File
// Handles:
// - Star creation
// - Star setup
// - GSAP overlay animations

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
    const star = document.createElement("span");
    star.className = className;
    star.textContent = symbol;
    side.append(star);
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
    scale: 1.1,
    rotate: 40,
    repeat: -1,
    yoyo: true,
    duration: 0.25,
    stagger: 0.1,
    ease: "power4.in",
  };
}

/**
 * Returns phrase entry animation settings
 * based on the supplied direction index
 * @param {number} index - Direction position in the directions array
 * @returns {object} Selected GSAP direction settings object
 */
function phraseEntryDirections(index) {
  const directions = [{ x: -100 }, { y: 100 }, { x: 100 }, { y: -100 }];
  return directions[index];
}

//!SECTION - CALLING createSymbols FUNCTION
createSymbols(20, leftAnimationDiv, "stars left-stars-float", "✷");
createSymbols(20, leftAnimationDiv, "stars left-stars-float2", "✷");
createSymbols(30, leftAnimationDiv, "stars left-stars-twinkle", "✷");
createSymbols(20, rightAnimationDiv, "stars right-stars-float", "✷");
createSymbols(20, rightAnimationDiv, "stars right-stars-float2", "✷");
createSymbols(30, rightAnimationDiv, "stars right-stars-twinkle", "✷");

//!SECTION - VARIABLES FROM CREATED STARS & HELPER FUNCTION STARSETUP
const starsLeft = leftAnimationDiv.querySelectorAll(".stars");
const starsRight = rightAnimationDiv.querySelectorAll(".stars");
starsSetUp(starsLeft, leftAnimationDiv);
starsSetUp(starsRight, rightAnimationDiv);

//!SECTION - ANIMATION FOR THE DIFFERENT CLASS NAMES OF THE OVERLAY
if (overlayDiv.className === "start") {
  gsap
    .timeline()
    .to("#left-animation .left-stars-float", floatStarsConfig(-10, 50))
    .to("#right-animation .right-stars-float", floatStarsConfig(10, 50), "<")
    .to("#left-animation .left-stars-float2", floatStarsConfig(10, 50), "<")
    .to("#right-animation .right-stars-float2", floatStarsConfig(-10, 50), "<")
    .to("#left-animation .left-stars-twinkle", twinkleStarsConfig(), "<")
    .to("#right-animation .right-stars-twinkle", twinkleStarsConfig(), "<");
}
