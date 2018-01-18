import {Query} from "./query";

export class Select extends Query {

    public static Properties(...properties: string[]): Select {
        if (!properties || properties.length === 0) {
            throw new Error("No properties defined");
        }
        const select = new Select();
        for (let i = 0; i < properties.length; i++) {
            const p = properties[i];
            if (!p) {
                throw new Error("invalid property at index:" + i);
            }
            select.sql += " " + p.trim();
            if (i + 1 < properties.length) {
                select.sql += ",";
            }
        }
        return select;
    }

    public static Table(table: string): Select {
        if (!table) {
            throw new Error("invalid table name");
        }
        const select = new Select();
        select.leftTable = table.trim();
        select.sql += " * FROM " + table.trim();
        return select;
    }

    private leftTable: string;

    private constructor() {
        super();
        this.sql = "SELECT";
    }

    public table(table: string): this {
        if (!table) {
            throw new Error("invalid table name");
        }
        this.leftTable = table.trim();
        this.sql += " FROM " + table.trim();
        return this;
    }

    public where(clause: string): this {
        if (!clause) {
            throw new Error("no clause was provided for where");
        }
        this.sql += " WHERE " + clause.trim();
        return this;
    }

    public leftJoinOn(leftColumn: string, rightTable: string, rightColumn: string): this {
        const on = `ON ${this.leftTable}.${leftColumn} = ${rightTable.trim()}.${rightColumn.trim()}`;
        this.sql += ` LEFT JOIN ${rightTable.trim()} ${on}`;
        return this;
    }
}
