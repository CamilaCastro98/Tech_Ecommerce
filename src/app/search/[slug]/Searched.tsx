"use client"

import Card from "@/components/primary/Card"
import ButtonFull from "@/components/secondary/ButtonFull"
import CardsContainer from "@/components/secondary/CardsContainer"
import { fetchProductsByName } from "@/helpers/petitions/petitions"
import IProduct from "@/interfaces/Products"
import Link from "next/link"
import { useEffect,useState } from "react"
import { FaHome } from "react-icons/fa";

const Searched = ({ params }: { params: { slug: string } }) => {

    const [products,setProducts] = useState<IProduct[]>([])
    const searched = params.slug

    useEffect(() => {
    const getProducts = async () => {
      try {
        const searchedProducts = await fetchProductsByName(searched);
        setProducts(searchedProducts);
      } 
      catch (error) {
        console.error('Error fetching products:', error);
            }
        }
    getProducts()
    },[])
    

   return(
    <CardsContainer title={`Search Results for "${searched}"`}>
    {products.length > 0 ? (
            products.map((product: IProduct) => (
              <Card key={product.id} {...product} />
            ))
          ) : (
            <div className="flex w-full flex-col items-center">
                <p className="p-6 w-full text-center text-gray-50 text-xs italic">
                No products match your search criteria. Please try again with different keywords.
                </p>
                <Link href="/">
                    <ButtonFull content="Return Home"><FaHome className="w-5 h-auto mr-1"/></ButtonFull>
                </Link>
            </div>
          )}
        </CardsContainer>
      )
}

export default Searched