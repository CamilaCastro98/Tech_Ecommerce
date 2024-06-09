"use client"

import ButtonFull from "@/components/secondary/ButtonFull"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { MdLogout } from "react-icons/md";
import removeServerCookie from "@/helpers/cookies/removeServerCookie";
import GoHomeIcon from "@/components/secondary/GoHomeIcon";

const Dashboard = () => {


    const [userData, setUserData] = useState({
        name:"",
        email:"",
        address:"",
        phone:""
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userDataString = localStorage.getItem('userSession');
            if (userDataString) {
                try {
                    const userData = JSON.parse(userDataString);
                    setUserData(userData.user);
                } catch (error) {
                    console.error("Error parsing user data from localStorage:", error);
                }
            } else {
                console.error("No user data found in localStorage");
            }
        }
    }, [])

    const handleLogout = () => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "Please confirm if you want to log out",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log Out"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                if (token) {
                await removeServerCookie();
                }
                localStorage.removeItem('userSession')
                localStorage.removeItem('token')
                localStorage.removeItem('cart')
                window.location.href = '/' 
                    setTimeout(() => {
                        window.location.reload();
                }, 500)
            }
        })
    }

  
    
    return(
    <div className="my-8">
        <GoHomeIcon/>
        <h1 className="text-gray-50 m-6 font-normal text-center text-2xl">My Account</h1>
        <div className="flex flex-col items-center p-8">
            <img className="w-28 p-1 rounded-full bg-gray-50" src="/user.svg" alt="userImg" />
            <ul className="grid grid-cols-2 gap-4 p-6 text-p-color bg-gray-50 rounded-md shadow-2xl mt-5 lg:w-1/2">
                <li className="text-normal font-semibold md:text-lg">Name</li>
                <li className="text-sm md:text-lg font-normal">{userData.name}</li>
                <li className="text-normal font-semibold md:text-lg">Email</li>
                <li className="text-sm md:text-lg font-normal">{userData.email}</li>
                <li className="text-normal font-semibold md:text-lg">Address</li>
                <li className="text-sm md:text-lg font-normal">{userData.address}</li>
                <li className="text-normal font-semibold md:text-lg">Phone</li>
                <li className="text-sm md:text-lg font-normal">{userData.phone}</li>
            </ul>
        <div className="mt-6 w-32">
            < ButtonFull onClick={()=>handleLogout()} content="Log Out"><MdLogout className="w-5 h-auto mr-1"/></ButtonFull>
        </div>
        </div>
    </div>
    )
}

export default Dashboard