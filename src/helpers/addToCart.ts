import IProduct from '@/interfaces/Products';
import Swal from 'sweetalert2';

const addToCart = (id: number, name: string, image: string, price: number) => {
    const cartDataString = localStorage.getItem('cart');
    if (cartDataString) {
        const cartData = JSON.parse(cartDataString);
        const idExistence: IProduct[] = cartData.filter((p: IProduct) => p.id === id);
        if (idExistence.length === 0) {
            cartData.push({
                id,
                name,
                image,
                price
            });
            localStorage.setItem('cart', JSON.stringify(cartData));

            const event = new Event('cartChange');
            window.dispatchEvent(event)

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The product was successfully added to your cart",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "You have already added this product to your cart",
                showConfirmButton: false,
                timer: 1500
            })

        }
    } else {
        throw new Error("Los datos no existen");
    }
}

export default addToCart;
