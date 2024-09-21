import { z } from "zod";


export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string(),
    role: z.string().optional(),
})

export const adminSignUpSchema = signUpSchema.omit({ role: true }).extend({
    role: z.literal("admin")
})

export type SignInInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const adminSignInSchema = signInSchema;
export type SignUpInput = z.infer<typeof signUpSchema>;
