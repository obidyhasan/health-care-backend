import { Router } from "express";
import { PatientController } from "./patient.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", PatientController.getAllFromDB);
router.get("/:id", PatientController.getByIdFromDB);
router.patch("/", auth(UserRole.PATIENT), PatientController.updateIntoDB);
router.delete("/soft/:id", PatientController.softDelete);

export const PatientRouter = router;
