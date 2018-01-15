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
var Insert = /** @class */ (function (_super) {
    __extends(Insert, _super);
    function Insert() {
        var _this = _super.call(this) || this;
        _this.properties = 0;
        _this.sql = "INSERT INTO";
        return _this;
    }
    Insert.InTo = function (table) {
        if (!table) {
            throw new Error("no table was provided");
        }
        var insert = new Insert();
        insert.sql += " " + table.trim();
        return insert;
    };
    Insert.prototype.property = function (key, value) {
        if (!key) {
            throw new Error("parameter need to be a valid key");
        }
        this.sql += (this.properties > 0 ? "" : " SET ") + " " + key + " = " + typeof value;
    };
    Insert.prototype.fromModel = function (obj) {
        if (!obj || (typeof obj !== "object")) {
            throw new Error("parameter must be an object");
        }
        var keys = Object.keys(obj);
        if (!keys || keys.length === 0) {
            throw new Error("parameter must contain at least 1 property");
        }
        this.sql += " (";
        for (var i = 0; i < keys.length; i++) {
            this.sql += "" + (i === 0 ? "" : " ") + keys[i] + (i + 1 < keys.length ? "," : "");
        }
        this.sql += ") VALUES (";
        for (var i = 0; i < keys.length; i++) {
            this.sql += (i === 0 ? "" : " ") + "'" + obj[keys[i]].toString() + "'" + (i + 1 < keys.length ? "," : "");
        }
        this.sql += ")";
        return this;
    };
    return Insert;
}(query_1.Query));
exports.Insert = Insert;
//# sourceMappingURL=insert.js.map