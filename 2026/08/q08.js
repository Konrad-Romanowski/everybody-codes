import fs from 'fs';

// part 1
const p1Map = fs.readFileSync('p1.in','utf-8').split("\r\n");
const ROWS = p1Map.length;
const COLS = p1Map[0].length;
const MID = (ROWS-1)/2;
const LEN = (ROWS+1)/2;

const map = new Array((2*LEN) - 1).fill(0).map(_ => []);

for(let r = MID; r >= 0; r--) {
    let c = LEN - r - 1;
    let row = r;
    let col = c;

    while(0 <= row && row < ROWS && 0 <= col && col < COLS) {
        map[MID-r].push(parseInt(p1Map[row][col]));
        row++;
        col++;
    }
}

for(let c = MID+2; c < COLS; c+=2) {
    let row = 0;
    let col = c;
    while(row < ROWS && col < COLS && p1Map[row][col] !== ".") {
        map[(MID+c)/2].push(parseInt(p1Map[row][col]));
        row++;
        col++;
    }
}

let p1 = 0;

for(let r = 0; r < map.length; r++) {
    let curShadow = -1;
    for(let i = 0; i < map[r].length; i++) {
        if(map[r][i] > curShadow) p1++;
        curShadow = Math.max(map[r][i],curShadow)-1;
    }
}

console.log(`p1: ${p1}`);