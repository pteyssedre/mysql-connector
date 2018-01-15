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
        _this.sql = "CREATE TABLE " + table.trim() + " (";
        return _this;
    }
    CreateTable.prototype.toString = function () {
        return this.sql + ")";
    };
    return CreateTable;
}(column_1.Column));
exports.CreateTable = CreateTable;
//# sourceMappingURL=create-table.js.map