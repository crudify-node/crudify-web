/* eslint-disable multiline-ternary */
import { ACTIONS } from "../../reducers/actions";
import React, { type Dispatch } from "react";
import createIcon from "../../assets/images/createIcon.svg";
import createRelation from "../../assets/images/createRelation.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { type RelationData } from "../../Constants/Relation";
import { type TableData } from "../../Constants/Table";

interface TopbarProps {
  tableDispatch: Dispatch<any>;
  relations: RelationData[];
  relationDispatch: Dispatch<any>;
  tables: TableData[];
  activeTable: boolean;
  setActiveTable: Dispatch<any>;
  activeRelation: number;
}
const Topbar = ({
  tableDispatch,
  tables,
  relationDispatch,
  relations,
  activeTable,
  setActiveTable,
  activeRelation
}: TopbarProps): JSX.Element => {
  const handleCreateTable = (e: any): void => {
    e.preventDefault();
    tableDispatch({
      type: ACTIONS.CREATE_TABLE,
      payload: {
        id: Date.now(),
        startX: 500,
        startY: 100,
        endX: 500,
        endY: 100,
        data: { name: "test", column: [] }
      }
    });
  };
  const handleCreateRelation = (e: any): void => {
    e.preventDefault();
    setActiveTable(!activeTable);
  };
  const isValidActiveRelation = (activeRelation: number): boolean => {
    for (const relation of relations) {
      if (relation.id === activeRelation) return true;
    }
    return false;
  };
  const handleDeleteRelation = (): void => {
    relationDispatch({
      type: ACTIONS.DELETE_RELATION,
      payload: {
        id: activeRelation
      }
    });
  };
  return (
    <>
      {!isValidActiveRelation(activeRelation) ? (
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
            onClick={handleCreateRelation}
          >
            <input type="text" className="inp-invisible" />
            <div className="iconToolbar text-white">
              <img src={createRelation} alt="" className="h-4 w-4 " />
            </div>
          </label>
        </div>
      ) : (
        <div className="flex items-center bg-[#262627] justify-center absolute top-5 min-h-[50px] min-w-[400px]  left-1/2 translate-x-[-50%] rounded z-10">
          <label
            htmlFor=""
            title="Delete Relation"
            className="labelInput rounded"
            onClick={handleDeleteRelation}
          >
            <input type="text" className="inp-invisible" />
            <div className="iconToolbar text-white">
              <img src={deleteIcon} alt="" className="h-4 w-4 " />
            </div>
          </label>
        </div>
      )}
    </>
  );
};

export default Topbar;
