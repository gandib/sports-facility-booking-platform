import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacility = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

export const facilityServices = {
  createFacility,
};
