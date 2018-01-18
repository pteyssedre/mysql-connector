import { Query } from "./query";
export declare class Select extends Query {
    static Properties(...properties: string[]): Select;
    static Table(table: string): Select;
    private constructor();
    table(table: string): this;
    where(clause: string): this;
    leftJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this;
    leftOuterJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this;
    leftInnerJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this;
    rightJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this;
    rightOuterJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this;
    rightInnerJoinOn(leftTable: string, leftColumn: string, rightTable: string, rightColumn: string): this;
    private joinOn(joinType, leftTable, leftColumn, rightTable, rightColumn);
}
