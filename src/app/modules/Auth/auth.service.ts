import httpStatus from "http-status";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { jwtHelper } from "../../helper/jwtHelper";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { Secret } from "jsonwebtoken";
import { UserStatus } from "@prisma/client";
import { IJWTPayload } from "../../types/common";
import emailSender from "../../middlewares/emailSender";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password is incorrect!");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.jwt.jwt_access_secret as string,
    config.jwt.jwt_access_expires as string
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.jwt.jwt_refresh_secret as string,
    config.jwt.jwt_refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  console.log(token);
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as string
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.jwt_access_expires as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (
  user: IJWTPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password incorrect!");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_number)
  );

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.jwt_pass_reset_secret as Secret,
    config.jwt.jwt_pass_reset_expires as string
  );

  const resetPassLink =
    config.reset_pass_url +
    `?userId=${userData.id}&token=${resetPasswordToken}`;

  await emailSender(
    userData.email,
    `
      <div>
        <p>Dear User,</p>
          <p>Your password reset link 
            <a href=${resetPassLink}>
              <button>
                Reset Password
              </button>
           </a>
         </p>
      </div>
      `
  );
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelper.verifyToken(
    token,
    config.jwt.jwt_pass_reset_secret as Secret
  );

  if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
  }

  const password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_number)
  );

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password,
    },
  });
};

const getMe = async (session: any) => {
  const accessToken = session.accessToken;
  const decodeData = jwtHelper.verifyToken(
    accessToken,
    config.jwt.jwt_access_secret as Secret
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodeData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const { id, email, role, needPasswordChange, status } = userData;

  return {
    id,
    email,
    role,
    needPasswordChange,
    status,
  };
};

export const AuthService = {
  login,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
  getMe,
};
