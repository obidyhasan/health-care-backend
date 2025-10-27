import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { UserRouter } from "../modules/user/user.route";
import { ScheduleRouter } from "../modules/schedule/schedule.route";
import { DoctorScheduleRouter } from "../modules/doctorSchedule/doctorSchedule.route";
import { SpecialtiesRouter } from "../modules/specialties/specialties.route";
import { DoctorRouter } from "../modules/doctor/doctor.route";
import { AppointmentRouter } from "../modules/appointment/appointment.route";
import { PrescriptionRouter } from "../modules/prescription/prescription.route";
import { ReviewRouter } from "../modules/review/review.route";
import { PatientRouter } from "../modules/patient/patient.route";

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
  {
    path: "/specialties",
    route: SpecialtiesRouter,
  },
  {
    path: "/appointment",
    route: AppointmentRouter,
  },
  {
    path: "/prescription",
    route: PrescriptionRouter,
  },
  {
    path: "/doctor",
    route: DoctorRouter,
  },
  {
    path: "/patient",
    route: PatientRouter,
  },
  {
    path: "/review",
    route: ReviewRouter,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));
export default router;
