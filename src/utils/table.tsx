import { type ColumnData } from "../Constants/Column";
import type { RelationData } from "../Constants/Relation";
import { type TableData } from "../Constants/Table";
import { datatype } from "../enums/datatypes";

export function newTable(data: TableData): TableData {
  const column: ColumnData = {
    id: Date.now(),
    tableId: data.id,
    data: { name: "id", type: datatype.INT },
    isDelete: false
  };
  console.log({ column });
  if (data.data.column.length === 0) data.data.column.push(column);
  return data;
}
export function findColumnByColumnId(
  tables: TableData[],
  id: number
): ColumnData {
  const column = tables
    .map((table) => {
      return table.data.column.filter((col) => col.id === id);
    })
    .flat(1);
  return column[0];
}
export function tableRelationExists(
  table: TableData,
  relation: RelationData
): boolean {
  for (const col of table.data.column) {
    if (
      relation.sourceColumnId === col.id ||
      relation.targetColumnId === col.id
    ) {
      return true;
    }
  }
  return false;
}
