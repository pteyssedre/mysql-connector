import { Query } from "./query";
export declare class Select extends Query {
    static Properties(...properties: string[]): Select;
    static Table(table: string): Select;
    private leftTable;
    private constructor();
    table(table: string): this;
    where(clause: string): this;
    leftJoinOn(leftColumn: string, rightTable: string, rightColumn: string): this;
}
