'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useState } from 'react' 
import { LoginSchema } from "@/lib/zodSchema"
import toast, { useToaster } from 'react-hot-toast'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { ZodError } from 'zod'
import { getSession,removeSession,setSession } from '@/lib/session'
import { delToken, setToken } from '../actions/tokenController'
import { useUserContext } from '../context/UserContext'
import { useRouter } from 'next/navigation'



const Login = () => {
  const {userID,setUserID} = useUserContext();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  //function toggleShow() { setIsShow(!isShow) }
  const toggleShow = () => { setIsShowPassword(!isShowPassword) }

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState<any[]>([]);

  // function isJsonString(str:string) {
  //   try {
  //     JSON.parse(str);
  //   } catch (e) {
  //     return false;
  //   }
  //   return true;
  // }

  async function login(username: string, password: string) {
    console.log("login api")
    //const response = await fetch("https://melivecode.com/api/login", { //username: karn.yong@melivecode.com  password:melivecode
    const response = await fetch("https://data.msu.ac.th/api/authen/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    return response.json();
  }

  const handleChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData(prevData => (
      { ...prevData, [(e.target as any).name]: (e.target as any).value }
    ))
  }

  const handleSubmit = async (e: any) => {
    delToken()
    e.preventDefault();
    setIsLoading(true);
    try {
      const validFormData = LoginSchema.safeParse(formData);

      // refine errors when form is invalid
      if (!validFormData.success) {
        let errArr: any[] = [];
        const { errors: err } = validFormData.error;
        for (var i = 0; i < err.length; i++) {
          errArr.push({ for: err[i].path[0], message: err[i].message });
        }
        setErrors(errArr);
        console.log("form not validate")

        //throw err;  //:>throw err to catch(error){}
        return; //:> break out try{} to do final{}
      }

      // form is valid
      setErrors([]);
      const username = formData.username;
      const password = formData.password;
      const res = await login(username, password);
      console.log("api login=",res);
      if (res.accessToken) {
        setToken(res.accessToken);
        await setSession(res);
        setFormData({ username: '', password: '' })
        setUserID(res.fullname)
        toast.success("Login Success")
        router.push("/")
      } else {
        toast.error("Login failed!")
      }

    } catch (error) {
      console.error(error);
    } finally {
      //console.log("finally")
      setIsLoading(false);
    }
  } // handleSubmit

const handleSignout = async () =>{
  removeSession().then(()=>{
    console.log("remove user session");
  });
}


  // const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   const validFormData = LoginSchema.safeParse(formData);
  //   if (validFormData.success) {
  //     setIsLoading(true);
  //     const username = formData.email;
  //     const password = formData.password;
  //     const res = await login(username, password);
  //     console.log(res);
  //     if (res.access_token) {
  //       toast.success("Login Success")
  //       setFormData({ email: '', password: '' })
  //     } else {
  //       toast.error("Login failed!")
  //     }
  //     setIsLoading(false);
  //   } else {
  //     console.log(validFormData.error)
  //     let errArr: any[] = [];
  //     const { errors: err } = validFormData.error;
  //     for (var i = 0; i < err.length; i++) {
  //       errArr.push({ for: err[i].path[0], message: err[i].message });
  //     }
  //     setErrors(errArr);
  //     console.log(errArr);
  //     throw err;
  //   }
  //
  //   // if (validFormData.success) {
  //   //   console.log("valid login form data.")
  //   //   const options = { method: "POST", body: JSON.stringify(validFormData.data) };
  //   //   const res = await fetch("/api/login", options);
  //   //   const resdata = await res.json();
  //   //   if(resdata.status=="success"){
  //
  //   //   }else{
  //   //     toast.error("ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง!")
  //   //   }
  //   //   console.log(resdata);
  //   // } else {
  //   //   //console.log(validFormData.error)
  //   //   console.log(ZodError)
  //   // }
  //
  // }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className='max-w-md bg-slate-100 p-5 mx-auto rounded-lg'>
          <div className='mb-5'>
            <h1 className='text-2xl'>Login</h1>
          </div>
          <div className="mb-5">
            <Label>username</Label>
            <Input
              name='username'
              value={formData.username}
              onChange={handleChangeData}
              type='text'
              placeholder='username'
              className='bg-white'
              autoComplete="off"

            />
            <span className='text-xs text-red-500 italic'>{errors.find((error) => error.for=="username")?.message}</span>
          </div>
          <div className="mb-5">
            <Label>Password</Label>
            <div className='relative'>
              <Input
                name='password'
                value={formData.password}
                onChange={handleChangeData}
                type={isShowPassword ? "text" : "password"}
                placeholder='password'
                className='bg-white'
                autoComplete="off"

              />
              {isShowPassword ?
                (
                  <Eye className='absolute top-[0.4rem] right-4 cursor-pointer text-muted-foreground' onClick={toggleShow} />
                ) : (
                  <EyeOff className='absolute top-[0.4rem] right-4 cursor-pointer text-muted-foreground' onClick={toggleShow} />
                )
              }

            </div>
            <span className='text-xs text-red-500 italic'>{errors.find((error) => error.for=="password")?.message}</span>
          </div>


          <Button type='submit' className='w-full mb-5' disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Login
          </Button>
          <p>Don't have an account? <Link href="/signup" className='text-primary'>signup</Link></p>
        </div>
      </form>
      <Button onClick={handleSignout}>Signout</Button>
    </>
  )
}

export default Login
// reference: https://nextjs.org/docs/app/building-your-application/authentication