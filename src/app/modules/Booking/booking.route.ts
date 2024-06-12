import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookingControllers } from './booking.controller';
import { bookingValidations } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(bookingValidations.createBookingValidationSchema),
  bookingControllers.createBooking,
);

router.get('/', auth('admin'), bookingControllers.getAllBookings);

router.get('/user', auth('user'), bookingControllers.getAllBookingsByUser);

router.delete('/:id', auth('user'), bookingControllers.deleteBooking);

export const bookingRoutes = router;
