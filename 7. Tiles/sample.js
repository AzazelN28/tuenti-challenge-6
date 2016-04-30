"use strict";

const fs = require("fs");
const path = require("path");

const input = fs.readFileSync("sampleInput.txt")
                .toString()
                .split("\n")
                .filter((line) => line !== "")
                .reduce((out, line, index) => {
                  if (index === 0) {
                    out.count = parseInt(line, 10);
                  } else if (/[0-9]+ [0-9]+/.test(line)) {
                    const matches = line.match(/([0-9]+) ([0-9]+)/);
                    out.width = parseInt(matches[1], 10);
                    out.height = parseInt(matches[2], 10);
                    out.start = index + 1;
                  } else if (/[A-Za-z]+/.test(line)) {
                    const row = index - out.start;
                    out.matrix.push(
                      line.split("").map((character) => {
                        const charCode = character.charCodeAt(0);
                        if (charCode >= 97 && charCode <= 122) {
                          return -(charCode - 96);
                        } else if (charCode >= 65 && charCode <= 90) {
                          return (charCode - 64);
                        } else if (charCode === 46) {
                          return 0;
                        }
                      })
                    );

                    if (row === out.height - 1) {
                      out.matrices.push(out.matrix.slice());
                      while (out.matrix.pop());
                    }
                  }
                  return out;
                }, { matrix: [], matrices: [] });

function findMax(list) {
  let result = 0;
  for (let index = 0; index < list.length; index++) {
    if (list[index] > result) {
      result = list[index];
    }
  }
  return result;
}

function findMatrixSum(matrix, oi, oj, w, h) {
  const height = matrix.length;
  const width = matrix[0].length;

  let sum = 0;
  for (let i = 0; i < h; i++) {
    const y = (i + oi) % height;
    for (let j = 0; j < w; j++) {
      const x = (j + oj) % width;
      sum += matrix[y][x];
    }
  }

  return sum;
}

function findBiggestSum(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;

  let sum = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      for (let k = height; k > 0; k--) {
        for (let l = width; l > 0; l--) {
          sum.push(findMatrixSum(matrix, i, j, k, l));
        }
      }
    }
  }

  if (sum.length < 1) {
    return 0;
  } else if (sum.length === 1) {
    const firstSum = sum.shift();
    return firstSum > 0 ? firstSum : 0;
  } else {
    const max = findMax(sum);
    const filtered = sum.filter((value) => max === value);
    return filtered.length > 1 ? "INFINITY" : filtered.shift();
  }

}

function isTransposable(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  return (height !== width);
}

function transpose(matrix) {
  return matrix[0].map((col, i) => {
    return matrix.map((row) => {
      return row[i];
    });
  });
}

let caseNum = 0;
for (let i = 0; i < input.matrices.length; i++) {
  const matrix = input.matrices[i];
  console.log(`Case #${++caseNum}: ${findBiggestSum(matrix)}`);
  if (isTransposable(matrix)) {
    console.log(`Case #${++caseNum}: ${findBiggestSum(transpose(matrix))}`);
  }
}
