import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";
import { DoctorScheduleService } from "./doctorSchedule.service";
import pick from "../../helper/pick";
import { doctorScheduleFilterableFields } from "./doctorSchedule.constant";

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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorScheduleFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await DoctorScheduleService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Doctor Schedule retrieval successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const deleteFromDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.deleteFromDB(
      user as IJWTPayload,
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "My Schedule deleted successfully!",
      data: result,
    });
  }
);

const getMySchedule = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = req.user;

    const result = await DoctorScheduleService.getMySchedule(
      filters,
      options,
      user as IJWTPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Doctor Schedule retrieval successfully!",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const DoctorScheduleController = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
  getMySchedule,
};
