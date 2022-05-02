"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drop = void 0;
const drop_table_1 = require("./drop-table");
class Drop {
    static Database(name) {
        if (!name) {
            throw new Error("no valid database name");
        }
        return new drop_table_1.DropDatabase(name);
    }
}
exports.Drop = Drop;
//# sourceMappingURL=drop.js.map