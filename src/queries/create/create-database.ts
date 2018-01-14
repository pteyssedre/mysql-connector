import {Query} from "../query";


export class CreateDatabase extends Query {

    constructor(name: string) {
        super();
        this.sql = `CREATE DATABASE ${name};`;
    }
}