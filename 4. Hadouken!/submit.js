"use strict";

const fs = require("fs");

const combos = fs.readFileSync("combos.txt")
                 .toString()
                 .split("\n")
                 .filter((line) => line !== "")
                 .map((line) => line.split("-"));

const input = fs.readFileSync("submitInput.txt")
                .toString()
                .split("\n")
                .filter((line) => line !== "");

const count = input.shift();

const sessions = input.map((line) => line.split("-"));

function findComboByMovement(movement, combos) {
  return combos.filter((combo) => combo[0] === movement);
}

function isCombo(movements, combo) {
  return movements.reduce((initial, movement, index) => {
    if ((index < combo.length - 1 && movement !== combo[index])
     || (index === combo.length - 1 && movement === combo[index])) {
      initial = false;
    }
    return initial;
  }, true);
}

function eachSession(session, index) {

  // skip those cases that are impossible to
  if (session.length < 3) {
    return;
  }

  let after = 0;

  function reduceMovement(num, movement, index) {

    const movements = session.slice(index);
    if (movements.length < 3 || after > index) {
      return num;
    }

    const maybeCombos = findComboByMovement(movement, combos);
    while (maybeCombos.length > 0) {
      const maybeCombo = maybeCombos.shift();
      if (isCombo(movements, maybeCombo)) {
        num++;
        if (maybeCombo.length === 6) {
          after = index + 4;
        } else {
          after = 0;
        }
      }
    }

    return num;

  }

  const num = session.reduce(reduceMovement, 0);

  console.log(`Case #${index + 1}: ${num}`);

}

sessions.forEach(eachSession);
