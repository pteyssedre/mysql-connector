"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_database_1 = require("./create-database");
var create_table_1 = require("./create-table");
var Create = /** @class */ (function () {
    function Create() {
    }
    Create.Table = function (table) {
        if (!table) {
            throw new Error("table name not valid");
        }
        return new create_table_1.CreateTable(table);
    };
    Create.Database = function (name) {
        if (!name) {
            throw new Error("database name not valid");
        }
        return new create_database_1.CreateDatabase(name);
    };
    return Create;
}());
exports.Create = Create;
//# sourceMappingURL=create.js.map