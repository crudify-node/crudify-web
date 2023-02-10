import { ACTIONS } from "../../reducers/actions";
import { Dispatch, useEffect, useState } from "react";
import createIcon from "../../assets/images/createIcon.svg";
import createRelation from "../../assets/images/createRelation.svg";
import { RelationData } from "../../types/Relation";
import { useForm, useField, splitFormProps } from "react-form";
import { TableData } from "../../types/Table";
import { relations } from "../../enums/relations";

interface TopbarProps {
    tableDispatch: Dispatch<any>;
    relations: Array<RelationData>;
    relationDispatch: Dispatch<any>;
    tables: Array<TableData>;
}
const Topbar = ({ tableDispatch, tables, relationDispatch }: TopbarProps) => {
    const [selectedTable, setSelectedTable] = useState<TableData>(tables[0]);
    const [selectedDestinationTable, setSelectedDestinationTable] =
        useState<TableData>(tables[0]);
    const [selectedSourceColumn, setSelectedSourceColumn] = useState(
        tables[0]?.data.column[0]?.id
    );
    const [selectedDestinationColumn, setSelectedDestinationColumn] = useState(
        tables[0]?.data.column[0]?.id
    );
    const [selectedType, setSelectedType] = useState(relations.ONETOONE);
    const handleCreateTable = (e: any) => {
        e.preventDefault();
        tableDispatch({
            type: ACTIONS.CREATE_TABLE,
            payload: {
                id: Date.now(),
                startX: 500,
                startY: 100,
                endX: 500,
                endY: 100,
                data: { name: "test", column: [] },
            },
        });
    };
    const [showDialogue, setShowDialogue] = useState(false);
    const handleCreateRelation = (e: any) => {
        e.preventDefault();
        setShowDialogue(!showDialogue);
    };
    const handleCreateRelationData = (e: any) => {
        e.preventDefault();
        const payload: RelationData = {
            id: Date.now(),
            sourceColumnId: selectedSourceColumn,
            targetColumnId: selectedDestinationColumn,
            data: {
                type: selectedType,
            },
        };
        relationDispatch({ type: ACTIONS.CREATE_RELATION, payload: payload });
    };
    useEffect(() => {
        setSelectedTable(tables[0]);
        setSelectedDestinationTable(tables[0]);
    }, [tables]);
    useEffect(()=>{
        setSelectedSourceColumn(selectedTable?.data.column[0]?.id)
    },[selectedTable])
    useEffect(()=>{
        setSelectedDestinationColumn(selectedDestinationTable?.data.column[0]?.id)
    },[selectedDestinationTable])
    
    useEffect(()=>{
        console.log({selectedSourceColumn,selectedDestinationColumn})
    },[selectedSourceColumn,selectedDestinationColumn]);
    return (
        <div className="flex items-center bg-[#262627] justify-center absolute top-5 min-h-[50px] min-w-[400px]  left-1/2 translate-x-[-50%] rounded z-10">
            <label
                htmlFor=""
                title="Create Table"
                className="labelInput rounded"
                onClick={handleCreateTable}
            >
                <input type="text" className="inp-invisible" />
                <div className="iconToolbar text-white">
                    <img src={createIcon} alt="" className="h-4 w-4 " />
                </div>
            </label>
            <label
                htmlFor=""
                title="Create Relation"
                className="labelInput rounded"
                onClick={handleCreateRelation}
            >
                <input type="text" className="inp-invisible" />
                <div className="iconToolbar text-white">
                    <img src={createRelation} alt="" className="h-4 w-4 " />
                </div>
            </label>
            {showDialogue && (
                <div className="relative">
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute top-8 z-20 min-w-[400px] min-h-[200px]"
                        onSubmit={handleCreateRelationData}
                    >
                        <div className="flex">
                            <div className="mb-4 mr-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="sourceTable"
                                >
                                    Source Table
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="sourceTable"
                                    placeholder="Source Table"
                                    onChange={(e) => {
                                        const newTable = tables.find(
                                            (table) =>
                                                table.id ===
                                                Number(e.target.value)
                                        );
                                        if (newTable)
                                            setSelectedTable(newTable);
                                    }}
                                >
                                    {tables.map((table) => {
                                        return (
                                            <option
                                                key={table.id}
                                                value={table.id}
                                            >
                                                {table.data.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-4 mx-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="sourceColumn"
                                >
                                    Source Column
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="sourceColumn"
                                    placeholder="Source Column"
                                    onChange={(e) => {
                                        setSelectedSourceColumn(
                                            Number(e.target.value)
                                        );
                                    }}
                                >
                                    {selectedTable.data.column.map((column) => {
                                        return (
                                            <option
                                                key={column.id}
                                                value={column.id}
                                            >
                                                {column.data.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mb-4 mr-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="destinationTable"
                                >
                                    Destination Table
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="destinationTable"
                                    placeholder="Destination Table"
                                    onChange={(e) => {
                                        const newTable = tables.find(
                                            (table) =>
                                                table.id ===
                                                Number(e.target.value)
                                        );
                                        if (newTable)
                                            setSelectedDestinationTable(
                                                newTable
                                            );
                                    }}
                                >
                                    {tables.map((table) => {
                                        return (
                                            <option
                                                key={table.id}
                                                value={table.id}
                                            >
                                                {table.data.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-4 mx-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="destinationTable"
                                >
                                    Destination Column
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="destionationTable"
                                    placeholder="Destination Column"
                                    onChange={(e) => {
                                        setSelectedDestinationColumn(
                                            Number(e.target.value)
                                        );
                                    }}
                                >
                                    {selectedDestinationTable.data.column.map(
                                        (column) => {
                                            return (
                                                <option
                                                    key={column.id}
                                                    value={column.id}
                                                >
                                                    {column.data.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="typeOfRelation"
                            >
                                Type of Relation
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="typeOfRelation"
                                placeholder="Type of relation"
                                onChange={(e) => {
                                    setSelectedType(e.target.value);
                                }}
                            >
                                {Object.keys(relations).map((relation) => {
                                    return (
                                        <option key={relation} value={relation}>
                                            {relation}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Topbar;
