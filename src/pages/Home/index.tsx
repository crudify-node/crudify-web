import { useEffect, useReducer, useState } from "react";
import Topbar from "../../components/Topbar";
// import Sidemenu from "../../components/Sidemenu";
import Canvas from "../../components/Canvas";
import "./styles/index.css";
import { tableReducer } from "../../reducers/tableReducer";
import { relationReducer } from "../../reducers/relationshipReducer";
import { TableData } from "../../types/Table";
import { ACTIONS } from "../../reducers/actions";
import { RelationData } from "../../types/Relation";
function Home() {
    const [selectedItem, setSelectedItem] = useState(0);
    const [tables, tableDispatch] = useReducer(
        tableReducer,
        [] as Array<TableData>
    );
    const [relations, relationDispatch] = useReducer(
        relationReducer,
        [] as Array<RelationData>
    );
    useEffect(() => {
        const initTableData = JSON.parse(
            localStorage.getItem("tableData") || "{}"
        );
        console.log(initTableData);
        if (initTableData["data"]) {
            console.log("hilo");
            tableDispatch({
                type: ACTIONS.SET_DATA,
                payload: { data: initTableData["data"] },
            });
        }
    }, []);
    useEffect(() => {
        console.log(tables);
    }, [tables]);
    return (
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
                tables={tables}
                tableDispatch={tableDispatch}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
        </div>
    );
}

export default Home;
