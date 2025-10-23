import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorScheduleValidation } from "./doctorSchedule.validation";

const router = Router();

router.post(
  "/",
  validateRequest(
    DoctorScheduleValidation.createDoctorScheduleValidationSchema
  ),
  auth(UserRole.DOCTOR),
  DoctorScheduleController.insertIntoDB
);

export const DoctorScheduleRouter = router;
