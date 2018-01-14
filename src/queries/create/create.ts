import {CreateDatabase} from "./create-database";
import {CreateTable} from "./create-table";

export class Create {

    public static Table(table: string): CreateTable {
        if (!table) {
            throw new Error("table name not valid");
        }
        return new CreateTable(table);
    }

    public static Database(name: string): CreateDatabase {
        if (!name) {
            throw new Error("database name not valid");
        }
        return new CreateDatabase(name);
    }
}
