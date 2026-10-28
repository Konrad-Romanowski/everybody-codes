import fs from 'fs';

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n").map(line => line.split(" "));
const MAX_NUM_AT_ROW = [];

const p1InputUnified = p1InputData.map(line => {
    let newLine = [];
    let MAX = -1
    for(let eq of line) {
        let [num1, num2] = [null, null];

        if(eq.includes("<")) {
            [num1, num2] = eq.split("<");
        } else {
            [num2,num1] = eq.split(">")
        }

        MAX = Math.max(MAX, num1, num2);

        newLine.push([parseInt(num1), parseInt(num2)]);
    }
    
    MAX_NUM_AT_ROW.push(MAX);

    return newLine;
});

let p1 = 0;

for(let i = 0; i < p1InputUnified.length; i++) {
    let order = new Array(MAX_NUM_AT_ROW[i]+1).fill(0);
    let curLine = p1InputUnified[i];

    for(let j = 0; j < curLine.length; j++) {
        let [_, high] = curLine[j];
        order[high]++;
    }

    let sum = 0;
    
    for(let k = 1; k < order.length; k++) {
        sum += k * 10 ** order[k];
    }

    p1 += sum;
}

console.log(`p1: ${p1}`);