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

export function setRelationCoordinates(relation: RelationData): void {
  const { sourceColumnId, targetColumnId, id } = relation;
  const sourceColumn = document.getElementById(sourceColumnId.toString());
  const targetColumn = document.getElementById(targetColumnId.toString());
  console.log(sourceColumn);

  if (sourceColumn != null && targetColumn != null) {
    const sourceColumnRect: DOMRect = sourceColumn.getBoundingClientRect();
    const targetColumnRect: DOMRect = targetColumn.getBoundingClientRect();
    const { left: sourceX, top: sourceY } = sourceColumnRect;
    const { left: targetX, top: targetY } = targetColumnRect;
    const coordinates = {
      sourceX: sourceX + sourceColumnRect.width,
      sourceY: sourceY + sourceColumnRect.height / 2,
      targetX,
      targetY: targetY + targetColumnRect.height / 2
    };
    document
      .getElementById(id.toString())
      ?.setAttribute(
        "points",
        coordinates.sourceX.toString() +
          " " +
          coordinates.sourceY.toString() +
          "," +
          ((coordinates.sourceX + coordinates.targetX) / 2).toString() +
          " " +
          coordinates.sourceY.toString() +
          "," +
          ((coordinates.sourceX + coordinates.targetX) / 2).toString() +
          " " +
          coordinates.targetY.toString() +
          "," +
          coordinates.targetX.toString() +
          " " +
          coordinates.targetY.toString()
      );
  }
}
