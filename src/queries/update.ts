import {Query} from "./query";

export class Update extends Query {

    public static Table(table: string): Update {
        if (!table) {
            throw new Error("no valid table was provided");
        }
        const update = new Update();
        update.sql += ` ${table.trim()}`;
        return update;
    }

    private constructor() {
        super();
        this.sql = "UPDATE";
    }

    public fromModel(data: any): this {
        if (!data) {
            throw new Error("no data was provided");
        }
        if (typeof data === "object") {
            this.sql += " SET ";
            const keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                const v = data[keys[i]];
                const str = typeof v === "string" ? `'${v}'` : `${v}`;
                this.sql += `${i === 0 ? "" : " "}${keys[i]} = ${str}${i + 1 < keys.length ? "," : ""}`;
            }
        }
        return this;
    }

    public where(clause: string): this {
        if (!clause) {
            throw new Error("no valid clause was provided");
        }
        this.sql += ` WHERE ${clause.trim()}`;
        return this;
    }
}
