import * as Joi from 'joi';

import { createIotSchema, updateIotSchema, listIotsSchema } from '../../../app/validators/iotValidator';

describe('createIotSchema', () => {
  it('should accept valid data', () => {
    const validData = {
      tag: 'poweron',
      imei: '123456789',
      value: 1,
    };

    const validationResult = createIotSchema.validate(validData);
    expect(validationResult.error).toBeFalsy();
  });

  it('should reject invalid data', () => {
    const invalidData = {
      tag: 'invalidtag',
      imei: '123456789',
      value: '1',
    };

    const validationResult = createIotSchema.validate(invalidData);
    expect(validationResult.error).toBeTruthy();
  });
});

describe('updateIotSchema', () => {
  it('should accept valid data', () => {
    const validData = {
      tag: 'poweron',
      value: 1,
    };

    const validationResult = updateIotSchema.validate(validData);
    expect(validationResult.error).toBeFalsy();
  });

  it('should reject invalid data', () => {
    const invalidData = {
      tag: 'invalidtag',
      value: '1',
    };

    const validationResult = updateIotSchema.validate(invalidData);
    expect(validationResult.error).toBeTruthy();
  });

  it('should accept data with errorCode when tag is errorCode', () => {
    const validData = {
      tag: 'errorCode',
      value: 1,
      errorCode: 'MEMORY_FAILURE',
    };

    const validationResult = updateIotSchema.validate(validData);
    expect(validationResult.error).toBeFalsy();
  });

  it('should reject data with errorCode when tag is not errorCode', () => {
    const invalidData = {
      tag: 'poweron',
      value: 1,
      errorCode: 'MEMORY_FAILURE',
    };

    const validationResult = updateIotSchema.validate(invalidData);
    expect(validationResult.error).toBeTruthy();
  });
});

describe('listIotsSchema', () => {
  it('should accept valid data', () => {
    const validData = {
      status: 'has-reports',
    };

    const validationResult = listIotsSchema.validate(validData);
    expect(validationResult.error).toBeFalsy();
  });

  it('should accept valid data', () => {
    const validData = {
      status: 'has-no-reports',
    };

    const validationResult = listIotsSchema.validate(validData);
    expect(validationResult.error).toBeFalsy();
  });

  it('should accept valid data', () => {
    const validData = {
      status: 'on-and-offs',
    };

    const validationResult = listIotsSchema.validate(validData);
    expect(validationResult.error).toBeFalsy();
  });

  it('should accept valid data', () => {
    const validData = {
      status: 'errors',
    };

    const validationResult = listIotsSchema.validate(validData);
    expect(validationResult.error).toBeFalsy();
  });

  it('should reject invalid data', () => {
    const invalidData = {
      status: 'invalidstatus',
    };

    const validationResult = listIotsSchema.validate(invalidData);
    expect(validationResult.error).toBeTruthy();
  });
});
