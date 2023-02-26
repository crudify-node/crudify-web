import { ColumnData } from "../Constants/Column";
import { TableData } from "../Constants/Table";

export function newTable(data: TableData): TableData {
    return data;
}
export function findColumnByColumnId(
    tables: Array<TableData>,
    id: number
): ColumnData {
    const column=tables.map((table)=>{
        return table.data.column.filter((col)=>col.id===id);
    }).flat(1);
    return column[0];
}
