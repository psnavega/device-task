import { useState } from "react";
import { DeviceTable } from "../components/datatables/DeviceTable";
import { DeviceListHeader } from "../components/headers/DeviceListHeader";
import { IDeviceFilter } from "../domains/interfaces/IDeviceFilter";
import deviceService from "../services/deviceService";

export const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState<string | null>(null);

    const handleFilter = async (newFilters: IDeviceFilter) => {
        try {
            const { data } = await deviceService.getDevices({ filter: newFilters });
            setDevices(data);
            setError(null);
        } catch (e) {
            setError((e as Error).message);
            console.error(e);
        }
    }

    const handleClear = () => {
        setDevices([]);
        setError(null);
    };

    return (
        <div className="container mx-auto px-4">
            <DeviceListHeader onFilter={handleFilter} onClear={handleClear}/>
            <DeviceTable data={devices} requestError={error} />
        </div>
    );
  };