import React,{useState} from 'react';
import Topbar from "../../components/Topbar"
import Sidemenu from "../../components/Sidemenu"
import Canvas from "../../components/Canvas"
function Home() {
    const [selectedItem,setSelectedItem]=useState()
  return (
    <>
        <Topbar/>
        <Sidemenu selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
        <Canvas selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
    </>
  );
}

export default Home;
