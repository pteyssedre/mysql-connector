import chai = require("chai");
import { DefaultColumn } from "../../src/queries/column/column-default";
import { Create } from "../../src/queries/create/create";
import { Delete } from "../../src/queries/delete";
import { Drop } from "../../src/queries/drop/drop";
import { Insert } from "../../src/queries/insert";
import { WhereOperator } from "../../src/queries/query";
import { Select } from "../../src/queries/select";
import { Update } from "../../src/queries/update";

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

    it("Should throw a exception if no properties are provided", () => {
        expect(() => {
            Select.Properties();
        }).to.throw(Error);
    });

    it("Should throw a exception if invalid properties are provided", () => {
        expect(() => {
            Select.Properties("", "");
        }).to.throw(Error);
    });

    it("Should throw a exception if none table is provided", () => {
        expect(() => {
            Select.Properties("username").table("");
        }).to.throw(Error);

        expect(() => {
            Select.Table("");
        }).to.throw(Error);
    });

    it("Should throw a exception if none where is provided", () => {
        expect(() => {
            Select.Table("USER").where("");
        }).to.throw(Error);
    });

    it("Should create a insert query from model", () => {
        const insert = Insert.InTo("user").fromModel({username: "toto", FirstName: "pierre", LastName: "test"});
        expect(insert.sql)
            .to.be.eq("INSERT INTO user (username, FirstName, LastName) VALUES ('toto', 'pierre', 'test')");
    });

    it("Should create a insert query with property", () => {
        const insert = Insert.InTo("user").property("username", "toto").property("state", 1);
        expect(insert.sql)
            .to.be.eq("INSERT INTO user SET username = 'toto', state = 1");
    });

    it("Should create a insert query with property", () => {
        const insert = Insert.InTo("user").property("login_fail", 1);
        expect(insert.sql)
            .to.be.eq("INSERT INTO user SET login_fail = 1");
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

    it("Should throw an exception if fromModel is called after property", () => {
        expect(() => {
            Insert.InTo("user").property("username", "toto").fromModel({});
        }).to.throw(Error);
    });

    it("Should throw an exception if property is called after fromModel", () => {
        expect(() => {
            Insert.InTo("user").fromModel({username: "toto"}).property("username", "toto");
        }).to.throw(Error);
    });

    it("Should throw a exception if key is invalid", () => {
        expect(() => {
            Insert.InTo("user").property("", "chat");
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

    it("Should throw a error when fromModel pass is invalid", () => {
        expect(() => {
            Update.Table("user").fromModel(null);
        }).to.throw(Error);
    });

    it("Should create a table", () => {
        const create = Create.Table("chat")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("race").asString().notNull()
            .withColumnName("name").asString(400).notNull()
            .withColumnName("cityNumber").asInt64().notNull()
            .withColumnName("text_t").asText().hasDefault("T_T")
            .withColumnName("float_t").asFloat()
            .withColumnName("decimal_t").asDecimal().hasDefault(0)
            .withColumnName("decimal_set_t").asDecimal(10, 4)
            .withColumnName("double").asDouble()
            .withColumnName("double_set_t").asDouble(10, 4)
            .withColumnName("date_t").asDate().hasDefault(DefaultColumn.LOCALTIME)
            .withColumnName("datetime_t").asDateTime().hasDefault(DefaultColumn.LOCALTIMESTAMP)
            .withColumnName("timestamp_t").asTimestamp().hasDefault(DefaultColumn.CURRENT_TIMESTAMP)
            .withColumnName("nullable_t").asBoolean().hasDefault(DefaultColumn.NULL);

        expect(create.toString())
            .to.be.eq("CREATE TABLE chat ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " race VARCHAR(255) NOT NULL, name VARCHAR(400) NOT NULL, cityNumber BIGINT NOT NULL, " +
            "text_t TEXT DEFAULT 'T_T', float_t FLOAT, decimal_t DECIMAL DEFAULT 0, decimal_set_t DECIMAL(10,4), " +
            "double DOUBLE, double_set_t DOUBLE(10,4), " +
            "date_t DATE DEFAULT LOCALTIME, datetime_t DATETIME DEFAULT LOCALTIMESTAMP, " +
            "timestamp_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP, nullable_t BOOLEAN DEFAULT NULL)");
    });

    it("Should create a table with foreign key with default name", () => {
        const createFk = Create.Table("users")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("contact_id").asInt32().notNull()
            .withForeignKey("contact_id", "contacts", "id");

        expect(createFk.toString()).to.be.eq("CREATE TABLE users ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " contact_id INT NOT NULL, FOREIGN KEY fk_contact_id_contacts(contact_id) REFERENCES contacts(id))");
    });

    it("Should create a table with foreign key with custom name", () => {
        const createFk = Create.Table("users")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("contact_id").asInt32().notNull()
            .withForeignKey("contact_id", "contacts", "id", "my_super_fk");

        expect(createFk.toString()).to.be.eq("CREATE TABLE users ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " contact_id INT NOT NULL, FOREIGN KEY my_super_fk(contact_id) REFERENCES contacts(id))");
    });

    it("Should create a table with foreign key with custom name if table exists", () => {
        const createFk = Create.Table("users")
            .withColumnName("id").asInt32().isIdentity()
            .withColumnName("contact_id").asInt32().notNull()
            .withForeignKey("contact_id", "contacts", "id", "my_super_fk")
            .ifNotExists();

        expect(createFk.toString()).to.be.eq("CREATE TABLE IF NOT EXISTS " +
            "users ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
            " contact_id INT NOT NULL, FOREIGN KEY my_super_fk(contact_id) REFERENCES contacts(id))");
    });

    it("Should throw a error when database name is not valid", () => {
        expect(() => {
            Create.Database("");
        }).to.throw(Error);
    });

    it("Should create database query", () => {
        const query = Create.Database("toto").ifNotExists().sql;
        expect(query).to.be.equal("CREATE DATABASE IF NOT EXISTS toto;");
    });

    it("Should throw a error when table name is not valid", () => {
        expect(() => {
            Create.Table("")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull();
        }).to.throw(Error);
    });

    it("Should throw a error when property of the foreign key is not valid", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull()
                .withForeignKey("", "contacts", "id");
        }).to.throw(Error);
    });

    it("Should throw a error when property of the foreign key is not defined", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull()
                .withForeignKey("c_id", "contacts", "id");
        }).to.throw(Error);
    });

    it("Should throw a error when parent table of the foreign key is not set", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull()
                .withForeignKey("contact_id", "", "id");
        }).to.throw(Error);
    });

    it("Should throw a error when parent column of the foreign key is not set", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull()
                .withForeignKey("contact_id", "contacts", "");
        }).to.throw(Error);
    });

    it("Should throw a error when column name is not valid", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("").asInt32().notNull()
                .withForeignKey("contact_id", "contacts", "");
        }).to.throw(Error);
    });

    it("Should throw a error when default value of column is not valid", () => {
        expect(() => {
            Create.Table("users")
                .withColumnName("id").asInt32().isIdentity()
                .withColumnName("contact_id").asInt32().notNull().hasDefault("");
        }).to.throw(Error);
    });

    it("Should generate a delete query", () => {
        const qu = Delete.From("user").where("email = 'user@email.com'");
        expect(qu.toString()).to.eq("DELETE FROM user WHERE email = 'user@email.com'");
    });

    it("Should throw an error in a delete query when table is not valid", () => {
        expect(() => {
            Delete.From("").where("email = 'user@email.com'");
        }).throw(Error);
    });

    it("Should throw an error in a delete query when where is not valid", () => {
        expect(() => {
            Delete.From("user").where("");
        }).throw(Error);
    });

    it("Should create a drop query", () => {
        const q = Drop.Database("test");
        expect(q.toString()).to.eq("DROP DATABASE IF EXISTS test");
    });

    it("Should throw a exception in a drop query if name is not valid", () => {
        expect(() => {
            Drop.Database("");
        }).throw(Error);
    });

    it("Should create a left join", () => {
        const q = Select.Table("users")
            .leftJoinOn("users", "address_id", "address", "id");
        expect(q.toString()).to.be.eq("SELECT * FROM users LEFT JOIN address ON users.address_id = address.id");
    });

    it("Should create a left inner join", () => {
        const q = Select.Table("users").leftInnerJoinOn("users", "address_id", "address", "id");
        expect(q.toString()).to.be.eq("SELECT * FROM users LEFT INNER JOIN address ON users.address_id = address.id");
    });

    it("Should create a left outer join", () => {
        const q = Select.Table("users").leftOuterJoinOn("users", "address_id", "address", "id");
        expect(q.toString()).to.be.eq("SELECT * FROM users LEFT OUTER JOIN address ON users.address_id = address.id");
    });
    it("Should create a right join", () => {
        const q = Select.Table("users").rightJoinOn("users", "address_id", "address", "id");
        expect(q.toString()).to.be.eq("SELECT * FROM users RIGHT JOIN address ON users.address_id = address.id");
    });

    it("Should create a right inner join", () => {
        const q = Select.Table("users").rightInnerJoinOn("users", "address_id", "address", "id");
        expect(q.toString()).to.be.eq("SELECT * FROM users RIGHT INNER JOIN address ON users.address_id = address.id");
    });

    it("Should create a right outer join", () => {
        const q = Select.Table("users").rightOuterJoinOn("users", "address_id", "address", "id");
        expect(q.toString()).to.be.eq("SELECT * FROM users RIGHT OUTER JOIN address ON users.address_id = address.id");
    });

    it("Should getting pagination results using offset", () => {
        const q = Select.Table("users").limit(10, 10);
        expect(q.toString()).to.be.eq("SELECT * FROM users LIMIT 10,10");
    });

    it("Should getting pagination results user page", () => {
        const q = Select.Table("users").page(2, 10);
        expect(q.toString()).to.be.eq("SELECT * FROM users LIMIT 20,10");
    });

    it("Should select given a model object", () => {
        const q = Select.Table("users").where({username: "toto"});
        expect(q.toString()).to.be.eq("SELECT * FROM users WHERE username = 'toto'");
    });

    it("Should select given a model object with default where operator", () => {
        const q = Select.Table("users").where({username: "toto", email: "toto@toto.com"});
        expect(q.toString()).to.be.eq("SELECT * FROM users WHERE username = 'toto' AND email = 'toto@toto.com'");
    });

    it("Should select given a model object with specific where operator", () => {
        const q = Select.Table("users").where({username: "toto", email: "toto@toto.com"}, WhereOperator.OR);
        expect(q.toString()).to.be.eq("SELECT * FROM users WHERE username = 'toto' OR email = 'toto@toto.com'");
    });
});
