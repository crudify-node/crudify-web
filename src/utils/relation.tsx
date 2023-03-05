import { type ColumnData } from "../Constants/Column";
import { type RelationData } from "../Constants/Relation";
import { type TableData } from "../Constants/Table";

export function newRelation(data: RelationData): RelationData {
  return data;
}

export function findRelationsByColumnId(
  relations: RelationData[],
  columnId: number
): RelationData[] {
  const relationData: RelationData[] = [];
  console.log(relations, columnId);
  for (const relation of relations) {
    if (relation.sourceColumnId === columnId) {
      console.log({ relation });
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
