import React, { useState } from "react";
import { type Dispatch, type SetStateAction } from "react";
import { type TableData } from "../../Constants/Table";
import Table from "../Table";
import createRelation from "../../assets/images/convertToCode.svg";
import { type RelationData } from "../../Constants/Relation";
import { convertToCode } from "../../utils/convertToCode";
import { type CRUDIFY_DATA } from "../../Constants/CrudifyData";
import { convertToCodeFromCrudifyData } from "../../services/convertToCode/convertToCode.service";
import Relation from "../Relation/Relation";
interface CanvasProps {
  tables: TableData[];
  tableDispatch: Dispatch<any>;
  setSelectedItem: Dispatch<SetStateAction<number>>;
  selectedItem: number;
  relations: RelationData[];
  activeTable: boolean;
  activeRelation: number;
  setActiveRelation: Dispatch<any>;
  relationDispatch: Dispatch<any>;
}
function Canvas({
  tables,
  tableDispatch,
  relations,
  activeTable,
  activeRelation,
  setActiveRelation,
  relationDispatch
}: CanvasProps): JSX.Element {
  const handleConvertToCode = async (e: any): Promise<void> => {
    const data: CRUDIFY_DATA = convertToCode(tables, relations);
    await convertToCodeFromCrudifyData(data);
  };
  const [currentClicked, setCurrentClicked] = useState(undefined);

  return (
    <div
      className="min-w-screen min-h-screen"
      // ref={drop}
    >
      {tables.map((table, t) => {
        return (
          <Table
            data={table}
            key={table.id}
            tableDispatch={tableDispatch}
            relations={relations}
            isActive={activeTable}
            currentClicked={currentClicked}
            setCurrentClicked={setCurrentClicked}
            relationDispatch={relationDispatch}
          ></Table>
        );
      })}

      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "0"
        }}
      >
        {relations.map((relation) => {
          return (
            <Relation
              activeRelation={activeRelation}
              setActiveRelation={setActiveRelation}
              relation={relation}
              key={relation.id}
            />
          );
        })}
      </svg>
      <div
        className="absolute bottom-[10px] right-[10px]"
        onClick={handleConvertToCode}
      >
        <label
          htmlFor=""
          title="Convert to code!"
          className="labelInput rounded "
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
