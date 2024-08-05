"use client"

import PurchaseCard from "@/components/primary/PurchaseCard"
import IOrder from "@/interfaces/Order"
import { useState, useEffect } from "react"
import formatDate from "../../../utils/formatDate"
import { getOrdersById } from "@/helpers/petitions/petitions"
import ButtonTransparent from "@/components/secondary/ButtonTransparent"
import ButtonFull from "@/components/secondary/ButtonFull"
import Link from "next/link"
import { MdLogout } from "react-icons/md";

const CartHistory: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [token, setToken] = useState<string>("")
    let total: number = 0

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const tokenData = localStorage.getItem('token');
            if (tokenData) {
                setToken(tokenData);
            } else {
                console.error("No token found in localStorage.");
            }
            const getOrders = async () => {
                try {
                    const result = await getOrdersById(token);
                    setOrders(result);
                } catch (error) {
                    throw new Error("Error getting orders");
                }
            }
            token && getOrders();
        }
    }, [token])

    return (
        <>
            <h1 className="text-gray-50 m-8 font-normal text-center text-2xl">My Purchase History</h1>
            <div className="flex justify-center">
                <ul className={`flex mx-5 md:mx-0 w-full md:!w-1/2 justify-around bg-t-color font-semibold text-sm text-p-color mt-4 ${orders.length === 0 ? 'hidden' : ''}`}>
                    <li>Date</li>
                    <li>Products</li>
                    <li>Status</li>
                    <li>Total</li>
                </ul>
            </div>
            {orders.length > 0 ?
                <>
                    <div className="flex flex-col mx-5 md:mx-0 items-center mb-10">
                        <div className="w-full md:!w-1/2">
                            {orders.map((o, index) => (
                                <ul key={index} className="text-p-color bg-gray-50 text-xs md:text-sm flex gap-8 mt-2 py-4 rounded-sm justify-around">
                                    <li className="md:w-25">{formatDate(o.date)}</li>
                                    <li>
                                        {o.products.map((p, index) => {
                                            total += p.price;
                                            return <PurchaseCard key={index} {...p} />;
                                        })}
                                    </li>
                                    <li>{o.status}</li>
                                    <li className="md:w-16">${total}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </>
                :
                <p className="p-6 text-center text-gray-50 text-xs italic">You do not have a purchase history yet!</p>
            }
            <div className="flex flex-col items-center justify-center gap-2 m-6">
                <Link className="w-64" href="/"><ButtonFull content="Return Home"><MdLogout className="w-5 h-auto mr-1" /></ButtonFull></Link>
                <Link className="w-64" href="/user/cart"><ButtonTransparent content="Go to Cart" /></Link>
            </div>
        </>
    );
};

export default CartHistory;