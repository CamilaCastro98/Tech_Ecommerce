"use client"
import isAuthenticated from "@/utils/isAuth"
import { useEffect,useState } from "react"
import { MdOutlineShoppingCart } from "react-icons/md"

import ButtonFull from "./ButtonFull"
import Link from "next/link"
import addToCart from "@/helpers/addToCart"
import ICartProduct from "@/interfaces/CartProduct"

const LateralContent: React.FC<ICartProduct> = ({id,name,image,price,stock}) => {

    const [isAuth,setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(isAuthenticated())
       }, [])

    return(
        <div className="border mx-5 p-4 lg:w-1/3 border-gray-50 rounded-md flex flex-col gap-2">
          <p className="text-base font-normal text-gray-100">Available stock</p>
          <p className="text-lg font-medium text-t-color">{stock} units left</p>
          <p className="text-base font-semibold text-gray-100 mb-4">Add to cart or buy now and enjoy FREE shipping on your purchase</p>
          {isAuth ? <ButtonFull onClick={() => addToCart(id,name,image,price)}  content="Add to cart"><MdOutlineShoppingCart className="w-5 h-auto mr-1" /></ButtonFull> :
          (
            <>
              <Link href="/login">
                <ButtonFull content="Login to purchase"/>
              </Link>
              <p className="text-gray-50 text-xs">Not a member yet? <Link href="/register"><span className="text-t-color font-semibold hover:underline">register</span></Link></p>
            </>
          )}
        </div>
    )
}

export default LateralContent