import useDragger from "../../hooks/useDragger";
interface TableProps {
   data:any,
   tableDispatch:any
}
const Table=({data}:TableProps)=> {
    useDragger(data.id)
    return (
        <div id={data.id} className="flex items-center justify-center absolute top-1/2 min-h-[50px] min-w-[400px] border-2 border-white border-solid left-1/2 translate-x-[-50%] rounded z-10">
            <input type="text" name="" id="" className="bg-black" />
        </div>
    );
}

export default Table;
