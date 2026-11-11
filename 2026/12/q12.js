import fs from 'fs';

// part 1
const p1Blocks = fs.readFileSync('p1.in','utf-8').split("\r\n").map(line => line.split(""));
const P1_ROWS = p1Blocks.length;
const P1_COLS = p1Blocks[0].length;

let p1 = 0;

for(let r = 0; r < P1_ROWS; r++) {
    for(let c = 0; c < P1_COLS; c++) {
        if(p1Blocks[r][c] === "#") {
            let row = r;
            let col = c;
            let width = 0;
            let heigth = 0;

            while(col < P1_COLS && p1Blocks[row][col] === "#") {
                width++;
                col++;
            }

            col = c;
            while(row < P1_ROWS && p1Blocks[row][col] === "#") {
                heigth++;
                row++;
            }

            p1 += Math.min(width, heigth);
            
            for(let i = r; i < r+heigth; i++) {
                for(let j = c; j < c + width ;j++) {
                    p1Blocks[i][j] = ".";
                }
            }
        }
    }
}

console.log(`p1: ${p1}`);