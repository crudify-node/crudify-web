import React, { useEffect, useReducer, useState } from "react";
import Topbar from "../../components/Topbar";
// import Sidemenu from "../../components/Sidemenu";
import Canvas from "../../components/Canvas";
import "./styles/index.css";
import { tableReducer } from "../../reducers/tableReducer";
import { relationReducer } from "../../reducers/relationshipReducer";
import { type TableData } from "../../Constants/Table";
import { ACTIONS } from "../../reducers/actions";
import { type RelationData } from "../../Constants/Relation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function Home(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState(0);
  const [tables, tableDispatch] = useReducer(tableReducer, [] as TableData[]);
  const [relations, relationDispatch] = useReducer(
    relationReducer,
    [] as RelationData[]
  );
  const [activeTable, setActiveTable] = useState(false);
  const [activeRelation, setActiveRelation] = useState(0);
  useEffect(() => {
    const initTableData = JSON.parse(localStorage.getItem("tableData") ?? "{}");
    if (initTableData.data !== undefined) {
      tableDispatch({
        type: ACTIONS.SET_DATA,
        payload: { data: initTableData.data }
      });
    }
    const initialRelationData = JSON.parse(
      localStorage.getItem("relationData") ?? "{}"
    );
    if (initialRelationData.data !== undefined) {
      relationDispatch({
        type: ACTIONS.SET_RELATION,
        payload: { data: initialRelationData.data }
      });
    }
    document.addEventListener(
      "click",
      function (e) {
        const cursor = (e.target as HTMLBodyElement)?.style.cursor;
        if (cursor === "") {
          setActiveRelation(0);
          setActiveTable(false);
        }
      },
      false
    );
    const handleEsc = (event: any): void => {
      if (event.keyCode === 27) {
        setActiveRelation(0);
        setActiveTable(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" main min-h-screen text-white">
        <Topbar
          relations={relations}
          relationDispatch={relationDispatch}
          tableDispatch={tableDispatch}
          tables={tables}
          activeTable={activeTable}
          setActiveTable={setActiveTable}
          activeRelation={activeRelation}
        />
        <Canvas
          relations={relations}
          tables={tables}
          tableDispatch={tableDispatch}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          activeTable={activeTable}
          activeRelation={activeRelation}
          setActiveRelation={setActiveRelation}
          relationDispatch={relationDispatch}
        />
      </div>
    </DndProvider>
  );
}

export default Home;
