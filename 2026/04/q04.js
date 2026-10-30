import fs from 'fs';

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n");
const regEx = /\d+/g;

const participantTime = [0];

// const p1Input = p1InputData.map(line => {
//     let [id, quest, part, time] = line.match(regEx);
//     return {id, quest, part, time};
// });

p1InputData.forEach(line => {
    let [id, quest, part, time] = line.match(regEx);
    id = parseInt(id);
    time = parseInt(time);

    participantTime[id] = (participantTime[id] || 0) + time;
});

participantTime.sort((a,z) => a-z);

let p1 = 0;

for(let i = 1; i < participantTime.length; i++) {
    p1 += i * participantTime[i];
}

console.log(`p1: ${p1}`);


// part 2
const p2InputData = fs.readFileSync('p2.in','utf-8').split("\r\n");
const participants = [[Infinity,-Infinity]]; // completed parts, total time

p2InputData.forEach(line => {
    let [id, quest, part, time] = line.match(regEx);
    id = parseInt(id);
    time = parseInt(time);

    if(!participants[id]) {
        participants[id] = [1,time];
    } else {
        participants[id][0]++;
        participants[id][1]+=time;
    }
});

participants.sort((a,b) => {
    if(a[0] === b[0]) return a[1] - b[1];
    return b[0] - a[0];
});

let p2 = 0;

for(let i = 1; i < participants.length; i++) {
    p2 += i * participants[i][1];
}

console.log(`p2: ${p2}`);