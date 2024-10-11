import { z } from "zod";

const petTypes = ["Dog", "Cat", "Rabbit", "Other"] as const;

export const formSchema = z.object({
  petName: z.string().min(3, {
    message: "Pet name must be at least 3 characters",
  }),
  petType: z.enum(petTypes, {
    errorMap: () => ({ message: "Please select a pet type" }),
  }),
  breed: z.string().min(1, {
    message: "Breed must be atleast 1 character",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters",
    })
    .regex(/^[0-9]+$/, {
      message: "Phone number must contain only digits",
    }),
});

export type RegisterInput = z.infer<typeof formSchema>;
