import ICartProduct from "@/interfaces/CartProduct"
import Image from 'next/image'

const CartProduct: React.FC<ICartProduct> = ({name,image,price}) => {

    return(
        <>
        <ul className="py-4 flex md:text-base justify-around w-full items-center text-p-color">
          <li className="flex flex-col w-16 md:flex-row items-center md:w-64 gap-2">
                <Image className="h:16 sm:h-20 w-auto border rounded-md" src={image} alt="imgProduct"  width={500} height={300} priority unoptimized/>
                <h3 className="font-semibold">{name}</h3>
          </li>
          <li className="md:mr-10 lg:mr-0"><p>1 unit</p></li>
          <li ><p>${price}</p></li>
        </ul>
        </>
    )
}

export default CartProduct