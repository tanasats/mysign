'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { SignupSchema } from '@/lib/zodSchema'
import toast from 'react-hot-toast'


const INITIAL_FORM = {
  fullname: '',
  username: '',
  email: '',
  password: ''
}

const Signup = () => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [formError, setFormErrors] = useState<any[]>([]);

  const handleChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData(prevData => (
      { ...prevData, [(e.target as any).name]: (e.target as any).value }
    ))
  }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submit data:", formData);

    const parseSignup = SignupSchema.safeParse(formData);
    console.log("Zod schema safePase:", parseSignup);

    // Extract error message
    if (!parseSignup.success) {
      //console.log("invalid form error:",parseSignup.error);
      const { errors: zerr } = parseSignup.error;
      const fielderr = zerr.map(e => ({ "for": e.path[0], "message": e.message }))
      console.log("error result:", fielderr);
      setFormErrors(fielderr);
      //throw err;  //:>throw err to catch(error){}
      return; //:> break out try{} to do final{}


      // let errArr: any[] = [];
      // const { errors: err } = parseSignup.error;
      // for (var i = 0; i < err.length; i++) {
      //   errArr.push({ for: err[i].path[0], message: err[i].message });
      // }
      // setFormErrors(errArr);
    }

    // form is valid-----------------------
    console.log("valid form data")
    setFormErrors([]);
    try {
      const options = { method: "POST", body: JSON.stringify(formData) }
      const res = await fetch('/api/signup', options);
      const resdata = await res.json();
      console.log(resdata)

      if (resdata.affectedRows) {
        console.log("Signup Success!!")
        setFormData(INITIAL_FORM);
        toast.success("Signup Success");
      } else {
        const message = "Error! " + resdata.message;
        toast.error(message);
      }
    } catch (err) {
      console.log("try-catch error: ", err)
    }

  }
 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='max-w-md bg-slate-100 p-5 mx-auto rounded-lg'>
          <div className='mb-5'>
            <h1 className='text-2xl'>Signup</h1>
          </div>
          <div className="mb-5">
            <Label>FullName</Label>
            <Input
              name='fullname'
              value={formData.fullname}
              onChange={handleChangeData}
              type='text'
              placeholder='fullname'
              className='bg-white' />
            <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "fullname")?.message}</span>
          </div>
          <div className="mb-5">
            <Label>Username</Label>
            <Input
              name='username'
              value={formData.username}
              onChange={handleChangeData}
              type='text'
              placeholder='username'
              className='bg-white' />
            <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "username")?.message}</span>
          </div>
          <div className="mb-5">
            <Label>Email</Label>
            <Input
              name='email'
              value={formData.email}
              onChange={handleChangeData}
              type='text'
              placeholder='email'
              className='bg-white' />
            <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "email")?.message}</span>
          </div>
          <div className="mb-5">
            <Label>Password</Label>
            <Input
              name='password'
              value={formData.password}
              onChange={handleChangeData}
              type='password'
              placeholder='password'
              className='bg-white' />            <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "password")?.message}</span>
          </div>
          <Button type='submit' className='w-full mb-5'>Create a new account</Button>
          <p>Already have an account? <Link href="/login" className='text-primary'>login</Link></p>
        </div>
      </form>
    </>
  )
}

export default Signup
