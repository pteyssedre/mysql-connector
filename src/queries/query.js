"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WhereOperator;
(function (WhereOperator) {
    WhereOperator["AND"] = "AND";
    WhereOperator["OR"] = "OR";
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
            const keys = Object.keys(clause);
            for (let i = 0; i < keys.length; i++) {
                const v = clause[keys[i]];
                const str = typeof v === "string" ? `'${v}'` : `${v}`;
                const n = i + 1 < keys.length ? " " + operator : "";
                const s = i === 0 ? "" : " ";
                switch (v) {
                    case null:
                        this.sql += `${s}${keys[i]} IS NULL${n}`;
                        break;
                    case "null":
                    case "NULL":
                    case "NOT NULL":
                    case "not null":
                        this.sql += `${s}${keys[i]} IS ${v.toUpperCase()}${n}`;
                        break;
                    default:
                        this.sql += `${s}${keys[i]} = ${str}${n}`;
                        break;
                }
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