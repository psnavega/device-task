import { useState, useEffect } from "react";
import { IIot } from "../../domains/interfaces/IIot";
import { dateToString } from "../../utils/date/dateToString";

export const DeviceTable = ({ data,  requestError }: { data: IIot[], requestError?: string | null}) => {
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (data.length === 0) {
      setSearched(true);
    } else {
      setSearched(false);
    }
  }, [data]);
 
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
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Possui erro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registrado em
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Atualizado em
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Detalhes
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
                {searched ? "Realize uma busca para filtrar os dados" : "Nenhum registro encontrado"}
              </td>
            </tr>
          ) : (
            data && !requestError && data.map((item: IIot) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.tag}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.imei}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.tag === 'errorCode' ? 'Sim' :'Não'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{dateToString(item.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{dateToString(item.updatedAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{dateToString(item.updatedAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
