import { Column } from "./column";
export interface ColumnOptions {
    isIdentity(): ColumnOptions | Column;
    notNull(): ColumnOptions;
    hasDefault(def: any): ColumnOptions;
}
export interface ColumnTypes {
    asInt32(): ColumnOptions;
    asInt64(): ColumnOptions;
    asBoolean(): ColumnOptions;
    asString(): ColumnOptions;
}
