"use client"
import isAuthenticated from "@/utils/isAuth"
import { useEffect,useState } from "react"
import ButtonProps from "@/interfaces/propButton"

const ButtonTransparent: React.FC<ButtonProps> = ({content,type,name,onClick}) => {

    const [isAuth,setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(isAuthenticated())
      }, [])

    return (
        name === "cart" && !isAuth ? null
        :   <button onClick={onClick} name={name} type={type} className="bg-transparent 
        text-sm w-full rounded-sm border-2 border-gray-50 sm:text-base text-gray-50 font-normal px-2 p-1 hover:border-gray-400 hover:text-gray-400">{content}</button>
    )

}

export default ButtonTransparent