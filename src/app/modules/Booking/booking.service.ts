import { JwtPayload } from 'jsonwebtoken';
import { TBooking, TSlot } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../User/user.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Facility } from '../Facility/facility.model';
import { hasTimeConflict } from './booking.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookingSearchableFields, slot } from './booking.constant';

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

  const sTime: unknown = new Date(`1970-01-01T${payload?.startTime}:00`);
  const eTime: unknown = new Date(`1970-01-01T${payload?.endTime}:00`);

  const startTimeParse = Date.parse(sTime as string);
  const endTimeParse = Date.parse(eTime as string);

  // add user id
  payload.user = userData?._id;

  // create payable amount
  payload.payableAmount = Number(
    (
      ((endTimeParse - startTimeParse) / 1000 / 60 / 60) *
      facility?.pricePerHour
    ).toFixed(2),
  );

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
  const queryDate = date || new Date().toISOString().slice(0, 10);

  const bookedSlots = await Booking.find({ date: queryDate }).select(
    'startTime endTime',
  );

  const getAvailableSlots = (slot: TSlot, bookings: TSlot[]) => {
    // If there are no bookings, return the whole slot
    if (bookings?.length === 0) {
      return [slot];
    }

    // Sort bookings by startTime
    bookings?.sort((a, b) => a.startTime.localeCompare(b.startTime));

    const availableSlots = [];
    let lastEndTime = slot.startTime;

    // Check gaps between main slot start and first booking
    if (lastEndTime < bookings[0]?.startTime) {
      availableSlots.push({
        startTime: lastEndTime,
        endTime: bookings[0]?.startTime,
      });
    }

    // Check gaps between bookings
    for (let i = 0; i < bookings?.length - 1; i++) {
      if (bookings[i]?.endTime < bookings[i + 1]?.startTime) {
        availableSlots.push({
          startTime: bookings[i]?.endTime,
          endTime: bookings[i + 1]?.startTime,
        });
      }
      lastEndTime = bookings[i]?.endTime;
    }

    // Check gap between last booking and main slot end
    if (bookings[bookings?.length - 1]?.endTime < slot.endTime) {
      availableSlots.push({
        startTime: bookings[bookings?.length - 1].endTime,
        endTime: slot.endTime,
      });
    }

    return availableSlots;
  };

  const availableSlots = getAvailableSlots(slot, bookedSlots);

  if (availableSlots.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return availableSlots;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getAllBookingsByUser,
  deleteBooking,
  checkAvailability,
};
