import ContactForm from '@/components/form/contactform'
import React from 'react'

const AboutRoute = () => {
  return (
    <div className='container mx-auto'>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h1>เกี่ยวกับระบบ</h1>
          <p className='indent-8'>
          ระบบบริหารจัดการลายเซ็นอิเล็กทรอนิกส์ สำหรับให้บริการบุคลากรภายในมหาวิทยาลัยมหาสารคาม 
          สามารถเข้าไปดาวน์โหลดลายเซ็นอิเล็กทรอนิกส์ของตนเองเพื่อใช้ลงลายมือชื่อในเอกสารได้จากระบบบริหารจัดการลายเซ็นอิเล็กทรอนิกส์
          </p>
        </div>
        <div>
          <h1>ติดต่อเรา</h1>
          <ContactForm />
        </div> 
      </div>
    </div>
  )
}

export default AboutRoute

