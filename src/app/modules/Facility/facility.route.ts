import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { facilityValidations } from './facility.validation';
import { facilityControllers } from './facility.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(facilityValidations.createFacilityValidationSchema),
  facilityControllers.createFacility,
);

export const facilityRoutes = router;
