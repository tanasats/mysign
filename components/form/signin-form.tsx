'use client';
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

import { registerUserAction } from "@/app/actions/auth-action";
import { useActionState, useState } from "react";
import { LoginSchema } from "@/lib/zodSchema";
import toast from "react-hot-toast";
import { setToken } from "@/app/actions/tokenController";
import { getSession, setSession } from "@/lib/session";
//import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSession } from "@/app/context/SessionContext";
// const INITIAL_STATE = {
//     data: null,
// };

const INITIAL_FORM = {
    username: '',
    password: ''
}

const SignInForm = () => {
    //const { userID, setUserID } = useUserContext();
    const [formData, setFormData] = useState(INITIAL_FORM)
    const [formError, setFormError] = useState<any[]>([]);
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    //const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE);
    const { currentuser,setCurrentUser,getsession,logout} = useSession();
    //const handleSubmit = async (formData: FormData) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const loginData = {
            username: formData.get("username")?.toString(),
            password: formData.get("password")?.toString(),
        }
        console.log("loginData: ", loginData);
        const parseLogin = LoginSchema.safeParse(loginData)
        //console.log(parseLogin)
        console.log(parseLogin?.error?.message)
        if (!parseLogin.success) {
            const { errors: errArr } = parseLogin.error;
            const fe = errArr.map(e => ({ "for": e.path[0], "message": e.message }))
            console.log("zoderror result:", fe);
            setFormError(fe)
            return;
        }
        setFormError([]) // clear form error message   

        const res = await _signin(loginData);
        console.log("response from api/auth/login :",res);
        if (res.accessToken) {
            setToken(res.accessToken);
            await setSession(res);
            setFormData({ username: '', password: '' })
            //setUserID(res.fullname)
            getsession(); 
            toast.success("Login Success")
            router.push("/")
        } else {
            toast.error("Login failed!")
        }

    }// handleSubmit()

    // -- client side call api
    async function _signin({ username, password }: { username: string | undefined; password: string | undefined; }) {
        console.log("login api data :", ' username=',username,' password=',password);
        //const response = await fetch("https://melivecode.com/api/login", { //username: karn.yong@melivecode.com  password:melivecode
        const response = await fetch("https://data.msu.ac.th/api/authen/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        return response.json();
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">เข้าใช้งาน</CardTitle>
                        <CardDescription>
                            เข้าใช้งานด้วย username/password ของระบบ MSU Authentication
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="username or email"
                            />
                            <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "username")?.message}</span>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>

                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={isShowPassword ? "text" : "password"}
                                    placeholder="password"
                                />
                                {isShowPassword ?
                                    (
                                        <EyeIcon size={20} className='absolute top-[0.5rem] right-2 cursor-pointer text-muted-foreground' onClick={() => setIsShowPassword(!isShowPassword)} />
                                    ) : (
                                        <EyeOffIcon size={20} className='absolute top-[0.5rem] right-2 cursor-pointer text-muted-foreground' onClick={() => setIsShowPassword(!isShowPassword)} />
                                    )
                                }
                            </div>
                            <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "password")?.message}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full">Sign In</Button>
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?
                    <Link className="underline ml-2" href="/signup">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
