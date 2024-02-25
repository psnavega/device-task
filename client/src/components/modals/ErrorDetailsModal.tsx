import { useEffect, useState } from "react";
import deviceService from "../../services/deviceService";

export const ErrorDetailsModal = ({
    errorDetails,
    modalOpen,
    handleCloseModal
}: {
    errorDetails: string,
    modalOpen: boolean,
    handleCloseModal: () => void
}) => {
    const suggestionFixError = errorDetails === 'BAD_CONFIGURATION' ? 'Critical error contact with support' : 'No suggestion cataloged to fix';
    const [data, setData] = useState([]);

    useEffect(() => {
        deviceService.getErrorsCatalog()
            .then((response) => {
                setData(response.data);
            }).catch((error) => {
                console.error('Error to get errors catalog', error);
            });
    }, [modalOpen]);

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${modalOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Error Details</h3>
                                <div className="mt-2">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System suggestion</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                data && data.map((error: string) => (
                                                    <tr key={error}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{error}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{'No suggestion to fix'}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="mt-4">
                                        <p className="text-sm text-red-500">Your error is: {errorDetails}</p>
                                        <p className="text-sm text-gray-500">System suggestion to solution is: { suggestionFixError }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
