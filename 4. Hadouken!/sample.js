"use strict";

const fs = require("fs");

const combos = fs.readFileSync("combos.txt")
                .toString()
                .split("\n")
                .map((line) => line.split("-"));

function findCombosByFirstMovement(movement) {
  return combos.filter((combo) => combo[0] === movement);
}

function filterMaybeCombos(movement, current, position) {
  return current.filter((current) => current[position] === movement);
}

function compare(a,b) {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

const input = fs.readFileSync("sampleInput.txt")
                .toString()
                .split("\n");

const count = input.shift();

const sessions = input.map((line) => line.split("-"));
for (let index = 0; index < count; index++) {

  const session = sessions[index];
  if (session.length < 3) {
    continue;
  }

  let movement = null,
      maybeCombos = [],
      combos = 0,
      stack = [];

  while (movement = session.shift()) {

    //console.log("movement", movement);
    if (maybeCombos.length > 0) {
      maybeCombos = filterMaybeCombos(movement, maybeCombos, stack.length);
      if (maybeCombos.length > 0) {
        stack.push(movement);
        if (maybeCombos.length === 1 && stack.length === maybeCombos[0].length - 1) {
          combos++;

          //console.log("Combo!", stack);

          stack = [];
          maybeCombos = [];
        }
      } else {
        maybeCombos = [];
        stack = [];
      }
    }

    if (maybeCombos.length === 0) {
      maybeCombos = findCombosByFirstMovement(movement);
      if (maybeCombos.length > 0) {
        stack.push(movement);
      }
    }

  }

  console.log(`Case #${index + 1}: ${combos}`);

}
