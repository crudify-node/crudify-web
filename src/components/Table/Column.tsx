import { ColumnData } from "../../types/Column";
import deleteIcon from "../../assets/images/delete.svg";
import { datatype } from "../../enums/datatypes";
import { Dispatch } from "react";
import { ACTIONS } from "../../reducers/actions";

interface ColumnProps {
    column: ColumnData;
    tableDispatch: Dispatch<any>;
}
const Column = ({ column, tableDispatch }: ColumnProps) => {
    const handleDeleteColumn = (e: any) => {
        e.preventDefault();
        tableDispatch({ type: ACTIONS.DELETE_COLUMN, payload: column });
    };
    const handleEditColumn = (column: ColumnData) => {
        tableDispatch({ type: ACTIONS.EDIT_COLUMN, payload: column });
    };
    return (
        <div>
            <div className="py-1" role="none">
                <div className=" text-gray-100 px-4 py-2 text-sm flex justify-between">
                    <div className="flex justify-between">
                        <input
                            style={{ background: "none" }}
                            className="max-w-min w-[50px]"
                            type="text"
                            defaultValue={column.data.name}
                            name="column-name"
                            id=""
                            placeholder="name"
                            onChange={(e) => {
                                e.preventDefault();
                                column.data.name = e.target.value;
                                handleEditColumn(column);
                            }}
                        />
                        <div>
                            <select
                                id="datatypeSelect"
                                onChange={(e) => {
                                    e.preventDefault();
                                    column.data.type = e.target.value;
                                    handleEditColumn(column);
                                }}
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            >
                                {Object.keys(datatype).map((key) => {
                                    return (
                                        <option key={key} value={key} selected={key===column.data.type}>
                                            {key}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <label
                        htmlFor=""
                        title="Create Table"
                        className="labelInput rounded"
                        onClick={handleDeleteColumn}
                    >
                        <input type="text" className="inp-invisible" />
                        <div className="iconToolbar text-white">
                            <img src={deleteIcon} alt="" className="h-3 w-3 " />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Column;
