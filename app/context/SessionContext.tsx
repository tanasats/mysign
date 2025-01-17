'use client';
import React, { createContext, useState, useContext } from 'react';

//import axios from 'axios';
import { useRouter } from 'next/navigation';
//import { cookies } from 'next/headers';
import { getSession, removeSession } from "@/lib/session";
import jwt from "jsonwebtoken";

interface CurrentUserData {
    isLogin: boolean;
    id: string;
    username: string;
    usertype: string;
    fullname: string;
    email: string;
}

// Define the context type
interface SessionContextType {
    currentuser: CurrentUserData | null;
    setCurrentUser: any,
    //login: (email: string, password: string) => void;
    getsession: () => void;
    logout: () => void;
}

// Create the context
const SessionContext = createContext<SessionContextType>({
    currentuser: null,
    setCurrentUser: () => { },
    getsession: () => { },
    //login: () => {},
    logout: () => { },
});

export function useSession() {
    return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [currentuser, setCurrentUser] = useState<CurrentUserData | null>(null);

    const getsession = async () => {
        console.log("getsession()  ******");
        // const cookieStore = await cookies();
        // const cookieSession = cookieStore.get('session');
        // if (cookieSession?.value) {
        //     const user = JSON.parse(cookieSession.value)
        //     setCurrentUser({
        //         isLogin:true,
        //         id: user.id,
        //         username: user.username,
        //         usertype: user.usertype,
        //         fullname: user.fullname,
        //         email: user.mail
        //     })
        // }
        getSession().then((session) => {
            console.log("session = ", session)
            if (session) {
                const user = {
                    isLogin: true,
                    id: '',
                    fullname: session.fullname,
                    username: session.username,
                    usertype: session.usertype,
                    email: session.mail,
                };
                setCurrentUser(user);
            } else {
                const user = {
                    isLogin: false,
                    id: '',
                    fullname: '',
                    username: '',
                    usertype: '',
                    email: '',
                };
            }


        });



    }

    const login = async (email: string, password: string) => {
        console.log("sessionContext login(", email, password, ")")
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
        console.log("##### SessionContextlogout()")
        //setCurrentUser(null);
        setCurrentUser({ isLogin: false, id: '', username: '', usertype: '', fullname: '', email: '' })
        removeSession();
    };

    return (
        <SessionContext.Provider value={{ currentuser, setCurrentUser, getsession, logout }}>
            {children}
        </SessionContext.Provider>
    );
}