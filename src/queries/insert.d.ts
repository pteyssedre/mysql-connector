import { Query } from "./query";
export declare class Insert extends Query {
    static InTo(table: string): Insert;
    private properties;
    private constructor();
    property(key: string, value: string | number): this;
    fromModel(obj: any): this;
}
