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
var Delete = /** @class */ (function (_super) {
    __extends(Delete, _super);
    function Delete() {
        var _this = _super.call(this) || this;
        _this.sql = "DELETE";
        return _this;
    }
    Delete.From = function (table) {
        if (!table) {
            throw new Error("no valid table was provided");
        }
        var del = new Delete();
        del.sql += " FROM " + table.trim();
        return del;
    };
    Delete.prototype.where = function (clause) {
        if (!clause) {
            throw new Error("no valid clause was provided");
        }
        this.sql += " WHERE " + clause.trim();
        return this;
    };
    return Delete;
}(query_1.Query));
exports.Delete = Delete;
//# sourceMappingURL=delete.js.map