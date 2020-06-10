// import { Request, Response, NextFunction } from 'express';
// import { CustomError } from '../errors/custom-error';
// // import { Request, Response } from 'supertest';
// // import { NextFunction } from 'express';

// export const errorHandler = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     if (err instanceof CustomError) {
//         return res.status(err.statusCode).send({ errors: err.serializeErrors() });
//     }
// };
