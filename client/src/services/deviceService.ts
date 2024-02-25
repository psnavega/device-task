import { IDeviceFilter } from "../domains/interfaces/IDeviceFilter";
import api from "./api";

const getDevices = async ({ filter }: { filter: IDeviceFilter}) => {
  return api.get(`/v1/iots?status=${filter.tag}&imei=${filter.imei}`);
};

const getErrorsCatalog = async () => {
  return api.get(`/v1/iot/errors`);
}

export default {
  getDevices,
  getErrorsCatalog,
};