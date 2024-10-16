import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password should be atleast 8 characters",
  }),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password should be atleast 8 characters",
  }),
  username: z.string().min(3, {
    message: "Username should be atleast 3 characters",
  }),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
