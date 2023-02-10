import { TableData } from "../types/Table";
import { newTable } from "../utils/table";
import { ACTIONS } from "./actions";

export const tableReducer = (
    tables: Array<TableData>,
    action: any
): Array<TableData> => {
    switch (action.type) {
        case ACTIONS.CREATE_TABLE: {
            const tableData = JSON.parse(
                localStorage.getItem("tableData") || "{}"
            );
            tableData["data"] = [...tables, newTable(action.payload)];
            localStorage.setItem("tableData", JSON.stringify(tableData));
            return [...tables, newTable(action.payload)];
        }
        case ACTIONS.DELETE_TABLE: {
            const updatedTables = tables.filter(
                (table) => table.id !== action.payload.id
            );
            localStorage.setItem(
                "tableData",
                JSON.stringify({ data: updatedTables })
            );
            return updatedTables;
        }
        case ACTIONS.SET_DATA:
            return action.payload.data;
        case ACTIONS.EDIT_TABLE: {
            const editedTableData = tables.map((table) => {
                if (table.id === action.payload.id) {
                    return action.payload;
                }
                return table;
            });
            const tableData = JSON.parse(
                localStorage.getItem("tableData") || "{}"
            );
            tableData["data"] = editedTableData;
            localStorage.setItem("tableData", JSON.stringify(tableData));
            return editedTableData;
        }
        case ACTIONS.DELETE_COLUMN: {
            const editedTableData = tables.map((table) => {
                if (table.id === action.payload.tableId) {
                    table.data.column = table.data.column.filter(
                        (column) => column.id !== action.payload.id
                    );
                    return table;
                }
                return table;
            });
            const tableData = JSON.parse(
                localStorage.getItem("tableData") || "{}"
            );
            tableData["data"] = editedTableData;
            localStorage.setItem("tableData", JSON.stringify(tableData));
            return editedTableData;
        }
        case ACTIONS.EDIT_COLUMN: {
            const editedTableData = tables.map((table) => {
                if (table.id === action.payload.tableId) {
                    table.data.column = table.data.column.map((column) => {
                        if (column.id === action.payload.id) {
                            return action.payload;
                        }
                        return column;
                    });
                    return table;
                }
                return table;
            });
            const tableData = JSON.parse(
                localStorage.getItem("tableData") || "{}"
            );
            tableData["data"] = editedTableData;
            localStorage.setItem("tableData", JSON.stringify(tableData));
            return editedTableData;
        }
        default:
            return tables;
    }
};
