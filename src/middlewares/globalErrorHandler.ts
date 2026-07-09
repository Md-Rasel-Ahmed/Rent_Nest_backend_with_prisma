import type { ErrorRequestHandler } from "express";
import httpStatus from 'http-status';
import { Prisma } from "../../prisma/generated/prisma/client";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong!';
  let errName = err.name || "InternalServerError";
  let errorDetails = err.stack || 'No additional details available.';

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = httpStatus.BAD_REQUEST;
    errName = `PrismaError (${err.code})`;

    switch (err.code) {
      case 'P2002': {
        const fields = (err.meta?.target as string[])?.join(', ') || 'fields';
        message = `Unique constraint failed. The provided value for [${fields}] already exists.`;
        break;
      }
      case 'P2025': {
        statusCode = httpStatus.NOT_FOUND; 
        message = err.meta?.cause as string || 'The record you are trying to access or modify was not found.';
        break;
      }
      case 'P2003': {
        message = 'Foreign key constraint failed. A related record could not be found.';
        break;
      }
      default: {
        message = `A database error occurred: ${err.message}`;
        break;
      }
    }
  }

  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST; 
    errName = "PrismaValidationError";
    message = "You have provided an incorrect field type or a required field is missing.";
  }

  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errName = "PrismaInitializationError";
    message = "Failed to connect to the database server. Please try again later.";
  }

  return res.status(statusCode).json({
    success: false,
    name: errName,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;