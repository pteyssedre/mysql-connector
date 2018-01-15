import { Query } from "./query";
export declare class Select extends Query {
    static Properties(...properties: string[]): Select;
    static Table(table: string): Select;
    private constructor();
    table(table: string): this;
    where(clause: string): this;
}
