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
var query_1 = require("./query");
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super.call(this) || this;
        _this.sql = "SELECT";
        return _this;
    }
    Select.Properties = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        if (!properties || properties.length === 0) {
            throw new Error("No properties defined");
        }
        var select = new Select();
        for (var i = 0; i < properties.length; i++) {
            var p = properties[i];
            select.sql += " " + p.trim();
            if (i + 1 < properties.length) {
                select.sql += ",";
            }
        }
        return select;
    };
    Select.Table = function (table) {
        if (!table) {
            throw new Error("invalid table name");
        }
        var select = new Select();
        select.sql += " * FROM " + table.trim();
        return select;
    };
    Select.prototype.table = function (table) {
        if (!table) {
            throw new Error("invalid table name");
        }
        this.sql += " FROM " + table.trim();
        return this;
    };
    Select.prototype.where = function (clause) {
        if (!clause) {
            throw new Error("no clause was provided for where");
        }
        this.sql += " WHERE " + clause.trim();
        return this;
    };
    return Select;
}(query_1.Query));
exports.Select = Select;
//# sourceMappingURL=select.js.map