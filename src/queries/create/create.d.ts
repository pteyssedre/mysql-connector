import { CreateDatabase } from "./create-database";
import { CreateTable } from "./create-table";
export declare class Create {
    static Table(table: string): CreateTable;
    static Database(name: string): CreateDatabase;
}
