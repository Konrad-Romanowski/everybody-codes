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


// part 3
const p3InputData = fs.readFileSync('p3.in','utf-8').split("\r\n");
const p3Input = p3InputData.map(line => {
    let [weights, vote] = line.split(" ");
    let dashIdx = weights.indexOf("-");
    let w = weights.slice(dashIdx+1);
    let len = vote.length;

    return [w, parseInt(vote), len];
});

const SMALLEST_VOTE_VAL = new Map();

let p3 = 0;

for(let [weights, vote, N] of p3Input) {
    const initialWeights = weights;
    const initialVote = vote;
    
    let i = 1;
    let val = 0;

    while(i <= N) {
        let curWeight = weights.at(-1);

        val += (vote % 10) * ((parseInt(curWeight) % 10) ** (i-1));
        weights = curWeight + weights.slice(0,-1);
        vote = Math.floor(vote/10);
        i++;
    }

    if(!SMALLEST_VOTE_VAL.get(initialWeights + "-" + initialVote)) {
        for(let low = 1; low <= initialVote; low++) {
            let i = 1;
            let curVal = 0;
            weights = initialWeights;
            let curVote = low;

            while(i <= N) {
                let curWeight = weights.at(-1);

                curVal += (curVote % 10) * ((parseInt(curWeight) % 10) ** (i-1));
                weights = curWeight + weights.slice(0,-1);
                curVote = Math.floor(curVote/10);
                i++;
            }

            if(val === curVal) {
                SMALLEST_VOTE_VAL.set(initialWeights + "-" + initialVote, low);
                break;
            }
        }
    }

    if(SMALLEST_VOTE_VAL.get(initialWeights + "-" + initialVote) === initialVote) p3 += val;
}

console.log(`p3: ${p3}`);