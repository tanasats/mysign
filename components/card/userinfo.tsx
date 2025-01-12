import React from 'react';
import { MailIcon, UsersIcon } from 'lucide-react';


// type propsType = {
//     fullname?: string;
//     data: {
//         fullname?: string;
//         username?: string;
//         usertype?: string;
//         mail?: string;
//     };
// }
interface Props {
    data:{
        fullname?:string;
        username?: string;
        usertype?: string;
        mail?: string;        
    }
}




//const UserInfoCard = (props: propsType) => {    ///////src="https://picsum.photos/id/9/300/300"
const UserInfoCard = ({data}:Props) =>{
    return (
        <div className='flex flex-col gap-5'>
            <img src="https://placebeard.it/250/250" alt="nature-image" className="w-[180px] h-[180px] rounded-full object-cover object-center" />
            <p className='flex flex-col gap-3'>
                <div className='text-2xl'>{data.fullname}</div>
                <div className='flex gap-2'>
                    <UsersIcon/>
                    {data.usertype}
                    </div>
                <div className='flex gap-2'>
                    <MailIcon/>
                    {data.mail}
                </div>
            </p>
        </div>

    );
};

export default UserInfoCard;