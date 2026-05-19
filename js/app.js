/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();

game.phrases.forEach((phrase, index) => {
  console.log(
    `Phrase ${index} - question: ${phrase.question} | answer: ${phrase.phrase} `,
  );
});

console.log(game.getRandomPhrase());
console.log(game.getRandomPhrase());
console.log(game.getRandomPhrase());
console.log(game.getRandomPhrase());
console.log(game.getRandomPhrase());
console.log(game.getRandomPhrase());
