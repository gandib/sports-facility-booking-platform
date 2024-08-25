/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createFacility = async (payload: TFacility, file: any) => {
  if (file) {
    const imageName = `${payload?.name}`;
    const path = file?.path;

    // send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url as string;
  }
  const result = await Facility.create(payload);

  return result;
};

const updateFacility = async (id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

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

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const getAllFacility = async () => {
  const result = await Facility.find();

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

export const facilityServices = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
};
