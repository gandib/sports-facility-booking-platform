import { TIsBooked, TTotalSlots } from './booking.interface';

export const isBooked: TIsBooked[] = ['confirmed', 'unconfirmed', 'canceled'];

export const totalSlots: TTotalSlots[] = [
  { startTime: '00:00', endTime: '02:00' },
  { startTime: '02:00', endTime: '04:00' },
  { startTime: '04:00', endTime: '06:00' },
  { startTime: '06:00', endTime: '08:00' },
  { startTime: '08:00', endTime: '10:00' },
  { startTime: '10:00', endTime: '12:00' },
  { startTime: '12:00', endTime: '14:00' },
  { startTime: '14:00', endTime: '16:00' },
  { startTime: '16:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '20:00' },
  { startTime: '20:00', endTime: '22:00' },
  { startTime: '22:00', endTime: '23:59' },
];

export const bookingSearchableFields = ['date'];
