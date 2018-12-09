import { Where, WhereClause } from "./where";

export enum WhereOperator {
    AND = "AND",
    OR = "OR",
    DIFFERENT = "!=",
    EQUAL = "=",
    NOT_NULL = "IS NOT NULL",
    NULL = "IS NULL",
}

export class Query {

    public sql: string;

    constructor() {
        this.sql = "";
    }

    public where(clause: string | WhereClause | any, operator: WhereOperator = WhereOperator.AND): this {
        if (!clause || (typeof clause !== "string" && typeof clause !== "object")) {
            throw new Error("no clause was provided for where");
        }
        this.sql += " WHERE ";
        if (typeof clause === "string") {
            this.sql += clause.trim();
        } else if (typeof clause === "object") {
            if (clause.constructor.name === "WhereClause") {
                this.sql += (clause as WhereClause).sql;
            } else {
                this.sql += Where(clause, operator).sql;
            }
        }
        return this;
    }

    public toString(): string {
        return this.sql;
    }
}
