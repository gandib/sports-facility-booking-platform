import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { facilityValidations } from './facility.validation';
import { facilityControllers } from './facility.controller';
import { upload } from '../../utils/sendEmail';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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

router.get('/:facilityId', facilityControllers.getSingleFacility);

export const facilityRoutes = router;
