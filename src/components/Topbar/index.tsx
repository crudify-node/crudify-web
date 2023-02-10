import { ACTIONS } from "../../reducers/actions";
import { Dispatch } from "react";
import createIcon from "../../assets/images/createIcon.svg";
import createRelation from "../../assets/images/createRelation.svg";
interface TopbarProps {
    tableDispatch: Dispatch<any>;
}
const Topbar = ({ tableDispatch }: TopbarProps) => {
    const handleCreateTable = (e: any) => {
        e.preventDefault();
        tableDispatch({
            type: ACTIONS.CREATE_TABLE,
            payload: {
                id: Date.now(),
                startX: 500,
                startY: 100,
                endX: 500,
                endY: 100,
                data: { name: "test", column: [] },
            },
        });
    };
    const handleCreateRelation = (e: any) => {
        e.preventDefault();
    };
    return (
        <div className="flex items-center bg-[#262627] justify-center absolute top-5 min-h-[50px] min-w-[400px]  left-1/2 translate-x-[-50%] rounded z-10">
            <label
                htmlFor=""
                title="Create Table"
                className="labelInput rounded"
                onClick={handleCreateTable}
            >
                <input type="text" className="inp-invisible" />
                <div className="iconToolbar text-white">
                    <img src={createIcon} alt="" className="h-4 w-4 " />
                </div>
            </label>
            <label
                htmlFor=""
                title="Create Relation"
                className="labelInput rounded"
                onClick={handleCreateTable}
            >
                <input type="text" className="inp-invisible" />
                <div className="iconToolbar text-white">
                    <img src={createRelation} alt="" className="h-4 w-4 " />
                </div>
            </label>
        </div>
    );
};

export default Topbar;
