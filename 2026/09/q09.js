import fs from 'fs';

class Branch {
    constructor(len = 0, left = null, right = null) {
        this.len = len;
        this.left = left;
        this.right = right;
    }
}

class Plant {
    constructor(growth) {
        this.growth = growth;
        this.root = new Branch(0);
        this.size = 0;
        this.leaves = 0;
    }

    grow(node = this.root) {
        let numOfLeaves = 0;

        node.len++;
        this.size++;

        if(node.len === this.growth) {
            node.len = Math.floor(this.growth/2);
            let right = node.right;

            let newLeft = new Branch(node.len - 1, node.left, right);
            let newRight = new Branch(0);

            node.left = newLeft;
            node.right = newRight;
            this.size--;
        }
    
        if(node.left) numOfLeaves += this.grow(node.left, this.growth);
        if(node.right) numOfLeaves += this.grow(node.right, this.growth);
        if(node.right && node.left) numOfLeaves++;

        this.leaves = numOfLeaves;
        return numOfLeaves;
    }
}

// part 1
const p1Plants = fs.readFileSync('p1.in','utf-8').split("\r\n").map(line => {
    let [id, growth, limit] = line.split(", ");
    id = parseInt(id.slice(id.indexOf("=")+1));
    growth = parseInt(growth.slice(growth.indexOf("=")+1));
    limit = parseInt(limit.slice(limit.indexOf("=")+1));
    
    return {id, growth, limit};
});

let p1 = 0;

for(let {id, growth, limit} of p1Plants) {
    const plant = new Plant(growth);

    let t = 0;
    
    while(plant.size < limit) {
        plant.grow();
        t++;
    }

    p1 += t;
}

console.log(`p1: ${p1}`);


// part 2
const p2Plants = fs.readFileSync('p2.in','utf-8').split("\r\n").map(line => {
    let [id, growth, limit] = line.split(", ");
    id = parseInt(id.slice(id.indexOf("=")+1));
    growth = parseInt(growth.slice(growth.indexOf("=")+1));
    limit = parseInt(limit.slice(limit.indexOf("=")+1));
    
    return {id, growth, limit};
});

let p2 = 0;

for(let {id, growth, limit} of p2Plants) {
    const plant = new Plant(growth);

    let t = 0;

    while(plant.leaves < limit) {
        plant.grow();
        t++;
    }

    p2 += t;
}

console.log(`p2: ${p2}`);