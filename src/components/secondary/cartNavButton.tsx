"use client"
import isAuthenticated from "@/utils/isAuth"
import { useEffect,useState } from "react"
import Link from 'next/link'
import ICartProduct from "@/interfaces/CartProduct"

const CartNavButton: React.FC  = () => {

    const [isAuth,setIsAuth] = useState(false)
    const [cartData, setCartData] = useState<ICartProduct[]>([])

    useEffect(() => {
        setIsAuth(isAuthenticated())
      }, [isAuth])

      useEffect(() => {
        const handleCartChange = () => {
            const cartString = localStorage.getItem('cart');
            if (cartString) {
                try {
                    const cart = JSON.parse(cartString);
                    setCartData(cart);
                } catch (error) {
                    console.error("Error parsing user data from localStorage:", error);
                }
            } else {
                setCartData([])
            }
        }

        window.addEventListener('cartChange', handleCartChange)

        handleCartChange();

        return () => {
            window.removeEventListener('cartChange', handleCartChange)
        }
    }, [])

    return(
        isAuth ?
        <Link href="/user/cart" className="border-none bg-transparent">
            <button className="relative border-2 border-transparent rounded-sm p-1 hover:border-t-color">
                <img className="smHidden w-9" src="/carrito.png" alt="cart" />
                <div className="hidden md:flex text-gray-50 bg-p-color absolute top-0 right-[0.1px] border border-t-color rounded-full text-xs w-4 h-4 items-center justify-center">{cartData.length}</div>
            </button>
            
        </Link>
        : null
    )
}

export default CartNavButton