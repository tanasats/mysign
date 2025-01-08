'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { SignupSchema } from '@/lib/zodSchema'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData(prevData => (
      { ...prevData, [(e.target as any).name]: (e.target as any).value }
    ))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const validFormData = SignupSchema.safeParse(formData);
    console.log(validFormData);
    if (validFormData.success) {
      console.log("valid form data")
      const options = { method: "POST", body: JSON.stringify(formData) }
      const res = await fetch('/api/signup', options);
      const resdata = await res.json();
      console.log(resdata)
      
      if (resdata["status"] === "success") {
        console.log("Signup Success!!")
        setFormData({ name: '', email: '', password: '' })
      }
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
              name='name'
              value={formData.name}
              onChange={handleChangeData}
              type='text'
              placeholder='fullname'
              className='bg-white' />
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
          </div>
          <div className="mb-5">
            <Label>Password</Label>
            <Input
              name='password'
              value={formData.password}
              onChange={handleChangeData}
              type='password'
              placeholder='password'
              className='bg-white' />
          </div>
          <Button type='submit' className='w-full mb-5'>Create a new account</Button>
          <p>Already have an account? <Link href="/login" className='text-primary'>login</Link></p>
        </div>
      </form>
    </>
  )
}

export default Signup
