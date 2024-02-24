import React, { useState } from "react";
import { TagEnum } from "../../domains/enums/tagEnum";
import { convertCamelCaseToSlug } from "../../utils/string/convertCamelCaseToSlug";
import { IDeviceFilter } from "../../domains/interfaces/IDeviceFilter";
import { FilterChangeEvent } from "../../domains/types/eventsTypes";

export const DeviceListHeader = ({
  onFilter,
  onClear
}: {
  onFilter: (filter: IDeviceFilter) => void,
  onClear: () => void
}) => {
  const [tagFilter, setTagFilter] = useState("");
  const [imeiFilter, setImeiFilter] = useState("");

  const handleFilter = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    onFilter({
      tag: convertCamelCaseToSlug(tagFilter),
      imei: imeiFilter
    });
  };

  const handleTagFilter = (e: FilterChangeEvent) => {
    setTagFilter(e.target.value);
  };

  const handleImeiFilter = (e: FilterChangeEvent) => {
    setImeiFilter(e.target.value);
  }

  const handleCleanFields = () => {
    setTagFilter("");
    setImeiFilter("");
    onClear();
  }

  return (
    <div className="bg-gray-100 p-4 mb-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-700 leading-tight">Lista de Dispositivos</h1>
        <div className="flex w-full justify-end space-x-4">
          <div className="flex items-center">
            <label htmlFor="tagFilter" className="text-sm font-medium text-gray-700 mr-2">Tag:</label>
            <select
              id="tagFilter"
              name="tag"
              value={tagFilter}
              onChange={handleTagFilter}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border rounded-md p-1"
            >
              <option value="">Selecione um status</option>
              {Object.entries(TagEnum).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="imeiFilter" className="text-sm font-medium text-gray-700 mr-2">IMEI:</label>
            <input
              type="text"
              id="imeiFilter"
              name="imei"
              value={imeiFilter}
              onChange={handleImeiFilter}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border rounded-md p-1"
            />
          </div>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            onClick={handleCleanFields}
          >
            Limpar
          </button>
          <button
              className={`px-4 py-2 rounded-md focus:outline-none ${
                  tagFilter ? 'bg-indigo-500 text-white hover:bg-indigo-600 focus:bg-indigo-600' : 'bg-gray-400 text-gray-300 cursor-not-allowed'
              }`}
              onClick={handleFilter}
              disabled={!tagFilter}
          >
              Buscar
          </button>
        </div>
      </div>
    </div>
  );
};
