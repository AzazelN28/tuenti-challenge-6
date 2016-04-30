"use strict";

const fs = require("fs");
const net = require("net");

const words = fs.readFileSync("words.txt")
                .toString()
                .split("\n")
                .filter((line) => line !== "");

const toTry = ["A","E","I","O","U"];
const tried = [];
const buffer = [];

let currentLevel = 0;

const TIMEOUT = 150;
let writeTimeout = null;

function pickRandomLetter(wordsFiltered, chars) {

  const letters = {};
  wordsFiltered.forEach((word) => {

    for (let i = 0; i < word.length; i++) {

      if (chars[i] !== "_") {
        continue;
      }

      const character = word[i];
      if (typeof letters[character] === "undefined") {
        letters[character] = 0;
      }

      letters[character]++;

    }

  });

  const letterList = Object.keys(letters);
  const randomLetter = letterList.splice(Math.random() * letterList.length).shift();
  return randomLetter;

}

function pickMostProbableLetter(wordsFiltered, chars) {

  const frequency = {};
  wordsFiltered.forEach((word) => {

    for (let i = 0; i < word.length; i++) {

      if (chars[i] !== "_") {
        continue;
      }

      const character = word[i];
      if (typeof frequency[character] === "undefined") {
        frequency[character] = 0;
      }

      frequency[character]++;

    }

  });

  const nextLetters = Object.keys(frequency);
  let nextLetter = nextLetters.sort((a,b) => frequency[a] - frequency[b]).pop();

  while (tried.indexOf(nextLetter) >= 0) {
    nextLetter = nextLetters.pop();
  }

  buffer.push("Next letter: " + nextLetter + " => " + frequency[nextLetter]);

  return nextLetter;

}

function sendWithDelay(data) {

  if (writeTimeout) {
    clearTimeout(writeTimeout);
    writeTimeout = null;
  }

  writeTimeout = setTimeout(() => {
    client.write(data);
  }, TIMEOUT);

}

const client = net.connect(9988, "52.49.91.111");
client.on("connect", () => {

  buffer.push("conectado!");

}).on("data", (data) => {

  const response = data.toString();
  console.log(response);
  if (/Press enter to continue\.\.\./.test(response)) {

    const matches = response.match(/Get ready for level ([0-9]+)/);
    if (matches && currentLevel === 0) {

      const maybeLevel = parseInt(matches[1], 10);
      if (currentLevel === 0) {

        currentLevel = maybeLevel;
        buffer.push("Setting level to " + currentLevel);

      }

    } else {

      const matches = response.match(/Your test key is: ([a-f0-9]+)/);
      if (matches) {
        fs.appendFileSync("keys.txt", matches[1] + "\t" + currentLevel + "\n");
      }

      currentLevel++;

      while (toTry.pop());

      toTry.push("A","E","I","O","U");

      while (tried.pop());

      buffer.push("Setting level to " + currentLevel);

    }

    sendWithDelay("\r");

  } else if (/Level: [0-9]+/.test(response)) {

    const lines = response.split("\n");
    if (lines.length > 9) {

      const line = lines[9];
      const chars = line.split(" ");
      const wordLength = chars.length;
      const knownChars = chars.reduce((initial, current) => {

        if (current !== "_") {
          initial++;
        }

        return initial;

      }, 0);

      if (knownChars > 0) {

        const pattern = chars.map((character) => character === "_" ? "." : character).join("");
        buffer.push("Pattern: " + pattern);

        const re = new RegExp(pattern);
        const wordsFiltered = words.filter((word) => word.length === wordLength && re.test(word)).sort((a,b) => a.localeCompare(b));

        buffer.push("Words Filtered: " + wordsFiltered.length);

        const nextLetter = pickMostProbableLetter(wordsFiltered, chars);
        //const nextLetter = pickRandomLetter(wordsFiltered, chars);
        if (nextLetter) {

          toTry.unshift(nextLetter);

          tried.push(nextLetter);

        }

      }

      if (toTry.length > 0) {

        const character = toTry.shift();
        buffer.push("Sending Character: " + character);

        if (character) {
          sendWithDelay(character + "\r");
        }

      }

      console.log(buffer);

    }

  }

}).on("end", () => {

  console.log("desconectado!");
  if (writeTimeout) {
    clearTimeout(writeTimeout);
    writeTimeout = null;
  }

});
