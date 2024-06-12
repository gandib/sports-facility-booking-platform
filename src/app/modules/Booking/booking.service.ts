import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../User/user.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Facility } from '../Facility/facility.model';

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

  const sTime = new Date(`1970-01-01T${payload?.startTime}:00`);
  const eTime = new Date(`1970-01-01T${payload?.endTime}:00`);
  const sTimeParse = Date.parse(sTime);
  const eTimeParse = Date.parse(eTime);

  // add user id
  payload.user = userData?._id;

  // create payable amount
  payload.payableAmount =
    ((eTimeParse - sTimeParse) / 1000 / 60 / 60) * facility?.pricePerHour;

  const result = await Booking.create(payload);
  return result;
};

export const bookingServices = {
  createBooking,
};
