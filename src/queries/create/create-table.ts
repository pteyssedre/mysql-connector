import {Column} from "../column/column";

export class CreateTable extends Column {

    constructor(table: string) {
        super();
        this.sql = `CREATE TABLE ${table.trim()} (`;
    }

    public toString(): string {
        return this.sql + ")";
    }
}
