import { update, create, listIotFiltered } from "../../../app/repositories/iotRepository";
import { RequestError } from "../../../app/errors/RequestError";
import iotModel from "../../../app/models/iotModel";

jest.mock('../../../app/models/iotModel', () => ({
  findOneAndUpdate: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
}));


describe('iotRepository', () => {
  const body = {
    value: 1,
    tag: 'poweron',
    imei: '123456',
  }

  describe('update', () => {
    it('should find and update the device successfully', async () => {
      const updatedIot = {
        value: 2,
        tag: 'poweroff',
      };

      (iotModel.findOneAndUpdate as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(updatedIot) });
  
      const result = await update({ body });
  
      expect(result).toEqual(updatedIot);
    });

    it('should throw an exception when has no find any device', async () => {
      (iotModel.findOneAndUpdate as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
  
      await expect(update({ body })).rejects.toThrow(RequestError);
    });
  });

  describe('create', () => {
    it('should create a new device successfully', async () => {
      (iotModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });
  
      const mockedIotSave = jest.fn();
      const mockedIotInstance = { save: mockedIotSave };
  
      (iotModel.create as jest.Mock).mockResolvedValue(mockedIotInstance);
  
      const result = await create({ body });
  
      expect(mockedIotSave).toHaveBeenCalledTimes(1);
    });
  
    it('should throw an exception when the device already exists', async () => {
      const someDevice = {
        value: 1,
        tag: 'poweron',
        imei: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      (iotModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue([someDevice]) });

      const response = create({ body });
  
      await expect(response).rejects.toThrow(RequestError);
    });
  });

  describe('listToFiltered', () => {
    it('should list devices filtered', async () => {
      const filter = { value: 1 };
      const iots = [
        {
          value: 1,
          tag: 'poweron',
          imei: '123456',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (iotModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(iots) });
  
      const result = await listIotFiltered({ filter });
  
      expect(result).toEqual(iots);
    });

    it('should not throw an error when result is empty', async () => {
      const filter = { value: 1 };
      const error = new Error('Some error');
      (iotModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });
  
      const response = await listIotFiltered({ filter });
  
      expect(response).toEqual([]);
    });
  })
})
