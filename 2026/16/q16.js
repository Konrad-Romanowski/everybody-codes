import fs from 'fs';

// part 1
let s = fs.readFileSync('p1.in','utf-8');
const N = s.length;
let p1 = 0;
let l = 0;

while(l < N) {
    let r = N-1;
    let cur = s[l];

    while(s[l] === cur) {
        l++;
    }

    while(s[r] !== cur) {
        r--;
    }

    if(l < r) {
        s = s.slice(0,l) + s.slice(l, r+1).split("").reverse().join("") + s.slice(r+1);
        p1++;
    }
}

console.log(`p1: ${p1}`);