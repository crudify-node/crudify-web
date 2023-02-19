import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../Constants/Table";
import Table from "../Table";
import createRelation from "../../assets/images/convertToCode.svg";
import { RelationData } from "../../Constants/Relation";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../../Constants/ItemTypes";
interface CanvasProps {
    tables: Array<TableData>;
    tableDispatch: Dispatch<any>;
    setSelectedItem: Dispatch<SetStateAction<number>>;
    selectedItem: number;
    relations: Array<RelationData>;
}
function Canvas({
    tables,
    tableDispatch,
    selectedItem,
    setSelectedItem,
    relations,
}: CanvasProps) {
    // const [{ position }, drop] = useDrop(() => ({
    //     accept: ItemTypes.TABLE,
    //     drop: (item) => {
    //         console.log(position,item)
    //     },
    //     collect: monitor => {
    //         return {
    //             position:monitor.getInitialSourceClientOffset()
    //         }
    //     },
    //   }))
    return (
        <div
            className="min-w-screen min-h-screen"
            // ref={drop}
        >
            {tables.map((table) => {
                return (
                    <Table
                        data={table}
                        key={table.id}
                        tableDispatch={tableDispatch}
                        relations={relations}
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
                    <div className="iconToolbar text-white rounded bg-[#6562b9] hover:bg-[#4F4D80]">
                        <img src={createRelation} alt="" className="h-4 w-4 " />
                    </div>
                </label>
            </div>
        </div>
    );
}

export default Canvas;
