export enum WhereOperator {
    AND = "AND",
    OR = "OR",
}

export class Query {

    public sql: string;

    constructor() {
        this.sql = "";
    }

    public where(clause: string | any, operator: WhereOperator = WhereOperator.AND): this {
        if (!clause || (typeof clause !== "string" && typeof clause !== "object")) {
            throw new Error("no clause was provided for where");
        }
        this.sql += " WHERE ";
        if (typeof clause === "string") {
            this.sql += clause.trim();
        } else if (typeof clause === "object") {
            const keys = Object.keys(clause);
            for (let i = 0; i < keys.length; i++) {
                const v = clause[keys[i]];
                const str = typeof v === "string" ? `'${v}'` : `${v}`;
                const n = i + 1 < keys.length ? " " + operator : "";
                const s = i === 0 ? "" : " ";
                this.sql += `${s}${keys[i]} = ${str}${n}`;
            }
        }
        return this;
    }

    public toString(): string {
        return this.sql;
    }
}
