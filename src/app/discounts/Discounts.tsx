"use client"

import Card from "@/components/primary/Card"
import ButtonFull from "@/components/secondary/ButtonFull"
import CardsContainer from "@/components/secondary/CardsContainer"
import GoHomeIcon from "@/components/secondary/GoHomeIcon"
import { fetchProducts } from "@/helpers/petitions/petitions"
import IProduct from "@/interfaces/Products"
import Link from "next/link"
import { useEffect,useState } from "react"
import { FaHome } from "react-icons/fa";

const Discounts = () => {

    const [products,setProducts] = useState<IProduct[]>([])

    useEffect(() => {
    const getDiscounts = async () => {
      try {
        const response: IProduct[] = await fetchProducts()
        const discountedProducts = response.filter(p => p.price < 500 )
        setProducts(discountedProducts);
      } 
      catch (error) {
        console.error('Error fetching products:', error);
            }
        }
    getDiscounts()
    },[])
    

   return(
    <>
    <GoHomeIcon/>
    <CardsContainer title="Our discounts">
    {products.length > 0 ? (
            products.map((product: IProduct) => (
              <Card key={product.id} {...product} />
            ))
          ) : (
            <div className="flex w-full flex-col items-center">
                <p className="p-6 w-full text-center text-gray-50 text-xs italic">
                    No discounts available today. Sorry!
                </p>
                <Link href="/">
                    <ButtonFull content="Return Home"><FaHome className="w-5 h-auto mr-1"/></ButtonFull>
                </Link>
            </div>
          )}
        </CardsContainer>
    </>
      )
}

export default Discounts