import { z } from 'zod';
import { isBooked } from './booking.constant';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is required!' }),
    startTime: z.string({ required_error: 'Start time is required!' }),
    endTime: z.string({ required_error: 'End time is required!' }),
    user: z.string({ required_error: 'User is required!' }),
    facility: z.string({ required_error: 'Facility is required!' }),
    payableAmount: z.number({ required_error: 'Payable amount is required!' }),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is required!' }).optional(),
    startTime: z
      .string({ required_error: 'Start time is required!' })
      .optional(),
    endTime: z.string({ required_error: 'End time is required!' }).optional(),
    user: z.string({ required_error: 'User is required!' }).optional(),
    facility: z.string({ required_error: 'Facility is required!' }).optional(),
    payableAmount: z
      .number({ required_error: 'Payable amount is required!' })
      .optional(),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
