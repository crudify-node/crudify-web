import { type RelationData } from "../Constants/Relation";

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
