import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  frontend_url: process.env.FRONTEND_URL,
  reset_pass_url: process.env.RESET_PASSWORD_URL,
  bcrypt_salt_number: process.env.BCRYPT_SALT_NUMBER,
  open_router_api_key: process.env.OPEN_ROUTER_API_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KET,
  webhook_secret_key: process.env.WEBHOOK_SECRET_KET,
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires: process.env.JWT_ACCESS_EXPIRES,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES,
    jwt_pass_reset_secret: process.env.JWT_PASS_RESET_SECRET,
    jwt_pass_reset_expires: process.env.JWT_PASS_RESET_EXPIRES,
  },
  cloudinary: {
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
  },
  email_sender: {
    user_email_sender: process.env.USER_EMAIL_SENDER,
    pass_email_sender: process.env.PASS_EMAIL_SENDER,
  },
};
