'use server';
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";
import { encrypt, decrypt } from './encrypt';

export type Session = {
  username: string,
  fullname: string,
  usertype: string,
  mail: string,
  accessToken: string;
};

//export const getSession = async (): Promise<Session | null> => {
export const getSession = async () => {
  const cookieStore = await cookies();
  const cookieSession = cookieStore.get('session');
  if (cookieSession?.value) {
    //--- decrypt cookie ---
    //const decrypted = decrypt(session?.value);
    //return JSON.parse(decrypted) as Session;
    //--- no decrypt cookie ---
    return JSON.parse(cookieSession.value)
  }
  return null;
};

export const setSession = async (sessionData: Session) => {
  const cookieStore = await cookies();
  //--- no encrypt cookie ---
  cookieStore.set('session', JSON.stringify(sessionData));
  //cookieStore.set('session', JSON.stringify(session), { httpOnly: true, secure: true, path: "/", maxAge: 3600 });
  //--- encrypt cookie ---
  //const encrypted = encrypt(JSON.stringify(sessionData));  
  //cookieStore.set('session',encrypted)
};

export const removeSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('session');
};

