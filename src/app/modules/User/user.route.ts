import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidations.createUserValidationSchema),
  userControllers.createUser,
);

router.post(
  '/login',
  validateRequest(userValidations.loginValidationSchema),
  userControllers.loginUser,
);

export const userRoutes = router;
