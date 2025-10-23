import { GENDER } from "@prisma/client";

export type IDoctorUpdateInput = {
  email: string;
  contactNumber: string;
  gender: GENDER;
  name: string;
  address: string;
  registrationNumber: string;
  experience: number;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  specialties: {
    specialtyId: string;
    isDeleted?: boolean;
  }[];
};
