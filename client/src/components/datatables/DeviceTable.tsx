import { useState, useEffect } from "react";
import { IIot } from "../../domains/interfaces/IIot";
import { dateToString } from "../../utils/date/dateToString";
import { delayStatusHandler } from "../../handlers/delayStatusHandler";
import { ErrorDetailsModal } from "../modals/ErrorDetailsModal";

export const DeviceTable = ({
  data, 
  requestError,
  searchButtonHasClicked
}: {
  data: IIot[],
  requestError?: string | null,
  searchButtonHasClicked: boolean
}) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedErrorCode, setSelectedErrorCode] = useState<string | null>(null);

  useEffect(() => {
    
  }, [searchButtonHasClicked]);

  const handleOpenModal = (errorCode: string) => {
    setSelectedErrorCode(errorCode);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tag
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              IMEI
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delay status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Has error
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Error details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {
            requestError && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-red-500" colSpan={7}>
                  {requestError}
                </td>
              </tr>
            )
          }
          {!data.length && !requestError ? (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500" colSpan={7}>
                {searchButtonHasClicked ? "Devices not found for this search" : "Search for devices to see them here"}
              </td>
            </tr>
          ) : (
            data && !requestError && data.map((item: IIot) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.tag}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.imei}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{dateToString(item.updatedAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{delayStatusHandler({ lastUpdated: item.updatedAt })}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.tag === 'errorCode' ? 'Yes' :'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {item.tag === 'errorCode' && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      onClick={() => handleOpenModal(item.errorCode || '')}
                      disabled={!item.errorCode}
                    >
                      Details
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ErrorDetailsModal
        errorDetails={selectedErrorCode || ''}
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};
