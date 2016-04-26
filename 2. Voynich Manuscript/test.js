"use strict";

const fs = require("fs");

// Load corpus.
const corpus = fs.readFileSync("corpus.txt")
        				 .toString()
        				 .split(" ")
                 .filter((word, index) => word !== "");

const input = fs.readFileSync("testInput.txt")
				        .toString()
				        .split("\n");

const count = parseInt(input.shift(), 10);
for (let index = 0; index < count; index++) {
  const pair = input[index].split(" ");

  const first = parseInt(pair[0], 10);
  const last = parseInt(pair[1], 10);

  const words = corpus.slice(first - 1, last);

  const wordCount = words.reduce((table, word) => {
    if (typeof table[word] === "undefined") {
      table[word] = 0;
    }
    table[word]++;
    return table;
  }, {});

  const sortedWords = Object.keys(wordCount).sort((a,b) => {
    return wordCount[b] - wordCount[a];
  });

  const firstThreeWords = sortedWords.slice(0,3);
  console.log("Case #%d: %s", index + 1, firstThreeWords.map((word) => {
    return `${word} ${wordCount[word]}`;
  }).join(","));

}

// Sample output
// Case #1: Blue 4,Brown 3,Khaki 2
// Case #2: Blue 6,White 5,Lavender 4

