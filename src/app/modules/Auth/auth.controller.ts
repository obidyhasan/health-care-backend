import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../shared/sendResponse";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.login(req.body);
    const { accessToken, refreshToken, needPasswordChange } = result;

    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    });

    res.cookie("refresh", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 90,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: {
        needPasswordChange,
      },
    });
  }
);

export const AuthController = {
  login,
};
