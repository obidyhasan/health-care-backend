import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, searchTerm, sortBy, sortOrder, role, status } =
    req.query;
  const result = await UserService.getAllFromDB({
    page: Number(page),
    limit: Number(limit),
    searchTerm,
    sortBy,
    sortOrder,
    role,
    status,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieve successfully!",
    data: result,
  });
});

export const UserController = {
  createPatient,
  getAllFromDB,
};
