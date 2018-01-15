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
var Update = /** @class */ (function (_super) {
    __extends(Update, _super);
    function Update() {
        var _this = _super.call(this) || this;
        _this.sql = "UPDATE";
        return _this;
    }
    Update.Table = function (table) {
        if (!table) {
            throw new Error("no valid table was provided");
        }
        var update = new Update();
        update.sql += " " + table.trim();
        return update;
    };
    Update.prototype.fromModel = function (data) {
        if (!data) {
            throw new Error("no data was provided");
        }
        if (typeof data === "object") {
            this.sql += " SET ";
            var keys = Object.keys(data);
            for (var i = 0; i < keys.length; i++) {
                var v = data[keys[i]];
                var str = typeof v === "string" ? "'" + v + "'" : "" + v;
                this.sql += "" + (i === 0 ? "" : " ") + keys[i] + " = " + str + (i + 1 < keys.length ? "," : "");
            }
        }
        return this;
    };
    Update.prototype.where = function (clause) {
        if (!clause) {
            throw new Error("no valid clause was provided");
        }
        this.sql += " WHERE " + clause.trim();
        return this;
    };
    return Update;
}(query_1.Query));
exports.Update = Update;
//# sourceMappingURL=update.js.map