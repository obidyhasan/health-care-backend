import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorScheduleValidation } from "./doctorSchedule.validation";

const router = Router();

router.get("/", auth(UserRole.ADMIN), DoctorScheduleController.getAllFromDB);

router.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
);

router.post(
  "/",
  validateRequest(
    DoctorScheduleValidation.createDoctorScheduleValidationSchema
  ),
  auth(UserRole.DOCTOR),
  DoctorScheduleController.insertIntoDB
);

router.delete(
  "/:id",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.deleteFromDB
);

export const DoctorScheduleRouter = router;
