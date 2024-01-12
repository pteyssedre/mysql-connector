import {WhereOperator} from "./query";

export function Where(clause: any, operator: WhereOperator = WhereOperator.AND): WhereClause {
    return WhereClause.fromModel(clause, operator);
}

export class WhereClause {

    public static fromModel(clause: any, operator: WhereOperator = WhereOperator.AND) {
        return new WhereClause(clause, operator);
    }

    public sql = "";

    constructor(model?: any, operator: WhereOperator = WhereOperator.AND) {
        this.sql = "";
        this.parse(model, operator);
    }

    public and(field: string | any, operator?: WhereOperator, value?: number | string): WhereClause {
        if (value && typeof value === "string") {
            value = `'${value}'`;
        } else {
          value = value != undefined ? value : ""
        }
        operator = operator ? operator : WhereOperator.EQUAL
        this.sql = this.sql.trim() + " AND " +
            `${field} ${operator.toString()} ${value}`.trim();
        return this;
    }

    public or(field: string | any, operator?: WhereOperator, value?: number | string): WhereClause {
        if (value && typeof value === "string") {
            value = `'${value}'`;
        } else {
            value = value != undefined ? value : ""
        }
        operator = operator ? operator : WhereOperator.EQUAL
        this.sql = this.sql.trim() + " OR " +
            `${field} ${operator.toString()} ${value}`.trim();
        return this;
    }

    private parse(model: any, operator: WhereOperator = WhereOperator.AND): WhereClause {
        const keys = Object.keys(model);
        for (let i = 0; i < keys.length; i++) {
            const v = model[keys[i]];
            const n = i + 1 < keys.length ? " " + operator : "";
            const s = i === 0 ? "" : " ";
            const str = typeof v === "string" ? `'${v}'` : `${v}`;
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
                    const isArray = typeof v === "object" && !!v.length;
                    if (isArray) {
                        this.sql += `${s}${keys[i]} IN (${v.reduce((acc: string, vv: any, index: number) => {
                            acc += typeof vv === "string" ? `'${vv}'` : `${vv}`;
                            if (index + 1 < v.length) {
                                acc += ', ';
                            }
                            return acc;
                        }, '').trim()})`;
                        break;
                    }
                    this.sql += `${s}${keys[i]} = ${str}${n}`;
                    break;
            }
        }
        return this;
    }
}
