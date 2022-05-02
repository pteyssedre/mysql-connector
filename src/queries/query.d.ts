import { WhereClause } from "./where";
export declare enum WhereOperator {
    AND = "AND",
    OR = "OR",
    DIFFERENT = "!=",
    EQUAL = "=",
    NOT_NULL = "IS NOT NULL",
    NULL = "IS NULL"
}
export declare class Query {
    sql: string;
    constructor();
    where(clause: string | WhereClause | any, operator?: WhereOperator): this;
    toString(): string;
}
