"use client"

import IProduct from "@/interfaces/Products"
import ButtonFull from "../secondary/ButtonFull"
import ButtonTransparent from "../secondary/ButtonTransparent"
import Link from 'next/link'
import addToCart from "@/helpers/addToCart"
import categoriesArray from "@/helpers/categories"
import { MdOutlineShoppingCart } from "react-icons/md"
import Image from 'next/image'

const Card: React.FC<IProduct> = ({id,name,image,description,price,stock,categoryId}) => {

    const myLoader=()=>{
        return image;
      }
    
    return (
  <div className="m-3 shrink-0 rounded-md shadow-2xl">
    <div className="bg-gray-50 flex justify-center rounded-t-md w-auto h-[150px] sm:h-[200px]">
        <Image loader={myLoader} className="p-4 rounded-t-lg w-auto h-[150px] sm:h-[200px]" src={image} alt="product image" width={500} height={300} priority unoptimized  />
    </div>
    <div className="px-5 mt-2 pb-5 flex flex-col gap-1">
            <p className="text-sm text-gray-50 font-light">{categoriesArray[categoryId - 1]}</p>
            <h5 className="w-52 font-normal text-base tracking-tight text-gray-50">{name}</h5>
        <div className="flex flex-col">
            <span className="text-2xl font-normal text-gray-50">${price}</span>
            <div className="mt-3 flex flex-col gap-2">
                <ButtonFull name="cart" onClick={() => addToCart(id,name,image,price)} content="Add to cart"><MdOutlineShoppingCart className="w-5 h-auto mr-1" /></ButtonFull>
                <Link href={`/product/${id}`}>
                    <ButtonTransparent content="View details" />
                </Link>
            </div>
        </div>
    </div>
</div>

    )
}

export default Card