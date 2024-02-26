import { AxiosResponse } from 'axios';

export function responseHandler(res: AxiosResponse) {
    return res.data
}