import { PriorityQueue } from '@datastructures-js/priority-queue';
import fs from 'fs';

const DIRS = [[0,1],[1,0],[0,-1],[-1,0]];

// part 1
const p1Map = fs.readFileSync('p1.in','utf-8').split("\r\n");
const ROWS = p1Map.length;
const COLS = p1Map[0].length;
const SEEN = new Array(ROWS).fill(0).map(_ => new Array(COLS).fill(false));
SEEN[0][0] = true;

let p1 = -1;

const pq = new PriorityQueue((a,b) => a[2] - b[2]);
pq.push([0,0,0]);

while(pq.size()) {
    let [r,c,steps] = pq.pop();
    
    if(r === ROWS - 1 && c === COLS - 1) {
        p1 = steps;
        break;
    }

    for(let [dr,dc] of DIRS) {
        let [nr,nc] = [r+dr,c+dc];

        if(0 <= nr && nr < ROWS && 0 <= nc && nc < COLS && !SEEN[nr][nc] && p1Map[nr][nc] !== ".") {
            pq.push([nr,nc,steps+1]);
            SEEN[nr][nc] = true;
        }
    }
}

console.log(`p1: ${p1}`);