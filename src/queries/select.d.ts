import { Query } from "./query";
export declare class Select extends Query {
    static Properties(...properties: string[]): Select;
    static Table(table: string): Select;
    private constructor();
    table(table: string): this;
    limit(offset: number, limit: number): this;
    page(page: number, limit: number): this;
    leftJoinOn(lTab: string, lCol: string, rTab: string, rCol: string, alias?: string): this;
    leftOuterJoinOn(lTab: string, lCol: string, rTab: string, rCol: string, alias?: string): this;
    leftInnerJoinOn(lTab: string, lCol: string, rTab: string, rCol: string, alias?: string): this;
    rightJoinOn(lTab: string, lCol: string, rTab: string, rCol: string, alias?: string): this;
    rightOuterJoinOn(lTab: string, lCol: string, rTab: string, rCol: string, alias?: string): this;
    rightInnerJoinOn(lTab: string, lCol: string, rTab: string, rCol: string, alias?: string): this;
    joinOn(lTab: string, lCol: string, rTab: string, rCol: string, alias?: string, joinType?: string): this;
}
