import httpStatus from "http-status";
import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { IJWTPayload } from "../../types/common";
import pick from "../../helper/pick";
import { reviewFilterableFields } from "./review.constant";

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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.params, reviewFilterableFields);
  const options = pick(req.params, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ReviewService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieval successfully!",
    data: result,
  });
});

export const ReviewController = {
  insertIntoDB,
  getAllFromDB,
};
