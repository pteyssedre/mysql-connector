import chai = require("chai");
import {MySqlConnection} from "../../src/connection/connection";
import {Create} from "../../src/queries/create/create";
import {Drop} from "../../src/queries/drop/drop";
import {Select} from "../../src/queries/select";

const expect = chai.expect;
const should = chai.should();

let mySql: MySqlConnection;
describe("MySqlConnection", () => {

    before(async () => {
        mySql = new MySqlConnection("localhost", "root", "root");
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
        mySql = new MySqlConnection("localhost", "root", "root", "test");
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
});
