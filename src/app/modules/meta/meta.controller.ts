import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IJWTPayload } from "../../types/common";
import { MetaService } from "./meta.service";
import sendResponse from "../../shared/sendResponse";

const fetchDashboardMetaData = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await MetaService.fetchDashboardMetaData(
      user as IJWTPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meta data retrieval successfully!",
      data: result,
    });
  }
);

export const MetaController = {
  fetchDashboardMetaData,
};
