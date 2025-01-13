// reference: https://www.youtube.com/watch?v=QWnI3H_Qah4
"use server";
import { z } from "zod"
import { registerUserService } from "../services/auth-service";

const schemaRegister = z.object({
    username: z.string().min(3).max(20, {
        message: "Username must be between 3 and 20 characters",
    }),
    password: z.string().min(6).max(100, {
        message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    })
});

export async function registerUserAction(prevState: any, formData: FormData) {
    console.log("Hello form Register User Action");
    console.log("formData:",formData)
    
    const validateFields = schemaRegister.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
    })
    console.log(validateFields.success);
    if (!validateFields.success) {
        return {
            ...prevState,
            zodErrors: validateFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Register",
        };
    }
    console.log("form is valid")
    const responseData = await registerUserService(validateFields.data);
    console.log("response data:",responseData);

    return {
        ...prevState,
        data: responseData,
    }

}