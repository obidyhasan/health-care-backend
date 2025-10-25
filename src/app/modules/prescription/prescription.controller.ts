import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { PrescriptionService } from "./prescription.service";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";
import { IJWTPayload } from "../../types/common";

const createPrescription = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionService.createPrescription(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription created successfully!",
      data: result,
    });
  }
);

export const PrescriptionController = {
  createPrescription,
};
