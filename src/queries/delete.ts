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
}
