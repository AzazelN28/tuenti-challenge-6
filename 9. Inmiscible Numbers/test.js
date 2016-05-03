"use strict";

const fs = require("fs");

const input = fs.readFileSync("testInput.txt")
                .toString()
                .split("\n")
                .filter((value,index) => value !== "")
                .filter((value,index) => index >= 1)
                .map((value) => parseInt(value,10));

function isImmiscible(value) {
  const string = value.toString();

  let i = 0;

  while (string.charAt(i) === "1") {
    i++;
  }

  if (i === string.length) {
    return true;
  }

  while (string.charAt(i) === "0") {
    i++;
  }

  if (i === string.length) {
    return true;
  }

  return false;
}

function immiscibleCount(value) {
  const string = value.toString();

  let i = 0,
      ones = 0,
      zeroes = 0;

  while (string.charAt(i) === "1") {
    i++;
    ones++;
  }

  if (i === string.length) {
    return [ones,zeroes];
  }

  while (string.charAt(i) === "0") {
    i++;
    zeroes++;
  }

  if (i === string.length) {
    return [ones,zeroes];
  }

  return null;
}

const output = input.map((value) => {
  process.stderr.write("\x1B[2J");
  let multiple = 1;
  while (!isImmiscible(value * multiple)) {
    process.stderr.write(`\x1B[0,0H${value} ${multiple} ${memory}`);
    multiple++;
  }
  return immiscibleCount(value * multiple);
}).map((value,index) => {
  return `Case #${index + 1}: ${value[0]} ${value[1]}`;
}).join("\n");

console.log(output);
