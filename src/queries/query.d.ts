export declare enum WhereOperator {
    AND = "AND",
    OR = "OR",
}
export declare class Query {
    sql: string;
    constructor();
    where(clause: string | any, operator?: WhereOperator): this;
    toString(): string;
}
