//!SECTION Animation File
// Handles:
// - Star creation
// - Star setup
// - GSAP overlay animations

const leftAnimationDiv = document.querySelector("#left-animation");
const rightAnimationDiv = document.querySelector("#right-animation");
const overlayDiv = document.querySelector("#overlay");

//!SECTION - HELPER FUNCTIONS

/**
 * Creates star elements and appends them to a container
 * @param {number} num Number of stars to create
 * @param {HTMLElement} side Container where the stars should be added
 * @param {string} className CSS class added to each star
 */
const createStars = (num, side, className) => {
  for (let i = 0; i < num; i++) {
    const star = document.createElement("span");
    star.className = className;
    star.textContent = "✷";
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

function floatStarsConfig(xPosition, yPosition) {
  return {
    x: xPosition,
    y: yPosition,
    opacity: 0.7,
    repeat: -1,
    yoyo: true,
    duration: 8,
    stagger: 0.2,
    ease: "power2.inOut",
  };
}

//!SECTION - CALLING CREATESTARS FUNCTION
createStars(10, leftAnimationDiv, "stars left-stars-float");
createStars(15, leftAnimationDiv, "stars left-stars-float2");
createStars(20, rightAnimationDiv, "stars right-stars");

//!SECTION - VARIABLES FROM CREATED STARS & HELPER FUNCTION STARSETUP
const starsLeft = leftAnimationDiv.querySelectorAll(".stars");
const leftFloat = starsSetUp(starsLeft, leftAnimationDiv);

//!SECTION - ANIMATION FOR THE DIFFERENT CLASS NAMES OF THE OVERLAY
if (overlayDiv.className === "start") {
  gsap
    .timeline()
    .to("#left-animation .left-stars-float", floatStarsConfig(-10, 50))
    .to("#left-animation .left-stars-float2", floatStarsConfig(10, 50));
}
