"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereClause = exports.Where = void 0;
const query_1 = require("./query");
function Where(clause, operator = query_1.WhereOperator.AND) {
    return WhereClause.fromModel(clause, operator);
}
exports.Where = Where;
class WhereClause {
    constructor(model, operator = query_1.WhereOperator.AND) {
        this.sql = "";
        this.sql = "";
        this.parse(model, operator);
    }
    static fromModel(clause, operator = query_1.WhereOperator.AND) {
        return new WhereClause(clause, operator);
    }
    and(field, operator, value) {
        if (value && typeof value === "string") {
            value = `'${value}'`;
        }
        else {
            value = value != undefined ? value : "";
        }
        operator = operator ? operator : query_1.WhereOperator.EQUAL;
        this.sql = this.sql.trim() + " AND " +
            `${field} ${operator.toString()} ${value}`.trim();
        return this;
    }
    or(field, operator, value) {
        if (value && typeof value === "string") {
            value = `'${value}'`;
        }
        else {
            value = value != undefined ? value : "";
        }
        operator = operator ? operator : query_1.WhereOperator.EQUAL;
        this.sql = this.sql.trim() + " OR " +
            `${field} ${operator.toString()} ${value}`.trim();
        return this;
    }
    parse(model, operator = query_1.WhereOperator.AND) {
        const keys = Object.keys(model);
        for (let i = 0; i < keys.length; i++) {
            const v = model[keys[i]];
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
        return this;
    }
}
exports.WhereClause = WhereClause;
//# sourceMappingURL=where.js.map