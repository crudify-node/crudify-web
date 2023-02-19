import { Dispatch } from "react";
import useDragger from "../../hooks/useDragger";
import addColumn from "../../assets/images/addColumn.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { ACTIONS } from "../../reducers/actions";
import { ColumnData } from "../../Constants/Column";
import { TableData } from "../../Constants/Table";
import Column from "./Column";
import { RelationData } from "../../Constants/Relation";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../Constants/ItemTypes";
interface TableProps {
    data: TableData;
    tableDispatch: Dispatch<any>;
    relations:Array<RelationData>
}
const Table = ({ data, tableDispatch,relations }: TableProps) => {
    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: ItemTypes.TABLE,
    //     item:{id:data.id},
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));
    
    useDragger(data, tableDispatch);
    const handleCreateColumn = (e: any) => {
        e.preventDefault();
        const column: ColumnData = {
            id: 2 * Date.now(),
            tableId:data.id,
            data: {
                name: "test",
                type: "string",
            },
        };
        data.data.column.push(column);
        tableDispatch({ type: ACTIONS.EDIT_TABLE, payload: data });
    };
    const handleDeleteTable = (e: any) => {
        e.preventDefault();
        tableDispatch({ type: ACTIONS.DELETE_TABLE, payload: data });
    };
    return (
        <div
            id={data.id.toString()}
            className="flex items-center justify-center absolute min-h-[50px] z-100 border-2 border-white border-solid mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            // ref={drag}
            // style={{border:isDragging?"5px solid pink":"0px", top:data.startY,left:data.startX}}

        >
            <div className="flex flex-col w-full">
                <div className="px-4 w-full flex justify-between bg-[#3b3b6b]">
                    <input
                        type="text"
                        name=""
                        id=""
                        style={{ background: "none" }}
                        className="max-w-min w-[50px]"
                        defaultValue={data.data.name}
                    />
                    <div className="flex justify-center items-center">
                        <label
                            htmlFor=""
                            title="Create Table"
                            className="labelInput rounded"
                            onClick={handleCreateColumn}
                        >
                            <input type="text" className="inp-invisible" />
                            <div className="iconToolbar text-white">
                                <img
                                    src={addColumn}
                                    alt=""
                                    className="h-3 w-3 "
                                />
                            </div>
                        </label>
                        <label
                            htmlFor=""
                            title="Create Table"
                            className="labelInput rounded"
                            onClick={handleDeleteTable}
                        >
                            <input type="text" className="inp-invisible" />
                            <div className="iconToolbar text-white">
                                <img
                                    src={deleteIcon}
                                    alt=""
                                    className="h-3 w-3 "
                                />
                            </div>
                        </label>
                    </div>
                </div>
                <div className="flex flex-col">
                    {data.data.column.map((column) => {
                        return (
                            <Column key={column.id} column={column} tableDispatch={tableDispatch} relations={relations}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Table;
