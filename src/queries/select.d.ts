import { Query } from "./query";
export declare class Select extends Query {
    static Properties(...properties: string[]): Select;
    static Table(table: string): Select;
    private constructor();
    table(table: string): this;
    limit(offset: number, limit: number): this;
    page(page: number, limit: number): this;
    leftJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string, alias?: string): this;
    leftOuterJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string, alias?: string): this;
    leftInnerJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string, alias?: string): this;
    rightJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string, alias?: string): this;
    rightOuterJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string, alias?: string): this;
    rightInnerJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string, alias?: string): this;
    joinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string, alias?: string, joinType?: string): this;
}
