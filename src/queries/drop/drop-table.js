"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDatabase = void 0;
const query_1 = require("../query");
class DropDatabase extends query_1.Query {
    constructor(name) {
        super();
        this.sql = `DROP DATABASE IF EXISTS ${name}`;
    }
}
exports.DropDatabase = DropDatabase;
//# sourceMappingURL=drop-table.js.map