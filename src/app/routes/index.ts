import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { UserRouter } from "../modules/user/user.route";
import { ScheduleRouter } from "../modules/schedule/schedule.route";
import { DoctorScheduleRouter } from "../modules/doctorSchedule/doctorSchedule.route";

const router = Router();
const moduleRouters = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/schedule",
    route: ScheduleRouter,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRouter,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));
export default router;
