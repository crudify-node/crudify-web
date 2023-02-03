import React, { useReducer, useState } from "react";
import Topbar from "../../components/Topbar";
import Sidemenu from "../../components/Sidemenu";
import Canvas from "../../components/Canvas";
import "./styles/index.css"
import { tableReducer } from "../../reducers/tableReducer";
import { Table } from "../../types/Table";
function Home() {
    const [selectedItem, setSelectedItem] = useState();
    const [tables,dispatch]=useReducer(tableReducer,[] as Array<Table>);
    return (
        <div className=" main min-h-screen text-white">
            <Topbar />
            <Sidemenu
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <Canvas
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
        </div>
    );
}

export default Home;
