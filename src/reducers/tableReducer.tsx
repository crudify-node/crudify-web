import { Table } from "../types/Table";
import { newTable } from "../utils/table";
import { ACTIONS } from "./actions";

export const tableReducer=(tables:Array<Table>,action:any):Array<Table>=>{
    switch(action.type){
        case ACTIONS.CREATE_TABLE:
            return [...tables,newTable(action.payload.data)]
        case ACTIONS.DELETE_TABLE:
            return tables.filter(table=>table.id!==action.payload.id)
        default:
            return tables
    }
}