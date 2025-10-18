import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";
import { DoctorScheduleService } from "./doctorSchedule.service";

const insertIntoDB = catchAsync(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    const result = await DoctorScheduleService.insertIntoDB(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Doctor Schedule created successfully!",
      data: result,
    });
  }
);

export const DoctorScheduleController = {
  insertIntoDB,
};
