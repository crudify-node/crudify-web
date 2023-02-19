import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../Constants/Table";
interface SidemenuProps {
    tables: Array<TableData>;
    tableDispatch: Dispatch<any>;
    setSelectedItem: Dispatch<SetStateAction<number>>;
    selectedItem: number;
}
const Sidemenu = ({
    tables,
    tableDispatch,
    selectedItem,
    setSelectedItem,
}: SidemenuProps) => {
    return (
        <div className="border-2 rounded h-[200px] w-[200px] absolute top-1/2 translate-y-[-50%] z-10"></div>
    );
};

export default Sidemenu;
