import fs from 'fs';

const DIRS = [
    [-1,-1], [-1,0], [-1,1],
    [0, -1],         [ 0,1],
    [1, -1], [ 1,0], [ 1,1],
];

// REMARK
// Paste proper input for each part into p123.in file

// part 1
const map = fs.readFileSync('p123.in','utf-8').split("\r\n").map(line => line.split(""));
const ROWS = map.length;
const COLS = map[0].length;

const [sr,sc] = [(ROWS-1)/2, (COLS-1)/2];
map[sr][sc] = '#';
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
                (map[nr][nc] === '1' || map[nr][nc] === '#')
            ) {
                cnt++;
            }
        }

        if(cnt >= 5) {
            isNewLand = true;
            LAND.add(candidate);
            map[cr][cc] = "#";
            p1++;
        }
    }

    if(!isNewLand) break;
}

console.log(`p1: ${p1}`);


// part 2
const BEACH = new Set();

for(let l of LAND) {
    let [r,c] = JSON.parse(l);

    for(let [dr,dc] of DIRS) {
        let [nr,nc] = [r+dr,c+dc];

        if(
            0 <= nr && nr < ROWS && 0 <= nc && nc < COLS &&
            (map[nr][nc] === '1' || map[nr][nc] === '0') ||
            nr < 0 || nc < 0 || ROWS <= nr || COLS <= nc
        ) {
            map[r][c] = "=";
            BEACH.add(JSON.stringify([r,c]));
            LAND.delete(JSON.stringify([r,c]));
        }
    }
}

while(true) {
    let isNewBeach = false;
    const CANDIDATES = new Set();

    for(let b of BEACH) {
        let [r,c] = JSON.parse(b);
        
        for(let [dr,dc] of DIRS) {
            let [nr,nc] = [r+dr,c+dc];
            let candidate = JSON.stringify([nr, nc]);
            
            if(
                !BEACH.has(candidate) &&
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
                0 <= nr && nr < ROWS && 0 <= nc && nc < COLS && map[nr][nc] === '='
            ) {
                cnt++;
            }
        }

        if(cnt >= 5) {
            isNewBeach = true;
            BEACH.add(candidate);
            map[cr][cc] = "=";
        }
    }

    if(!isNewBeach) break;
}

console.log(`p2: ${BEACH.size}`);


// part 3
let p3 = 0;

for(let land of LAND) {
    let [r,c] = JSON.parse(land);
    let canPlaceTree = true;

    for(let dr = -2; dr <= 2; dr++) {
        if(!canPlaceTree) break;

        for(let dc = -2; dc <= 2; dc++) {
            let [nr,nc] = [r+dr,c+dc];
            if(
                (dr === -2 && dc === -2) ||
                (dr === 2 && dc === 2) ||
                (dr === -2 && dc === 2) ||
                (dr === 2 && dc === -2) ||
                (dr === 0 && dc === 0)
            ) continue;

            if(!(map[nr][nc] === "#" || map[nr][nc] === "@")) {
                canPlaceTree = false;
                break;
            }
        }
    }

    if(canPlaceTree) {
        map[r][c] = "@";
        LAND.delete(JSON.stringify([r,c]));
        p3++;
    }
}

for(let i = 0; i < 2; i++) {
    const NEW_TREES = new Set();

    for(let land of LAND) {
        let [r,c] = JSON.parse(land);
        let isSand = false;
        let treeCnt = 0;

        for(let [dr,dc] of DIRS) {
            let [nr,nc] = [r+dr,c+dc];

            if(map[nr][nc] === "=") {
                isSand = true;
                break;
            } else if(map[nr][nc] === "@") {
                treeCnt++;
            }
        }

        if(!isSand && treeCnt >= 4) {
            NEW_TREES.add(JSON.stringify([r,c]));
        }
    }

    for(let newTree of NEW_TREES) {
        LAND.delete(newTree);
        let [r,c] = JSON.parse(newTree);
        map[r][c] = "@";
        p3++;
    }
}

console.log(`p3: ${p3}`);


// printMap(map);

function printMap(map, highlightSet = new Set()) {
    const ROWS = map.length;
    const COLS = map[0].length;
    let land = "\x1b[38;2;0;255;0m"
    let beach = "\x1b[38;2;255;255;0m";
    let tree = "\x1b[38;2;0;100;0m";
    let sea = "\x1b[38;2;0;200;255m";
    let highlight = "\x1b[38;2;255;0;0m";
    let end = "\x1b[0m";

    let result = "\n";

    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            let coord = JSON.stringify([r,c]);

            if(map[r][c] === "#") {
                result += land + "#" + end;
            } else if(map[r][c] === "=") {
                result += beach + "=" + end;
            } else if(map[r][c] === "@") {
                result += tree + "@" + end;
            } else if(highlightSet.has(coord)) {
                result += highlight + map[r][c] + end;
            } else {
                result += sea + "." + end;
            }

        }
        result += "\n";
    }
    
    console.log(result);
}