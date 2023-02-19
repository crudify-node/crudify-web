import { ColumnData } from "./Column";

export interface RelationData {
    id: number;
    sourceColumnId: number;
    targetColumnId: number;
    data: {
        type:string
    };
}
