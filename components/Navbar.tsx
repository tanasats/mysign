import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token');
    console.log('cookie::',token);
    return (
        <nav className='bg-slate-100 py-5'>
            <div className="max-w-screen-xl mx-auto px-5 flex justify-between items-center">
                <Link href="/" className='text-lg font-bold'>Apps</Link>

                <ul className='flex gap-3'>
                    <li>
                        <Link rel="stylesheet" href="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link rel="stylesheet" href="/login">Login</Link>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar
