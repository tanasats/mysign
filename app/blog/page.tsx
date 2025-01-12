import ContactForm from '@/components/form/contactform'
import React from 'react'

const BlogRoute = () => {
  return (
    <div className='container mx-auto'>
      Blog
      <hr className='mb-5' />


      <div className='text-2xl'> Contact Us</div>
      <div>
        <ContactForm />
      </div>


    </div>
  )
}

export default BlogRoute
