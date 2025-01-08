import {z} from "zod"

export const LoginSchema = z.object({
    email: z.string({required_error:"required"}).min(5,{message:"Minimum 5 character requied"}),
    password: z.string().min(4,{message: "Minimum 4 character required"})
})

export const SignupSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})