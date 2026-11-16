import fs from 'fs';

const DIRS = [
    [-1,-1], [-1,0], [-1,1],
    [0, -1],         [ 0,1],
    [1, -1], [ 1,0], [ 1,1],
];

// part 1
const p1Map = fs.readFileSync('p1.in','utf-8').split("\r\n").map(line => line.split(""));
const ROWS = p1Map.length;
const COLS = p1Map[0].length;

const [sr,sc] = [(ROWS-1)/2, (COLS-1)/2];
p1Map[sr][sc] = '#';
const LAND = new Set();
LAND.add(JSON.stringify([sr,sc]));

let p1 = 1;

while(true) {
    let isNewLand = false;
    const CANDIDATES = new Set();

    for(let l of LAND) {
        let [r,c] = JSON.parse(l);
        
        for(let [dr,dc] of DIRS) {
            let [nr,nc] = [r+dr,c+dc];
            let candidate = JSON.stringify([nr, nc]);
            
            if(
                !LAND.has(candidate) &&
                0 <= nr && nr < ROWS && 0 <= nc && nc < COLS &&
                !CANDIDATES.has(candidate)
            ) {
                CANDIDATES.add(candidate);
            }
        }
    }

    for(let candidate of CANDIDATES) {
        let [cr, cc] = JSON.parse(candidate);
        let cnt = 0;

        for(let [dr,dc] of DIRS) {
            let [nr,nc] = [cr+dr,cc+dc];
            
            if(
                0 <= nr && nr < ROWS && 0 <= nc && nc < COLS &&
                (p1Map[nr][nc] === '1' || p1Map[nr][nc] === '#')
            ) {
                cnt++;
            }
        }

        if(cnt >= 5) {
            isNewLand = true;
            LAND.add(candidate);
            p1Map[cr][cc] = "#";
            p1++;
        }
    }

    if(!isNewLand) break;
}

console.log(`p1: ${p1}`);