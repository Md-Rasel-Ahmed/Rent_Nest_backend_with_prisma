import type { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: "API Not Found",
    errorDetails: `The requested URL ${req.originalUrl} with method ${req.method} was not found on this server.`
  });
};

export default notFound;