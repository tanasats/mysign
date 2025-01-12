'use client';
import SignupForm from '@/components/form/SignupForm';
import React, { useEffect, useState } from 'react'

const TodoPage = () => {
  const [userList, setUserList] = useState([]);
    async function getUsers() {
      let data: never[] = [];
      let response = await fetch('/api/users');
      let resjson = await response.json();
      if (resjson.status == 'success') data = resjson.data
      return data;
    }
  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
      setUserList(data);
    })

  }, [])
  return (
    <div className='container mx-auto'>
    
      <div>
        User count {userList.length} poeple
        {userList.map((user: any, index) => {
          return (
            <div key={user.id}>
              <p>{index + 1}.{user.name}</p>
            </div>
          );
        })}
      </div>


<SignupForm />

    </div>
  )
}

export default TodoPage
