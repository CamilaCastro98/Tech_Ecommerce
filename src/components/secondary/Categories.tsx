"use client"
import 'flowbite/dist/flowbite.css'
import Link from 'next/link'
import { useEffect } from 'react'

const Categories = () => {
    useEffect(() => {
        import('flowbite');
      }, [])
    return (
        <>
             <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                        Categories <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg>
                    </button>
                    <div id="mega-menu-dropdown" className="absolute z-10 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
                        <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                            <ul className="space-y-2" aria-labelledby="mega-menu-dropdown-button">
                                <li>
                                    <Link href="/category/0" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Smartphones
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/1" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Laptops
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/2" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Tablets
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/3" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Headphones
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/4" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Cameras
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/category/5" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Printers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/6" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Monitors
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/7" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Storage
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/category/8" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                        Accesories
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                 
        </>
    )
}

export default Categories