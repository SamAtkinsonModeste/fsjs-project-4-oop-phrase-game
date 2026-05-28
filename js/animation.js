//STEP-BUILD - STAR Function
const leftAnimationDiv = document.querySelector("#left-animation");
const rightAnimationDiv = document.querySelector("#right-animation");

const createStars = (num, side, className) => {
  for (let i = 0; i < num; i++) {
    const star = document.createElement("span");
    star.className = className;
    star.textContent = "✷";
    side.append(star);
  }
};

createStars(20, leftAnimationDiv, "stars left-stars-float");
createStars(20, rightAnimationDiv, "stars right-stars");

function randomPositions(container, element) {
  const postionX = Math.floor(Math.random() * container.offsetWidth);
  const postionY = Math.floor(Math.random() * container.offsetHeight);
  const side = postionX + "px";
  const top = postionY + "px";
  element.style.left = side;
  element.style.top = top;
}

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

const starsLeft = leftAnimationDiv.querySelectorAll(".stars");
console.log(starsLeft);
starsLeft.forEach((star) => {
  randomPositions(leftAnimationDiv, star);
  randomValues(star);
  gsap.to(".left-stars", {
    x: -10,
    y: 50,
    opacity: 0.7,
    repeat: -1,
    yoyo: true,
    duration: 8,
    stagger: 0.2,
    ease: "power2.inOut",
  });
});

// gsap.to("#left-animation .left-stars", {
//   duration: 2,
//   y: 600,
//   stagger: 0.2,
// });
