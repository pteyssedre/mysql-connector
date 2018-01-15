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
var connector_1 = require("../../src/connector");
var create_1 = require("../../src/queries/create/create");
var delete_1 = require("../../src/queries/delete");
var drop_1 = require("../../src/queries/drop/drop");
var insert_1 = require("../../src/queries/insert");
var select_1 = require("../../src/queries/select");
var expect = chai.expect;
var should = chai.should();
var mySql;
var dbContext;
describe("DbContext", function () {
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var initConnection, context;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initConnection = new connection_1.MySqlConnection("localhost", "root", "root");
                    context = new connector_1.DbContext(initConnection);
                    return [4 /*yield*/, context.inTransactionAsync(function (db) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db.executeAsync(drop_1.Drop.Database("test"))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, db.executeAsync(create_1.Create.Database("test"))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, db.executeAsync(create_1.Create.Table("test.user")
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
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () {
        mySql = new connection_1.MySqlConnection("localhost", "root", "root", "test");
        dbContext = new connector_1.DbContext(mySql);
    });
    it("Should start a transaction and commit it", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var result, del;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbContext.inTransactionAsync(function (context) { return __awaiter(_this, void 0, void 0, function () {
                        var execute;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, context.executeAsync(insert_1.Insert.InTo("user").fromModel({
                                        Email: "pierre@teyssedre.ca",
                                        FirstName: "toto",
                                        LastName: "toto",
                                        username: "toto",
                                    }))];
                                case 1:
                                    execute = _a.sent();
                                    should.exist(execute);
                                    expect(execute.affectedRows).to.be.eq(1);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    should.equal(mySql.connected, false);
                    return [4 /*yield*/, mySql.executeAsync(select_1.Select.Table("user").where("Email = 'pierre@teyssedre.ca'"))];
                case 2:
                    result = _a.sent();
                    expect(result).to.be.a.instanceOf(Array);
                    expect(result.length).to.be.eq(1);
                    return [4 /*yield*/, mySql.executeAsync(delete_1.Delete.From("user").where("UserId = " + result[0].UserId))];
                case 3:
                    del = _a.sent();
                    should.exist(del);
                    expect(del.affectedRows).to.be.eq(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should start a transaction and commit it after the nested execute", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var result, del, del2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbContext.inTransactionAsync(function (context) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        var execute;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, context.executeAsync(insert_1.Insert.InTo("user").fromModel({
                                        Email: "pierre@teyssedre.ca",
                                        FirstName: "toto",
                                        LastName: "toto",
                                        username: "toto",
                                    }))];
                                case 1:
                                    execute = _a.sent();
                                    should.exist(execute);
                                    expect(execute.affectedRows).to.be.eq(1);
                                    return [4 /*yield*/, context.inTransactionAsync(function (context2) { return __awaiter(_this, void 0, void 0, function () {
                                            var execute2;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, context2.executeAsync(insert_1.Insert.InTo("user").fromModel({
                                                            Email: "pierre@teyssedre.ca",
                                                            FirstName: "toto",
                                                            LastName: "toto",
                                                            username: "toto",
                                                        }))];
                                                    case 1:
                                                        execute2 = _a.sent();
                                                        should.exist(execute2);
                                                        expect(execute2.affectedRows).to.be.eq(1);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    should.equal(mySql.connected, false);
                    return [4 /*yield*/, mySql.executeAsync(select_1.Select.Table("user").where("Email = 'pierre@teyssedre.ca'"))];
                case 2:
                    result = _a.sent();
                    expect(result).to.be.a.instanceOf(Array);
                    expect(result.length).to.be.eq(2);
                    return [4 /*yield*/, mySql.executeAsync(delete_1.Delete.From("user").where("UserId = " + result[0].UserId))];
                case 3:
                    del = _a.sent();
                    should.exist(del);
                    expect(del.affectedRows).to.be.eq(1);
                    return [4 /*yield*/, mySql.executeAsync(delete_1.Delete.From("user").where("UserId = " + result[1].UserId))];
                case 4:
                    del2 = _a.sent();
                    should.exist(del2);
                    expect(del2.affectedRows).to.be.eq(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should create a transaction and rollback after exception", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var exception_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 5]);
                    return [4 /*yield*/, dbContext.inTransactionAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                            var execute;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, dbContext.executeAsync(insert_1.Insert.InTo("user").fromModel({
                                            Email: "pierre@teyssedre.ca",
                                            FirstName: "toto",
                                            LastName: "toto",
                                            username: "toto",
                                        }))];
                                    case 1:
                                        execute = _a.sent();
                                        should.exist(execute);
                                        expect(execute.affectedRows).to.be.eq(1);
                                        // something bad happened
                                        throw new Error("something bad !");
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    exception_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    should.equal(mySql.connected, false);
                    return [4 /*yield*/, mySql.executeAsync(select_1.Select.Table("user").where("Email = 'pierre@teyssedre.ca'"))];
                case 4:
                    result = _a.sent();
                    expect(result).to.be.a.instanceOf(Array);
                    expect(result.length).to.be.eq(0);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=dbcontext.spec.js.map