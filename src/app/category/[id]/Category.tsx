"use client"

import Card from "@/components/primary/Card"
import ButtonFull from "@/components/secondary/ButtonFull"
import CardsContainer from "@/components/secondary/CardsContainer"
import FilterDrawer from "@/components/secondary/FilterDrawer"
import GoHomeIcon from "@/components/secondary/GoHomeIcon"
import categoriesArray from "@/helpers/categories"
import { fetchProducts } from "@/helpers/petitions/petitions"
import IProduct from "@/interfaces/Products"
import Link from "next/link"
import { useEffect,useState } from "react"
import { FaHome } from "react-icons/fa";

const Category = ({ params }: { params: { id: number } }) => {
    const [products,setProducts] = useState<IProduct[]>([])

    const categoryName = categoriesArray[params.id]

    useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        const categoryProducts:IProduct[] = response.filter((p:IProduct) => p.categoryId === Number(params.id) + 1)
        setProducts(categoryProducts);
      } 
      catch (error) {
        console.error('Error fetching products:', error);
            }
        }
        getProducts()
    },[])

  



    const applyLowToHigh = () => {

      const orderedProducts = [...products].sort((a, b) => a.price - b.price)
      console.dir(orderedProducts)
      setProducts(orderedProducts)
   }

   window.addEventListener('lowToHigh', applyLowToHigh)


   const applyHighToLow = () => {

     const orderedProducts = [...products].sort((a, b) => b.price - a.price)
     setProducts(orderedProducts)
   }

   window.addEventListener('highToLow', applyHighToLow)


   const resetOrder = () => {

     const orderedProducts = [...products].sort((a, b) => a.id - b.id)
     setProducts(orderedProducts)
 }

   window.addEventListener('resetOrder', resetOrder)


   const applyRange = (event: Event) => {
     if (event instanceof CustomEvent) {

       const { min, max } = event.detail
       const minP = min || 0
       const maxP = max || Infinity
         console.log(minP,maxP)

     const orderedProducts = [...products].filter((p) => p.price > minP && p.price < maxP)
     setProducts(orderedProducts)
   }
 }

     window.addEventListener('applyRange', applyRange);




   useEffect(()=>{

     return () => {
         window.removeEventListener('lowToHigh', applyLowToHigh)
         window.removeEventListener('highToLow', applyHighToLow)
         window.removeEventListener('resetOrder', resetOrder)
         window.removeEventListener('applyRange', applyRange)
     }
   },[])

    
    return (
      <>
      <GoHomeIcon/>
      <FilterDrawer/>
        <CardsContainer title={categoryName}>
          {products.length > 0 ? (
            products.map((product: IProduct) => (
              <Card key={product.id} {...product} />
            ))
          ) : (
            <div className="flex w-full flex-col items-center">
                <p className="p-6 w-full text-center text-gray-50 text-xs italic">
                    No products available in this category. Sorry!
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
export default Category