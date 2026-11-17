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


// part 2
let p2InputData = fs.readFileSync('p2.in','utf-8');
let s2 = "";

for(let i = 0; i < 10; i++) {
    s2 += p2InputData;
}

let p2 = 0;
l = 0;

while(l < s2.length) {
    let r = s2.length-1;
    let cur = s2[l];

    while(s2[l] === cur) {
        l++;
    }

    while(s2[r] !== cur) {
        r--;
    }

    if(l < r) {
        s2 = s2.slice(0,l) + s2.slice(l, r+1).split("").reverse().join("") + s2.slice(r+1);
        p2 += r-l+1;
    }
}

console.log(`p2: ${p2}`);