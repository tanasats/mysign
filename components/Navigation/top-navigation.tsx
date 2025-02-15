'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavLinkItem, MobileNavbarWrapper } from "@/components/Navigation";
import { LogIn, LogOutIcon } from "lucide-react";

import React, { useEffect, useState } from 'react'
//import { getSession, removeSession } from "@/lib/session";
//import { useUserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";
//import { useTestContext } from "@/app/context/TestContext";
import { useSession } from "@/app/context/SessionContext";

const navItems = [
    {
        id: 1,
        href: "/",
        label: "หน้าหลัก",
        isExternal: false
    },
    {
        id: 2,
        href: "/blog",
        label: "Blog",
        isExternal: false
    },
    {
        id: 3,
        href: "/profile",
        label: "Profile",
        isExternal: false
    },
    {
        id: 4,
        href: "/about",
        label: "เกี่ยวกับเรา",
        isExternal: false
    },
]



const TopNavigation = () => {
    //const { userID, setUserID} = useUserContext();
    //const { data, setData} = useTestContext();
    const { currentuser,setCurrentUser,getsession,logout} = useSession();

    //const [ userdata, setUserdata] = useState({});
    const [isAuthorized,setIsAuthorized] = useState(false)
    useEffect(() => {
        getsession(); //<--- useSession();
        // getSession().then((session) => {
        //     if (session) {
        //         const data = {
        //             fullname: session.fullname,
        //             username: session.username,
        //             usertype: session.usertype,
        //             usermail: session.mail,
        //         };
        //         if(data.username) setIsAuthorized(true);
        //         console.log("uerdata:",data)
        //         setUserID(data.fullname);
        //         // setCurrentUser({
        //         //     isLogin:true,
        //         //     username:"data.username",
        //         //     usertype:"xxx",
        //         //     fullname:data.fullname,
        //         //     emai:"email---"})
        //         setCurrentUser({
        //             isLogin: true,
        //             username: data.username,
        //             fullname: data.fullname,
        //             email: data.usermail,
        //         })
        //     }
        //     setData({fullname:'hi!tanasat'})
        // });
        
    }, [])


const handleSignout = () => {
    // removeSession().then(() => {
    //     setUserID('')
    //     console.log("signout success");
    //     redirect("/login");
    // })
    logout();
} 

    return (
        <div  className="max-w-screen-xl mx-auto px-5 sm:px-0">
        <header className="flex items-center justify-between gap-10 py-4 container mx-auto px-5 sm:px-0">
            <Link href="/" className="flex items-center gap-3">
                <svg fill="#008800" height="40px" width="40px" version="1.1" viewBox="0 0 511.949 511.949" ><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M206.206,281.068c-0.623-4.676-4.958-7.97-9.6-7.305c-4.668,0.623-7.936,4.924-7.305,9.6 c9.02,66.543-14.993,133.769-64.222,179.823c-3.439,3.217-3.618,8.619-0.393,12.066c1.673,1.792,3.942,2.696,6.229,2.696 c2.091,0,4.181-0.759,5.828-2.304C190.001,425.819,215.968,353.081,206.206,281.068z"></path> <path d="M82.55,291.035c-0.085-0.401-0.196-0.785-0.333-1.169c-1.724-8.858-2.773-17.86-3.149-26.786 c-0.188-4.71-4.215-8.337-8.875-8.175c-4.71,0.188-8.371,4.164-8.175,8.875c0.427,10.223,1.673,20.531,3.703,30.652 c0.077,0.393,0.188,0.777,0.324,1.152c5.564,29.773-5.274,60.322-28.467,79.966c-3.593,3.055-4.045,8.439-0.998,12.032 c1.698,1.997,4.096,3.021,6.519,3.021c1.954,0,3.908-0.666,5.513-2.031C76.849,364.652,89.854,327.276,82.55,291.035z"></path> <path d="M130.516,358.995c-4.395-1.707-9.344,0.469-11.051,4.864c-9.148,23.561-24.311,44.467-43.836,60.459 c-3.644,2.978-4.181,8.363-1.195,12.006c1.69,2.057,4.139,3.123,6.605,3.123c1.903,0,3.823-0.631,5.41-1.929 c21.786-17.852,38.707-41.182,48.93-67.482C137.086,365.651,134.902,360.701,130.516,358.995z"></path> <path d="M51.198,117.134c1.519,1.109,3.277,1.647,5.026,1.647c2.628,0,5.222-1.212,6.895-3.507 c35.26-48.307,86.98-81.417,145.638-93.244c52.045-10.505,104.695-3.712,152.235,19.627c4.241,2.091,9.353,0.324,11.418-3.9 c2.082-4.232,0.333-9.344-3.9-11.418C317.575,1.328,261.161-5.942,205.387,5.296C142.53,17.968,87.115,53.45,49.338,105.213 C46.556,109.019,47.392,114.361,51.198,117.134z"></path> <path d="M22.04,303.263c-0.043-0.205-0.179-0.358-0.239-0.563c-10.624-53.316-3.191-107.008,21.538-155.315 c2.15-4.19,0.495-9.335-3.703-11.486c-4.198-2.159-9.335-0.486-11.486,3.712C1.551,191.553-6.402,249.316,5.161,306.643 c0.068,0.316,0.247,0.572,0.341,0.87c0.691,3.371,1.425,6.707,2.236,10.018c0.964,3.891,4.446,6.485,8.286,6.485 c0.674,0,1.357-0.077,2.048-0.239c4.574-1.135,7.373-5.76,6.246-10.334C23.49,310.09,22.722,306.694,22.04,303.263z"></path> <path d="M217.59,65.857c-79.061,15.94-139.076,77.577-152.892,157.022c-0.802,4.642,2.304,9.062,6.946,9.873 c4.702,0.802,9.062-2.313,9.873-6.946c12.595-72.465,67.337-128.674,139.452-143.224 c95.676-19.26,189.184,42.854,208.461,138.513c0.051,0.273,0.119,0.529,0.196,0.785c1.545,7.74,2.876,15.403,3.959,22.793 c0.623,4.241,4.267,7.287,8.431,7.287c0.418,0,0.836-0.026,1.254-0.094c4.659-0.683,7.885-5.018,7.202-9.677 c-1.161-7.927-2.603-16.154-4.267-24.457c-0.06-0.273-0.128-0.555-0.213-0.819C424.489,112.484,322.2,44.772,217.59,65.857z"></path> <path d="M325.05,242.139c-3.721-18.458-14.404-34.364-30.089-44.783c-15.684-10.428-34.492-14.097-52.941-10.394 c-27.708,5.589-49.331,27.068-55.1,54.724c-0.964,4.617,1.997,9.139,6.605,10.103c4.634,0.956,9.139-1.997,10.103-6.613 c4.369-20.966,20.762-37.248,41.762-41.481c13.995-2.807,28.237-0.026,40.124,7.868c11.605,7.714,19.593,19.388,22.588,32.956 c0.034,0.341,0.077,0.683,0.145,1.024c4.326,21.41,6.545,43.264,6.605,64.947c0.017,4.71,3.831,8.516,8.533,8.516h0.017 c4.719-0.009,8.533-3.84,8.516-8.55c-0.06-22.443-2.321-45.056-6.724-67.217C325.169,242.873,325.118,242.506,325.05,242.139z"></path> <path d="M264.369,254.384c-0.93-4.617-5.427-7.586-10.052-6.682c-4.617,0.93-7.612,5.436-6.682,10.052 c16.794,83.294-5.786,167.714-61.943,231.629c-3.106,3.541-2.756,8.934,0.776,12.049c1.621,1.417,3.635,2.116,5.632,2.116 c2.372,0,4.727-0.973,6.417-2.893C258.217,432.697,282.221,342.943,264.369,254.384z"></path> <path d="M506.853,205.488c-0.051-0.256-0.222-0.452-0.299-0.708c-13.141-64.265-49.911-120.397-103.62-158.089 c-3.857-2.722-9.19-1.775-11.887,2.082c-2.705,3.857-1.775,9.182,2.082,11.887c50.313,35.311,84.71,87.953,96.862,148.224 c0.043,0.23,0.179,0.41,0.239,0.631c3.379,16.981,4.932,34.261,4.608,51.379c-0.085,4.71,3.661,8.602,8.371,8.695h0.171 c4.634,0,8.439-3.721,8.525-8.371C512.254,242.634,510.556,223.895,506.853,205.488z"></path> <path d="M385.611,229.936c-6.98-34.645-27.034-64.486-56.465-84.036c-29.431-19.558-64.708-26.462-99.345-19.49 c-71.492,14.413-117.939,84.318-103.518,155.81c0.102,0.503,0.247,0.981,0.427,1.442c2.739,14.259,3.345,28.715,1.801,42.999 c-0.503,4.685,2.884,8.892,7.578,9.404c4.582,0.461,8.892-2.884,9.395-7.578c1.775-16.521,0.99-33.229-2.33-49.673 c-0.102-0.495-0.247-0.973-0.427-1.425c-11.64-61.764,28.663-121.788,90.445-134.246c30.165-6.084,60.902-0.06,86.528,16.973 c25.481,16.93,42.889,42.718,49.075,72.661c0.026,0.179,0.051,0.367,0.085,0.546c9.489,47.01,10.377,94.66,2.645,141.602 c-0.76,4.659,2.389,9.045,7.04,9.813c0.469,0.068,0.93,0.111,1.391,0.111c4.104,0,7.723-2.97,8.414-7.151 c8.03-48.811,7.142-98.33-2.645-147.2C385.679,230.312,385.654,230.124,385.611,229.936z"></path> <path d="M445.609,273.857c-4.702,0.299-8.277,4.352-7.979,9.054c3.081,48.922-1.758,97.766-14.387,145.169 c-1.212,4.548,1.493,9.225,6.05,10.436c0.734,0.196,1.476,0.299,2.202,0.299c3.772,0,7.219-2.526,8.243-6.349 c13.107-49.186,18.125-99.866,14.925-150.63C454.373,277.134,450.422,273.559,445.609,273.857z"></path> <path d="M373.818,406.568c-4.582-1.237-9.233,1.476-10.445,6.033c-6.502,24.26-15.369,48.008-26.377,70.588 c-2.065,4.241-0.299,9.344,3.934,11.409c1.212,0.589,2.475,0.862,3.738,0.862c3.157,0,6.195-1.758,7.671-4.796 c11.486-23.561,20.736-48.341,27.511-73.651C381.08,412.464,378.375,407.78,373.818,406.568z"></path> <path d="M322.191,341.211c-4.651-0.529-8.917,2.825-9.446,7.509c-6.093,53.359-25.429,105.139-55.936,149.726 c-2.662,3.883-1.672,9.19,2.219,11.853c1.476,1.015,3.149,1.493,4.813,1.493c2.722,0,5.402-1.297,7.049-3.712 c32.077-46.874,52.412-101.308,58.812-157.423C330.23,345.973,326.867,341.74,322.191,341.211z"></path> </g> </g> </g> </g></svg>
                <span className="font-heading text-xl font-bold">
                    mySign
                </span>
            </Link>
            <div className="flex items-center gap-10">
                <nav  className="hidden items-center gap-10 md:flex justify-end">
                    {navItems.map((navItem) => (
                        <NavLinkItem
                            href={navItem.href}
                            isExternal={navItem.isExternal}
                            key={navItem.id}
                        >
                            {navItem.label}
                        </NavLinkItem>
                    ))}
                </nav>
  
                <div className="hidden items-center gap-2 md:flex">
                    <div className="text-sm text-muted-foreground">{currentuser?.fullname}</div>
                    {currentuser?.isLogin ? (
                        <span onClick={handleSignout} className="cursor-pointer">
                            <LogOutIcon size={20} />
                        </span>
                    ) : (
                        <Link href="/signin" className="cursor-pointer"><LogIn size={20}/></Link>
                    )
                    }
                    
                </div>
            </div>
            <MobileNavbarWrapper>
                <div className="rounded-lg bg-background py-4 container mx-auto text-foreground shadow-xl">
                    <nav className="flex flex-col gap-1 px-5">
                        {navItems.map((navItem) => (
                            <NavLinkItem
                                href={navItem.href}
                                isExternal={navItem.isExternal}
                                key={navItem.id}
                            >
                                {navItem.label}
                            </NavLinkItem>
                        ))}
                        <Button size="lg" asChild className="mt-2 w-full">
                            <Link href="/signin" className="cursor-pointer">
                                <LogIn />
                            </Link>
                        </Button>

                    </nav>
                </div>
            </MobileNavbarWrapper>
        </header>
        </div>
    );
}

export default TopNavigation
