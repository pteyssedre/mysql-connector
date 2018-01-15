import {Query} from "../query";

export class DropDatabase extends Query {

    constructor(name: string) {
        super();
        this.sql = `DROP DATABASE IF EXISTS ${name}`;
    }
}
