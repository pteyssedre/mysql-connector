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
        if (!clause) {
            throw new Error("no clause was provided for where");
        }
        this.sql += " WHERE " + clause.trim();
        return this;
    }
}
exports.Select = Select;
//# sourceMappingURL=select.js.map