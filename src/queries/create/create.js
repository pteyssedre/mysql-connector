"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
const create_database_1 = require("./create-database");
const create_table_1 = require("./create-table");
class Create {
    static Table(table) {
        if (!table) {
            throw new Error("table name not valid");
        }
        return new create_table_1.CreateTable(table);
    }
    static Database(name) {
        if (!name) {
            throw new Error("database name not valid");
        }
        return new create_database_1.CreateDatabase(name);
    }
}
exports.Create = Create;
//# sourceMappingURL=create.js.map