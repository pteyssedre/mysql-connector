"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDatabase = void 0;
const query_1 = require("../query");
class CreateDatabase extends query_1.Query {
    constructor(name) {
        super();
        this.sql = `CREATE DATABASE ${name};`;
    }
    ifNotExists() {
        this.sql = (this.sql.substr(0, this.sql.lastIndexOf("DATABASE") + 8).trim() + " IF NOT EXISTS " +
            this.sql.substr(this.sql.lastIndexOf("DATABASE") + 8, this.sql.length).trim()).trim();
        return this;
    }
}
exports.CreateDatabase = CreateDatabase;
//# sourceMappingURL=create-database.js.map