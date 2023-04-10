import { type ColumnData } from "../../Constants/Column";
import deleteIcon from "../../assets/images/delete.svg";
import addSign from "../../assets/images/addColumn.svg";
import { datatype } from "../../enums/datatypes";
import React, { type Dispatch } from "react";
import { ACTIONS } from "../../reducers/actions";
import { type RelationData } from "../../Constants/Relation";
import { findAllRelationsByColumnId } from "../../utils/relation";

interface ColumnProps {
  column: ColumnData;
  relations: RelationData[];
  tableDispatch: Dispatch<any>;
  isActive: boolean;
  currentClicked: number | undefined;
  setCurrentClicked: Dispatch<any>;
  relationDispatch: Dispatch<any>;
}
const Column = ({
  column,
  relations,
  tableDispatch,
  isActive,
  currentClicked,
  setCurrentClicked,
  relationDispatch
}: ColumnProps): JSX.Element => {
  const handleDeleteColumn = (e: any): void => {
    e.preventDefault();
    tableDispatch({ type: ACTIONS.DELETE_COLUMN, payload: column });
    findAllRelationsByColumnId(relations, column).forEach((relation) => {
      relationDispatch({
        type: ACTIONS.DELETE_RELATION,
        payload: {
          id: relation.id
        }
      });
    });
  };
  const handleEditColumn = (column: ColumnData): void => {
    tableDispatch({ type: ACTIONS.EDIT_COLUMN, payload: column });
  };
  const handleCreateSourceRelation = (): void => {
    if (currentClicked === undefined) {
      setCurrentClicked(column.id);
    }
  };
  const handleTargetRelation = (): void => {
    if (currentClicked !== undefined) {
      const payload = {
        id: Date.now(),
        sourceColumnId: currentClicked,
        targetColumnId: column.id,
        data: {
          type: "ONETOMANY"
        }
      };
      relationDispatch({ type: ACTIONS.CREATE_RELATION, payload });
      setCurrentClicked(undefined);
    }
  };
  return (
    <div
      id={column.id.toString()}
      className="z-10 bg-black"
      onClick={handleTargetRelation}
    >
      <div className="py-1 relative" role="none">
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
                    <option
                      key={key}
                      value={key}
                      selected={
                        datatype[key] ===
                        datatype[column.data.type.toUpperCase()]
                      }
                    >
                      {key}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex">
            <label
              htmlFor=""
              title="Delete Column"
              className="labelInput rounded"
              onClick={handleDeleteColumn}
            >
              <input type="text" className="inp-invisible" />
              <div className="iconToolbar text-white">
                <img src={deleteIcon} alt="" className="h-3 w-3 " />
              </div>
            </label>
            {isActive && (
              <label
                htmlFor=""
                title="This would be the source column"
                className="labelInput rounded"
                onClick={handleCreateSourceRelation}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="text"
                  className="inp-invisible"
                  style={{ cursor: "pointer" }}
                />
                <div
                  className="iconToolbar text-white"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={addSign}
                    alt=""
                    className="h-3 w-3 "
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;
