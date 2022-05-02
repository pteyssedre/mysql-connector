import { WhereOperator } from "./query";
export declare function Where(clause: any, operator?: WhereOperator): WhereClause;
export declare class WhereClause {
    static fromModel(clause: any, operator?: WhereOperator): WhereClause;
    sql: string;
    constructor(model?: any, operator?: WhereOperator);
    and(field: string | any, operator?: WhereOperator, value?: number | string): WhereClause;
    or(field: string | any, operator?: WhereOperator, value?: number | string): WhereClause;
    private parse;
}
