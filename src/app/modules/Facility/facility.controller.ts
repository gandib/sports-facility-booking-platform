import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facilityServices } from './facility.service';

const createFacility = catchAsync(async (req, res) => {
  const result = await facilityServices.createFacility(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

export const facilityControllers = {
  createFacility,
};
