import {Query} from "../query";
import {ColumnDataType} from "./column-data-type";
import {ColumnOptions, ColumnTypes} from "./column-type";

export class Column extends Query implements ColumnOptions, ColumnTypes {

    private columns: number = 0;

    public withColumnName(name: string): this {
        if (!name) {
            throw new Error("invalid columns name");
        }
        this.sql += `${this.columns > 0 ? "," : ""} ${name.trim()}`;
        this.columns++;
        return this;
    }

    public asInt32(): this {
        this.sql += ` ${ColumnDataType.INT}`;
        return this;
    }

    public asInt64(): this {
        this.sql += ` ${ColumnDataType.BIGINT}`;
        return this;
    }

    public asBoolean(): this {
        this.sql += ` ${ColumnDataType.BOOLEAN}`;
        return this;
    }

    public asString(length?: string): this {
        this.sql += ` ${ColumnDataType.STRING}(${length ? length : "255"})`;
        return this;
    }

    public isIdentity(): this {
        this.sql += ` NOT NULL AUTO_INCREMENT PRIMARY KEY`;
        return this;
    }

    public notNull(): this {
        this.sql += ` NOT NULL`;
        return this;
    }

    public hasDefault(def: any): this {
        this.sql += ` ${def ? "DEFAULT '" + def + "'" : ""}`;
        return this;
    }
}
