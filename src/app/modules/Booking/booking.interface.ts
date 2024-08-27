import { Types } from 'mongoose';

export type TIsBooked = 'confirmed' | 'unconfirmed' | 'canceled';
export type TPaymentStatus = 'paid' | 'unpaid';

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  paymentStatus: TPaymentStatus;
  transactionId?: string;
  isBooked: TIsBooked;
};

export type TSlot = {
  startTime: string;
  endTime: string;
};
