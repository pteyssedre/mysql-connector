"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var connection_1 = require("../../src/connection/connection");
var create_1 = require("../../src/queries/create/create");
var drop_1 = require("../../src/queries/drop/drop");
var select_1 = require("../../src/queries/select");
var expect = chai.expect;
var should = chai.should();
var mySql;
describe("MySqlConnection", function () {
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mySql = new connection_1.MySqlConnection("localhost", "root", "root");
                    return [4 /*yield*/, mySql.executeAsync(drop_1.Drop.Database("test"))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mySql.executeAsync(create_1.Create.Database("test"))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, mySql.executeAsync(create_1.Create.Table("test.user")
                            .withColumnName("UserId").asInt32().isIdentity()
                            .withColumnName("username").asString()
                            .withColumnName("FirstName").asString()
                            .withColumnName("LastName").asString()
                            .withColumnName("Email").asString())];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () {
        mySql = new connection_1.MySqlConnection("localhost", "root", "root", "test");
    });
    it("Should connect to MySQL server and close it", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mySql.connectAsync()];
                case 1:
                    _a.sent();
                    should.equal(mySql.connected, true);
                    return [4 /*yield*/, mySql.closeAsync()];
                case 2:
                    _a.sent();
                    should.equal(mySql.connected, false);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should open, close, open again and close again", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mySql.connectAsync()];
                case 1:
                    _a.sent();
                    should.equal(mySql.connected, true);
                    return [4 /*yield*/, mySql.closeAsync()];
                case 2:
                    _a.sent();
                    should.equal(mySql.connected, false);
                    return [4 /*yield*/, mySql.connectAsync()];
                case 3:
                    _a.sent();
                    should.equal(mySql.connected, true);
                    return [4 /*yield*/, mySql.closeAsync()];
                case 4:
                    _a.sent();
                    should.equal(mySql.connected, false);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should connect to MySql server, do a query and close the connection", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mySql.connectAsync()];
                case 1:
                    _a.sent();
                    should.equal(mySql.connected, true);
                    return [4 /*yield*/, mySql.queryAsync(select_1.Select.Table("user").toString())];
                case 2:
                    result = _a.sent();
                    expect(result).to.be.a.instanceOf(Array);
                    return [4 /*yield*/, mySql.closeAsync()];
                case 3:
                    _a.sent();
                    should.equal(mySql.connected, false);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should execute a Query object", function () { return __awaiter(_this, void 0, void 0, function () {
        var select, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    select = select_1.Select.Properties("username").table("user");
                    return [4 /*yield*/, mySql.executeAsync(select)];
                case 1:
                    result = _a.sent();
                    expect(result).to.be.a.instanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=mysqlconnection.spec.js.map