import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../types/Table";
import Table from "../Table";
import createRelation from "../../assets/images/convertToCode.svg";

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
                        data={table}
                        key={table.id}
                        tableDispatch={tableDispatch}
                    ></Table>
                );
            })}
            <div className="absolute bottom-[10px] right-[10px]">
                <label
                    htmlFor=""
                    title="Convert to code!"
                    className="labelInput rounded "
                    // onClick={handleCreateTable}
                >
                    <input type="text" className="inp-invisible h-0 w-0" />
                    <div className="iconToolbar text-white rounded bg-[#4F4D80]">
                        <img src={createRelation} alt="" className="h-4 w-4 " />
                    </div>
                </label>
            </div>
        </div>
    );
}

export default Canvas;
