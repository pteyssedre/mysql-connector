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
var DropDatabase = /** @class */ (function (_super) {
    __extends(DropDatabase, _super);
    function DropDatabase(name) {
        var _this = _super.call(this) || this;
        _this.sql = "DROP DATABASE IF EXISTS " + name + ";";
        return _this;
    }
    return DropDatabase;
}(query_1.Query));
exports.DropDatabase = DropDatabase;
//# sourceMappingURL=drop-table.js.map