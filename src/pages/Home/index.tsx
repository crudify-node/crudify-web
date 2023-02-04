import { useReducer, useState } from "react";
import Topbar from "../../components/Topbar";
import Sidemenu from "../../components/Sidemenu";
import Canvas from "../../components/Canvas";
import "./styles/index.css";
import { tableReducer } from "../../reducers/tableReducer";
import { TableData } from "../../types/Table";
function Home() {
    const [selectedItem, setSelectedItem] = useState(0);
    const [tables, tableDispatch] = useReducer(
        tableReducer,
        [] as Array<TableData>
    );
    console.log(tables);
    return (
        <div className=" main min-h-screen text-white">
            <Topbar tableDispatch={tableDispatch} />
            <Sidemenu
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                tables={tables}
                tableDispatch={tableDispatch}
            />
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
