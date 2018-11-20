import { Query } from "../query";
import { DefaultColumn } from "./column-default";
import { ColumnOptions, ColumnTypes } from "./column-type";
export declare class Column extends Query implements ColumnOptions, ColumnTypes {
    private columns;
    withColumnName(name: string): this;
    asInt32(): this;
    asInt64(): this;
    asBoolean(): this;
    asBinary(length: number): this;
    asString(length?: number): this;
    isIdentity(): this;
    notNull(): this;
    nullable(): this;
    asFloat(): this;
    asDecimal(n?: number, n2?: number): this;
    asDouble(n?: number, n2?: number): this;
    asDate(): this;
    asDateTime(): this;
    asTimestamp(): this;
    asText(): this;
    hasDefault(def: DefaultColumn | string | number): this;
}
