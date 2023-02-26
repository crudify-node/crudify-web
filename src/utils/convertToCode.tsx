import {
  type CRUDIFY_DATA,
  type CRUDIFY_MODEL,
  type CRUDIFY_RELATIONAL_ATTRIBUTE,
  type CRUDIFY_STATIC_ATTRIBUTE
} from "../Constants/CrudifyData";
import { type RelationData } from "../Constants/Relation";
import { type TableData } from "../Constants/Table";
import { findRelationsByColumnId } from "./relation";

const getStaticFields = (TableData: TableData): CRUDIFY_STATIC_ATTRIBUTE[] => {
  const crudifyStaticField: CRUDIFY_STATIC_ATTRIBUTE[] =
    TableData.data.column.map((column) => {
      return {
        name: column.data.name,
        type: column.data.type
      };
    });
  return crudifyStaticField;
};

const getRelationalField = (
  TableData: TableData,
  RelationsData: RelationData[]
): CRUDIFY_RELATIONAL_ATTRIBUTE[] => {
  const crudifyStaticField: CRUDIFY_RELATIONAL_ATTRIBUTE[] =
    TableData.data.column
      .map((column) => {
        const relations = findRelationsByColumnId(RelationsData, column.id);
        return relations.map((relation) => {
          return {
            connection: relation.data.type,
            foriegnKeyName: relation.targetColumnId.toString(),
            type: relation.data.type
          };
        });
      })
      .flat(1);
  return crudifyStaticField;
};

export const convertToCode = (
  TableData: TableData[],
  RelationsData: RelationData[]
): CRUDIFY_DATA => {
  const crudifyModels: CRUDIFY_MODEL[] = [];
  for (const table of TableData) {
    const crudifyModel: CRUDIFY_MODEL = {
      name: table.data.name,
      attributes: {
        StaticFields: getStaticFields(table),
        RelationalFields: getRelationalField(table, RelationsData)
      }
    };
    crudifyModels.push(crudifyModel);
  }
  const crudifyData: CRUDIFY_DATA = {
    Models: crudifyModels
  };
  return crudifyData;
};
