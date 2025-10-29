import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import pick from "../../helper/pick";
import { userFilterableFields } from "./user.constant";
import { IJWTPayload } from "../../types/common";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient created successfully!",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createDoctor(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Doctor created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // page, limit, sortBy, sortOrder
  // filed, searchTerm - searching, filtering
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await UserService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieve successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await UserService.getMyProfile(user as IJWTPayload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetch successfully!",
      data: result,
    });
  }
);

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.changeProfileStatus(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My profile status change successfully!",
    data: result,
  });
});

const updateMyProfile = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await UserService.updateMyProfile(user as IJWTPayload, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile updated successfully!",
      data: result,
    });
  }
);

export const UserController = {
  createPatient,
  createAdmin,
  createDoctor,
  getAllFromDB,
  getMyProfile,
  changeProfileStatus,
  updateMyProfile,
};
