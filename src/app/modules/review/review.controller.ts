import httpStatus from "http-status";
import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await ReviewService.insertIntoDB(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Patient review created successfully!",
      data: result,
    });
  }
);

export const ReviewController = {
  insertIntoDB,
};
