"use client"

import Card from "@/components/primary/Card"
import ButtonFull from "@/components/secondary/ButtonFull"
import CardsContainer from "@/components/secondary/CardsContainer"
import FilterDrawer from "@/components/secondary/FilterDrawer"
import GoHomeIcon from "@/components/secondary/GoHomeIcon"
import { fetchProducts } from "@/helpers/petitions/petitions"
import IProduct from "@/interfaces/Products"
import Link from "next/link"
import { useCallback, useEffect,useState } from "react"
import { FaHome } from "react-icons/fa";

const Discounts = () => {

    const [products,setProducts] = useState<IProduct[]>([])
    const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);

    useEffect(() => {
    const getDiscounts = async () => {
      try {
        const response: IProduct[] = await fetchProducts()
        const discountedProducts = response.filter(p => p.price < 500 )
        setProducts(discountedProducts);
        setOriginalProducts(discountedProducts)
      } 
      catch (error) {
        console.error('Error fetching products:', error);
            }
        }
    getDiscounts()
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