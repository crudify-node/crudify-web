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
  useEffect(() => {
    const initTableData = JSON.parse(localStorage.getItem("tableData") ?? "{}");
    console.log(initTableData);
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
  }, []);
  useEffect(() => {
    console.log(tables);
  }, [tables]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" main min-h-screen text-white">
        <Topbar
          relations={relations}
          relationDispatch={relationDispatch}
          tableDispatch={tableDispatch}
          tables={tables}
        />
        {/* <Sidemenu
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                tables={tables}
                tableDispatch={tableDispatch}
            /> */}
        <Canvas
          relations={relations}
          tables={tables}
          tableDispatch={tableDispatch}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </DndProvider>
  );
}

export default Home;
