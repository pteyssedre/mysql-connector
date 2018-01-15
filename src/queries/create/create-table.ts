import {Column} from "../column/column";

export class CreateTable extends Column {

    private foreignKeys: string[];

    constructor(table: string) {
        super();
        this.foreignKeys = [];
        this.sql = `CREATE TABLE ${table.trim()} (`;
    }

    public withForeignKey(property: string, parentTable: string, column: string, foreignKeyName?: string): this {
        if (!property || this.sql.indexOf(property) === -1) {
            throw new Error("property must be declare first");
        }
        if (!parentTable) {
            throw new Error("parent table must be set");
        }
        if (!column) {
            throw new Error("parent column must be set");
        }
        if (!foreignKeyName) {
            foreignKeyName = `fk_${property}_${parentTable}`;
        }
        const constrains = ` FOREIGN KEY ${foreignKeyName}(${property}) REFERENCES ${parentTable}(${column})`;
        this.foreignKeys.push(constrains);
        return this;
    }

    public toString(): string {
        let v = this.sql;
        if (this.foreignKeys.length > 0) {
            for (const fk of this.foreignKeys) {
                v += `,${fk}`;
            }
        }
        v += ")";
        return v;
    }
}
