import { Query } from "./query";
export declare class Update extends Query {
    static Table(table: string): Update;
    private constructor();
    fromModel(data: any): this;
}
