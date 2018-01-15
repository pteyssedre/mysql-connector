"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var create_1 = require("../../src/queries/create/create");
var insert_1 = require("../../src/queries/insert");
var select_1 = require("../../src/queries/select");
var update_1 = require("../../src/queries/update");
var expect = chai.expect;
describe("Query", function () {
    it("Should create a select * query", function () {
        var select = select_1.Select.Table("users");
        expect(select.sql).to.be.eq("SELECT * FROM users");
    });
    it("Should create a select name query", function () {
        var select = select_1.Select.Properties("name").table("users");
        expect(select.sql).to.be.eq("SELECT name FROM users");
    });
    it("Should create a select name and password query", function () {
        var select = select_1.Select.Properties("name", "password").table("users");
        expect(select.sql).to.be.eq("SELECT name, password FROM users");
    });
    it("Should create a select query with a where", function () {
        var select = select_1.Select.Table("users").where("id = 1");
        expect(select.sql).to.be.eq("SELECT * FROM users WHERE id = 1");
    });
    it("Should throw a exception if none table is provided", function () {
        expect(function () {
            select_1.Select.Table("");
        }).to.throw(Error);
    });
    it("Should throw a exception if none where is provided", function () {
        expect(function () {
            select_1.Select.Table("USER").where("");
        }).to.throw(Error);
    });
    it("Should create a insert query", function () {
        var insert = insert_1.Insert.InTo("user").fromModel({ username: "toto", FirstName: "pierre", LastName: "test" });
        expect(insert.sql)
            .to.be.eq("INSERT INTO user (username, FirstName, LastName) VALUES ('toto', 'pierre', 'test')");
    });
    it("Should throw a exception if none valid table is provided in Insert", function () {
        expect(function () {
            insert_1.Insert.InTo("");
        }).to.throw(Error);
    });
    it("Should throw a exception if none valid model is provided in Insert", function () {
        expect(function () {
            insert_1.Insert.InTo("user").fromModel({});
        }).to.throw(Error);
        expect(function () {
            insert_1.Insert.InTo("user").fromModel(undefined);
        }).to.throw(Error);
    });
    it("Should create a update query", function () {
        var update = update_1.Update.Table("user").fromModel({ username: "toto", type: 2 }).where("userId = 1");
        expect(update.sql).to.be.eq("UPDATE user SET username = 'toto', type = 2 WHERE userId = 1");
    });
    it("Should throw a exception if none valid table is provided in Update", function () {
        expect(function () {
            update_1.Update.Table("");
        }).to.throw(Error);
    });
    it("Should throw a exception if none valid where is provided in Update", function () {
        expect(function () {
            update_1.Update.Table("USER").where("");
        }).to.throw(Error);
    });
    it("Should create a table", function () {
        var create = create_1.Create.Table("chat")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("race").asString().notNull()
            .withColumnName("name").asString().notNull()
            .withColumnName("cityNumber").asInt64().notNull();
        expect(create.toString())
            .to.be.eq("CREATE TABLE chat ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " race VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, cityNumber BIGINT NOT NULL)");
    });
});
//# sourceMappingURL=query.spec.js.map