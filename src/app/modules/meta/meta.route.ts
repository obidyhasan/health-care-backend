import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { MetaController } from "./meta.controller";

const route = Router();

route.get(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  MetaController.fetchDashboardMetaData
);

export const MetaRouter = route;
