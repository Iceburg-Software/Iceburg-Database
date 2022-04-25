import fs from 'fs';
import {unzip, deflate} from 'zlib';
export class Iceburg {
    constructor(name) {
        this.name = name;
        this.dir = `./${name}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
            fs.writeFileSync(`${dir}/1.ibg`, '', 'utf8');
            fs.writeFileSync(`${dir}/2.ibg`, '', 'utf8');
            fs.writeFileSync(`${dir}/3.ibg`, '');
        }
        this.top = fs.readFileSync(`${dir}/1.ibg`, 'utf8');
        this.surface = fs.readFileSync(`${dir}/2.ibg`, 'utf8');
    }

    moveOneToTwo() {
        this.surface = this.top;
        this.top = '';
    }

    moveTwoToOne() {
        this.top = this.surface;
        this.surface = '';
    }

    writeOne(data) {
        try {
            this.top = data;
        }catch(err) {
            throw new Error(err);
        }
    }
    readOne() {
        try {
            return this.top;
        }catch(err) {
            throw new Error(err);
        }
    }

    writeTwo() {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFileSync(`${dir}/2.ibg`, this.surface, 'utf8');
                this.surface = '';
                resolve();
            }catch(err) {
                reject(err);
            }
        })
    }
    readTwo() {
        try {
            return this.surface;
        }catch(err) {
            throw new Error(err);
        }
    }

    
    writeThree(data) {
        return new Promise((resolve, reject) => {
            var input = data;
            deflate(input, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    fs.writeFileSync(`${dir}/3.ibg`, result);
                    resolve();
                }
            })
        })
    }
    readThree() {
        return new Promise((resolve, reject) => {
            var input = fs.readFileSync(`${dir}/3.ibg`);
            let buffer = Buffer.from(input);
            unzip(buffer, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    let d = result.toString('utf-8');
                    resolve(d);
                }
            })
        })
    }
}

export class Database {
    constructor() {
        this.database = [];
    }

    getAll() {
        return this.database;
    }

    create(table) {
        if(this.database[table] === undefined){
            this.database[table] = {};
        }
        else{
            throw new Error("Table already exists");
        }
        this.save();
    }

    getTable(table) {
        if(table === undefined){
            throw new Error("Table does not exist");
        }
        return this.database[table];
    }

    getKey(table,key) {
        if(table === undefined){
            throw new Error("Table does not exist");
        }
        if(key === undefined){
            throw new Error("Key does not exist");
        }
        return this.database[table][key];
    }

    insert(data,table,key) {
        if(table === undefined){
            throw new Error("Table does not exist");
        }
        if(this.database[table][key] === undefined){
            this.database[table][key] = data;
        }
        else{
            throw new Error("Key already exists");
        }
        this.save();
    }

    update(data,table,key) {
        if(table === undefined){
            throw new Error("Table does not exist");
        }
        if(this.database[table][key] === undefined){
            throw new Error("Key does not exist");
        }
        this.database[table][key] = data;
        this.save();
    }
}