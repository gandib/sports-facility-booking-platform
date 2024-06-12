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

router.put(
  '/:id',
  auth('admin'),
  validateRequest(facilityValidations.updateFacilityValidationSchema),
  facilityControllers.updateFacility,
);

router.delete('/:id', auth('admin'), facilityControllers.deleteFacility);

router.get('/', facilityControllers.getAllFacility);

export const facilityRoutes = router;
