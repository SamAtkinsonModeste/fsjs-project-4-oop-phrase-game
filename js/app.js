/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();

// console.log(game.phrases);

game.phrases.forEach((phrase, index) => {
  console.log(
    `Phrase ${index} - question: ${phrase.question} | answer: ${phrase.phrase} `,
  );
});
