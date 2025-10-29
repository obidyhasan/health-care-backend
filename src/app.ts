import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./app/config";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { PaymentController } from "./app/modules/payment/payment.controller";
import cron from "node-cron";
import { AppointmentService } from "./app/modules/appointment/appointment.service";

const app: Application = express();

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhookEvent
);

app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
  })
);

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cron
cron.schedule("* * * * *", () => {
  try {
    console.log("Node cron called at ", new Date());
    AppointmentService.cancelUnpaidAppointments();
  } catch (error) {
    console.log("Error from cron: ", error);
  }
});

// Router
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is running..",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + " second",
    timeStamp: new Date().toISOString(),
  });
});

// Global Error Handler
app.use(globalErrorHandler);
// Not Found
app.use(notFound);

export default app;
