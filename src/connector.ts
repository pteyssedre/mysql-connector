import {MySqlConnection} from "./connection/connection";
import {Query} from "./queries/query";

export class DbContext {

    constructor(private connection: MySqlConnection) {
    }

    public async inTransactionAsync(asyncAction: (dbContext: DbContext) => Promise<any>) {
        let original = false;
        if (!this.connection.connected) {
            await this.connection.connectAsync();
            await this.connection.queryAsync("START TRANSACTION");
            original = true;
        }
        let result;
        try {
            result = await asyncAction(this);
        } catch (exception) {
            await this.rollback();
            throw exception;
        }
        if (original) {
            await this.connection.queryAsync("COMMIT");
            await this.connection.closeAsync();
        }
        return result;
    }

    public async rollback() {
        await this.connection.queryAsync("ROLLBACK");
        await this.connection.closeAsync();
    }

    public async executeAsync(sql: string | Query) {
        if (!this.connection.connected) {
            return this.connection.executeAsync(sql.toString());
        } else {
            return await this.connection.queryAsync(sql.toString());
        }
    }
}
