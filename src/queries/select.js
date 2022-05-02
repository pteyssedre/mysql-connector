"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const query_1 = require("./query");
class Select extends query_1.Query {
    static Properties(...properties) {
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
    static Table(table) {
        if (!table) {
            throw new Error("invalid table name");
        }
        const select = new Select();
        select.sql += " * FROM " + table.trim();
        return select;
    }
    constructor() {
        super();
        this.sql = "SELECT";
    }
    table(table) {
        if (!table) {
            throw new Error("invalid table name");
        }
        this.sql += " FROM " + table.trim();
        return this;
    }
    limit(offset, limit) {
        this.sql += " LIMIT " + offset + "," + limit;
        return this;
    }
    page(page, limit) {
        return this.limit(page * limit, limit);
    }
    leftJoinOn(lTab, lCol, rTab, rCol, alias) {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "LEFT JOIN");
        return this;
    }
    leftOuterJoinOn(lTab, lCol, rTab, rCol, alias) {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "LEFT OUTER JOIN");
        return this;
    }
    leftInnerJoinOn(lTab, lCol, rTab, rCol, alias) {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "LEFT INNER JOIN");
        return this;
    }
    rightJoinOn(lTab, lCol, rTab, rCol, alias) {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "RIGHT JOIN");
        return this;
    }
    rightOuterJoinOn(lTab, lCol, rTab, rCol, alias) {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "RIGHT OUTER JOIN");
        return this;
    }
    rightInnerJoinOn(lTab, lCol, rTab, rCol, alias) {
        this.joinOn(lTab, lCol, rTab, rCol, alias, "RIGHT INNER JOIN");
        return this;
    }
    joinOn(lTab, lCol, rTab, rCol, alias, joinType = "JOIN") {
        const on = `ON ${lTab.trim()}.${lCol.trim()} = ${alias ? alias.trim() : rTab.trim()}.${rCol.trim()}`;
        this.sql += ` ${joinType} ${rTab.trim()}${alias ? " " + alias.trim() : ""} ${on}`;
        return this;
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map