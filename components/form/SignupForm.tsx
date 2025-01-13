"use client"

import { useFormState } from "react-dom"
//import { registerUserAction } from "@/app/actions/auth-action"
  import { registerUserAction } from "@/app/actions/auth-action"
  
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {ZodErrors} from "../custom/ZodErrors"


const INITIAl_STATE = {
    data: null,
    zodErrors: null,
    message: null,
}

const SignupForm = () => {
    const [formState,formAction] = useFormState(registerUserAction,INITIAl_STATE);
    console.log(formState,"client");

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <div className="my-2">
            <Label htmlFor="username">UserName</Label>
            <Input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            />
            <ZodErrors error={formState?.zodErrors?.username} />
        </div>

        <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
            id="email"
            name="email"
            type="text"
            placeholder="name@example.com"
            />
            <ZodErrors error={formState?.zodErrors?.email} />
        </div>
        <div className="my-2">
            <Label htmlFor="password">password</Label>
            <Input
            id="password"
            name="password"
            type="text"
            placeholder="password"
            />
            <ZodErrors error={formState?.zodErrors?.password} />
        </div>        
        <div className="my-5">
            <Button type="submit" className="w-full">Submit</Button>
        </div>

      </form>
    </div>
  )
}

export default SignupForm
