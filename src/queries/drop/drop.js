"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drop_table_1 = require("./drop-table");
var Drop = /** @class */ (function () {
    function Drop() {
    }
    Drop.Database = function (name) {
        if (!name) {
            throw new Error("no valid database name");
        }
        return new drop_table_1.DropDatabase(name);
    };
    return Drop;
}());
exports.Drop = Drop;
//# sourceMappingURL=drop.js.map