import ITotal from "@/interfaces/Total";
import ButtonFull from "./ButtonFull";
import ButtonTransparent from "./ButtonTransparent";
import { useEffect, useState } from "react";
import addOrder from "@/helpers/addOrder";
import Link from "next/link";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation"
import ICartProduct from "@/interfaces/CartProduct";

const Summary: React.FC<ITotal> = ({ content }) => {
  const [userData, setUserData] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cartData, setCartData] = useState<ICartProduct[]>([])

  const router = useRouter()

  useEffect(() => {
    if (content === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [disabled])

  useEffect(() => {
    if (typeof window !== undefined && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        setUserData(token);
      } else {
        console.error("No token found in localStorage.");
      }
    }
  }, []);

  const handlePurchase = async () => {
    try {
      Swal.fire({
        title: "Do you want to proceed with the purchase?",
        text: "Please confirm to finish your purchase",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm"
      }).then(async (result) => {
        if (result.isConfirmed) {

          await addOrder(userData);

          localStorage.removeItem('cart');
          setCartData([]);
          const event = new Event('cartChange');
          window.dispatchEvent(event);
  
          Swal.fire({
            title: "Done!",
            text: "Your purchase was successful and your products will arrive soon. Thank you for shopping with us!",
            icon: "success"
          });
          router.push("/");
        }
      });
    } catch (error) {
      console.error("Error while processing purchase:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error processing your purchase. Please try again later.",
        icon: "error"
      });
    }
  };
  

  return (
    <div className="border p-4 lg:h-64 md:mt-10 border-gray-50 rounded-md flex flex-col gap-3">
      <p className="text-sm md:text-base font-normal text-gray-100">Summary</p>
      <hr />
      <p className="text-base font-light text-gray-100 mb-3">
        Total<span className="text-lg ml-4 font-normal text-t-color">${content}</span>
      </p>
      <div className="bg-t-color">
        <ButtonFull
          type="button"
          onClick={handlePurchase}
          content="Purchase Now"
          disabled={disabled}
          tooltipContent="Add items to proceed with your purchase"
        />
      </div>
      
      <Link href="/user/history">
        <ButtonTransparent content="See Purchase History" />
      </Link>
    </div>
  );
};

export default Summary;

