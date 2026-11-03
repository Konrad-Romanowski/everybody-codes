import fs from 'fs';
import { Queue } from '@datastructures-js/queue';

// part 1
const p1InputData = fs.readFileSync('p1.in','utf-8').split("\r\n");
const adj = {};

for(let line of p1InputData) {
    let [item, ingredients] = line.split(":");
    adj[item] = ingredients.split(",");
}

const NULL_INGREDIENTS = new Set();
const q = new Queue(adj["NULL"]);

while(q.size()) {
    let item = q.pop();
    NULL_INGREDIENTS.add(item);
    if(!(item in adj)) continue;

    for(let ingredient of adj[item]) {
        if(!NULL_INGREDIENTS.has(ingredient) && ingredient !== "NULL") {
            NULL_INGREDIENTS.add(ingredient);
            q.push(ingredient);
        }
    }
}

console.log(`p1: ${NULL_INGREDIENTS.size}`);