import { Request, Response } from 'express';
import httpStatus from 'http-status';

const authError = (
  req: Request,
  res: Response,
  //   next: NextFunction,
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: 401,
    message: 'You have no access to this route',
  });
};

export default authError;
