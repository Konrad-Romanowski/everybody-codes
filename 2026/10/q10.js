import fs from 'fs';

function getDir(sign) {
    if(sign === ">") return [0,1];
    if(sign === "v") return [1,0];
    if(sign === "<") return [0,-1];
    if(sign === "^") return [-1,0];
}

function dirToSign(dir) {
    let [y,x] = dir;
    if(y === 1 && x === 0) return "v"
    if(y === -1 && x === 0) return "^"
    if(y === 0 && x === 1) return ">"
    if(y === 0 && x === -1) return "<"
}

class Nullghost {
    constructor(y,x,dir) {
        this.y = y;
        this.x = x;
        this.dir = getDir(dir);
        this.collisions = 0; // NEW
    }

    rotate90() {
        let [dy,dx] = this.dir;
        this.dir = [dx,-dy];
    }

    rotate180() {
        let [dy, dx] = this.dir;
        this.dir = [-dy,-dx];
        this.collisions++;

        return 1;
    }

    move(map) {
        let [ny, nx] = [this.y + this.dir[0], this.x + this.dir[1]];
        let isCollision = false;

        if(map[ny][nx] === "#") {
            this.rotate90();
            isCollision = true;
            this.collisions++; // NEW
        } else {
            this.y = ny;
            this.x = nx;
        }

        return isCollision ? 1 : 0;
    }
}

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n");
const ROWS = p1InputData.length;
const COLS = p1InputData[0].length;

let p1Map = new Array(ROWS).fill(0).map(_ => new Array(COLS).fill(0));

let nullghosts = [];

for(let r = 0; r < ROWS; r++) {
    for(let c = 0; c < COLS; c++) {
        if(p1InputData[r][c] !== "#" && p1InputData[r][c] !== ".") {
            let nullghost = new Nullghost(r, c, p1InputData[r][c]);
            nullghosts.push(nullghost);
            p1Map[r][c] = dirToSign(nullghost.dir);
        } else {
            p1Map[r][c] = p1InputData[r][c];
        }
    }
}

function clearMap(map) {
    const ROWS = map.length;
    const COLS = map[0].length;

    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            if(map[r][c] !== "#") map[r][c] = ".";
        }
    }

    return map;
}

let p1 = 0;

const P1_NUM_OF_ROUNDS = 10;

for(let i = 1; i <= P1_NUM_OF_ROUNDS; i++) {
    p1Map = clearMap(p1Map);

    let collisions = 0;
    let nullghostsAt = {};
    
    // move all nullghosts
    // and count collisions with a wall
    for(let nullghost of nullghosts) {
        collisions += nullghost.move(p1Map);
        let nullghostPosition = JSON.stringify([nullghost.y, nullghost.x]);

        if(!(nullghostPosition in nullghostsAt)) nullghostsAt[nullghostPosition] = [];
        nullghostsAt[nullghostPosition].push(nullghost);
    }

    // check positions of a nullghosts
    // and count collisions with themselves
    for(let nghosts of Object.values(nullghostsAt)) {
        if(nghosts.length > 1) {
            for(let nullghost of nghosts) {
                collisions += nullghost.rotate180();
            }
        }
    }

    p1 += collisions;
}

console.log(`p1: ${p1}`);


// part 2
const p2InputData = fs.readFileSync('p2.in','utf-8').split("\r\n");
const P2_ROWS = p2InputData.length;
const P2_COLS = p2InputData[0].length;
const COLLISION_LIMIT = 10000;

let p2Map = new Array(P2_ROWS).fill(0).map(_ => new Array(P2_COLS).fill(0));

nullghosts = [];

for(let r = 0; r < P2_ROWS; r++) {
    for(let c = 0; c < P2_COLS; c++) {
        if(p2InputData[r][c] !== "#" && p2InputData[r][c] !== ".") {
            let nullghost = new Nullghost(r, c, p2InputData[r][c]);
            nullghosts.push(nullghost);
            p2Map[r][c] = dirToSign(nullghost.dir);
        } else {
            p2Map[r][c] = p2InputData[r][c];
        }
    }
}

let p2 = 0;

while(nullghosts.length) {
    p2Map = clearMap(p2Map);

    let nullghostsAt = {};
    
    // move all nullghosts
    // and count collisions with a wall
    for(let nullghost of nullghosts) {
        nullghost.move(p2Map);
        if(nullghost.collisions === COLLISION_LIMIT) continue;

        let nullghostPosition = JSON.stringify([nullghost.y, nullghost.x]);

        if(!(nullghostPosition in nullghostsAt)) nullghostsAt[nullghostPosition] = [];
        nullghostsAt[nullghostPosition].push(nullghost);
    }

    // check positions of a nullghosts
    // and count collisions with themselves
    for(let nghosts of Object.values(nullghostsAt)) {
        if(nghosts.length > 1) {
            for(let nullghost of nghosts) {
                nullghost.rotate180();
            }
        }
    }

    // remove nullghosts with collisions exceeding imit
    nullghosts = nullghosts.filter(nullghost => nullghost.collisions < COLLISION_LIMIT);

    p2++;
}

console.log(`p2: ${p2}`);