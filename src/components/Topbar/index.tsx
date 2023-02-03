
function Topbar() {
    return (
        <div className="flex items-center justify-center absolute top-5 min-h-[50px] min-w-[400px] border-2 border-white border-solid left-1/2 translate-x-[-50%] rounded z-10">
            <button className="rounded px-4 py-2 bg-gray-400 text-black">Create</button>
        </div>
    );
}

export default Topbar;
