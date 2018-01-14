import {Query} from "./query";

export class Delete extends Query {

    public static From(table: string): Delete {
        if (!table) {
            throw new Error("no valid table was provided");
        }
        const del = new Delete();
        del.sql += ` FROM ${table.trim()}`;
        return del;
    }

    private constructor() {
        super();
        this.sql = "DELETE";
    }

    public where(clause: string): this {
        if (!clause) {
            throw new Error("no valid clause was provided");
        }
        this.sql += ` WHERE ${clause.trim()}`;
        return this;
    }
}
