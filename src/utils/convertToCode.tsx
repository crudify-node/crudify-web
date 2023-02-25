import {
    CRUDIFY_DATA,
    CRUDIFY_MODEL,
    CRUDIFY_RELATIONAL_ATTRIBUTE,
    CRUDIFY_STATIC_ATTRIBUTE,
} from "../Constants/CrudifyData";
import { RelationData } from "../Constants/Relation";
import { TableData } from "../Constants/Table";
import { findRelationsByColumnId } from "./relation";

const getStaticFields = (
    TableData: TableData
): Array<CRUDIFY_STATIC_ATTRIBUTE> => {
    const crudifyStaticField: Array<CRUDIFY_STATIC_ATTRIBUTE> =
        TableData.data.column.map((column) => {
            return {
                name: column.data.name,
                type: column.data.type,
            };
        });
    return crudifyStaticField;
};

const getRelationalField = (
    TableData: TableData,
    RelationsData: Array<RelationData>
): Array<CRUDIFY_RELATIONAL_ATTRIBUTE> => {
    const crudifyStaticField: Array<CRUDIFY_RELATIONAL_ATTRIBUTE> =
        TableData.data.column
            .map((column) => {
                const relations = findRelationsByColumnId(
                    RelationsData,
                    column.id
                );
                return relations.map((relation) => {
                    return {
                        connection: relation.data.type,
                        foriegnKeyName: relation.targetColumnId.toString(),
                        type: relation.data.type,
                    };
                });
            })
            .flat(1);
    return crudifyStaticField;
};

export const convertToCode = (
    TableData: Array<TableData>,
    RelationsData: Array<RelationData>
): CRUDIFY_DATA => {
    const crudifyModels: Array<CRUDIFY_MODEL> = [];
    for (const table of TableData) {
        const crudifyModel: CRUDIFY_MODEL = {
            name: table.data.name,
            attributes: {
                StaticFields: getStaticFields(table),
                RelationalFields: getRelationalField(table, RelationsData),
            },
        };
        crudifyModels.push(crudifyModel);
    }
    const crudifyData: CRUDIFY_DATA = {
        Models: crudifyModels,
    };
    return crudifyData;
};
