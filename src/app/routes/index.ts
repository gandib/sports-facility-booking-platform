import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { facilityRoutes } from '../modules/Facility/facility.route';
import { bookingRoutes } from '../modules/Booking/booking.route';

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
