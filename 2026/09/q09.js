import fs from 'fs';

class Branch {
    constructor(len, growth) {
        this.len = len;
        this.growth = growth;
    }

    split() {
        this.len = Math.floor(this.len/2);
    }
}

class Plant {
    constructor(growth) {
        this.growth = growth;
        this.branches = [new Branch(0, growth, true)];
        this.size = 0;
    }

    grow() {
        let newBranches = [];

        for(let branch of this.branches) {
            branch.len++;
            if(branch.len === this.growth) {
                branch.split();
                newBranches.push(new Branch(Math.floor(this.growth/2), this.growth));
                newBranches.push(new Branch(1, this.growth));
            }
            newBranches.push(branch);
        }

        this.branches = newBranches;
        this.size = this.countLen();
    }

    countLen() {
        let sum = 0;

        for(let i = 0; i < this.branches.length; i++) {
            sum += this.branches[i].len;
        }

        return sum + Math.floor(this.branches.length/2);
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

for(let {growth, limit} of p1Plants) {
    const plant = new Plant(growth);

    let t = 0;
    while(plant.size < limit) {
        plant.grow();
        t++;
    }
    p1 += t;
}

console.log(`p1: ${p1}`);