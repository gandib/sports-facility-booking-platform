import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookingControllers } from './booking.controller';
import { bookingValidations } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  //   validateRequest(bookingValidations.createBookingValidationSchema),
  bookingControllers.createBooking,
);

export const bookingRoutes = router;
