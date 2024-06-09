"use client"

import Dropdown from "../secondary/Dropdown";
import CartNavButton from "../secondary/cartNavButton";
import ButtonFull from "../secondary/ButtonFull";
import Categories from "../secondary/Categories";
import Link from 'next/link'
import SmCartNavButton from "../secondary/SmCartNavButton";
import { usePathname } from "next/navigation"
import { useState } from "react";
import { disableNav } from "@/utils/disableNav";
import categoriesArray from "@/helpers/categories";
import CategoryLink from "../secondary/CategoriesLink";
import { IoIosSearch } from "react-icons/io"

const Navbar: React.FC = () => {
    const path = usePathname()
    const [searched,setSearched] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearched(e.target.value)
    }

    return (
        !disableNav.includes(path) && <div>
            <nav className="bg-p-color">
                <ul className="flex items-center text-sm justify-around gap-1 p-2">
                    <li>
                        <Link className="flex items-center" href="/">
                            <img className="w-10" src="/HiWorldLogo.png" alt="HiWorld Logo" />
                            <p className="smHidden text-gray-50"><span className="text-t-color">Hi</span>World</p>
                        </Link>
                    </li>
                    <li><Link className="smHidden text-gray-50  hover:text-t-color font-light" href="/discounts">Discounts</Link></li>
                    <li><Link className="smHidden text-gray-50  hover:text-t-color font-light" href="/contact">Contact</Link></li>
                    <li className="flex items-center gap-2 md:w-5/12">
                            <input className="p-1 pl-3 rounded-sm border-none w-full text-base" name="searchInput" 
                            type="text" 
                            value={searched}
                            onChange={handleInputChange} 
                            placeholder="Search here..."/>
                            <Link href={searched && `/search/${searched}`}>
                                <ButtonFull ><IoIosSearch className="w-6 h-auto" /></ButtonFull>
                            </Link>
                    </li>
                    <li>
                        <CartNavButton/>
                    </li>
                    <li>
                        <Dropdown/>
                    </li>
                </ul>
            </nav>
            <nav className="bg-gray-50">
                <ul className="flex font-medium text-sm items-center justify-center md:gap-4 p-2">
                <li><Link className="smNavbar" href="/discounts">Discounts</Link></li>
                    <li className="smNavbar"><Categories/></li>
                    <li className="smNavbar"><SmCartNavButton/></li>
                {categoriesArray.map((c,index)=>{
                    return(
                       <CategoryLink key={index} index={index}>{c}</CategoryLink>
                    )
                })}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
