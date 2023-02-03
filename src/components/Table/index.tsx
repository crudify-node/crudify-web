import React from "react";
interface TableProps {
   data:any
}
const Table=({data}:TableProps)=> {
    return (
        <div className="flex items-center justify-center absolute top-1/2 min-h-[50px] min-w-[400px] border-2 border-white border-solid left-1/2 translate-x-[-50%] rounded z-10">
            
        </div>
    );
}

export default Table;
