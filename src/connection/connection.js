"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySqlConnection {
    constructor(hostname, username, password, db) {
        this.hostname = hostname;
        this.username = username;
        this.password = password;
        this.db = db;
        this.connected = false;
    }
    connectAsync() {
        return new Promise((resolve, reject) => {
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
    queryAsync(query) {
        return new Promise((resolve, reject) => {
            this.conn.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }
    closeAsync() {
        return new Promise((resolve, reject) => {
            this.conn.end((error) => {
                if (error) {
                    return reject(error);
                }
                this.connected = false;
                return resolve();
            });
        });
    }
    executeAsync(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectAsync();
            let result;
            try {
                result = yield this.queryAsync(query.toString());
            }
            catch (exception) {
                throw exception;
            }
            finally {
                yield this.closeAsync();
            }
            return result;
        });
    }
}
exports.MySqlConnection = MySqlConnection;
//# sourceMappingURL=connection.js.map