"use client"

import { useEffect, useState } from 'react';
import { fetchProductsById } from "@/helpers/petitions/petitions";
import IProduct from "@/interfaces/Products";
import categoriesArray from "@/helpers/categories";
import GoHomeIcon from "@/components/secondary/GoHomeIcon";
import Image from 'next/image';
import LateralContent from '@/components/secondary/LateralContent';

const ProductDetail = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct: IProduct | undefined = await fetchProductsById(params.id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const { image, name, price, description, categoryId, stock } = product;

  return (
    <>
      <GoHomeIcon/>
      <div className="flex flex-col lg:flex-row lg:mb-32 m-8 p-4 px-14 border border-none rounded-md shadow-2xl">
        <div className="flex pb-5 gap-10 flex-col lg:flex-row">
          <div className="flex gap-8">
            <Image className="rounded-md object-contain mb-2 w-56 lg:w-96 relative" src={image} alt="imgProduct" width={500} height={300} priority unoptimized />
            <div className='hidden md:block lg:hidden'>
              <p className="text-sm md:text-base mb-1 text-gray-50 font-light">{categoriesArray[categoryId - 1]}</p>
              <h2 className="text-xl font-normal mb-2 text-gray-100">{name}</h2>
              <p className="text-2xl lg:text-3xl font-normal mb-6 text-t-color">${price}</p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <p className="text-sm md:text-base mb-1 md:hidden lg:block text-gray-50 font-light">{categoriesArray[categoryId - 1]}</p>
            <h2 className="text-xl font-normal mb-2 text-gray-100 md:hidden lg:block">{name}</h2>
            <p className="text-2xl lg:text-3xl font-normal mb-6 text-t-color md:hidden lg:block">${price}</p>
            <h3 className="text-base lg:text-xl font-medium mb-2 text-gray-100">Details of this product</h3>
            <p className="text-sm md:text-base font-light text-gray-100">{description}</p>
          </div>
        </div>
        <LateralContent {...product}/>
      </div>
    </>
  );
}

export default ProductDetail;
