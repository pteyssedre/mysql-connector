import mysql = require("mysql");
import {Query} from "../queries/query";

export class MySqlConnection {

    public connected: boolean;
    public conn: mysql.Connection;

    constructor(private hostname?: string, private username?: string, private password?: string, private db?: string) {
        this.connected = false;
    }

    public connectAsync() {
        return new Promise<void>((resolve, reject) => {
            this.conn = mysql.createConnection({
                database: this.db,
                host: this.hostname,
                password: this.password,
                user: this.username,
            });
            this.conn.connect((error) => {
                if (error) {
                    return reject(error);
                }
                this.connected = true;
                return resolve();
            });
        });
    }

    public queryAsync(query: string) {
        return new Promise<any>((resolve, reject) => {
            this.conn.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }

    public closeAsync() {
        return new Promise<void>((resolve, reject) => {
            this.conn.end((error) => {
                if (error) {
                    return reject(error);
                }
                this.connected = false;
                return resolve();
            });
        });
    }

    public async executeAsync(query: string | Query) {
        await this.connectAsync();
        let result;
        try {
            result = await this.queryAsync(query.toString());
        } catch (exception) {
            throw exception;
        } finally {
            await this.closeAsync();
        }
        return result;
    }
}
