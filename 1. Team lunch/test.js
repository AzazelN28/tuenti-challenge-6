"use strict";

const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "testInput.txt"))
				.toString()
				.split("\n");

const count = input.shift();

console.log(
	input
	.filter((inputValue) => inputValue !== "")
	.map((inputValue) => parseInt(inputValue, 10))
	.map((inputValue) => {
		
		if (inputValue === 0)
			return 0;
		else if (inputValue <= 4)
			return 1;
		else if (inputValue <= 6)
			return 2;
		else 
			return 2 + Math.ceil((inputValue - 6) / 2);

	}).map((outputValue, index) => {
		
		return `Case #${index + 1}: ${outputValue}`;

	}).join("\n")
);