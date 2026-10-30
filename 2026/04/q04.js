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


// part 3
const p3InputData = fs.readFileSync('p3.in','utf-8').split("\r\n");
let numberOfQuests = 0;
const p3Input = p3InputData.map(line => {
    let params = line.match(regEx);
    let [id, quest, part, time] = params.map(param => parseInt(param));
    numberOfQuests = Math.max(numberOfQuests, quest);
    
    return {id, quest, part, time};
});

const TOTAL_POINTS = {0 : Infinity};

for(let q = 1; q <= numberOfQuests; q++) {
    const TOTAL_TIMES = {0: Infinity};
    
    for(let p = 1; p <= 3; p++) {
        const curPoints = {0: Infinity};
        const curTime = {0: Infinity};
        let pointsToAssign = 50 * p;
        let curResults = p3Input.filter(item => item["quest"] === q && item["part"] === p).sort((a,b) => a["time"] - b["time"]);
        let curRanking = [];

        for(let result of curResults) {
            let {id, time} = result;
            curTime[id] = (TOTAL_TIMES[id] || 0) + time;
            TOTAL_TIMES[id] = (TOTAL_TIMES[id] || 0) + time;

            curRanking.push({id, "time": curTime[id]});
        }

        curRanking.sort((a,b) => a.time - b.time);

        let pointsToDeduct = 0;
        let prevTime = -1;

        for(let i = 0; i < curRanking.length; i++) {
            let {id, time} = curRanking[i];
            
            if(prevTime === time) {
                pointsToDeduct++;
            } else {
                pointsToAssign -= pointsToDeduct;
                pointsToDeduct = 1;
            }
            if(pointsToAssign <= 0) break;

            curPoints[id] = (curPoints[id] || 0) + pointsToAssign;
            prevTime = time;
        }

        for(let id in curPoints) {
            TOTAL_POINTS[id] = (TOTAL_POINTS[id] || 0) + curPoints[id];
        }
    }

}

let p3 = 0;
let leaderboard = [];

for(let id in TOTAL_POINTS) {
    leaderboard.push(TOTAL_POINTS[id]);
}

leaderboard.sort((a,b) => b-a);

let curRank = 1;
let prev = -1;

for(let i = 1; i < leaderboard.length; i++) {
    if(prev !== leaderboard[i]) {
        curRank = i;
    }
    p3 += curRank * leaderboard[i];

    prev = leaderboard[i];
}

console.log(`p3: ${p3}`);

// 6366960
// Your answer length is: correct
// The first character of your answer is: correct