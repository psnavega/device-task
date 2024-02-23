export const DeviceTable = () => {
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* {data && data.map((item: any) => (
              <tr key={item.tag}>
                <td className="px-6 py-4 whitespace-nowrap">{item.tag}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.imei}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.value}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.errorCode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.updatedAt}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    );
  };