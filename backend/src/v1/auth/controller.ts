import type { Request, Response } from "express";
import * as authService from "./service";

export const register = async (request: Request, response: Response ): Promise<void> => {
    await authService.register(request, response);
}

export const login = async (request: Request, response: Response ): Promise<void> => {
    await authService.login(request, response);
}