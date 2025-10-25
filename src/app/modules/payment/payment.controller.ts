import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { PaymentService } from "./payment.service";
import { Request, Response } from "express";
import config from "../../config";
import { stripe } from "../../helper/stripe";

const handleStripeWebhookEvent = catchAsync(
  async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"] as string;
    const WebhookSecret = config.webhook_secret_key;

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        WebhookSecret as string
      );
    } catch (error: any) {
      console.log("🚫 Webhook signature verification failed: ", error.message);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(`Webhook Error: ${error.message}`);
    }

    const result = await PaymentService.handleStripeWebhookEvent(event);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Webhook request send successfully!",
      data: result,
    });
  }
);

export const PaymentController = {
  handleStripeWebhookEvent,
};
