/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(question, phrase) {
    this.question = question;
    this.phrase = phrase.toLowerCase();
    this.letters = this.phrase.split("");
  }

  createLetterElements(nameElement, property, value) {
    nameElement = document.createElement(nameElement);
    nameElement[property] = value;
    return nameElement;
  }

  addPhraseToDisplay() {
    let questionContainer = document.querySelector(".header");
    questionContainer.textContent = this.question;
    const ulPhrase = document.querySelector("#phrase ul");

    this.letters.forEach((letter) => {
      if (letter !== " ") {
        const li = this.createLetterElements(
          "li",
          "className",
          "letter li-phrase",
        );
        const spanBox = this.createLetterElements("span", "className", "box");
        const spanFront = this.createLetterElements(
          "span",
          "className",
          "front",
        );
        const spanLetter = this.createLetterElements(
          "span",
          "className",
          "letter",
        );
        spanBox.appendChild(spanFront);
        spanBox.appendChild(spanLetter);
        li.appendChild(spanBox);
        spanLetter.textContent = letter;
        ulPhrase.appendChild(li);

        // console.log(li);
      } else {
        const liSpace = this.createLetterElements(
          "li",
          "className",
          "space li-phrase",
        );
        ulPhrase.appendChild(liSpace);
      }
    });
    console.log(questionContainer);
    // console.log(this.letters);
    console.log(ulPhrase);
  }

  checkLetter(btnLetter) {
    for (let i = 0; i < this.letters.length; i++) {
      if (btnLetter === this.letters[i]) {
        return true;
      }
    }
    return false;
  }

  showMatchedLetter(correctLetter) {
    const letterBoxes = document.querySelectorAll(".box");
    for (let i = 0; i < letterBoxes.length; i++) {
      let spanLetter = letterBoxes[i].querySelector(".letter");
      if (correctLetter === spanLetter.textContent) {
        letterBoxes[i].classList.add("show");
        console.log(letterBoxes[i]);
      }
    }
  }
}
