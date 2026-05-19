/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase("Which book title is this?", "The Chamber of Secrets"),
      new Phrase("Which book title is this?", "The Order of the Phoenix"),
      new Phrase("Which book title is this?", "The Goblet of Fire"),
      new Phrase("Which Hogwarts professor is this?", "Severus Snape"),
      new Phrase("Which Hogwarts professor is this?", "Minerva McGonagall"),
      new Phrase("Which Hogwarts professor is this?", "Albus Dumbledore"),
      new Phrase("Which dark wizard is this?", "Lord Voldemort"),
      new Phrase("Which dark wizard is this?", "Lucius Malfoy"),
      new Phrase("Which dark witch is this?", "Bellatrix Lestrange"),
      new Phrase("Which Hogwarts student wizard is this?", "Ron Weasley"),
      new Phrase("Which Hogwarts student wizard is this?", "Harry Potter"),
      new Phrase("Which Hogwarts student wizard is this?", "Draco Malfoy"),
      new Phrase("Which Hogwarts student witch is this?", "Hermione Granger"),
      new Phrase("Which Hogwarts student witch is this?", "Luna Lovegood"),
      new Phrase("Which Hogwarts student witch is this?", "Cho Chang"),
    ];
    this.activePharse = null;
  }

  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }
}
