import type { Request, Response } from "express";
import * as bandService from "./service";

export const createBand = async ( request: Request, response:Response ): Promise<void> => {
    await bandService.createBand(request, response);
}

export const listBands = async ( request: Request, response:Response ): Promise<void> => {
    await bandService.listBands(request, response);
}

export const updateBand = async ( request: Request, response:Response ): Promise<void> => {
    await bandService.updateBand(request, response);
}

export const deleteBand = async ( request: Request, response:Response ): Promise<void> => {
    await bandService.deleteBand(request, response);
}