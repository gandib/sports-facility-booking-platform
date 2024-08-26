import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const user = req?.user;
  const result = await bookingServices.createBooking(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookings(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getAllBookingsByUser = catchAsync(async (req, res) => {
  const user = req?.user;
  const result = await bookingServices.getAllBookingsByUser(req.query, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getBookinById = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await bookingServices.getBookinById(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.deleteBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

const checkAvailability = catchAsync(async (req, res) => {
  const { date, facility } = req.query;
  const result = await bookingServices.checkAvailability(
    date as string,
    facility as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getAllBookings,
  getAllBookingsByUser,
  deleteBooking,
  checkAvailability,
  getBookinById,
};
