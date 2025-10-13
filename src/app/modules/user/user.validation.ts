import z, { email } from "zod";

const createPatientValidationSchema = z.object({
  password: z.string().nonempty("Password is required"),
  patient: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.email().nonempty("Email is required"),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  createPatientValidationSchema,
};
