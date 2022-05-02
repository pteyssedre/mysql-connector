"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const query_1 = require("./query");
class Delete extends query_1.Query {
    static From(table) {
        if (!table) {
            throw new Error("no valid table was provided");
        }
        const del = new Delete();
        del.sql += ` FROM ${table.trim()}`;
        return del;
    }
    constructor() {
        super();
        this.sql = "DELETE";
    }
}
exports.Delete = Delete;
//# sourceMappingURL=delete.js.map