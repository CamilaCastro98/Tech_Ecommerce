"use client"

import CartProduct from "@/components/primary/CartProduct"
import Summary from "@/components/secondary/Summary"

import { useEffect, useState } from "react"
import ICartProduct from "@/interfaces/CartProduct"
import ButtonFull from "@/components/secondary/ButtonFull"
import Link from "next/link"
import GoHomeIcon from "@/components/secondary/GoHomeIcon"

const Cart = () => {

    const [cartData, setCartData] = useState<ICartProduct[]>([])

    const remove = (id:number) => {
        const cartString = localStorage.getItem('cart');
        if (cartString) {
            let cartData = JSON.parse(cartString)
            cartData = cartData.filter((p: ICartProduct) => p.id !== id)
            localStorage.setItem('cart', JSON.stringify(cartData))
            setCartData(cartData)
            const event = new Event('cartChange');
            window.dispatchEvent(event)
            console.log("se borró elemento")
        } else {
            throw new Error("Los datos no existen");
        }
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartString = localStorage.getItem('cart');
            if (cartString) {
                try {
                    const cart = JSON.parse(cartString);
                    setCartData(cart);
                } catch (error) {
                    console.error("Error parsing user data from localStorage:", error);
                }
            } else {
                console.error("No user data found in localStorage.");
            }
        }
    }, [cartData.length])
    
    let summary: number = 0

    return(
        <div className="m-8">
            <GoHomeIcon/>
            <h1 className="text-gray-50 m-8 font-normal text-center text-2xl">My Cart</h1>
            <div className="flex text-xs flex-col md:flex-row md:gap-16 mx-5">
                <div  className="flex flex-col md:w-2/3 p-4">
                <div>
                    <ul className="flex md:text-sm justify-around ml-16 text-p-color bg-t-color font-semibold">
                        <li className="md:w-56">Product</li>
                        <li>Quantity</li>
                        <li>Price</li>
                    </ul>
                </div>
            {cartData.length > 0?
            
            cartData.map(p=> {

                summary += p.price
                return(
                    <div key={p.id} className="flex items-center gap-5">
                    <div className="w-[30px] ml-4"><ButtonFull onClick={() => remove(p.id)} content="x"/></div>
                    <div key={p.id} className="border flex w-full items-center border-none rounded-sm bg-gray-50 my-2">
                         <CartProduct key={p.id} {...p}/>
                    </div>
                    </div>
                )
            }):
            
            <p className="p-6 self-center text-gray-50 text-xs italic">Your cart is empty! 
            <Link className="text-t-color hover:underline" href="/"> Explore and find something you love</Link>
            </p>}
                </div>
                <Summary content={summary}/>
            </div>
        </div>
    )
}

export default Cart