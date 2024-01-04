"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlConnection = void 0;
const mysql = require("mysql");
class MySqlConnection {
    constructor(configuration) {
        this.configuration = configuration;
        this.connected = false;
    }
    connectAsync() {
        return new Promise((resolve, reject) => {
            var _a, _b;
            this.conn = mysql.createConnection({
                database: this.configuration.db,
                host: this.configuration.hostname,
                password: this.configuration.password,
                user: this.configuration.username,
                port: (_a = this.configuration.port) !== null && _a !== void 0 ? _a : 3306,
                typeCast: (_b = this.configuration.typeCast) !== null && _b !== void 0 ? _b : undefined
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
    closeAsync() {
        return new Promise((resolve, reject) => {
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