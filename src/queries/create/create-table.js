"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable = void 0;
const column_1 = require("../column/column");
class CreateTable extends column_1.Column {
    constructor(table) {
        super();
        this.foreignKeys = [];
        this.sql = `CREATE TABLE ${table.trim()} (`;
    }
    ifNotExists() {
        this.sql = (this.sql.substr(0, 12).trim() + " IF NOT EXISTS " +
            this.sql.substr(12, this.sql.length).trim()).trim();
        return this;
    }
    withForeignKey(property, parentTable, column, foreignKeyName) {
        if (!property || this.sql.indexOf(property) === -1) {
            throw new Error("property must be declare first");
        }
        if (!parentTable) {
            throw new Error("parent table must be set");
        }
        if (!column) {
            throw new Error("parent column must be set");
        }
        if (!foreignKeyName) {
            foreignKeyName = `fk_${property}_${parentTable}`;
        }
        const constrains = ` FOREIGN KEY ${foreignKeyName}(${property}) REFERENCES ${parentTable}(${column})`;
        this.foreignKeys.push(constrains);
        return this;
    }
    toString() {
        let v = this.sql;
        if (this.foreignKeys.length > 0) {
            for (const fk of this.foreignKeys) {
                v += `,${fk}`;
            }
        }
        v += ")";
        return v;
    }
}
exports.CreateTable = CreateTable;
//# sourceMappingURL=create-table.js.map