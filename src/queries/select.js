"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    leftJoinOn(leftTable, leftColumn, rightTable, rightColumn, alias) {
        this.joinOn(leftTable, leftColumn, rightTable, rightColumn, alias, "LEFT JOIN");
        return this;
    }
    leftOuterJoinOn(leftTable, leftColumn, rightTable, rightColumn, alias) {
        this.joinOn(leftTable, leftColumn, rightTable, rightColumn, alias, "LEFT OUTER JOIN");
        return this;
    }
    leftInnerJoinOn(leftTable, leftColumn, rightTable, rightColumn, alias) {
        this.joinOn(leftTable, leftColumn, rightTable, rightColumn, alias, "LEFT INNER JOIN");
        return this;
    }
    rightJoinOn(leftTable, leftColumn, rightTable, rightColumn, alias) {
        this.joinOn(leftTable, leftColumn, rightTable, rightColumn, alias, "RIGHT JOIN");
        return this;
    }
    rightOuterJoinOn(leftTable, leftColumn, rightTable, rightColumn, alias) {
        this.joinOn(leftTable, leftColumn, rightTable, rightColumn, alias, "RIGHT OUTER JOIN");
        return this;
    }
    rightInnerJoinOn(leftTable, leftColumn, rightTable, rightColumn, alias) {
        this.joinOn(leftTable, leftColumn, rightTable, rightColumn, alias, "RIGHT INNER JOIN");
        return this;
    }
    joinOn(leftTable, leftColumn, rightTable, rightColumn, alias, joinType = "JOIN") {
        const on = `ON ${leftTable.trim()}.${leftColumn.trim()} = ${rightTable.trim()}.${rightColumn.trim()}`;
        this.sql += ` ${joinType} ${rightTable.trim()}${alias ? " " + alias.trim() : ""} ${on}`;
        return this;
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map