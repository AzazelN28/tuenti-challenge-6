"use strict";

const fs = require("fs");
const yaml = require("js-yaml");
const util = require("util");

const input = fs.readFileSync("submitInput.txt").toString();

const object = (function() {
  try {
    return yaml.safeLoad(input);
  } catch(error) {
    console.log(error);
  }
}());

const states = object.code;
const tapes = Object.keys(object.tapes);
for (let index = 0; index < tapes.length; index++) {
  const tape = tapes[index];

  let data = object.tapes[tape];
  let position = 0;
  let state = states["start"];
  let isEnd = false;
  while (position >= 0 && !isEnd) {
    const ch = data.charAt(position) === "" ? " " : data.charAt(position);
    if (state[ch]) {
      const actions = state[ch];
      const names = Object.keys(actions);
      for (let actionIndex = 0; actionIndex < names.length; actionIndex++) {
        const name = names[actionIndex];
        const param = actions[name];
        switch(name) {
          case "move":
            if (param === "left") {
              position--;
            } else if (param === "right") {
              position++;
            }
            break;

          case "state":
            if (param === "end") {
              isEnd = true;
              break;
            } else {
              if (typeof states[param] === "undefined") {
                throw `Unexpected state ${param}`;
              }
              state = states[param];
            }
            break;

          case "write":
            data = data.slice(0,position) + param + data.slice(position + 1);
            break;

          default:
            throw `Unexpected action ${name}`;
        }
      }
    }
  }

  console.log(`Tape #${tape}: ${data}`);
}
