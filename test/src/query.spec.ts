import chai = require("chai");
import {Create} from "../../src/queries/create/create";
import {Insert} from "../../src/queries/insert";
import {Select} from "../../src/queries/select";
import {Update} from "../../src/queries/update";

const expect = chai.expect;

describe("Query", () => {

    it("Should create a select * query", () => {
        const select = Select.Table("users");
        expect(select.sql).to.be.eq("SELECT * FROM users");
    });

    it("Should create a select name query", () => {
        const select = Select.Properties("name").table("users");
        expect(select.sql).to.be.eq("SELECT name FROM users");
    });

    it("Should create a select name and password query", () => {
        const select = Select.Properties("name", "password").table("users");
        expect(select.sql).to.be.eq("SELECT name, password FROM users");
    });

    it("Should create a select query with a where", () => {
        const select = Select.Table("users").where("id = 1");
        expect(select.sql).to.be.eq("SELECT * FROM users WHERE id = 1");
    });

    it("Should throw a exception if none table is provided", () => {
        expect(() => {
            Select.Table("");
        }).to.throw(Error);
    });

    it("Should throw a exception if none where is provided", () => {
        expect(() => {
            Select.Table("USER").where("");
        }).to.throw(Error);
    });

    it("Should create a insert query", () => {
        const insert = Insert.InTo("user").fromModel({username: "toto", FirstName: "pierre", LastName: "test"});
        expect(insert.sql)
            .to.be.eq("INSERT INTO user (username, FirstName, LastName) VALUES ('toto', 'pierre', 'test')");
    });

    it("Should throw a exception if none valid table is provided in Insert", () => {
        expect(() => {
            Insert.InTo("");
        }).to.throw(Error);
    });

    it("Should throw a exception if none valid model is provided in Insert", () => {
        expect(() => {
            Insert.InTo("user").fromModel({});
        }).to.throw(Error);
        expect(() => {
            Insert.InTo("user").fromModel(undefined);
        }).to.throw(Error);
    });

    it("Should create a update query", () => {
        const update = Update.Table("user").fromModel({username: "toto", type: 2}).where("userId = 1");
        expect(update.sql).to.be.eq("UPDATE user SET username = 'toto', type = 2 WHERE userId = 1");
    });

    it("Should throw a exception if none valid table is provided in Update", () => {
        expect(() => {
            Update.Table("");
        }).to.throw(Error);
    });

    it("Should throw a exception if none valid where is provided in Update", () => {
        expect(() => {
            Update.Table("USER").where("");
        }).to.throw(Error);
    });

    it("Should create a table", () => {
        const create = Create.Table("chat")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("race").asString().notNull()
            .withColumnName("name").asString().notNull()
            .withColumnName("cityNumber").asInt64().notNull();

        expect(create.toString())
            .to.be.eq("CREATE TABLE chat ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " race VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, cityNumber BIGINT NOT NULL)");
    });

});
