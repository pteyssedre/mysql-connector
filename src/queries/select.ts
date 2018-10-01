import { Query } from "./query";

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
        select.sql += " * FROM " + table.trim();
        return select;
    }

    private constructor() {
        super();
        this.sql = "SELECT";
    }

    public table(table: string): this {
        if (!table) {
            throw new Error("invalid table name");
        }
        this.sql += " FROM " + table.trim();
        return this;
    }

    public limit(offset: number, limit: number) {
        this.sql += " LIMIT " + offset + "," + limit;
        return this;
    }

    public page(page: number, limit: number) {
        return this.limit(page * limit, limit);
    }

    public leftJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this {
        this.joinOn("LEFT JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }

    public leftOuterJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this {
        this.joinOn("LEFT OUTER JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }

    public leftInnerJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this {
        this.joinOn("LEFT INNER JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }

    public rightJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this {
        this.joinOn("RIGHT JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }

    public rightOuterJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this {
        this.joinOn("RIGHT OUTER JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }

    public rightInnerJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this {
        this.joinOn("RIGHT INNER JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }

    private joinOn(joinType: string, leftTable: string, leftColumn: string, rightTable: string, rightColumn: string) {
        const on = `ON ${leftTable.trim()}.${leftColumn.trim()} = ${rightTable.trim()}.${rightColumn.trim()}`;
        this.sql += ` ${joinType} ${rightTable.trim()} ${on}`;
    }
}
