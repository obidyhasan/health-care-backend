import { GENDER } from "@prisma/client";
import z from "zod";

const createPatientValidationSchema = z.object({
  password: z.string().nonempty("Password is required"),
  patient: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.email().nonempty("Email is required"),
    address: z.string().optional(),
  }),
});

const createAdminValidationSchema = z.object({
  password: z.string().nonempty("Password is required"),
  admin: z.object({
    name: z.string().nonempty("Name is required!"),
    email: z.string().nonempty("Email is required!"),
    contactNumber: z.string().nonempty("Contact Number is required!"),
  }),
});

const createDoctorValidationSchema = z.object({
  password: z.string().nonempty("Password is required"),
  doctor: z.object({
    name: z.string().nonempty("Name is required!"),
    email: z.string().nonempty("Email is required!"),
    contactNumber: z.string().nonempty("Contact Number is required!"),
    address: z.string().nonempty("Address is required!"),
    registrationNumber: z.string().nonempty("Registration number is required!"),
    experience: z.coerce.number().optional(),
    gender: z.enum([GENDER.MALE, GENDER.FEMALE]),
    appointmentFee: z.coerce.number().min(1, "Appointment fee is required"),
    qualification: z.string().nonempty("Qualification is required!"),
    currentWorkingPlace: z
      .string()
      .nonempty("Current working place is required!"),
    designation: z.string().nonempty("Designation is required!"),
  }),
});

export const UserValidation = {
  createPatientValidationSchema,
  createAdminValidationSchema,
  createDoctorValidationSchema,
};
