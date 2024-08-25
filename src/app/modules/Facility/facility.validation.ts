import { z } from 'zod';

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }),
    description: z.string({ required_error: 'Description is required!' }),
    pricePerHour: z.number({ required_error: 'Price per hour is required!' }),
    location: z.string({ required_error: 'Location is required!' }),
    image: z.string({ required_error: 'Image is required!' }),
  }),
});

const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const facilityValidations = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
