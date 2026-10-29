import fs from 'fs';

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n");
const p1Input = p1InputData.map(line => {
    let [weights, vote] = line.split(" ");
    let len = vote.length;
    let w = weights.slice(-len);

    return [parseInt(w), parseInt(vote), len];
});

let p1 = 0;

for(let [weights, vote, N] of p1Input) {
    let i = 1;

    while(i <= N) {
        p1 += (vote % 10) * ((weights % 10) ** (i-1));
        weights = Math.floor(weights/10);
        vote = Math.floor(vote/10);
        i++;
    }
}

console.log(`p1: ${p1}`);


// part 2
const p2InputData = fs.readFileSync('p2.in','utf-8').split("\r\n");
const p2Input = p2InputData.map(line => {
    let [weights, vote] = line.split(" ");
    let dashIdx = weights.indexOf("-");
    let w = weights.slice(dashIdx+1);
    let len = vote.length;

    return [w, parseInt(vote), len];
});

let p2 = 0;

for(let [weights, vote, N] of p2Input) {
    let i = 1;

    while(i <= N) {
        let curWeight = weights.at(-1);

        p2 += (vote % 10) * ((parseInt(curWeight) % 10) ** (i-1));
        weights = curWeight + weights.slice(0,-1);
        vote = Math.floor(vote/10);
        i++;
    }
}

console.log(`p2: ${p2}`);