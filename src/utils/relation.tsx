import { ColumnData } from "../Constants/Column";
import { RelationData } from "../Constants/Relation";
import { TableData } from "../Constants/Table";

export function newRelation(data:RelationData):RelationData{
    return data;
}

export function findRelationsByColumnId(relations:Array<RelationData>,columnId:number):Array<RelationData>
{
    const relationData:Array<RelationData>=[];
    console.log(relations,columnId);
    for(const relation of relations){
        if(relation.sourceColumnId===columnId){
            console.log({relation})
            relationData.push(relation);
        }
    }
    return relationData;
}

export function findTableDataByColumnId(column:ColumnData,tables:Array<TableData>):TableData{
    const table=tables.filter((table)=>table.id===column.tableId)[0];
    return table;
}