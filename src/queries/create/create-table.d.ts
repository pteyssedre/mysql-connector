import { Column } from "../column/column";
import { CreateDatabase } from "./create-database";
export declare class CreateTable extends Column {
    private readonly foreignKeys;
    constructor(table: string);
    ifNotExists(): CreateDatabase;
    withForeignKey(property: string, parentTable: string, column: string, foreignKeyName?: string): this;
    toString(): string;
}
