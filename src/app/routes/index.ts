import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { UserRouter } from "../modules/user/user.route";

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
];

moduleRouters.forEach((route) => router.use(route.path, route.route));
export default router;
