import { Query } from "./query";

export class Insert extends Query {

    public static InTo(table: string): Insert {
        if (!table) {
            throw new Error("no table was provided");
        }
        const insert = new Insert();
        insert.sql += ` ${table.trim()}`;
        return insert;
    }

    private properties = 0;

    private constructor() {
        super();
        this.sql = "INSERT INTO";
    }

    public property(key: string, value: string | number): this {
        if (this.properties === -1) {
            throw new Error("cannot set property if fromModel has already been called");
        }
        if (!key) {
            throw new Error("parameter need to be a valid key");
        }
        this.sql += `${ this.properties > 0 ? ", " : " SET "}${key} = ${typeof value === "string" ?
            "'" + value + "'" : value.toString()}`;
        this.properties++;
        return this;
    }

    public fromModel(obj: any): this {
        if (this.properties > 0) {
            throw new Error("cannot set model if property have already been called");
        }
        this.properties = -1;
        if (!obj || (typeof obj !== "object")) {
            throw new Error("parameter must be an object");
        }
        const keys = Object.keys(obj);
        if (!keys || keys.length === 0) {
            throw new Error("parameter must contain at least 1 property");
        }
        this.sql += " (";
        for (let i = 0; i < keys.length; i++) {
            this.sql += `${i === 0 ? "" : " "}${keys[i]}${i + 1 < keys.length ? "," : ""}`;
        }
        this.sql += ") VALUES (";
        for (let i = 0; i < keys.length; i++) {
            const str = typeof obj[keys[i]] === "string" ?
                `'${obj[keys[i]].toString()}'` : `${obj[keys[i]] === undefined || obj[keys[i]] === null ? 'NULL' : obj[keys[i]].toString()}`;
            this.sql += `${i === 0 ? "" : " "}${str}${i + 1 < keys.length ? "," : ""}`;
        }
        this.sql += ")";
        return this;
    }
}
