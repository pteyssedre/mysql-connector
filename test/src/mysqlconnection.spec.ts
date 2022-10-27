import chai = require("chai");
import { MySqlConnection } from "../../src/connection/connection";
import { Create } from "../../src/queries/create/create";
import { Drop } from "../../src/queries/drop/drop";
import { Insert } from "../../src/queries/insert";
import { Select } from "../../src/queries/select";
import { Update } from "../../src/queries/update";

const expect = chai.expect;
const should = chai.should();

let mySql: MySqlConnection;
describe("MySqlConnection", () => {

    before(async () => {
        // mySql = new MySqlConnection("127.0.0.1", "root", "");
        mySql = new MySqlConnection({
            hostname: "127.0.0.1",
            username: "root",
            password: ""
        });
        await mySql.executeAsync(Drop.Database("test"));
        await mySql.executeAsync(Create.Database("test"));
        await mySql.executeAsync(Create.Table("test.user")
            .withColumnName("UserId").asInt32().isIdentity()
            .withColumnName("username").asString()
            .withColumnName("FirstName").asString()
            .withColumnName("LastName").asString()
            .withColumnName("Email").asString());
    });

    beforeEach(() => {
       // mySql = new MySqlConnection("127.0.0.1", "root", "", "test");
       mySql = new MySqlConnection({
            hostname: "127.0.0.1",
            username: "root",
            password: "",
            db: "test"
       });
    });

    it("Should throw an error if connection is not valid", () => {
        // const c: MySqlConnection = new MySqlConnection("127.0.0.1", "fake", "fake");
        const c: MySqlConnection = new MySqlConnection(
            {
                hostname: "127.0.0.1",
                username: "fake",
                password: "fake"
            }
        );
        c.connectAsync().catch((exception) => {
            expect(exception).to.not.eq(null);
        });
    });

    it("Should connect to MySQL server and close it", async () => {

        await mySql.connectAsync();
        should.equal(mySql.connected, true);

        await mySql.closeAsync();
        should.equal(mySql.connected, false);
    });

    it("Should open, close, open again and close again", async () => {

        await mySql.connectAsync();
        should.equal(mySql.connected, true);

        await mySql.closeAsync();
        should.equal(mySql.connected, false);

        await mySql.connectAsync();
        should.equal(mySql.connected, true);

        await mySql.closeAsync();
        should.equal(mySql.connected, false);
    });

    it("Should connect to MySql server, do a query and close the connection", async () => {

        await mySql.connectAsync();
        should.equal(mySql.connected, true);

        const result = await mySql.queryAsync(Select.Table("user").toString());
        expect(result).to.be.a.instanceOf(Array);

        await mySql.closeAsync();
        should.equal(mySql.connected, false);
    });

    it("Should execute a Query object", async () => {
        const select = Select.Properties("username").table("user");
        const result = await mySql.executeAsync(select);
        expect(result).to.be.a.instanceOf(Array);
    });

    it("Should catch a error if something goes wrong with the query", (done) => {
        mySql.connectAsync().then(() => {
            mySql.queryAsync("SELECT * FROM users")
                .catch((exception) => {
                    expect(exception).to.not.eq(undefined);
                    expect(mySql.connected).to.be.eq(true);
                    mySql.closeAsync().then(() => {
                        expect(mySql.connected).to.be.eq(false);
                        done();
                    });
                });
        });
    });

    it("Should catch a error if something goes wrong with the query", (done) => {
        mySql.executeAsync(Create.Table("user"))
            .catch((exception) => {
                expect(exception).to.not.eq(undefined);
                expect(mySql.connected).to.be.eq(false);
                done();
            });
    });

    it("Should insert data", async () => {
        await mySql.connectAsync();
        await mySql.queryAsync(Insert.InTo("user")
            .property("username", "abcdefg")
            .property("FirstName", "firstName").toString());
        await mySql.closeAsync();
    });

    it("Should update data", async () => {
        await mySql.connectAsync();
        const results = await mySql.queryAsync("SELECT * FROM user");
        const user: any = results[0];
        user.username = "aaaaaaaaa";
        const result = await mySql.queryAsync(Update.Table("user")
            .fromModel(user)
            .where(`UserId = ${user.UserId}`).toString());

        // noinspection TsLint
        expect(result.affectedRows).to.be.equals(1);
        expect(result.changedRows).to.be.equals(1);
        await mySql.closeAsync();
    });
});
