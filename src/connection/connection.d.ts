import mysql = require("mysql");
import { Query } from "../queries/query";
export declare class MySqlConnection {
    private configuration;
    connected: boolean;
    conn: mysql.Connection | undefined;
    constructor(configuration: {
        hostname?: string | undefined,
        username?: string | undefined,
        password?: string | undefined,
        db?: string | undefined,
        port?: number | undefined
    });
    connectAsync(): Promise<void>;
    queryAsync(query: string): Promise<any>;
    closeAsync(): Promise<void>;
    executeAsync(query: string | Query): Promise<any>;
}
