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
  image: { type: String, required: [true, 'Image is required!'] },
  isDeleted: { type: Boolean, default: false },
});

// query middleware
facilitySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facilitySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Facility = model<TFacility>('Facility', facilitySchema);
