import { Schema, model } from 'mongoose';
import { TFacility } from './facility.interface';

const facilitySchema = new Schema<TFacility>({
  name: { type: String, required: [true, 'Name is required!'] },
  description: { type: String, required: [true, 'Description is required!'] },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required!'],
  },
  location: { type: String, required: [true, 'Location is required!'] },
  isDeleted: { type: Boolean, default: false },
});

export const Facility = model<TFacility>('Facility', facilitySchema);
