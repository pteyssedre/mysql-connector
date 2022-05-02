"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.WhereOperator = void 0;
const where_1 = require("./where");
var WhereOperator;
(function (WhereOperator) {
    WhereOperator["AND"] = "AND";
    WhereOperator["OR"] = "OR";
    WhereOperator["DIFFERENT"] = "!=";
    WhereOperator["EQUAL"] = "=";
    WhereOperator["NOT_NULL"] = "IS NOT NULL";
    WhereOperator["NULL"] = "IS NULL";
})(WhereOperator = exports.WhereOperator || (exports.WhereOperator = {}));
class Query {
    constructor() {
        this.sql = "";
    }
    where(clause, operator = WhereOperator.AND) {
        if (!clause || (typeof clause !== "string" && typeof clause !== "object")) {
            throw new Error("no clause was provided for where");
        }
        this.sql += " WHERE ";
        if (typeof clause === "string") {
            this.sql += clause.trim();
        }
        else if (typeof clause === "object") {
            if (clause.constructor.name === "WhereClause") {
                this.sql += clause.sql;
            }
            else {
                this.sql += (0, where_1.Where)(clause, operator).sql;
            }
        }
        return this;
    }
    toString() {
        return this.sql;
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map