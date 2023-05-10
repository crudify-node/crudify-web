import {
  type CRUDIFY_DATA,
  type CRUDIFY_MODEL,
  type CRUDIFY_RELATIONAL_ATTRIBUTE,
  type CRUDIFY_STATIC_ATTRIBUTE
} from "../Constants/CrudifyData";
import { type RelationData } from "../Constants/Relation";
import { type TableData } from "../Constants/Table";
import { datatype } from "../enums/datatypes";
import {
  findTargetRelationsByColumnId,
  findTableDataByColumnId,
  checkIfRelationEndColumn
} from "./relation";
import { findColumnByColumnId } from "./table";

const getStaticFields = (TableData: TableData): CRUDIFY_STATIC_ATTRIBUTE[] => {
  const crudifyStaticField: CRUDIFY_STATIC_ATTRIBUTE[] =
    TableData.data.column.reduce(function (
      tables: CRUDIFY_STATIC_ATTRIBUTE[],
      columnObj
    ) {
      if (columnObj.isDelete !== false && !checkIfRelationEndColumn()) {
        tables.push({
          name: columnObj.data.name,
          type: datatype[columnObj.data.type.toUpperCase()]
        });
      }
      return tables;
    },
    []);
  return crudifyStaticField;
};

const getRelationalField = (
  tables: TableData[],
  TableData: TableData,
  RelationsData: RelationData[]
): CRUDIFY_RELATIONAL_ATTRIBUTE[] => {
  const crudifyStaticField: CRUDIFY_RELATIONAL_ATTRIBUTE[] =
    TableData.data.column
      .map((column) => {
        const relations = findTargetRelationsByColumnId(RelationsData, column);
        return relations.map((relation) => {
          const sourceColumn = findColumnByColumnId(
            tables,
            relation.sourceColumnId
          );
          return {
            connection: findTableDataByColumnId(sourceColumn, tables).data.name,
            foriegnKeyName: sourceColumn.data.name,
            targetKeyName: findColumnByColumnId(tables, relation.targetColumnId)
              .data.name,
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
        RelationalFields: getRelationalField(TableData, table, RelationsData)
      }
    };
    crudifyModels.push(crudifyModel);
  }
  const crudifyData: CRUDIFY_DATA = {
    Models: crudifyModels
  };
  return crudifyData;
};
