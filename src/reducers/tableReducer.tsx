import { TableData } from "../types/Table";
import { newTable } from "../utils/table";
import { ACTIONS } from "./actions";

export const tableReducer=(tables:Array<TableData>,action:any):Array<TableData>=>{
    switch(action.type){
        case ACTIONS.CREATE_TABLE:
            return [...tables,newTable(action.payload)]
        case ACTIONS.DELETE_TABLE:
            return tables.filter(table=>table.id!==action.payload.id)
        default:
            return tables
    }
}