import React, { type Dispatch, useEffect, useState } from "react";
import { relationsTypes } from "../../enums/relations";
import { ACTIONS } from "../../reducers/actions";
import { type RelationData } from "../../Constants/Relation";
import { type TableData } from "../../Constants/Table";
interface CreateRelationProps {
  relationDispatch: Dispatch<any>;
  tables: TableData[];
}
const CreateRelation = ({
  relationDispatch,
  tables
}: CreateRelationProps): JSX.Element => {
  const [selectedTable, setSelectedTable] = useState<TableData>(tables[0]);
  const [selectedDestinationTable, setSelectedDestinationTable] =
    useState<TableData>(tables[0]);
  const [selectedSourceColumn, setSelectedSourceColumn] = useState(
    tables[0]?.data.column[0]?.id
  );
  const [selectedDestinationColumn, setSelectedDestinationColumn] = useState(
    tables[0]?.data.column[0]?.id
  );
  const [selectedType, setSelectedType] = useState(relationsTypes.ONETOONE);
  useEffect(() => {
    setSelectedTable(tables[0]);
    setSelectedDestinationTable(tables[0]);
  }, [tables]);
  useEffect(() => {
    setSelectedSourceColumn(selectedTable?.data.column[0]?.id);
  }, [selectedTable]);
  useEffect(() => {
    setSelectedDestinationColumn(selectedDestinationTable?.data.column[0]?.id);
  }, [selectedDestinationTable]);
  const handleCreateRelationData = (e: any): void => {
    e.preventDefault();
    const payload: RelationData = {
      id: Date.now(),
      sourceColumnId: selectedSourceColumn,
      targetColumnId: selectedDestinationColumn,
      data: {
        type: selectedType
      }
    };
    relationDispatch({ type: ACTIONS.CREATE_RELATION, payload });
  };
  return (
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
                  (table) => table.id === Number(e.target.value)
                );
                if (newTable != null) setSelectedTable(newTable);
              }}
            >
              {tables.map((table) => {
                return (
                  <option key={table.id} value={table.id}>
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
                setSelectedSourceColumn(Number(e.target.value));
              }}
            >
              {selectedTable.data.column.map((column) => {
                return (
                  <option key={column.id} value={column.id}>
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
                  (table) => table.id === Number(e.target.value)
                );
                if (newTable != null) {
                  setSelectedDestinationTable(newTable);
                }
              }}
            >
              {tables.map((table) => {
                return (
                  <option key={table.id} value={table.id}>
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
                setSelectedDestinationColumn(Number(e.target.value));
              }}
            >
              {selectedDestinationTable.data.column.map((column) => {
                return (
                  <option key={column.id} value={column.id}>
                    {column.data.name}
                  </option>
                );
              })}
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
            {Object.keys(relationsTypes).map((relation) => {
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
  );
};
export default CreateRelation;
