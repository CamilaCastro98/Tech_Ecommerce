import IProduct from "@/interfaces/Products"

const PurchaseCard:React.FC<IProduct> = ({name}) => {
    return(
       <ul className="w-16 md:w-32 text-sm">
            <li>{name}</li>
       </ul>
    )
}

export default PurchaseCard