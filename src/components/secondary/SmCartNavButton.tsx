"use client"
import isAuthenticated from "@/utils/isAuth"
import { useEffect,useState } from "react"
import Link from 'next/link'

const SmCartNavButton: React.FC  = () => {

    const [isAuth,setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(isAuthenticated())
      }, [])
    
    return(
        isAuth ?
        <Link href="/user/cart">
            <p>Cart</p>
        </Link>
        : null
    )
}

export default SmCartNavButton