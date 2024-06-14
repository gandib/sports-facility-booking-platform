import { TSlot } from './booking.interface';

export const hasTimeConflict = (
  assignedTimeSlots: TSlot[],
  newTimeSlot: TSlot,
) => {
  for (const timeSlot of assignedTimeSlots) {
    const existingStartTime = new Date(`1970-01-01T${timeSlot.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${timeSlot.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newTimeSlot.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newTimeSlot.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
