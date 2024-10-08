import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { facilityRoutes } from '../modules/Facility/facility.route';
import { bookingRoutes } from '../modules/Booking/booking.route';
import { paymentRoutes } from '../modules/Payment/payment.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/facility',
    route: facilityRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/',
    route: bookingRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
