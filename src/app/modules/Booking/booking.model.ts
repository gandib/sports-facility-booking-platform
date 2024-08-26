import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import { isBooked } from './booking.constant';

const bookingSchema = new Schema<TBooking>({
  date: { type: String, required: [true, 'Date is required!'] },
  startTime: { type: String, required: [true, 'Start time is required!'] },
  endTime: { type: String, required: [true, 'End time is required!'] },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required!'],
    ref: 'User',
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: [true, 'Facility is required!'],
    ref: 'Facility',
  },
  payableAmount: { type: Number },
  isBooked: {
    type: String,
    enum: {
      values: isBooked,
      message: '{VALUE} is not valid!',
    },
    default: 'confirmed',
  },
});

// query middleware
bookingSchema.pre('find', function (next) {
  this.find({ isBooked: { $ne: 'canceled' } });
  next();
});

bookingSchema.pre('findOne', function (next) {
  this.find({ isBooked: { $ne: 'canceled' } });
  next();
});

export const Booking = model<TBooking>('Booking', bookingSchema);
