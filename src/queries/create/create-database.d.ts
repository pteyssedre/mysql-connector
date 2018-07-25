import { Query } from "../query";
export declare class CreateDatabase extends Query {
    constructor(name: string);
    ifNotExists(): CreateDatabase;
}
