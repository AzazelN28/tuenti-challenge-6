"use strict";

const fs = require("fs");

const input = fs.readFileSync("testInput.txt")
                .toString()
                .split("\n")
                .filter((value,index) => value !== "")
                .filter((value,index) => index >= 1)
                .map((value) => parseInt(value,10));

function magnitude(x) {
  return Math.floor(Math.log10(x));
}

let ones = 0, zeroes = 0;

function isImmiscible(x) {
  const s = x.toString();

  let i = 0;

  ones = 0;
  zeroes = 0;
  while (s.charAt(i) === "1") {
    i++;
    ones++;
  }

  if (i === s.length) {
    return true;
  }

  zeroes = 0;
  while (s.charAt(i) === "0") {
    i++;
    zeroes++;
  }

  if (i === s.length) {
    return true;
  }

  return false;

}

for (let index = 0; index < input.length; index++) {
  const value = input[index];
  let multiple = 1;
  while (!isImmiscible(value * multiple)) {
    multiple++;
  }
  console.log(`Case #${index + 1}: ${ones} ${zeroes}`);
}
