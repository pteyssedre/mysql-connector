import mysql = require("mysql");
import {TypeCast} from "mysql";
import {Query} from "../queries/query";

export class MySqlConnection {

    public connected: boolean;
    public conn: mysql.Connection | undefined;

    constructor(private configuration: {
        hostname?: string,
        username?: string,
        password?: string,
        db?: string,
        port?: number,
        typeCast?: TypeCast
    }) {
        this.connected = false;
    }

    public connectAsync() {
        return new Promise<void>((resolve, reject) => {
            this.conn = mysql.createConnection({
                database: this.configuration.db,
                host: this.configuration.hostname,
                password: this.configuration.password,
                user: this.configuration.username,
                port: this.configuration.port ?? 3306,
                typeCast: this.configuration.typeCast ?? undefined
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
            if (!this.conn) {
                return reject('connection not initialized');
            }
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
            if (!this.conn) {
                return reject('connection not initialized');
            }
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
