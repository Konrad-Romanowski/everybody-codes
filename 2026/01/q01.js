import fs from 'fs';

// part 1
const p1Input = fs.readFileSync('p1.in','utf-8').split(",").map(line => parseInt(line));

let p1 = 0;

for(let i = 0; i < p1Input.length; i++) {
    let n = 1;

    while(n*n < p1Input[i]) {
        n++;
    }

    p1 += n*n - p1Input[i];
}

console.log(`p1: ${p1}`);


// part 2
const p2Input = fs.readFileSync('p2.in','utf-8').split(",").map(line => parseInt(line));

let p2 = 0;

for(let i = 0; i < p2Input.length; i++) {
    let n = 3;

    while(n*n - (n-2)*(n-2) < p2Input[i]) {
        n++;
    }

    p2 += n*n-(n-2)*(n-2) - p2Input[i];
}

console.log(`p2: ${p2}`);


// part 3
const p3Input = fs.readFileSync('p3.in','utf-8').split(",").map(line => parseInt(line));

let p3 = 0;

for(let i = 0; i < p3Input.length; i++) {
    let n = 3;

    while(n*n - 1 < p3Input[i]) {
        n+=2;
    }

    p3 += n*n-1 - p3Input[i];
}

console.log(`p3: ${p3}`);