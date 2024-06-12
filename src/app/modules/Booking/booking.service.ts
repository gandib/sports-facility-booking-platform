import { JwtPayload } from 'jsonwebtoken';
import { TBooking, TTotalSlots } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../User/user.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Facility } from '../Facility/facility.model';
import { hasTimeConflict } from './booking.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookingSearchableFields, totalSlots } from './booking.constant';

const createBooking = async (user: JwtPayload, payload: TBooking) => {
  const userData = await User.findOne({ email: user?.email }).select('_id');

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const facility = await Facility.findById(payload?.facility).select(
    'pricePerHour',
  );
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  // get the schedules of the faculties
  const assignedTimeSlots = await Booking.find({
    facility,
    date: payload?.date,
  }).select('startTime endTime');

  const newTimeSlot = {
    startTime: payload?.startTime,
    endTime: payload?.endTime,
  };

  if (hasTimeConflict(assignedTimeSlots, newTimeSlot)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This Time slot is not available at that time! Please choose another time or day.`,
    );
  }

  const sTime = new Date(`1970-01-01T${payload?.startTime}:00`);
  const eTime = new Date(`1970-01-01T${payload?.endTime}:00`);

  const startTimeParse = Date.parse(sTime);
  const endTimeParse = Date.parse(eTime);

  // add user id
  payload.user = userData?._id;

  // create payable amount
  payload.payableAmount =
    ((endTimeParse - startTimeParse) / 1000 / 60 / 60) * facility?.pricePerHour;

  const result = await Booking.create(payload);
  return result;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate('facility').populate('user'),
    query,
  ).search(bookingSearchableFields);

  const result = await bookingQuery.modelQuery;

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const getAllBookingsByUser = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  const userData = await User.findOne({ email: user?.email }).select('_id');
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const bookingQuery = new QueryBuilder(
    Booking.find({ user: userData?._id }).populate('facility'),
    query,
  ).search(bookingSearchableFields);

  const result = await bookingQuery.modelQuery;

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const deleteBooking = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true },
  ).populate('facility');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const checkAvailability = async (date: string) => {
  const newDate = `${date?.split('-')[2]}-${date?.split('-')[1]}-${date?.split('-')[0]}`;

  const queryDate = date ? newDate : new Date().toISOString().slice(0, 10);

  const bookedSlots = await Booking.find({ date: queryDate }).select(
    'startTime endTime',
  );

  const isSlotAvailable = (slot: TTotalSlots) => {
    for (let booking of bookedSlots) {
      if (
        slot.startTime <= booking.startTime &&
        slot.endTime >= booking.endTime
      ) {
        return false;
      }
    }
    return true;
  };

  // Filter the total slots to find available slots
  const availableSlots = totalSlots.filter((slot) => isSlotAvailable(slot));

  return availableSlots;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getAllBookingsByUser,
  deleteBooking,
  checkAvailability,
};
