import { MySqlConnection } from "./connection/connection";
import { Query } from "./queries/query";
export declare class DbContext {
    private connection;
    constructor(connection: MySqlConnection);
    inTransactionAsync(asyncAction: (dbContext: DbContext) => Promise<any>): Promise<any>;
    rollback(): Promise<void>;
    executeAsync(sql: string | Query): Promise<any>;
}
