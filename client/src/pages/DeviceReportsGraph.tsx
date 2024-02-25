import React from 'react';
import { Link } from 'react-router-dom';
import ChartOnAndOffs from '../components/graphs/ChartOnAndOffs';

export const DeviceReportsGraph = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-300 leading-tight">Devices Reports</h1>
        <Link to="/" className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
          Go to devices list
        </Link>
      </div>
      <ChartOnAndOffs />
    </div>
  );
};
