"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
class CreateDatabase extends query_1.Query {
    constructor(name) {
        super();
        this.sql = `CREATE DATABASE ${name};`;
    }
}
exports.CreateDatabase = CreateDatabase;
//# sourceMappingURL=create-database.js.map