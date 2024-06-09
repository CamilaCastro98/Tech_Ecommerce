import IProduct from "./Products"

interface IOrder {
    id: number | null
    status: string
    date: string
    products: IProduct[]
}

export default IOrder