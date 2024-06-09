import { getOrdersById, postOrder } from "@/helpers/petitions/petitions";
import ICartProduct from "@/interfaces/CartProduct";


const addOrder = async (userData: string | null) => {

    if (!userData) {
      console.error("User data not found.");
      return;
    }
  
    const cartDataString = localStorage.getItem('cart');
    if (!cartDataString) {
      console.error("No cart data found in localStorage.");
      return;
    }
  
    const cartData: ICartProduct[] = JSON.parse(cartDataString);
    const cartIds: number[] = cartData.map((product) => product.id);
  
    try {
      const response = await postOrder(cartIds, userData);
      if (!response.ok) {
        console.error(`Failed to post order: ${response.statusText}`);
        return;
      }     
      const data = await response.json();
      console.log('Order created successfully:', data);
      const updatedOrders = await getOrdersById(userData)
      const userSessionString = localStorage.getItem('userSession');
      if (userSessionString) {
        const userSession = JSON.parse(userSessionString);
        userSession.user.orders = updatedOrders;
        localStorage.setItem('userSession', JSON.stringify(userSession))
      }
      localStorage.setItem('cart', JSON.stringify([]));
    } catch (error) {
      console.error(`Error trying to fetch data: ${error}`);
    }
  };
  

  export default addOrder