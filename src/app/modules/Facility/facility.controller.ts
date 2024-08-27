import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facilityServices } from './facility.service';

const createFacility = catchAsync(async (req, res) => {
  const result = await facilityServices.createFacility(req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facilityServices.updateFacility(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facilityServices.deleteFacility(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleted successfully',
    data: result,
  });
});

const getAllFacility = catchAsync(async (req, res) => {
  const result = await facilityServices.getAllFacility(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFacility = catchAsync(async (req, res) => {
  const { facilityId } = req.params;
  const result = await facilityServices.getSingleFacility(facilityId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility retrieved successfully',
    data: result,
  });
});

export const facilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingleFacility,
};
