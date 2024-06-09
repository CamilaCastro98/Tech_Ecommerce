"use client"
import 'flowbite/dist/flowbite.css'
import { useEffect,useState } from 'react'
import Link from 'next/link'
import isAuthenticated from '@/utils/isAuth'
import IDropdownInfo from '@/interfaces/DropdownInfo'
import Swal from 'sweetalert2'
import { MdLogout } from "react-icons/md";
import removeServerCookie from '@/helpers/cookies/removeServerCookie'

const Dropdown = () => {

    const [isAuth,setIsAuth] = useState(false)
    const [data,setData] = useState<IDropdownInfo | null>(null)

    const handleLogout = () => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "Please confirm if you want to log out",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log Out"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                    if (token) {
                removeServerCookie();
                }
                localStorage.removeItem('userSession')
                localStorage.removeItem('token')
                localStorage.removeItem('cart')
                window.location.reload()
            }
        })
    }

    useEffect(() => {
        setIsAuth(isAuthenticated())
        const userDataString = localStorage.getItem('userSession')
        if (userDataString) {
        const userData = JSON.parse(userDataString)
        setData(userData.user)
    }
        import('flowbite');
      }, [])
    
    return (
        <>
            <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-white border-2 border-transparent hover:border-t-color focus:ring-4 font-medium rounded-sm text-sm px-2 py-1 text-center inline-flex items-center" type="button">
            <img className="w-8 p-1 rounded-full bg-gray-50" src="/user.svg" alt="userIcon" />
                 <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
            </button>

        <div id="dropdownInformation" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
           {isAuth ? 
           ( <>
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{`Hi, ${data?.name}!`}</div>
                <div className="font-medium truncate">{data?.email}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                 <li>
                     <Link href="/user/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                 </li>
                 <li>
                     <Link href="/user/history" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Purchase History</Link>
                 </li>
             </ul>
            <div className="py-2">
                <button onClick={()=>handleLogout()} className="flex items-center w-full justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><MdLogout className="w-5 h-auto mr-1"/>Log Out</button>
            </div>
            </>) 
           : (
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                 <li>
                     <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log In</Link>
                 </li>
                 <li>
                     <Link href="/register" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Register</Link>
                 </li>
             </ul>
             )}
        </div>

        </>
    )
}

export default Dropdown