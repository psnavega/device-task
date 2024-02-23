import { RequestError } from "../../../app/errors/RequestError";
import { update, create, listIotFiltered } from "../../../app/repositories/iotRepository";
import { updateService, createService, listIotsService } from "../../../app/services/iotService";

jest.mock('../../../app/repositories/iotRepository', () => ({
    update: jest.fn(),
    create: jest.fn(),
    listIotFiltered: jest.fn(),
}));

describe('iotService', () => {
    describe('updateService', () => {
        it('should update the device successfully', async () => {
            const body = {
                value: 1,
                tag: 'poweron',
            }

            const updatedIot = {
                value: 2,
                tag: 'poweroff',
            };

            (update as jest.Mock).mockResolvedValue(updatedIot);

            const result = await updateService({ imei: '1234', body });

            expect(result).toEqual(updatedIot);
        });
    });

    describe('createService', () => {
        it('should create a new device successfully', async () => {
            const body = {
                value: 1,
                tag: 'poweron',
            }

            const newIot = {
                value: 1,
                tag: 'poweron',
            };

            (create as jest.Mock).mockResolvedValue(newIot);

            const result = await createService({ body });

            expect(result).toEqual(newIot);
        });
    });

    describe('listIotsService', () => {
        it('should list the devices successfully when slug is has-reports', async () => {
            const iots = [
                {
                    value: 1,
                    tag: 'poweron',
                },
                {
                    value: 2,
                    tag: 'poweroff',
                }
            ];

            (listIotFiltered as jest.Mock).mockResolvedValue(iots);

            const result = await listIotsService({ slugStatus: 'has-reports' });

            expect(result).toEqual(iots);
        });

        it('should list the devices successfully when slug is has-no-reports', async () => {
            const iots = [
                {
                    value: 1,
                    tag: 'poweron',
                },
                {
                    value: 2,
                    tag: 'poweroff',
                }
            ];

            (listIotFiltered as jest.Mock).mockResolvedValue(iots);

            const result = await listIotsService({ slugStatus: 'has-no-reports' });

            expect(result).toEqual(iots);
        });

        it('should list the devices successfully when slug is on-and-offs', async () => {
            const iots = [
                {
                    value: 1,
                    tag: 'poweron',
                },
                {
                    value: 2,
                    tag: 'poweroff',
                }
            ];

            (listIotFiltered as jest.Mock).mockResolvedValue(iots);

            const result = await listIotsService({ slugStatus: 'on-and-offs' });

            expect(result).toEqual(iots);
        });

        it('should list the devices successfully when slug is errors', async () => {
            const iots = [
                {
                    value: 1,
                    tag: 'errorCode',
                    errorCode: 'error'
                },
                {
                    value: 2,
                    tag: 'errorCode',
                    errorCode: 'error'
                }
            ];

            (listIotFiltered as jest.Mock).mockResolvedValue(iots);

            const result = await listIotsService({ slugStatus: 'errors' });

            expect(result).toEqual(iots);
        });

        it('should thrown an error when slug not exists', async () => {
            (listIotFiltered as jest.Mock).mockResolvedValue([]);

            try {
                const result = await listIotsService({ slugStatus: 'invalid-slug' });
            } catch (e) {
                expect(e).toBeInstanceOf(RequestError);
            }
        });
    });
});