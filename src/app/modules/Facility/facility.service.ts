/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { facilitySearchableFields } from './facility.constant';

const createFacility = async (payload: TFacility) => {
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

const getAllFacility = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(Facility.find(), query)
    .search(facilitySearchableFields)
    .paginate();

  const result = await facilityQuery.modelQuery;
  const meta = await facilityQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleFacility = async (id: string) => {
  const result = await Facility.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

export const facilityServices = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingleFacility,
};
