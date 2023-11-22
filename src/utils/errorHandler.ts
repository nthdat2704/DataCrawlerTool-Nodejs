//@ts-nocheck
import { NextFunction } from "express";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Request,
  next: NextFunction
) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
};
