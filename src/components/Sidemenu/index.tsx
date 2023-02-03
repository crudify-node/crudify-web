import React from "react";
interface SidemenuProps {
    setSelectedItem: any;
    selectedItem: any;
}
const Sidemenu = ({ selectedItem, setSelectedItem }: SidemenuProps) => {
    return (
        <div className="border-2 rounded h-[200px] w-[200px] absolute top-1/2 translate-y-[-50%] z-10"></div>
    );
};

export default Sidemenu;
