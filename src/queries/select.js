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
    where(clause) {
        if (!clause || (typeof clause !== "string" && typeof clause !== "object")) {
            throw new Error("no clause was provided for where");
        }
        this.sql += " WHERE ";
        if (typeof clause === "string") {
            this.sql += clause.trim();
        }
        else if (typeof clause === "object") {
            const keys = Object.keys(clause);
            for (let i = 0; i < keys.length; i++) {
                const v = clause[keys[i]];
                const str = typeof v === "string" ? `'${v}'` : `${v}`;
                this.sql += `${i === 0 ? "" : " "}${keys[i]} = ${str}${i + 1 < keys.length ? "," : ""}`;
            }
        }
        return this;
    }
    limit(offset, limit) {
        this.sql += " LIMIT " + offset + "," + limit;
        return this;
    }
    page(page, limit) {
        return this.limit(page * limit, limit);
    }
    leftJoinOn(leftTable, leftColumn, rightTable, rightColumn) {
        this.joinOn("LEFT JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }
    leftOuterJoinOn(leftTable, leftColumn, rightTable, rightColumn) {
        this.joinOn("LEFT OUTER JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }
    leftInnerJoinOn(leftTable, leftColumn, rightTable, rightColumn) {
        this.joinOn("LEFT INNER JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }
    rightJoinOn(leftTable, leftColumn, rightTable, rightColumn) {
        this.joinOn("RIGHT JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }
    rightOuterJoinOn(leftTable, leftColumn, rightTable, rightColumn) {
        this.joinOn("RIGHT OUTER JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }
    rightInnerJoinOn(leftTable, leftColumn, rightTable, rightColumn) {
        this.joinOn("RIGHT INNER JOIN", leftTable, leftColumn, rightTable, rightColumn);
        return this;
    }
    joinOn(joinType, leftTable, leftColumn, rightTable, rightColumn) {
        const on = `ON ${leftTable.trim()}.${leftColumn.trim()} = ${rightTable.trim()}.${rightColumn.trim()}`;
        this.sql += ` ${joinType} ${rightTable.trim()} ${on}`;
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map