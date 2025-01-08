'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useState } from 'react'
import { LoginSchema } from "@/lib/zodSchema"
import toast from 'react-hot-toast'


const Login = () => {
  //const [data,setData] = useState({username:"",password:""})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData(prevData => (
      { ...prevData, [(e.target as any).name]: (e.target as any).value }
    ))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const validFormData = LoginSchema.safeParse(formData);
    toast.success("login success")
    
    if(validFormData.success){
      console.log("valid login form data.")
      const options = {method:"POST",body:JSON.stringify(validFormData.data)};
      const res = await fetch("/api/login",options);
      const resdata = await res.json();
      console.log(resdata);
      
    }


  }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className='max-w-md bg-slate-100 p-5 mx-auto rounded-lg'>
          <div className='mb-5'>
            <h1 className='text-2xl'>Login</h1>
          </div>
          <div className="mb-5">
            <Label>email</Label>
            <Input
              name='email'
              value={formData.email}
              onChange={handleChangeData}
              type='text'
              placeholder='email'
              className='bg-white'
            />
          </div>
          <div className="mb-5">
            <Label>Password</Label>
            <Input
              name='password'
              value={formData.password}
              onChange={handleChangeData}
              type='password'
              placeholder='password'
              className='bg-white'
            />
          </div>
          <Button type='submit' className='w-full mb-5'>Login</Button>
          <p>Don't have an account? <Link href="/signup" className='text-primary'>signup</Link></p>
        </div>
      </form>
    </>
  )
}

export default Login
