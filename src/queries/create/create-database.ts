import { Query } from "../query";

export class CreateDatabase extends Query {

    constructor(name: string) {
        super();
        this.sql = `CREATE DATABASE ${name};`;
    }

    public ifNotExists(): CreateDatabase {
        this.sql = (this.sql.substr(0, this.sql.lastIndexOf("DATABASE") + 8).trim() + " IF NOT EXISTS " +
            this.sql.substr(this.sql.lastIndexOf("DATABASE") + 8, this.sql.length).trim()).trim();
        return this;
    }
}
