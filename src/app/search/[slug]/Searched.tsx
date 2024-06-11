"use client"

import Card from "@/components/primary/Card"
import ButtonFull from "@/components/secondary/ButtonFull"
import CardsContainer from "@/components/secondary/CardsContainer"
import FilterDrawer from "@/components/secondary/FilterDrawer"
import GoHomeIcon from "@/components/secondary/GoHomeIcon"
import { fetchProductsByName } from "@/helpers/petitions/petitions"
import IProduct from "@/interfaces/Products"
import Link from "next/link"
import { useCallback, useEffect,useState } from "react"
import { FaHome } from "react-icons/fa";

const Searched = ({ params }: { params: { slug: string } }) => {

    const [products,setProducts] = useState<IProduct[]>([])
    const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);
    const searched = params.slug

    useEffect(() => {
    const getProducts = async () => {
      try {
        const searchedProducts = await fetchProductsByName(searched);
        setProducts(searchedProducts);
        setOriginalProducts(searchedProducts)
      } 
      catch (error) {
        console.error('Error fetching products:', error);
            }
        }
    getProducts()
    },[])
    

    const applyLowToHigh = useCallback(() => {
      const orderedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(orderedProducts);
    }, [products]);
  
    const applyHighToLow = useCallback(() => {
      const orderedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(orderedProducts);
    }, [products]);
  
    const resetOrder = useCallback(() => {
      setProducts(originalProducts);
    }, [originalProducts]);
  
    const applyRange = useCallback((event: Event) => {
      if (event instanceof CustomEvent) {
        const { min, max } = event.detail;
        const minP = min || 0;
        const maxP = max || Infinity;
        const orderedProducts = [...originalProducts].filter((p) => p.price > minP && p.price < maxP);
        setProducts(orderedProducts);
      }
    }, [originalProducts]);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('lowToHigh', applyLowToHigh);
        window.addEventListener('highToLow', applyHighToLow);
        window.addEventListener('resetOrder', resetOrder);
        window.addEventListener('applyRange', applyRange);
  
        return () => {
          window.removeEventListener('lowToHigh', applyLowToHigh);
          window.removeEventListener('highToLow', applyHighToLow);
          window.removeEventListener('resetOrder', resetOrder);
          window.removeEventListener('applyRange', applyRange);
        };
      }
    }, [applyLowToHigh, applyHighToLow, resetOrder, applyRange]);

   return(
    <>
     <GoHomeIcon/>
    <FilterDrawer/>
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
    </>
      )
}

export default Searched