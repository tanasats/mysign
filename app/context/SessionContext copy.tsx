'use client';
import React, { createContext, useState, useContext } from 'react';
import jwt from 'jsonwebtoken';
//import axios from 'axios';
import { useRouter } from 'next/navigation';

interface UserData {
  userId: string;
  email: string;
}

// Define the context type
interface SessionContextType {
  user: UserData | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Create the context
const SessionContext = createContext<SessionContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  const login = async (email: string, password: string) => {
    console.log( "sessionContext login(",email,password,")")
    // try {
    //   const res = await axios.post('/api/auth/sign-in', user);
    //   router.push('/dashboard');
    //   if (res.data) {
    //     const data = await res.data;
    //     const token = data.token;
    //     // Decode the token to get user data and set the user state
    //     const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    //     setUser(decodedToken);
    //   } else {
    //     // Handle login error, show error message, etc.
    //     console.error('Login failed:', res.status);
    //   }
    // } catch (error: any) {
    //   console.log('Login failed', error.message);
    // }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}