import { Queue } from '@datastructures-js/queue';
import fs from 'fs';

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n");
let p1PortalCount = parseInt(p1InputData[0].split(" ")[1]);
let p1Connections = [];

for(let i = 2; i < p1InputData.length; i++) {
    let [n1, n2] = p1InputData[i].split(" ");
    p1Connections.push([parseInt(n1)-1, parseInt(n2)-1]);
}

const P1_INITIAL_PORTAL_STRAIN = Math.pow(p1PortalCount,3)/4;

let adj = new Array(p1PortalCount).fill(0).map((_,i) => {
    return [i-1, i+1];
});

adj[0] = [p1PortalCount-1, 1];
adj[p1PortalCount-1] = [p1PortalCount-2, 0];

for(let [n1,n2] of p1Connections) {
    adj[n1].push(n2);
    adj[n2].push(n1);
}

const p1ShortestPath = new Array(p1PortalCount).fill(0).map(_ => new Array(p1PortalCount).fill(Infinity));

function findShortestPath(start) {
    const q = new Queue();
    q.push([start,0]);

    while(q.size()) {
        let [curNode, len] = q.pop();
        if(p1ShortestPath[start][curNode] > len) {
            p1ShortestPath[start][curNode] = len;
        } else {
            continue;
        }
        
        for(let nei of adj[curNode]) {
            if(p1ShortestPath[start][nei] <= p1ShortestPath[start][curNode] + 1) continue;
            q.push([nei, p1ShortestPath[start][curNode] + 1]);
        }
    }
}

let p1PortalStrain = 0;

for(let i = 0; i < p1PortalCount; i++) {
    findShortestPath(i);
    p1PortalStrain += p1ShortestPath[i].reduce((total, val) => total += val);
}

let p1 = P1_INITIAL_PORTAL_STRAIN - p1PortalStrain;

console.log(`p1: ${p1}`);