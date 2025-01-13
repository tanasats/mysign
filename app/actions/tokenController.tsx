'use server';
import { cookies } from 'next/headers'
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { encrypt,decrypt } from '@/lib/encrypt';

const JWT_SECRET = 'tanasat-secret-key';
const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
export const setToken = async (token:string) => {
    const cookieStore = await cookies();
    cookieStore.set('accessToken',token,config);
}
export const getToken = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    if(accessToken?.value){
        try{
            const decoded = jwt.verify(accessToken?.value,JWT_SECRET) 
            return decoded
        }catch(err) {
            if (err instanceof TokenExpiredError) {
                console.log('Token has expired');
              } else if (err instanceof NotBeforeError) {
                console.log('Token not active yet');
              } else if (err instanceof JsonWebTokenError) {
                console.log('Invalid token');
              } else {
                console.log('Some other error:', err);
              }
            cookieStore.delete('accessToken');
            return null;
        }
    }
}
export const delToken = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
}

export const verifyToken = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    if(accessToken?.value){
        try{
            const decoded = jwt.verify(accessToken?.value,JWT_SECRET) 
            return {status:'ok',message: decoded}
        }catch(err) {      
            let message = 'unknow error';
            if (err instanceof TokenExpiredError) {
                console.log('Token has expired');
                message='Token has expired!';
              } else if (err instanceof NotBeforeError) {
                console.log('Token not active yet');
                message='Token not active yet!'
              } else if (err instanceof JsonWebTokenError) {
                console.log('Invalid token');
                message='Invalid token!'
              } else {
                console.log('Some other error:', err);
                message='Some other error:' + err;
              }
              return {status:'error',message:message};
        }
    }
}