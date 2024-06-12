import { z } from 'zod';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format! Expexted "HH:MM" in 24 hours format.',
  },
);

const createBookingValidationSchema = z.object({
  body: z
    .object({
      date: z.string({ required_error: 'Date is required!' }),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
      facility: z.string({ required_error: 'Facility is required!' }),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before End time!',
      },
    ),
});

const updateBookingValidationSchema = z.object({
  body: z
    .object({
      date: z.string({ required_error: 'Date is required!' }).optional(),
      startTime: timeStringSchema.optional(),
      endTime: timeStringSchema.optional(),
      facility: z
        .string({ required_error: 'Facility is required!' })
        .optional(),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before End time!',
      },
    ),
});

export const bookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
