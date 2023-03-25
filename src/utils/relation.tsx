import { type ColumnData } from "../Constants/Column";
import { type RelationData } from "../Constants/Relation";
import { type TableData } from "../Constants/Table";

export function newRelation(data: RelationData): RelationData {
  return data;
}

export function findRelationsByColumnId(
  relations: RelationData[],
  column: ColumnData
): RelationData[] {
  const relationData: RelationData[] = [];
  const columnId = column.id;
  for (const relation of relations) {
    if (relation.targetColumnId === columnId) {
      relationData.push(relation);
    }
  }
  return relationData;
}

export function findTableDataByColumnId(
  column: ColumnData,
  tables: TableData[]
): TableData {
  const table = tables.filter((table) => table.id === column.tableId)[0];
  return table;
}
