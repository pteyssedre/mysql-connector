import chai = require("chai");
import {MySqlConnection} from "../../src/connection/connection";
import {DbContext} from "../../src/connector";
import {Create} from "../../src/queries/create/create";
import {Delete} from "../../src/queries/delete";
import {Drop} from "../../src/queries/drop/drop";
import {Insert} from "../../src/queries/insert";
import {Select} from "../../src/queries/select";

const expect = chai.expect;
const should = chai.should();

let mySql: MySqlConnection;
let dbContext: DbContext;

describe("DbContext", () => {

    before(async () => {
        // const initConnection = new MySqlConnection("127.0.0.1", "root", "");
        const initConnection = new MySqlConnection({
            hostname: "localhost",
            username: "root",
            password: "",
            port: 3306
        });
        const context = new DbContext(initConnection);
        await context.inTransactionAsync(async (db) => {
            await db.executeAsync(Drop.Database("test"));
            await db.executeAsync(Create.Database("test"));
            await db.executeAsync(Create.Table("test.user")
                .withColumnName("UserId").asInt32().isIdentity()
                .withColumnName("username").asString()
                .withColumnName("FirstName").asString()
                .withColumnName("LastName").asString()
                .withColumnName("LoginCount").asInt32().nullable()
                .withColumnName("Email").asString());
        });
    });

    beforeEach(() => {
        // mySql = new MySqlConnection("127.0.0.1", "root", "", "test");
        mySql = new MySqlConnection({
            hostname: "127.0.0.1",
            username: "root",
            password: "",
            db: "test"
        });
        dbContext = new DbContext(mySql);
    });

    it("Should start a transaction and commit it", async () => {

        await dbContext.inTransactionAsync(async (context) => {
            const execute = await context.executeAsync(Insert.InTo("user").fromModel({
                Email: "pierre@teyssedre.ca",
                FirstName: "toto",
                LastName: "toto",
                LoginCount: 0,
                username: "toto",
            }));
            should.exist(execute);
            expect(execute.affectedRows).to.be.eq(1);
        });

        should.equal(mySql.connected, false);

        const result = await mySql.executeAsync(Select.Table("user").where("Email = 'pierre@teyssedre.ca'"));
        expect(result).to.be.a.instanceOf(Array);
        expect(result.length).to.be.eq(1);

        const del = await mySql.executeAsync(Delete.From("user").where(`UserId = ${result[0].UserId}`));
        should.exist(del);
        expect(del.affectedRows).to.be.eq(1);

    });

    it("Should start a transaction and commit it after the nested execute", async () => {

        await dbContext.inTransactionAsync(async (context) => {

            const execute = await context.executeAsync(Insert.InTo("user").fromModel({
                Email: "pierre@teyssedre.ca",
                FirstName: "toto",
                LastName: "toto",
                username: "toto",
            }));
            should.exist(execute);
            expect(execute.affectedRows).to.be.eq(1);

            await context.inTransactionAsync(async (context2) => {

                const execute2 = await context2.executeAsync(Insert.InTo("user").fromModel({
                    Email: "pierre@teyssedre.ca",
                    FirstName: "toto",
                    LastName: "toto",
                    username: "toto",
                }));
                should.exist(execute2);
                expect(execute2.affectedRows).to.be.eq(1);
            });
        });

        should.equal(mySql.connected, false);

        const result = await mySql.executeAsync(Select.Table("user").where("Email = 'pierre@teyssedre.ca'"));
        expect(result).to.be.a.instanceOf(Array);
        expect(result.length).to.be.eq(2);

        const del = await mySql.executeAsync(Delete.From("user").where(`UserId = ${result[0].UserId}`));
        should.exist(del);
        expect(del.affectedRows).to.be.eq(1);

        const del2 = await mySql.executeAsync(Delete.From("user").where(`UserId = ${result[1].UserId}`));
        should.exist(del2);
        expect(del2.affectedRows).to.be.eq(1);

    });

    it("Should create a transaction and rollback after exception", async () => {
        try {

            await dbContext.inTransactionAsync(async () => {
                const execute = await dbContext.executeAsync(Insert.InTo("user").fromModel({
                    Email: "pierre@teyssedre.ca",
                    FirstName: "toto",
                    LastName: "toto",
                    username: "toto",
                }));
                should.exist(execute);
                expect(execute.affectedRows).to.be.eq(1);

                // something bad happened
                throw new Error("something bad !");
            });
        } catch (exception) {
            // exception ignored for testing
        } finally {
            should.equal(mySql.connected, false);
            const result = await mySql.executeAsync(Select.Table("user").where("Email = 'pierre@teyssedre.ca'"));
            expect(result).to.be.a.instanceOf(Array);
            expect(result.length).to.be.eq(0);
        }
    });

    it("Should execute query without open a transaction before", async () => {
        should.equal(mySql.connected, false);
        const result = await dbContext.executeAsync(Select.Table("user"));
        should.equal(mySql.connected, false);
        expect(result).to.be.a.instanceOf(Array);
        expect(result.length).to.be.eq(0);
    });
});
