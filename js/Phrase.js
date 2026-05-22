/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(question, phrase) {
    this.question = question;
    this.phrase = phrase.toLowerCase();
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
    const letters = this.phrase.split("");
    letters.forEach((letter) => {
      if (letter !== " ") {
        const li = this.createLetterElements("li", "className", "letter");
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

        console.log(li);
      } else {
        const liSpace = this.createLetterElements("li", "className", "space");
        ulPhrase.appendChild(liSpace);

        console.log(liSpace);
      }
    });
    console.log(questionContainer);
    console.log(letters);
    console.log(ulPhrase);
  }
}
