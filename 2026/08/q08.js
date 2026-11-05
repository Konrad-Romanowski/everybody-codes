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


// part 2
let p2 = p1;

// Direction: ↖
for(let r = 0; r < map.length; r++) {
    let curShadow = -1;
    for(let i = map[r].length-1; i >= 0; i--) {
        if(map[r][i] > curShadow) p2++;
        curShadow = Math.max(map[r][i],curShadow)-1;
    }
}

// Direction: → and ←
const leftRightMap = p1Map.map(line => {
    const result = [];
    for(let i = 0; i < line.length; i++) {
        if(line[i] !== ".") result.push(parseInt(line[i]));
    }
    return result;
});

let leftRightCnt = 0;
let rightLeftCnt = 0;

for(let r = 0; r < leftRightMap.length; r++) {
    let curShadowLeft = -1;
    let curShadowRight = -1;
    for(let i = 0; i < leftRightMap[r].length; i++) {
        if(leftRightMap[r][i] > curShadowLeft) leftRightCnt++;
        if(leftRightMap[r][leftRightMap[r].length-1-i] > curShadowRight) rightLeftCnt++;
        curShadowLeft = Math.max(leftRightMap[r][i],curShadowLeft)-1;
        curShadowRight = Math.max(leftRightMap[r][leftRightMap[r].length-1-i],curShadowRight)-1;
    }
}

p2 += leftRightCnt + rightLeftCnt;

// Direction: ↗ and ↙
const topRightMap = new Array((2*LEN) - 1).fill(0).map(_ => []);

for(let r = MID; r < ROWS; r++) {
    let c = r - MID;
    let row = r;
    let col = c;

    while(0 <= row && row < ROWS && 0 <= col && col < COLS) {
        topRightMap[r-MID].push(parseInt(p1Map[row][col]));
        row--;
        col++;
    }
}

for(let c = LEN+1; c < COLS; c+=2) {
    let row = ROWS - 1;
    let col = c;
    while(0 <= row && row < ROWS && 0 <= col && col < COLS && p1Map[row][col] !== ".") {
        topRightMap[(MID+c)/2].push(parseInt(p1Map[row][col]));
        row--;
        col++;
    }
}

let toTopCnt = 0;
let toBottomCnt = 0;

for(let r = 0; r < topRightMap.length; r++) {
    let curShadowToTop = -1;
    let curShadowToBottom = -1;
    for(let i = 0; i < topRightMap[r].length; i++) {
        if(topRightMap[r][i] > curShadowToTop) toTopCnt++;
        if(topRightMap[r][topRightMap[r].length-1-i] > curShadowToBottom) toBottomCnt++;
        curShadowToTop = Math.max(topRightMap[r][i],curShadowToTop)-1;
        curShadowToBottom = Math.max(topRightMap[r][topRightMap[r].length-1-i],curShadowToBottom)-1;
    }
}

p2 += toTopCnt + toBottomCnt;

console.log(`p2: ${p2}`);