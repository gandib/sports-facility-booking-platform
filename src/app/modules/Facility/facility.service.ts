import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacility = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacility = async (id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteFacility = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const getAllFacility = async () => {
  const result = await Facility.find();
  return result;
};

export const facilityServices = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
};
