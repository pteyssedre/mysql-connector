import mysql = require("mysql");
import { TypeCast } from "mysql";
import { Query } from "../queries/query";
export declare class MySqlConnection {
    private configuration;
    connected: boolean;
    conn: mysql.Connection | undefined;
    constructor(configuration: {
        hostname?: string;
        username?: string;
        password?: string;
        db?: string;
        port?: number;
        typeCast?: TypeCast;
    });
    connectAsync(): Promise<void>;
    queryAsync(query: string): Promise<any>;
    closeAsync(): Promise<void>;
    executeAsync(query: string | Query): Promise<any>;
}
