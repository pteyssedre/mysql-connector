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
    asFloat(): ColumnOptions;
    asDecimal(n?: number, n2?: number): ColumnOptions;
    asDouble(): ColumnOptions;
    asDate(): ColumnOptions;
    asDateTime(): ColumnOptions;
    asTimestamp(): ColumnOptions;
    asText(): ColumnOptions;
}