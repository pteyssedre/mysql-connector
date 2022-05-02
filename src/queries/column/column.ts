import { Query } from "../query";
import { ColumnDataType } from "./column-data-type";
import { DefaultColumn } from "./column-default";
import { ColumnOptions, ColumnTypes } from "./column-type";

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

    public asBinary(length: number): this {
        if (isNaN(length)) {
            throw Error("Binary field must have a valid length");
        }
        this.sql += ` ${ColumnDataType.BINARY}(${length})`;
        return this;
    }

    public asString(length?: number): this {
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

    public nullable(): this {
        this.sql += ` NULL`;
        return this;
    }

    public asFloat(): this {
        this.sql += ` ${ColumnDataType.FLOAT}`;
        return this;
    }

    public asDecimal(n?: number, n2?: number): this {
        this.sql += ` ${ColumnDataType.DECIMAL}${n && n2 ? "(" + n + "," + n2 + ")" : ""}`;
        return this;
    }

    public asDouble(n?: number, n2?: number): this {
        this.sql += ` ${ColumnDataType.DOUBLE}${n && n2 ? "(" + n + "," + n2 + ")" : ""}`;
        return this;
    }

    public asDate(): this {
        this.sql += ` ${ColumnDataType.DATE}`;
        return this;
    }

    public asDateTime(): this {
        this.sql += ` ${ColumnDataType.DATETIME}`;
        return this;
    }

    public asTimestamp(): this {
        this.sql += ` ${ColumnDataType.TIMESTAMP}`;
        return this;
    }

    public asText(): this {
        this.sql += ` ${ColumnDataType.TEXT}`;
        return this;
    }

    public hasDefault(def: DefaultColumn | string | number): this {
        if (!def && def !== 0) {
            throw new Error("invalid default value");
        }
        // @ts-ignore
        const m = DefaultColumn[def as any];
        if (m) {
            this.sql += ` DEFAULT ${def.toString()}`;
        } else {
            this.sql += ` DEFAULT ${typeof def === "string" ? "'" + def + "'" : def.toString()}`;
        }
        return this;
    }
}
