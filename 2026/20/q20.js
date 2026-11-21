import fs from 'fs';

function calc(num1, num2, operator, BASE = 10) {
    if(operator === "+") return parseInt(num1, BASE) + parseInt(num2, BASE);
    if(operator === "-") return parseInt(num1, BASE) - parseInt(num2, BASE);
}

const segments = {
    "0": 6,
    "1": 2,
    "2": 5,
    "3": 5,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 3,
    "8": 7,
    "9": 6,
    "+": 2,
    "-": 1,
    "=": 2,
    "A": 6
}

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n");

let p1 = 0;

for(let line of p1InputData) {
    line = line.split(" ").join("");

    let sumOfSegments = 0;

    for(let char of line) {
        sumOfSegments += segments[char];
    }

    let [leftPart, rightPart] = line.split("=");
    
    let left = [];
    let right = [];
    let curNum = "";

    for(let i = 0; i < leftPart.length; i++) {
        if(leftPart[i] === "-" || leftPart[i] === "+") {
            left.push(curNum);
            left.push(leftPart[i]);
            curNum = "";
            continue;
        }
        curNum += leftPart[i];
    }

    left.push(curNum);

    curNum = "";
    
    for(let i = 0; i < rightPart.length; i++) {
        if(rightPart[i] === "-" || rightPart[i] === "+") {
            right.push(curNum);
            right.push(rightPart[i]);
            curNum = "";
            continue;
        }
        curNum += rightPart[i];
    }
    
    right.push(curNum);

    let [lnum1, leftOperator, lnum2] = left;
    let [rnum1, rightOperator, rnum2] = right;

    if(calc(lnum1, lnum2, leftOperator) === calc(rnum1, rnum2, rightOperator)) {
        p1 += sumOfSegments;
    }
}

console.log(`p1: ${p1}`);


// part 2
const p2InputData = fs.readFileSync('p2.in','utf-8').split("\r\n");

let p2 = 0;

for(let line of p2InputData) {
    line = line.split(" ").join("");

    let sumOfSegments = 0;

    for(let char of line) {
        sumOfSegments += segments[char];
    }

    let [leftPart, rightPart] = line.split("=");
    
    let left = [];
    let right = [];
    let curNum = "";

    for(let i = 0; i < leftPart.length; i++) {
        if(leftPart[i] === "-" || leftPart[i] === "+") {
            left.push(curNum);
            left.push(leftPart[i]);
            curNum = "";
            continue;
        }
        curNum += leftPart[i];
    }

    left.push(curNum);

    curNum = "";
    for(let i = 0; i < rightPart.length; i++) {
        if(rightPart[i] === "-" || rightPart[i] === "+") {
            right.push(curNum);
            right.push(rightPart[i]);
            curNum = "";
            continue;
        }
        curNum += rightPart[i];
    }
    
    right.push(curNum);

    let [lnum1, leftOperator, lnum2] = left;
    let [rnum1, rightOperator, rnum2] = right;

    if(calc(lnum1, lnum2, leftOperator, 11) === calc(rnum1, rnum2, rightOperator, 11)) {
        p2 += sumOfSegments;
    }
}

console.log(`p2: ${p2.toString(11)}`);