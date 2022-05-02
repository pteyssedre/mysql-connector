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
exports.DbContext = void 0;
class DbContext {
    constructor(connection) {
        this.connection = connection;
    }
    inTransactionAsync(asyncAction) {
        return __awaiter(this, void 0, void 0, function* () {
            let original = false;
            if (!this.connection.connected) {
                yield this.connection.connectAsync();
                yield this.connection.queryAsync("START TRANSACTION");
                original = true;
            }
            let result;
            try {
                result = yield asyncAction(this);
            }
            catch (exception) {
                yield this.rollback();
                throw exception;
            }
            if (original) {
                yield this.connection.queryAsync("COMMIT");
                yield this.connection.closeAsync();
            }
            return result;
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.queryAsync("ROLLBACK");
            yield this.connection.closeAsync();
        });
    }
    executeAsync(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection.connected) {
                return this.connection.executeAsync(sql.toString());
            }
            else {
                return yield this.connection.queryAsync(sql.toString());
            }
        });
    }
}
exports.DbContext = DbContext;
//# sourceMappingURL=connector.js.map