"use client"
import 'flowbite/dist/flowbite.css'
import { useEffect } from 'react'
import ButtonTransparent from '../secondary/ButtonTransparent'
import Link from 'next/link'
import Image from 'next/image'

const Header: React.FC = () => {

    useEffect(() => {
        const initializeFlowbite = async () => {
            try {
                const { initFlowbite } = await import('flowbite');
                if (initFlowbite) {
                    initFlowbite();
                }
            } catch (error) {
                console.error('Failed to initialize Flowbite:', error);
            }
        };

        initializeFlowbite();
    }, [])

    return (
        <div id="animation-carousel" className="relative z-0 w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden md:h-96">
                <div className="duration-200 ease-linear" data-carousel-item="active">
                    <Image src="/banners/topTech.png" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 1" width={500} height={300} unoptimized />
                </div>
                <div className="duration-200 ease-linear" data-carousel-item>
                    <Image src="/banners/sale.png" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 2"  width={500} height={300} unoptimized />
                    <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
                        <Link href="/discounts">
                            <ButtonTransparent content="Shop Now"/>
                        </Link>
                        </div>
                </div>
            </div>
            <button type="button" className="absolute bg-transparent border-none top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute bg-transparent border-none top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    )
}

export default Header


