import { useEffect, useState } from 'react';
import { fetchProductsById } from "@/helpers/petitions/petitions";
import IProduct from "@/interfaces/Products";
import categoriesArray from "@/helpers/categories";
import GoHomeIcon from "@/components/secondary/GoHomeIcon";
import Image from 'next/image';

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
      <GoHomeIcon />
      <div className="flex flex-col lg:flex-row m-8 p-4 border border-none rounded-md shadow-2xl">
        <div className="flex pb-5 flex-col md:flex-row">
          <Image className="mb-2 w-32 h-auto md:w-48 lg:w-96 rounded-md" src={image} alt="imgProduct" width={500} height={300} priority unoptimized />
          <div className="md:mx-10 lg:w-1/2">
            <p className="text-sm md:text-base mb-1 text-gray-50 font-light">{categoriesArray[categoryId - 1]}</p>
            <h2 className="text-xl font-normal mb-2 text-gray-100">{name}</h2>
            <p className="text-2xl lg:text-3xl font-normal mb-6 text-t-color">${price}</p>
            <h3 className="text-base lg:text-xl font-medium mb-2 text-gray-100">Details of this product</h3>
            <p className="text-justify text-sm md:text-base font-light text-gray-100">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
