import mysql = require("mysql");
import { Query } from "../queries/query";
export declare class MySqlConnection {
    private hostname;
    private username;
    private password;
    private db;
    connected: boolean;
    conn: mysql.Connection;
    constructor(hostname?: string | undefined, username?: string | undefined, password?: string | undefined, db?: string | undefined);
    connectAsync(): Promise<void>;
    queryAsync(query: string): Promise<any>;
    closeAsync(): Promise<void>;
    executeAsync(query: string | Query): Promise<any>;
}
