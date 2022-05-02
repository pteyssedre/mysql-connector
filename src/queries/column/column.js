"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const query_1 = require("../query");
const column_data_type_1 = require("./column-data-type");
const column_default_1 = require("./column-default");
class Column extends query_1.Query {
    constructor() {
        super(...arguments);
        this.columns = 0;
    }
    withColumnName(name) {
        if (!name) {
            throw new Error("invalid columns name");
        }
        this.sql += `${this.columns > 0 ? "," : ""} ${name.trim()}`;
        this.columns++;
        return this;
    }
    asInt32() {
        this.sql += ` ${column_data_type_1.ColumnDataType.INT}`;
        return this;
    }
    asInt64() {
        this.sql += ` ${column_data_type_1.ColumnDataType.BIGINT}`;
        return this;
    }
    asBoolean() {
        this.sql += ` ${column_data_type_1.ColumnDataType.BOOLEAN}`;
        return this;
    }
    asBinary(length) {
        if (isNaN(length)) {
            throw Error("Binary field must have a valid length");
        }
        this.sql += ` ${column_data_type_1.ColumnDataType.BINARY}(${length})`;
        return this;
    }
    asString(length) {
        this.sql += ` ${column_data_type_1.ColumnDataType.STRING}(${length ? length : "255"})`;
        return this;
    }
    isIdentity() {
        this.sql += ` NOT NULL AUTO_INCREMENT PRIMARY KEY`;
        return this;
    }
    notNull() {
        this.sql += ` NOT NULL`;
        return this;
    }
    nullable() {
        this.sql += ` NULL`;
        return this;
    }
    asFloat() {
        this.sql += ` ${column_data_type_1.ColumnDataType.FLOAT}`;
        return this;
    }
    asDecimal(n, n2) {
        this.sql += ` ${column_data_type_1.ColumnDataType.DECIMAL}${n && n2 ? "(" + n + "," + n2 + ")" : ""}`;
        return this;
    }
    asDouble(n, n2) {
        this.sql += ` ${column_data_type_1.ColumnDataType.DOUBLE}${n && n2 ? "(" + n + "," + n2 + ")" : ""}`;
        return this;
    }
    asDate() {
        this.sql += ` ${column_data_type_1.ColumnDataType.DATE}`;
        return this;
    }
    asDateTime() {
        this.sql += ` ${column_data_type_1.ColumnDataType.DATETIME}`;
        return this;
    }
    asTimestamp() {
        this.sql += ` ${column_data_type_1.ColumnDataType.TIMESTAMP}`;
        return this;
    }
    asText() {
        this.sql += ` ${column_data_type_1.ColumnDataType.TEXT}`;
        return this;
    }
    hasDefault(def) {
        if (!def && def !== 0) {
            throw new Error("invalid default value");
        }
        // @ts-ignore
        const m = column_default_1.DefaultColumn[def];
        if (m) {
            this.sql += ` DEFAULT ${def.toString()}`;
        }
        else {
            this.sql += ` DEFAULT ${typeof def === "string" ? "'" + def + "'" : def.toString()}`;
        }
        return this;
    }
}
exports.Column = Column;
//# sourceMappingURL=column.js.map