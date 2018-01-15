import { Column } from "../column/column";
export declare class CreateTable extends Column {
    private foreignKeys;
    constructor(table: string);
    withForeignKey(property: string, parentTable: string, column: string, foreignKeyName?: string): this;
    toString(): string;
}
