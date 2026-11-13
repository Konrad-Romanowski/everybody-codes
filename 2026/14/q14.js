import { Queue } from '@datastructures-js/queue';
import fs from 'fs';

const DIRS = [[0,1],[1,0],[0,-1],[-1,0]];

// part 1
const p1Window = fs.readFileSync('p1.in','utf-8').split("\r\n");
const P1_ROWS = p1Window.length;
const P1_COLS = p1Window[0].length;

let p1 = 2 * P1_ROWS + 2 * P1_COLS;
const BINDINGS = new Set();
const SEEN = new Array(P1_ROWS).fill(0).map(_ => new Array(P1_COLS).fill(false));

for(let row = 0; row < P1_ROWS; row++) {
    for(let col = 0; col < P1_COLS; col++) {
        let pixel = p1Window[row][col];
        
        if(SEEN[row][col]) continue;
        SEEN[row][col] = true;

        const q = new Queue();
        q.push([row,col]);

        while(q.size()) {
            let [r,c] = q.pop();

            for(let [dr,dc] of DIRS) {
                let [nr,nc] = [r+dr,c+dc];
                if(0 <= nr && nr < P1_ROWS && 0 <= nc && nc < P1_COLS && !SEEN[nr][nc]) {
                    if(p1Window[nr][nc] !== pixel) {
                        BINDINGS.add(`${r}-${nr}|${c}-${nc}`);
                    } else {
                        q.push([nr,nc]);
                        SEEN[nr][nc] = true;
                    }
                }
            }
        }
    }
}

p1 += BINDINGS.size;

console.log(`p1: ${p1}`);