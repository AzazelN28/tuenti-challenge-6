"use strict";

const net = require("net");

const UP = 'u';
const DOWN = 'd';
const LEFT = 'l';
const RIGHT = 'r';


const map = new Array(512);

const client = net.connect(1986, "52.49.91.111");
client.on("connect", () => {
  console.log("conectado!");
}).on("data", (data) => {
  console.log(data.toString());
  const currentTiles = data.toString().split("\n").filter((line) => line !== "").map((line) => line.split(""));
  console.log(currentTiles);
}).on("end", (end) => {
  console.log("desconectado!");
});

