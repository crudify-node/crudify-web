import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../types/Table";
import Table from "../Table";
interface CanvasProps {
    tables: Array<TableData>;
    tableDispatch: Dispatch<any>;
    setSelectedItem: Dispatch<SetStateAction<number>>;
    selectedItem: number;
}
function Canvas({
    tables,
    tableDispatch,
    selectedItem,
    setSelectedItem,
}: CanvasProps) {
    return (
        <div className="min-w-screen min-h-screen">
            {tables.map((table) => {
                return (
                    <Table
                        data={{ id: table.id }}
                        key={table.id}
                        tableDispatch={tableDispatch}
                    ></Table>
                );
            })}
            <button className="absolute bottom-0 right-0 m-8 bg-gray-400 p-8 rounded text-black">
                Convert to Code
            </button>
        </div>
    );
}

export default Canvas;
