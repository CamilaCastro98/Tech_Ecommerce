import ICartProduct from "@/interfaces/CartProduct";
import ILoginData from "@/interfaces/Login"
import IOrder from "@/interfaces/Order";
import IProduct from "@/interfaces/Products"
import IRegister from "@/interfaces/Register"
import dotenv from 'dotenv';
import setServerCookie from "../cookies/setServerCookie";
dotenv.config()

const apiURL = process.env.NEXT_PUBLIC_URL
const authorization = process.env.AUT

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${apiURL}/products`, {
            method: "GET",
            next: {revalidate: 3600},
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
        });
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        throw new Error(`Error al obtener los productos: ${error}`);
    }
}

export const fetchProductsById = async(id:number) => {
    const productId = Number(id)
    try {
        const response = await fetch(`${apiURL}/products`, {
            method: "GET",
            next: {revalidate: 3600}
        })
        const products: IProduct[] = await response.json()
        const product = products.find(p => p.id === productId)
        if (!product) throw new Error("Product not found")
        else return product
    }
    catch (error) {
        throw new Error(`error: ${error}`)
    }
}

export const fetchProductsByName = async (searchedName:string) => {
  try {
      const response = await fetch(`${apiURL}/products`, {
          method: "GET",
          next: {revalidate: 3600}
      });
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
      const products: IProduct[] = await response.json();
      const searchedProducts = products.filter(p => p.name.toLowerCase().includes(searchedName.toLowerCase()))
      return searchedProducts
  } catch (error) {
      throw new Error(`Error al obtener los productos: ${error}`);
  }
}

export const fetchRegister = async (values:IRegister) => {
  const {email,password} = values
    try {
        const response = await fetch(`${apiURL}/users/register`,{
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify(values)
        })
        await fetchLogin({email,password})
        return response
    }
    catch(error) {
        alert(`error registering: ${error}`)
    }
}

export const fetchLogin = async (values:ILoginData) => {
    try {
        const login = await fetch(`${apiURL}/users/login`,{
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
                    "authorization": authorization || "test"
                },
            body: JSON.stringify(values)
        })
        if (login.ok) {
          let cart: ICartProduct[] = []
          const response = await login.json()
          const {token} = response
          localStorage.setItem('token',token)
          localStorage.setItem('userSession',JSON.stringify(response))
          localStorage.setItem('cart',JSON.stringify(cart))

          setServerCookie(token)

        }

        return login
    }
    catch(error) {
        throw new Error(`error trying to login: ${error}`)
    }
}

export const getOrdersById = async (token: string):Promise<IOrder[]> => {
    const userDataString = localStorage.getItem('userSession')
    if (!userDataString) {
      console.error("No cart data found in localStorage.")
      return [];
    }
    const userData = JSON.parse(userDataString)
    try {
      const response = await fetch(`${apiURL}/users/orders`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }   
      })
      const orders = await response.json()

      const userOrders:IOrder[] = orders.filter((o:IOrder)=> o.id !== userData.id)
      console.dir(userOrders)
      return userOrders
    } catch (error) {
      throw new Error(`error trying to post order: ${error}`);
    }
  }
  

export const postOrder = async (values: number[], token: string) => {
    try {
      const response = await fetch(`${apiURL}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: values }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to post order: ${response.statusText}`);
      }
  
      return response;
    } catch (error) {
      throw new Error(`error trying to post order: ${error}`);
    }
  }


  