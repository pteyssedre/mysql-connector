import {DropDatabase} from "./drop-table";

export class Drop {

    public static Database(name: string): DropDatabase {
        if (!name) {
            throw new Error("no valid database name");
        }
        return new DropDatabase(name);
    }
}