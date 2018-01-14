export class Query {

    public sql: string;

    constructor() {
        this.sql = "";
    }

    public toString(): string {
        return this.sql;
    }
}
