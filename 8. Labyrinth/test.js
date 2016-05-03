"use strict";

const fs = require("fs");
const net = require("net");

const WIDTH = 84;
const HEIGHT = 84;

const UP = 'u';
const DN = 'd';
const LT = 'l';
const RT = 'r';

function createEmptyMap(w,h,c) {
  const map = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      row.push(c);
    }
    map.push(row);
  }
  return map;
}

const map = createEmptyMap(WIDTH, HEIGHT, " ");
const passes = createEmptyMap(WIDTH, HEIGHT, 0);

let player = {
  x: WIDTH >> 1,
  y: HEIGHT >> 1
};

let lastAction = null;
let cost = 4096;
let move = UP;
let frame = 0;

const client = net.connect(1986, "52.49.91.111");

function moveUp() {
  lastAction = UP;
  client.write(UP + "\n");
}

function moveDown() {
  lastAction = DN;
  client.write(DN + "\n");
}

function moveLeft() {
  lastAction = LT;
  client.write(LT + "\n");
}

function moveRight() {
  lastAction = RT;
  client.write(RT + "\n");
}

client.on("connect", () => {

  console.log("conectado!");

}).on("data", (data) => {

  let string = data.toString();
  if (/^You can't pass through walls, can you\?$/.test(string)) {

    string = string.replace(/^You can't pass through walls, can you\?$/, "");

    lastAction = null;

  } else {

    passes[player.y][player.x]++;

    switch(lastAction) {
      case UP: player.y--; break;
      case DN: player.y++; break;
      case LT: player.x--; break;
      case RT: player.x++; break;
    }

    lastAction = null;

  }

  const rows = string.split("\n")
                     .filter((line) => line !== "")
                     .map((line) => line.split(""));

  for (let y = 0; y < rows.length; y++) {
    const columns = rows[y];
    for (let x = 0; x < columns.length; x++) {
      const tile = columns[x];

      const tx = player.x + x - 3;
      const ty = player.y + y - 3;

      //if (tile !== "x") {
        map[ty][tx] = tile;
      //}

      if (tile === "#") {
        passes[ty][tx] = 2048;
      }
    }
  }

  const up = map[player.y - 1][player.x];
  const dn = map[player.y + 1][player.x];
  const lt = map[player.y][player.x - 1];
  const rt = map[player.y][player.x + 1];

  const pass_up = passes[player.y - 1][player.x];
  const pass_dn = passes[player.y + 1][player.x];
  const pass_lt = passes[player.y][player.x - 1];
  const pass_rt = passes[player.y][player.x + 1];

  cost = 4096;

  switch(move) {
    case UP:
      if (up === '#') { move = null; }
      break;

    case DN:
      if (dn === '#') { move = null; }
      break;

    case LT:
      if (lt === '#') { move = null; }
      break;

    case RT:
      if (rt === '#') { move = null; }
      break;
  }

  if (move === RT || move === LT || move === null) {

    if (up !== '#') {
      if (pass_up <= pass_dn
       && pass_up <= pass_lt
       && pass_up <= pass_rt) {
        cost = pass_up;
        move = UP;
        //moveUp();
      }
    }

    if (dn !== '#') {
      if (pass_dn <= pass_up
       && pass_dn <= pass_lt
       && pass_dn <= pass_rt) {
        if (pass_dn < cost) {
          cost = pass_dn;
          move = DN;
        }
        //moveDown();
      }
    }

  }

  if (move === UP || move === DN || move === null) {

    if (rt !== '#') {
      if (pass_rt <= pass_up
       && pass_rt <= pass_dn
       && pass_rt <= pass_lt) {
        if (pass_rt < cost) {
          cost = pass_rt;
          move = RT;
        }
        //moveRight();
      }
    }

    if (lt !== '#') {
      if (pass_lt <= pass_up
       && pass_lt <= pass_dn
       && pass_lt <= pass_rt) {
        if (pass_lt < cost) {
          cost = pass_lt;
          move = LT;
        }
        //moveLeft();
      }
    }

  }

  switch(move) {
    case UP: moveUp(); break;
    case DN: moveDown(); break;
    case RT: moveRight(); break;
    case LT: moveLeft(); break;
  }

  process.stdout.write("\x1B[2J\x1B[0;0H");
  /*process.stdout.write("↑\t↓\t←\t→\n");
  process.stdout.write(`${up}\t${dn}\t${lt}\t${rt}\n`);
  process.stdout.write(`${pass_up}\t${pass_dn}\t${pass_lt}\t${pass_rt}\n`);*/
  process.stdout.write(map.map((row) => row.join("")).join("\n").replace(/x|[a-f0-9]/g,(fullMatch) => {
    if (fullMatch === "x") {
      return `\x1B[1;36mx\x1B[0m`;
    } else {
      return `\x1B[0;36m${fullMatch}\x1B[0m`;
    }
  }));
  fs.writeFileSync("map.txt", map.map((row) => row.join("")).join("\n"));
  fs.writeFile(`map/${++frame}.txt`, map.map((row) => row.join("")).join("\n"));
  //console.log(string);

}).on("end", (end) => {

  console.log("desconectado!");

});

