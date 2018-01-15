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
var query_1 = require("../query");
var column_data_type_1 = require("./column-data-type");
var column_default_1 = require("./column-default");
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columns = 0;
        return _this;
    }
    Column.prototype.withColumnName = function (name) {
        if (!name) {
            throw new Error("invalid columns name");
        }
        this.sql += (this.columns > 0 ? "," : "") + " " + name.trim();
        this.columns++;
        return this;
    };
    Column.prototype.asInt32 = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.INT;
        return this;
    };
    Column.prototype.asInt64 = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.BIGINT;
        return this;
    };
    Column.prototype.asBoolean = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.BOOLEAN;
        return this;
    };
    Column.prototype.asString = function (length) {
        this.sql += " " + column_data_type_1.ColumnDataType.STRING + "(" + (length ? length : "255") + ")";
        return this;
    };
    Column.prototype.isIdentity = function () {
        this.sql += " NOT NULL AUTO_INCREMENT PRIMARY KEY";
        return this;
    };
    Column.prototype.notNull = function () {
        this.sql += " NOT NULL";
        return this;
    };
    Column.prototype.asFloat = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.FLOAT;
        return this;
    };
    Column.prototype.asDecimal = function (n, n2) {
        this.sql += " " + column_data_type_1.ColumnDataType.DECIMAL + (n && n2 ? "(" + n + "," + n2 + ")" : "");
        return this;
    };
    Column.prototype.asDouble = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.DOUBLE;
        return this;
    };
    Column.prototype.asDate = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.DATE;
        return this;
    };
    Column.prototype.asDateTime = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.DATETIME;
        return this;
    };
    Column.prototype.asTimestamp = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.TIMESTAMP;
        return this;
    };
    Column.prototype.asText = function () {
        this.sql += " " + column_data_type_1.ColumnDataType.TEXT;
        return this;
    };
    Column.prototype.hasDefault = function (def) {
        if (!def) {
            throw new Error("invalid default value");
        }
        var m = column_default_1.DefaultColumn[def];
        if (m) {
            this.sql += " DEFAULT " + def.toString();
        }
        else {
            this.sql += " DEFAULT " + (typeof def === "string" ? "'" + def + "'" : def.toString());
        }
        return this;
    };
    return Column;
}(query_1.Query));
exports.Column = Column;
//# sourceMappingURL=column.js.map