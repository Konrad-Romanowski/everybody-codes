import { Queue } from '@datastructures-js/queue';
import fs from 'fs';

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n");
const p1Adj = {};
let startID = null;
let maxConnections = -1;
let p1 = 0;

for(let line of p1InputData) {
    let [id, energy, connections] = line.split(", ");

    id = parseInt(id.slice(id.indexOf("=")+1));
    energy = parseInt(energy.slice(energy.indexOf("=")+1));
    p1 += energy;
    connections = JSON.parse("[" + connections.slice(connections.indexOf("=")+1) + "]");

    p1Adj[id] = {energy, connections};
    
    if(connections.length > maxConnections) {
        maxConnections = connections.length;
        startID = id;
    }
}

const P1_INITIAL_STRENGTH = 5;
let q = new Queue();
q.push([startID, P1_INITIAL_STRENGTH]);

while(q.size()) {
    let [id, strength] = q.pop();
    p1Adj[id].energy += strength;
    p1 += strength;

    for(let nodeID of p1Adj[id].connections) {
        if(strength > 1) {
            q.push([nodeID, strength-1]);
        }
    }
}

console.log(`p1: ${p1}`);


// part 2
const p2InputData = fs.readFileSync('p2.in','utf-8').split("\r\n");
const p2Adj = {};
startID = null;
maxConnections = -1;

for(let line of p2InputData) {
    let [id, energy, connections] = line.split(", ");

    id = parseInt(id.slice(id.indexOf("=")+1));
    energy = parseInt(energy.slice(energy.indexOf("=")+1));
    connections = JSON.parse("[" + connections.slice(connections.indexOf("=")+1) + "]");

    p2Adj[id] = {energy, connections};
    
    if(connections.length > maxConnections) {
        maxConnections = connections.length;
        startID = id;
    }
}

const P2_INITIAL_STRENGTH = 10;

function traverse(id, strength) {
    p2Adj[id].energy += strength;

    for(let nei of p2Adj[id].connections) {
        if(strength > 1) traverse(nei, strength-1);
    }
}

traverse(startID, P2_INITIAL_STRENGTH);

let p2 = 0;

for(let id in p2Adj) {
    p2 += p2Adj[id].energy;
}

console.log(`p2: ${p2}`);