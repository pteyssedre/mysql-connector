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

    public leftJoinOn(lTab: string, lCol: string, rTab: string, rCol: string,
                      alias?: string): this {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "LEFT JOIN");
        return this;
    }

    public leftOuterJoinOn(lTab: string, lCol: string, rTab: string, rCol: string,
                           alias?: string): this {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "LEFT OUTER JOIN");
        return this;
    }

    public leftInnerJoinOn(lTab: string, lCol: string, rTab: string, rCol: string,
                           alias?: string): this {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "LEFT INNER JOIN");
        return this;
    }

    public rightJoinOn(lTab: string, lCol: string, rTab: string, rCol: string,
                       alias?: string): this {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "RIGHT JOIN");
        return this;
    }

    public rightOuterJoinOn(lTab: string, lCol: string, rTab: string, rCol: string,
                            alias?: string): this {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "RIGHT OUTER JOIN");
        return this;
    }

    public rightInnerJoinOn(lTab: string, lCol: string, rTab: string, rCol: string,
                            alias?: string): this {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "RIGHT INNER JOIN");
        return this;
    }

    public joinOn(lTab: string, lCol: string, rTab: string, rCol: string,
                  alias?: string,
                  joinType: string = "JOIN") {
        const on = `ON ${lTab.trim()}.${lCol.trim()} = ${alias ? alias.trim() : rTab.trim()}.${rCol.trim()}`;
        this.sql += ` ${joinType} ${rTab.trim()}${alias ? " " + alias.trim() : ""} ${on}`;
        return this;
    }
}
