"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
class Update extends query_1.Query {
    static Table(table) {
        if (!table) {
            throw new Error("no valid table was provided");
        }
        const update = new Update();
        update.sql += ` ${table.trim()}`;
        return update;
    }
    constructor() {
        super();
        this.sql = "UPDATE";
    }
    fromModel(data) {
        if (!data) {
            throw new Error("no data was provided");
        }
        if (typeof data === "object") {
            this.sql += " SET ";
            const keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                const v = data[keys[i]];
                const str = typeof v === "string" ? `'${v}'` : `${v}`;
                this.sql += `${i === 0 ? "" : " "}${keys[i]} = ${str}${i + 1 < keys.length ? "," : ""}`;
            }
        }
        return this;
    }
    where(clause) {
        if (!clause) {
            throw new Error("no valid clause was provided");
        }
        this.sql += ` WHERE ${clause.trim()}`;
        return this;
    }
}
exports.Update = Update;
//# sourceMappingURL=update.js.map