import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export const validateRequest = (schema: ZodObject<any>) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      return response.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: result.error.format(),
      });
    }

    request.body = result.data;
    next();
  };
};