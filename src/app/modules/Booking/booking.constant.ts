import { TIsBooked, TPaymentStatus, TSlot } from './booking.interface';

export const isBooked: TIsBooked[] = ['confirmed', 'unconfirmed', 'canceled'];
export const paymentStatus: TPaymentStatus[] = ['paid', 'unpaid'];

export const slot: TSlot = { startTime: '00:00', endTime: '23:59' };

export const bookingSearchableFields = ['date'];
