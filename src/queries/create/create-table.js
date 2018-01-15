"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var column_1 = require("../column/column");
var CreateTable = /** @class */ (function (_super) {
    __extends(CreateTable, _super);
    function CreateTable(table) {
        var _this = _super.call(this) || this;
        _this.foreignKeys = [];
        _this.sql = "CREATE TABLE " + table.trim() + " (";
        return _this;
    }
    CreateTable.prototype.withForeignKey = function (property, parentTable, column, foreignKeyName) {
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
            foreignKeyName = "fk_" + property + "_" + parentTable;
        }
        var constrains = " FOREIGN KEY " + foreignKeyName + "(" + property + ") REFERENCES " + parentTable + "(" + column + ")";
        this.foreignKeys.push(constrains);
        return this;
    };
    CreateTable.prototype.toString = function () {
        var v = this.sql;
        if (this.foreignKeys.length > 0) {
            for (var _i = 0, _a = this.foreignKeys; _i < _a.length; _i++) {
                var fk = _a[_i];
                v += "," + fk;
            }
        }
        v += ")";
        return v;
    };
    return CreateTable;
}(column_1.Column));
exports.CreateTable = CreateTable;
//# sourceMappingURL=create-table.js.map