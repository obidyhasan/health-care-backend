import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { ScheduleService } from "./schedule.service";
import { IJWTPayload } from "../../types/common";
import pick from "../../helper/pick";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ScheduleService.insertIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Schedule created successfully!",
      data: result,
    });
  }
);

const schedulesForDoctor = catchAsync(
  async (
    req: Request & { user?: IJWTPayload },
    res: Response,
    next: NextFunction
  ) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filters = pick(req.query, ["startDateTime", "endDateTime"]);

    const result = await ScheduleService.schedulesForDoctor(
      req.user as IJWTPayload,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule fetched successfully!",
      data: result,
    });
  }
);

const deleteScheduleFromData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ScheduleService.deleteScheduleFromDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule deleted successfully!",
      data: result,
    });
  }
);

export const ScheduleController = {
  insertIntoDB,
  schedulesForDoctor,
  deleteScheduleFromData,
};
