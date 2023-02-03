import React from 'react';
interface CanvasProps{
  setSelectedItem:any,
  selectedItem:any
}
function Canvas({selectedItem,setSelectedItem}:CanvasProps) {
  return (
    <>
      <button className="absolute bottom-0 right-0 m-8 bg-gray-400 p-8 rounded text-black">Convert to Code</button>
    </>
  );
}

export default Canvas;
