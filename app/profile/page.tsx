'use client'
import React, { useState, useEffect } from 'react'
//import { cookies } from 'next/headers';
//import { default as jwt } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { getSession } from '@/lib/session';
import UserCard from '@/components/card/userinfo';
import { getToken, verifyToken } from '../actions/tokenController';
import { useSession } from '../context/SessionContext';


const Profile = () => {
      const { currentuser,setCurrentUser,getsession,logout} = useSession();

  //const cookieStore = cookies();
  //const sessiondata = cookieStore.get()

  // const bgColor = cookies().then((c)=>{
  //   let sess = c.get("session")?.value;
  //   return sess;  
  // })
  //console.log("bgColor=",bgColor);
  const [userSession, setUserSession] = useState({
    username: '',
    fullname: '',
  });

  


  useEffect(() => {
    getSession().then((data) => {
      console.log("cookie(session):", data);
      setUserSession(data);
    });
    getToken().then((data) =>{
      console.log("token decoded: ",data);
      //console.log("username",data.username)
      // const expDate = new Date(data.iat *1000);
      // console.log(expDate.toLocaleDateString('th-TH'))
      // console.log(expDate.toLocaleTimeString('th-TH'))
    })
    verifyToken().then((data)=>{
      console.log("verify token: ",data);
    })
  }, [])

  return (
    <div className='container mx-auto'>
      <div className='flex '>    
        <div className='w-[250px] border-r-[1px] border-slate-100 px-5'>
          <UserCard
            data={userSession}
          />
        </div>
        <div className='flex-1 px-5'>
          Session data
          <div>login status: {currentuser?.isLogin?'yes':'no'}</div>
          <div>fullname: {currentuser?.fullname}</div>
          <div>username: {currentuser?.username}</div>
          <div>email: {currentuser?.email}</div>
        </div>
      </div>



    </div>
  )
}

export default Profile
