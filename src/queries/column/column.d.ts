import { Query } from "../query";
import { ColumnOptions, ColumnTypes } from "./column-type";
export declare class Column extends Query implements ColumnOptions, ColumnTypes {
    private columns;
    withColumnName(name: string): this;
    asInt32(): this;
    asInt64(): this;
    asBoolean(): this;
    asString(length?: string): this;
    isIdentity(): this;
    notNull(): this;
    hasDefault(def: any): this;
}
