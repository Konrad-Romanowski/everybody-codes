import fs from 'fs';
import { MaxHeap } from '@datastructures-js/heap';

function mix(col1,col2) {
    if(col1 === col2) return col1;

    if(col1 === "K" || col2 === "K") return "K";

    if(col1 === "C" && col2 === "M") return "B";
    if(col1 === "M" && col2 === "C") return "B";

    if(col1 === "Y" && col2 === "C") return "G";
    if(col1 === "C" && col2 === "Y") return "G";

    if(col1 === "Y" && col2 === "M") return "R";
    if(col1 === "M" && col2 === "Y") return "R";
}

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n\r\n");

const layer1 = p1InputData[0].split("\r\n").map(line => line.split(""));
const layer2 = p1InputData[1].split("\r\n").map(line => line.split(""));

const ROWS = layer1.length;
const COLS = layer1[0].length;

let cnt = {};

for(let r = 0; r < ROWS; r++) {
    for(let c = 0; c < COLS; c++) {
        let color = mix(layer1[r][c],layer2[r][c]);
        cnt[color] = (cnt[color] || 0) + 1; 
    }
}

let heap = new MaxHeap(color => color.cnt);

for(let color in cnt) {
    heap.push({color, cnt: cnt[color]});
}

let p1 = 1;

for(let i = 0; i < 3; i++) {
    p1 *= heap.pop().cnt;
}

console.log(`p1: ${p1}`);


// part 2
function pair(col1,col2) {
    if(col1 === "K") return "K";

    if(col1 === "C" && col2 === "1") return "C1";
    if(col1 === "C" && col2 === "2") return "C2";
    if(col1 === "C" && col2 === "3") return "C3";
    if(col1 === "C" && col2 === "4") return "C4";

    if(col1 === "M" && col2 === "1") return "M1";
    if(col1 === "M" && col2 === "2") return "M2";
    if(col1 === "M" && col2 === "3") return "M3";
    if(col1 === "M" && col2 === "4") return "M4";

    if(col1 === "Y" && col2 === "1") return "Y1";
    if(col1 === "Y" && col2 === "2") return "Y2";
    if(col1 === "Y" && col2 === "3") return "Y3";
    if(col1 === "Y" && col2 === "4") return "Y4";
}

const p2InputData = fs.readFileSync('p2.in','utf-8').split("\r\n\r\n");

const p2Layer1 = p2InputData[0].split("\r\n").map(line => line.split(""));
const p2Layer2 = p2InputData[1].split("\r\n").map(line => line.split(""));

const P2_ROWS = p2Layer1.length;
const P2_COLS = p2Layer1[0].length;

const COLORS = ["C","M","Y","K"];
cnt = {};

for(let r = 0; r < P2_ROWS; r++) {
    for(let c = 0; c < P2_COLS; c++) {
        let color = pair(p2Layer1[r][c],p2Layer2[r][c]);
        cnt[color] = (cnt[color] || 0) + 1; 
    }
}

const ALL_COLOR_PERMUTATIONS = [];

function getPermutations(curPerm, COLORS) {
    if(curPerm.length === 4) {
        ALL_COLOR_PERMUTATIONS.push([...curPerm]);
        return;
    }

    for(let color of COLORS) {
        if(curPerm.includes(color)) continue;
        
        curPerm.push(color);
        getPermutations(curPerm, COLORS);
        curPerm.pop();
    }
}

getPermutations([],COLORS);

let p2 = -1;

for(let dict of ALL_COLOR_PERMUTATIONS) {
    const cntAfterMix = {};

    for(let colors in cnt) {
        let col1 = colors[0];
        let col2 = dict[parseInt(colors[1]-1)];

        let newColor = mix(col1, col2);
        cntAfterMix[newColor] = (cntAfterMix[newColor] || 0) + cnt[colors];
    }

    const heap = new MaxHeap(color => color.cnt);

    for(let color in cntAfterMix) {
        heap.push({color, cnt: cntAfterMix[color]});
    }

    let result = 1;

    for(let i = 0; i < 3; i++) {
        result *= heap.pop().cnt;
    }

    p2 = Math.max(p2, result);
}

console.log(`p2: ${p2}`);