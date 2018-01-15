import { Query } from "./query";
export declare class Insert extends Query {
    static InTo(table: string): Insert;
    private properties;
    private constructor();
    property(key: string, value: string | null | number): void;
    fromModel(obj: any): this;
}
