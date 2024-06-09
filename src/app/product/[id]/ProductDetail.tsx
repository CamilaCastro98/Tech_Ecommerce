import LateralContent from "@/components/secondary/LateralContent";
import { fetchProductsById } from "@/helpers/petitions/petitions";
import IProduct from "@/interfaces/Products";
import categoriesArray from "@/helpers/categories"
import GoHomeIcon from "@/components/secondary/GoHomeIcon";
import Image from 'next/image'

const ProductDetail = async({ params }: { params: { id: number } }) => {

  const fetchedProduct: IProduct | undefined = await fetchProductsById(params.id)
  const {image,name,price,description,categoryId,stock} = fetchedProduct 

  return (
    <>
    <GoHomeIcon/>
    <div className="flex flex-col lg:flex-row m-8 p-4 border border-none rounded-md shadow-2xl">
      <div className="flex pb-5 flex-col md:flex-row">
        <Image className="mb-2 w-32 h-auto md:w-48 lg:w-96 rounded-md" src={image} alt="imgProduct"  width={500} height={300} priority unoptimized />
        <div className="md:mx-10 lg:w-1/2">
          <p className="text-sm md:text-base mb-1 text-gray-50 font-light">{categoriesArray[categoryId - 1]}</p>
          <h2 className="text-xl font-normal mb-2 text-gray-100">{name}</h2>
          <p className="text-2xl lg:text-3xl font-normal mb-6 text-t-color">${price}</p>
          <h3 className="text-base lg:text-xl font-medium mb-2 text-gray-100">Details of this product</h3>
          <p className="text-justify text-sm md:text-base font-light text-gray-100">{description}</p>
        </div>
      </div>
      <LateralContent {...fetchedProduct}/>
        </div>
    </>

  );
}

export default ProductDetail;
