import { DeviceTable } from "../components/datatables/DeviceTable";

export const DeviceList = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-semibold leading-tight text-left">Lista de Dispositivos Registrados</h1>
            <DeviceTable />
        </div>
    );
  };