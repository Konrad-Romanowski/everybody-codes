import fs from 'fs';

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n");

let P1_ROWS = -1;
let P1_COLS = -1;

const p1Data = p1InputData.map(line => {
    const regEx = /\d+/g;
    let data = line.match(regEx);
    let x = parseInt(data[0]);
    let y = parseInt(data[1]);

    P1_ROWS = Math.max(P1_ROWS, y);
    P1_COLS = Math.max(P1_COLS, x+1);

    return [x,y];
});

let p1Map = new Array(P1_ROWS).fill(0).map(_ => new Array(P1_COLS).fill("."));
let p1 = 0;

for(let [c,r] of p1Data) {
    for(let i = 0; i < r; i++) {
        p1Map[P1_ROWS-1-i][c] = "#";
        p1++;
    }
}

for(let row = 0; row < P1_ROWS; row++) {
    let l = -1;

    for(let r = 0; r < P1_COLS; r++) {
        if(p1Map[row][r] === "#") {
            if(l > -1) {
                p1 += r-l-1;
            }
            l = r;
        }
    }
}

console.log(`p1: ${p1}`);


// part 2
const p2InputData = fs.readFileSync('p2.in','utf-8').split("\r\n");

let P2_ROWS = -1;
let P2_COLS = -1;

const p2Data = p2InputData.map(line => {
    const regEx = /\d+/g;
    let data = line.match(regEx);
    let x = parseInt(data[0]);
    let y = parseInt(data[1]);
    let width = parseInt(data[2]);

    P2_ROWS = Math.max(P2_ROWS, y);
    P2_COLS = Math.max(P2_COLS, x+width);

    return [x,y,width];
});

let p2Map = new Array(P2_ROWS).fill(0).map(_ => new Array(P2_COLS).fill("."));
let p2 = 0;

for(let [c,r,width] of p2Data) {
    for(let i = 0; i < r; i++) {
        for(let w = 0; w < width; w++) {
            p2Map[P2_ROWS-1-i][c+w] = "#";
            p2++;
        }
    }
}

for(let row = 0; row < P2_ROWS; row++) {
    let l = -1;

    for(let r = 0; r < P2_COLS; r++) {
        if(p2Map[row][r] === "#") {
            if(l > -1) {
                p2 += r-l-1;
            }
            l = r;
        }
    }
}

console.log(`p2: ${p2}`);