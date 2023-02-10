import { ColumnData } from "./Column"

export interface TableData{
    id:number
    startX:number,
    startY:number,
    endX:number,
    endY:number,
    data:{
        name:string,
        column:Array<ColumnData>
    }
}
